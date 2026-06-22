package usecase

import (
	"context"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/model/converter"
	"tratech.my.id/server/internal/pkg/utils"
	"tratech.my.id/server/internal/repository"
)

type AchievementUseCase struct {
	DB              *gorm.DB
	Log             *logrus.Logger
	Validate        *validator.Validate
	AchievRepo      *repository.AchievementRepository
	uploadImageRepo *repository.UploadImageRepository
}

func NewAchievementUseCase(
	DB *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	achievRepo *repository.AchievementRepository,
	uploadImageRepo *repository.UploadImageRepository,
) *AchievementUseCase {
	return &AchievementUseCase{
		DB:              DB,
		Log:             log,
		Validate:        validate,
		AchievRepo:      achievRepo,
		uploadImageRepo: uploadImageRepo,
	}
}

func (u *AchievementUseCase) Create(ctx context.Context, request *model.CreateAchievementRequest) (*model.AchievementResponse, error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	err := u.Validate.Struct(request)
	if err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievement := &entity.Achievement{
		ID:            uuid.NewString(),
		UserId:        request.UserId,
		Title:         request.Title,
		ImageUrl:      request.ImageUrl,
		Organization:  request.Organization,
		IssuedDate:    request.IssuedDate,
		CredentialId:  *request.CredentialId,
		CredentialUrl: *request.CredentialUrl,
	}

	if err := u.AchievRepo.Create(tx, achievement); err != nil {
		u.Log.Warnf("Failed create Achievement to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed create Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed create Achievement")
	}

	return converter.AchievementToResponse(achievement), nil
}

func (u *AchievementUseCase) Update(ctx context.Context, request *model.UpdateAchievementRequest) (*model.AchievementResponse, error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Struct(request); err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievement := new(entity.Achievement)
	if err := u.AchievRepo.FindByIdAndUserId(tx, achievement, request.ID, request.UserId); err != nil {
		u.Log.WithError(err).Error("error getting Achievement")
		return nil, fiber.NewError(fiber.StatusNotFound, "Failed getting Achievement")
	}

	achievement.Title = request.Title
	achievement.ImageUrl = request.ImageUrl
	achievement.Organization = request.Organization
	achievement.IssuedDate = request.IssuedDate
	achievement.CredentialUrl = request.CredentialUrl
	achievement.CredentialId = request.CredentialId

	if err := u.AchievRepo.Update(tx, achievement); err != nil {
		u.Log.WithError(err).Error("error updating achievement")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed update Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error updating achievement")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed update Achievement")
	}

	return converter.AchievementToResponse(achievement), nil
}



func (u *AchievementUseCase) Delete(ctx context.Context, request *model.DeleteAchievementRequest) error {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Struct(request); err != nil {
		u.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievement := new(entity.Achievement)
	if err := u.AchievRepo.FindByIdAndUserId(tx, achievement, request.ID, request.UserId); err != nil {
		u.Log.WithError(err).Error("error find achievement by id and user_id")
		return fiber.NewError(fiber.StatusNotFound, "Failed getting Achievement")
	}

	if err := u.AchievRepo.Delete(tx, achievement); err != nil {
		u.Log.WithError(err).Error("error deleting achievement")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed delete Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error deleting achievement")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed delete Achievement")
	}

	return nil
}

func (u *AchievementUseCase) BulkDelete(ctx context.Context, request *model.BulkDeleteAchievementRequest) error {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Struct(request); err != nil {
		u.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	if err := u.AchievRepo.BulkDeleteByUserIdAndIds(tx, request.UserId, request.ID); err != nil {
		u.Log.WithError(err).Error("error bulk deleting achievements")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed bulk delete Achievements")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error committing bulk delete")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed bulk delete Achievements")
	}

	return nil
}

func (u *AchievementUseCase) BulkCreate(ctx context.Context, request *model.BulkCreateAchievementRequest) ([]model.AchievementResponse, error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := u.Validate.Struct(request); err != nil {
		u.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievements := make([]entity.Achievement, len(request.Items))
	for i, item := range request.Items {
		achievements[i] = entity.Achievement{
			ID:           uuid.NewString(),
			UserId:       request.UserId,
			Title:        item.Title,
			ImageUrl:     item.ImageUrl,
			Organization: item.Organization,
			IssuedDate:   item.IssuedDate,
		}
		if item.CredentialId != nil {
			achievements[i].CredentialId = *item.CredentialId
		}
		if item.CredentialUrl != nil {
			achievements[i].CredentialUrl = *item.CredentialUrl
		}
	}

	if err := u.AchievRepo.BulkCreate(tx, achievements); err != nil {
		u.Log.WithError(err).Error("error bulk creating achievements")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed bulk create Achievements")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error committing bulk create")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed bulk create Achievements")
	}

	responses := make([]model.AchievementResponse, len(achievements))
	for i, achievement := range achievements {
		responses[i] = *converter.AchievementToResponse(&achievement)
	}

	return responses, nil
}

func (u *AchievementUseCase) Search(ctx context.Context, request *model.SearchAchievementRequest) ([]model.AchievementResponse,int64, error) {
	if err := u.Validate.Struct(request); err != nil {
		u.Log.WithError(err).Error("error validating request body")
		return nil, 0, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	db := u.DB.WithContext(ctx)

	achievements, total, err := u.AchievRepo.Search(db, request)
	if err != nil {
		u.Log.WithError(err).Error("error getting achievements")
		return nil, 0,fiber.NewError(fiber.StatusInternalServerError, "Failed getting Achievements")
	}

	responses := make([]model.AchievementResponse, len(achievements))
	for i, achiev := range achievements {
		responses[i] = *converter.AchievementToResponse(&achiev)
	}

	return responses, total, nil
}

func (c *AchievementUseCase) Get(ctx context.Context, request *model.GetByIdAchievementRequest) (*model.AchievementResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievement := new(entity.Achievement)
	if err := c.AchievRepo.FindByIdAndUserId(tx, achievement, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusNotFound, "Failed getting Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed Get Achievement")
	}

	return converter.AchievementToResponse(achievement), nil
}


func (c *AchievementUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicAchievementRequest) ([]model.AchievementResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	achievements := new([]entity.Achievement)
	if err := c.AchievRepo.FindAllByUsername(tx, achievements, request.Username); err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusNotFound, "Failed getting Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed Get Achievement")
	}

	responses := make([]model.AchievementResponse, len(*achievements))
	for i, achiev := range *achievements {
		responses[i] = *converter.AchievementToResponse(&achiev)
	}

	return responses, nil
}

func (c *AchievementUseCase) GetByUsername(ctx context.Context, request *model.GetPublicAchievementByIdRequest) (*model.AchievementResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.ErrBadRequest
	}

	achievement := new(entity.Achievement)
	if err := c.AchievRepo.FindByUsername(tx, achievement, request.Username, request.ID); err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusNotFound, "Failed getting Achievement")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error getting achievement")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed Get Achievement")
	}

	return converter.AchievementToResponse(achievement), nil
}

func (u *AchievementUseCase) UploadImage(ctx context.Context, request *model.UploadImageRequest ) (string, error) {
	tx := u.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if request.ID != "" {
		achievement := new(entity.Achievement)
		if err := u.AchievRepo.FindByIdAndUserId(tx, achievement, request.ID, request.UserID); err != nil {
			u.Log.WithError(err).Error("error getting achievement")
		} else if achievement.ImageUrl != "" {
			publicId := utils.ExtractPublicID(achievement.ImageUrl)
			if err := u.uploadImageRepo.DeleteImage(ctx, publicId); err != nil {
				u.Log.WithError(err).Error("error delete image old")
			}
		}
	}

	imageUrl, err := u.uploadImageRepo.UploadImage(ctx, request.Image, "portofy-assets/public/achievements")
	if err != nil {
		u.Log.WithError(err).Error("error uploading image")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to upload image")
	}

	if err := tx.Commit().Error; err != nil {
		u.Log.WithError(err).Error("error committing upload image")
		return "", fiber.NewError(fiber.StatusInternalServerError, "Failed to save image")
	}

	return imageUrl, nil
}
