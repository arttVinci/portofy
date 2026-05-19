package usecase

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/repository"
)

type OauthUseCase struct {
	GoogleOAuth *oauth2.Config
	Log         *logrus.Logger
	UserRepo    *repository.UserRepository
}

func NewOauthUseCase(googleOAuth *oauth2.Config, log *logrus.Logger, userRepo *repository.UserRepository) *OauthUseCase {
	return &OauthUseCase{
		GoogleOAuth: googleOAuth,
		Log: log,
		UserRepo: userRepo,
	}
}

func (u *OauthUseCase) Login(_ context.Context, state string) (string, error) {
	if state == "" {
		return "", fmt.Errorf("state tidak boleh kosong")
	}

	authUrl := u.GoogleOAuth.AuthCodeURL(state, oauth2.AccessTypeOffline)
	
	return authUrl, nil
}

func (u *OauthUseCase) Callback(ctx context.Context, codeOauth string) (*model.UserResponse, error) {
	if codeOauth == "" {
		u.Log.Error("code oauth tidak boleh kosong")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Code oauth tidak boleh kosong")
	}

	token, err := u.GoogleOAuth.Exchange(ctx, codeOauth)
	if err != nil {
		u.Log.WithError(err).Error("error getting user info from google")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Gagal mendapatkan informasi user dari google")
	}

	googleUser, err := http.Get("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token.AccessToken)
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

	user := &entity.User{
		
	}

	existingUser, err := u.UserRepo.FindByEmail(ctx, userInfo.Email)
	if err != nil {
		u.Log.WithError(err).Error("error finding user by email")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Gagal mendapatkan informasi user dari google")
	}

	return nil, nil
}