package usecase

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	"math/big"
	"strings"
	"time"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/model/converter"
	"tratech.my.id/server/internal/pkg/mail"
	"tratech.my.id/server/internal/pkg/utils"
	"tratech.my.id/server/internal/repository"
)

// TODO(post-prod): UserRepository jadi interface untuk testability
type UserUseCase struct {
	DB                          *gorm.DB
	Log                         *logrus.Logger
	Validate                    *validator.Validate
	UserRepository              *repository.UserRepository
	EmailVerificationRepository *repository.EmailVerificationRepository
	Viper                       *viper.Viper
	Resend                      *mail.Resend
}

func NewUserUseCase(
	DB *gorm.DB,
	Log *logrus.Logger,
	validate *validator.Validate,
	UserRepo *repository.UserRepository,
	emailVerificationRepository *repository.EmailVerificationRepository,
	Viper *viper.Viper,
	Resend *mail.Resend,
) *UserUseCase {
	return &UserUseCase{
		DB:                          DB,
		Log:                         Log,
		Validate:                    validate,
		UserRepository:              UserRepo,
		EmailVerificationRepository: emailVerificationRepository,
		Viper:                       Viper,
		Resend:                      Resend,
	}
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *UserUseCase) GetByUsername(ctx context.Context, username string) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	user := new(entity.User)
	if err := c.UserRepository.FindByUsername(tx, user, username); err != nil {
		c.Log.Warnf("Failed find user by username : %+v", err)
		return nil, fiber.NewError(fiber.StatusNotFound, "User not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get user")
	}

	return converter.UserToResponse(user), nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *UserUseCase) Current(ctx context.Context, request *model.GetUserRequest) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	user := new(entity.User)
	if err := c.UserRepository.FindById(tx, user, request.ID); err != nil {
		c.Log.Warnf("Failed find user by id : %+v", err)
		return nil, fiber.NewError(fiber.StatusNotFound, "User not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get user")
	}

	return converter.UserToResponse(user), nil
}

func (c *UserUseCase) Create(ctx context.Context, request *model.RegisterUserRequest) (*model.LoginUserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	if err := c.validateOTP(tx, request.Email, request.OtpCode); err != nil {
		c.Log.Warnf("Failed Validate OTP Code: %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Your OTP code is invalid")
	}

	total, err := c.UserRepository.CountById(tx, request.Username)
	if err != nil {
		c.Log.Warnf("Failed count user from database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	if total > 0 {
		c.Log.Warnf("Username already exists : %+v", request.Username)
		return nil, fiber.NewError(fiber.StatusConflict, "Username already taken")
	}

	password, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
	if err != nil {
		c.Log.Warnf("Failed to generate bcrypt hash : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	userId, err := c.generateUserId(request.Username)
	if err != nil {
		c.Log.Warnf("Failed to generate user id : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	user := &entity.User{
		ID:       userId,
		Password: string(password),
		Username: request.Username,
		Email:    request.Email,
		Phone:    request.Phone,
	}

	if err := c.UserRepository.Create(tx, user); err != nil {
		c.Log.Warnf("Failed create user to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	token, err := c.generateJWT(user)
	if err != nil {
		c.Log.Errorf("Failed to generate JWT for user %s: %v", user.ID, err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate token")
	}

	oldOtp := new(entity.EmailVerification)
	_ = c.EmailVerificationRepository.FindByEmail(tx, oldOtp, request.Email)
	_ = c.EmailVerificationRepository.Delete(tx, oldOtp)

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to register user")
	}

	return &model.LoginUserResponse{
		User:  *converter.UserToResponse(user),
		Token: token,
	}, nil
}

func (c *UserUseCase) Update(ctx context.Context, request *model.UpdateUserRequest) (*model.UserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	user := new(entity.User)
	if err := c.UserRepository.FindById(tx, user, request.ID); err != nil {
		c.Log.Warnf("Failed find user by id : %+v", err)
		return nil, fiber.NewError(fiber.StatusNotFound, "User not found")
	}

	if request.Username != "" {
		user.Username = request.Username
	}
	if request.Email != "" {
		user.Email = request.Email
	}
	if request.Phone != "" {
		user.Phone = request.Phone
	}

	if request.Password != "" {
		password, err := bcrypt.GenerateFromPassword([]byte(request.Password), bcrypt.DefaultCost)
		if err != nil {
			c.Log.Warnf("Failed to generate bcrypt hash : %+v", err)
			return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update user")
		}
		user.Password = string(password)
	}

	if err := c.UserRepository.Update(tx, user); err != nil {
		c.Log.Warnf("Failed save user : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update user")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save user update")
	}

	return converter.UserToResponse(user), nil
}

func (c *UserUseCase) Login(ctx context.Context, request *model.LoginUserRequest) (*model.LoginUserResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	user := new(entity.User)
	if err := c.UserRepository.FindByUsername(tx, user, request.Username); err != nil {
		c.Log.Warnf("Failed find user by username : %+v", err)
		// Pesan sengaja digabung agar tidak bocorkan info username valid/tidak
		return nil, fiber.NewError(fiber.StatusNotFound, "Username atau password anda salah")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(request.Password)); err != nil {
		c.Log.Warnf("Failed to compare user password with bcrypt hash : %+v", err)
		// TODO(post-prod): pertimbangkan return 401 Unauthorized bukan 404
		// saat ini 404 dipakai agar konsisten dengan pesan "username atau password salah"
		return nil, fiber.NewError(fiber.StatusNotFound, "Username atau password anda salah")
	}

	token, err := c.generateJWT(user)
	if err != nil {
		c.Log.Errorf("Failed to generate JWT for user %s: %v", user.ID, err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate token")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to login")
	}

	return &model.LoginUserResponse{
		User:  *converter.UserToResponse(user),
		Token: token,
	}, nil
}

func (c *UserUseCase) Logout(ctx context.Context, request *model.LogoutUserRequest) (bool, error) {
	// TODO(post-prod): saat ini logout hanya log saja, tidak invalidate token
	// Implementasi proper: simpan token ke blacklist (Redis) atau pakai refresh token
	c.Log.Infof("User %s logout processed successfully", request.ID)
	return true, nil
}

// TODO(post-prod): fix — generateUserId return fiber.ErrNotFound saat random gagal, seharusnya ErrInternal
func (c *UserUseCase) generateUserId(username string) (string, error) {
	cleanUsername := strings.ToLower(strings.ReplaceAll(username, " ", ""))

	max := big.NewInt(10000)
	randomNumber, err := rand.Int(rand.Reader, max)
	if err != nil {
		c.Log.WithError(err).Error("error generate user id")
		return "", errors.New("failed to generate user id")
	}

	return fmt.Sprintf("usr_%s_%04d", cleanUsername, randomNumber.Int64()), nil
}

func (c *UserUseCase) generateJWT(user *entity.User) (string, error) {
	jwtSecret := c.Viper.GetString("jwt.secret")
	if jwtSecret == "" {
		c.Log.Error("JWT_SECRET not found in config")
		return "", errors.New("JWT secret not configured")
	}

	claims := jwt.MapClaims{
		"id":       user.ID,
		"username": user.Username,
		"exp":      time.Now().Add(time.Hour * 72).Unix(),
		"iat":      time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(jwtSecret))
}

func (c *UserUseCase) CreateVerificationCode(ctx context.Context, request *model.SendOTPRequest) (bool, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.Warnf("Invalid request body : %+v", err)
		return false, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	otpCode, err := utils.Generate6Digit()
	if err != nil {
		c.Log.Warnf("Gagal generate OTP: %v", err)
		return false, fiber.NewError(fiber.StatusInternalServerError, "Gagal membuat kode keamanan")
	}

	oldOtp := new(entity.EmailVerification)

	errOtp := c.EmailVerificationRepository.FindByEmail(tx, oldOtp, request.Email)

	if errOtp != nil {
		if err := c.EmailVerificationRepository.Delete(tx, oldOtp); err != nil {
			c.Log.WithError(err).Error("error deleting oldOtp")
			return false, fiber.NewError(fiber.StatusInternalServerError, "Failed to process verification")
		}
		c.Log.Infof("Old OTP for %s deleted successfully", request.Email)
	}

	emailVerification := &entity.EmailVerification{
		ID:        uuid.NewString(),
		Email:     request.Email,
		OtpCode:   otpCode,
		ExpiredAt: time.Now().Add(15 * time.Minute),
	}

	if err := c.EmailVerificationRepository.Create(tx, emailVerification); err != nil {
		c.Log.WithError(err).Error("Failed create email verification otp")
		return false, fiber.NewError(fiber.StatusInternalServerError, "Failed create email verification otp")
	}

	if err := c.Resend.SendOtpViaResend(request.Username, request.Email, otpCode); err != nil {
		c.Log.Warnf("Failed to send email otp verification: %v", err)
		return false, fiber.NewError(fiber.StatusInternalServerError, "Failed to send email otp verification")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return false, fiber.NewError(fiber.StatusInternalServerError, "Failed to Create Verification Email Code")
	}

	return true, nil
}

func (c *UserUseCase) validateOTP(tx *gorm.DB, email string, inputCode string) error {
	otpRecord := new(entity.EmailVerification)

	if err := c.EmailVerificationRepository.FindByEmail(tx, otpRecord, email); err != nil {
		c.Log.Warnf("OTP not found for email: %s", email)
		return fiber.NewError(fiber.StatusBadRequest, "Kode OTP tidak ditemukan, silakan minta kode baru")
	}

	// Cek apakah kodenya cocok
	if otpRecord.OtpCode != inputCode {
		c.Log.Warnf("Invalid OTP code for email: %s", email)
		return fiber.NewError(fiber.StatusBadRequest, "Kode OTP tidak valid")
	}

	// Cek apakah kodenya udah basi (Expired)
	if time.Now().After(otpRecord.ExpiredAt) {
		c.Log.Warnf("Expired OTP code for email: %s", email)
		return fiber.NewError(fiber.StatusBadRequest, "Kode OTP sudah kadaluarsa")
	}

	return nil
}
