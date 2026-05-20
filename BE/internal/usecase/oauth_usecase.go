package usecase

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/auth"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/model/converter"
	"tratech.my.id/server/internal/pkg/utils"
	"tratech.my.id/server/internal/repository"
)

type OauthUseCase struct {
	GoogleOAuth *oauth2.Config
	Log         *logrus.Logger
	UserRepo    *repository.UserRepository
	DB          *gorm.DB
	Viper       *viper.Viper
}

func NewOauthUseCase(googleOAuth *oauth2.Config, log *logrus.Logger, userRepo *repository.UserRepository, db *gorm.DB, viper *viper.Viper) *OauthUseCase {
	return &OauthUseCase{
		GoogleOAuth: googleOAuth,
		Log:         log,
		UserRepo:    userRepo,
		DB:          db,
		Viper:       viper,
	}
}

func (u *OauthUseCase) Login(_ context.Context, state string) (string, error) {
	if state == "" {
		return "", fmt.Errorf("state tidak boleh kosong")
	}

	authUrl := u.GoogleOAuth.AuthCodeURL(state, oauth2.AccessTypeOffline)

	return authUrl, nil
}

func (u *OauthUseCase) Callback(ctx context.Context, codeOauth string) (*model.LoginUserResponse, error) {
	if codeOauth == "" {
		u.Log.Error("code oauth tidak boleh kosong")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Code oauth tidak boleh kosong")
	}

	token, err := u.GoogleOAuth.Exchange(ctx, codeOauth)
	if err != nil {
		u.Log.WithError(err).Error("error getting user info from google")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Gagal mendapatkan informasi user dari google")
	}

	client := &http.Client{Timeout: 10 * time.Second}
	googleUser, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
	if err != nil {
		u.Log.WithError(err).Error("error getting user info from google")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Gagal mendapatkan informasi user dari google")
	}
	defer googleUser.Body.Close()

	var userInfo struct {
		ID      string `json:"id"`
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
	}

	if err := json.NewDecoder(googleUser.Body).Decode(&userInfo); err != nil {
		u.Log.WithError(err).Error("error decoding user info from google")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Gagal mendapatkan informasi user dari google")
	}

	userId, err := utils.GenerateUserId(userInfo.Name)
	if err != nil {
		u.Log.Warnf("Failed to generate user id : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	user := &entity.User{
		ID:           userId,
		Email:        userInfo.Email,
		Username:     fmt.Sprintf("%s_%s", strings.ReplaceAll(userInfo.Name, " ", ""), utils.GenerateRandomString(4)),
		Password:     "",
		AuthProvider: "google",
	}

	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	existingUser := new(entity.User)

	err = u.UserRepo.FindByEmail(tx, existingUser, userInfo.Email)
	if err != nil {
		if err := u.UserRepo.Create(tx, user); err != nil {
			u.Log.Warnf("Failed create user to database : %+v", err)
			return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
		}

		existingUser = user

	}

	tokenJWT, err := auth.GenerateJWT(u.Viper.GetString("jwt.secret"), existingUser.ID, existingUser.Username)
	if err != nil {
		u.Log.Errorf("Failed to generate JWT for user %s: %v", existingUser.ID, err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate token")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	return &model.LoginUserResponse{
		User:  *converter.UserToResponse(user),
		Token: tokenJWT,
	}, nil
}
