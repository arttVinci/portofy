package usecase

import (
	"context"
	"mime/multipart"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/model/converter"
	"tratech.my.id/server/internal/repository"
)

// TODO(post-prod): pisah semua repo jadi interface biar bisa di-mock saat unit test
type ProfileUseCase struct {
	db             *gorm.DB
	log            *logrus.Logger
	validate       *validator.Validate
	profileRepo    *repository.ProfileRepository
	uploadImageRepo *repository.UploadImageRepository
}

func NewProfileUseCase(
	db *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	profileRepo *repository.ProfileRepository,
	uploadImageRepo *repository.UploadImageRepository,
) *ProfileUseCase {
	return &ProfileUseCase{
		db:             db,
		log:            log,
		validate:       validate,
		profileRepo:    profileRepo,
		uploadImageRepo: uploadImageRepo,
	}
}

func (c *ProfileUseCase) Create(ctx context.Context, request *model.CreateProfileRequest) (*model.ProfileResponse, error) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.validate.Struct(request); err != nil {
		c.log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	profile := &entity.Profile{
		ID:       uuid.NewString(),
		UserId:   request.UserId,
		FullName: request.FullName,
		ImageUrl: request.ImageUrl,
		Address:  request.Address,
		About:    request.About,
		Bio:      request.Bio,
		Tags:     request.Tags,
	}

	if err := c.profileRepo.Create(tx, profile); err != nil {
		c.log.Warnf("Failed create profile to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create profile")
	}

	if err := tx.Commit().Error; err != nil {
		c.log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save profile")
	}

	return converter.ProfileToResponse(profile), nil
}

func (c *ProfileUseCase) Update(ctx context.Context, request *model.UpdateProfileRequest) (*model.ProfileResponse, error) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.validate.Struct(request); err != nil {
		c.log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	profile := new(entity.Profile)

	if err := c.profileRepo.FindByUserId(tx, profile, request.UserId); err != nil {
		c.log.WithError(err).Error("error getting profile")
		return nil, fiber.NewError(fiber.StatusNotFound, "Profile not found")
	}

	profile.FullName = request.FullName
	profile.ImageUrl = request.ImageUrl
	profile.Address = request.Address
	profile.About = request.About
	profile.Bio = request.Bio
	profile.Tags = request.Tags

	if err := c.profileRepo.Update(tx, profile); err != nil {
		c.log.WithError(err).Error("error updating profile")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update profile")
	}

	if err := tx.Commit().Error; err != nil {
		c.log.WithError(err).Error("error committing update profile")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save profile update")
	}

	return converter.ProfileToResponse(profile), nil
}


func (c *ProfileUseCase) UploadAvatar(ctx context.Context, userId string, file *multipart.FileHeader) (string, error) {
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	profile := new(entity.Profile)
	
	if err := c.profileRepo.FindByUserId(tx, profile, userId); err != nil {	
		c.log.WithError(err).Error("error getting profile")
		return "", fiber.NewError(fiber.StatusNotFound, "Profile not found")
	}

	imageUrl, err := c.uploadImageRepo.UploadImage(ctx, file, "portofy-assets/public/avatars")
	if err != nil {
		c.log.WithError(err).Error("error uploading image")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to upload image")
	}



	if err := tx.Commit().Error; err != nil {
		c.log.WithError(err).Error("error committing upload profile avatar")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to save profile avatar")
	}

	return imageUrl, nil	
}

// TODO(post-prod): rename — "Middleware" bukan nama yang tepat untuk method ini
func (c *ProfileUseCase) GetAll(ctx context.Context, request *model.GetProfileRequest) ([]model.ProfileResponse, error) {
	// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.db.WithContext(ctx)
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.validate.Struct(request); err != nil {
		c.log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	profiles := new([]entity.Profile)

	if err := c.profileRepo.FindAllByUserId(tx, profiles, request.UserId); err != nil {
		c.log.WithError(err).Error("error getting profile by user_id")
		// TODO(post-prod): bedakan antara "not found" vs DB error menggunakan errors.Is(err, gorm.ErrRecordNotFound)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get profiles")
	}

	if err := tx.Commit().Error; err != nil {
		c.log.WithError(err).Error("error committing get profiles")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get profiles")
	}

	response := make([]model.ProfileResponse, len(*profiles))
	for i, profile := range *profiles {
		response[i] = *converter.ProfileToResponse(&profile)
	}

	return response, nil
}

func (c *ProfileUseCase) Get(ctx context.Context, request *model.GetProfileRequest) (*model.ProfileResponse, error) {
	// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.db.WithContext(ctx)
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.validate.Struct(request); err != nil {
		c.log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	profile := new(entity.Profile)

	if err := c.profileRepo.FindByUserId(tx, profile, request.UserId); err != nil {
		c.log.WithError(err).Error("error getting profile by user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Profile not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.log.WithError(err).Error("error committing get profile")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get profile")
	}

	return converter.ProfileToResponse(profile), nil
}

func (c *ProfileUseCase) GetByUsername(ctx context.Context, request *model.GetPublicProfileRequest) (*model.ProfileResponse, error) {
	// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.db.WithContext(ctx)
	tx := c.db.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.validate.Struct(request); err != nil {
		c.log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	profile := new(entity.Profile)

	if err := c.profileRepo.FindByUsername(tx, profile, request.Username); err != nil {
		c.log.WithError(err).Error("error getting profile by username")
		return nil, fiber.NewError(fiber.StatusNotFound, "Profile not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.log.WithError(err).Error("error committing get profile by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get profile")
	}

	return converter.ProfileToResponse(profile), nil
}
