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
	"tratech.my.id/server/internal/repository"
)

// TODO(post-prod): SocialRepo jadi interface untuk testability
type SocialUseCase struct {
	DB         *gorm.DB
	Log        *logrus.Logger
	Validate   *validator.Validate
	SocialRepo *repository.SocialRepository
}

func NewSocialUsecase(
	db *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	SocialRepo *repository.SocialRepository,
) *SocialUseCase {
	return &SocialUseCase{
		DB:         db,
		Log:        log,
		Validate:   validate,
		SocialRepo: SocialRepo,
	}
}

func (c *SocialUseCase) Create(ctx context.Context, request *model.CreateSocialRequest) (*model.SocialResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	social := &entity.Social{
		ID:       uuid.NewString(),
		UserId:   request.UserId,
		Platform: request.Platform,
		LinkUrl:  request.LinkUrl,
	}

	if err := c.SocialRepo.Create(tx, social); err != nil {
		c.Log.Warnf("Failed create Social to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create social")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save social")
	}

	return converter.SocialToResponse(social), nil
}

func (c *SocialUseCase) Update(ctx context.Context, request *model.UpdateSocialRequest) (*model.SocialResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	social := new(entity.Social)
	if err := c.SocialRepo.FindByIdAndUserId(tx, social, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting social by id and user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Social not found")
	}

	social.Platform = request.Platform
	social.LinkUrl = request.LinkUrl

	if err := c.SocialRepo.Update(tx, social); err != nil {
		c.Log.WithError(err).Error("error updating social")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update social")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing update social")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save social update")
	}

	return converter.SocialToResponse(social), nil
}

func (c *SocialUseCase) Delete(ctx context.Context, request *model.DeleteSocialRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	social := new(entity.Social)
	if err := c.SocialRepo.FindByIdAndUserId(tx, social, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding social by id and user_id")
		return fiber.NewError(fiber.StatusNotFound, "Social not found")
	}

	if err := c.SocialRepo.Delete(tx, social); err != nil {
		c.Log.WithError(err).Error("error deleting social")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete social")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing delete social")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to confirm deletion")
	}

	return nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SocialUseCase) GetAll(ctx context.Context, request *model.GetSocialRequest) ([]model.SocialResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	socials := new([]entity.Social)
	if err := c.SocialRepo.FindAllByUserId(tx, socials, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting socials")
		// TODO(post-prod): bedakan DB error vs empty — pakai errors.Is(err, gorm.ErrRecordNotFound)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get socials")
	}

	if err := tx.Commit().Error; err != nil {
		// fix: log message sebelumnya bilang "getting skills" padahal ini social
		c.Log.WithError(err).Error("error committing get socials")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get socials")
	}

	responses := make([]model.SocialResponse, len(*socials))
	for i, social := range *socials {
		responses[i] = *converter.SocialToResponse(&social)
	}

	return responses, nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SocialUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicSocialRequest) ([]model.SocialResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	socials := new([]entity.Social)
	if err := c.SocialRepo.FindAllByUsername(tx, socials, request.Username); err != nil {
		c.Log.WithError(err).Error("error getting socials by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get socials")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get socials by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get socials")
	}

	responses := make([]model.SocialResponse, len(*socials))
	for i, social := range *socials {
		responses[i] = *converter.SocialToResponse(&social)
	}

	return responses, nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SocialUseCase) Get(ctx context.Context, request *model.GetByIdSocialRequest) (*model.SocialResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	social := new(entity.Social)
	if err := c.SocialRepo.FindByIdAndUserId(tx, social, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting social by id and user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Social not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get social")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get social")
	}

	return converter.SocialToResponse(social), nil
}
