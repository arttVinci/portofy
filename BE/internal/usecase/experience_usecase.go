package usecase

import (
	"context"
	"time"

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

type ExperienceUseCase struct {
	DB             *gorm.DB
	Log            *logrus.Logger
	Validate       *validator.Validate
	ExperienceRepo *repository.ExperienceRepository
}

func NewExperienceUseCase(
	db *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	experienceRepo *repository.ExperienceRepository,
) *ExperienceUseCase {
	return &ExperienceUseCase{
		DB:             db,
		Log:            log,
		Validate:       validate,
		ExperienceRepo: experienceRepo,
	}
}

func (c *ExperienceUseCase) Create(ctx context.Context, request *model.CreateExperienceRequest) (*model.ExperienceResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experience := &entity.Experience{
		ID:             uuid.NewString(),
		UserId:         request.UserId,
		Position:       request.Position,
		CompanyName:    request.CompanyName,
		LinkUrl:        request.LinkUrl,
		ImageUrl:       request.ImageUrl,
		Location:       request.Location,
		EmploymentType: request.EmploymentType,
		LocationType:   request.LocationType,
		StartDate:      request.StartDate,
		EndDate:        request.EndDate,
		Description:    request.Description,
	}

	if err := c.ExperienceRepo.Create(tx, experience); err != nil {
		c.Log.Warnf("Failed create Experience to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create experience")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save experience")
	}

	return converter.ExperienceToResponse(experience), nil
}

func (c *ExperienceUseCase) Update(ctx context.Context, request *model.UpdateExperienceRequest) (*model.ExperienceResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experience := new(entity.Experience)
	if err := c.ExperienceRepo.FindByIdAndUserId(tx, experience, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting experience")
		return nil, fiber.NewError(fiber.StatusNotFound, "Experience not found")
	}

	experience.Position = request.Position
	experience.CompanyName = request.CompanyName
	experience.LinkUrl = request.LinkUrl
	experience.ImageUrl = request.ImageUrl
	experience.Location = request.Location
	experience.EmploymentType = request.EmploymentType
	experience.LocationType = request.LocationType
	experience.StartDate = request.StartDate
	experience.EndDate = request.EndDate
	experience.Description = request.Description
	experience.UpdatedAt = time.Now().UnixMilli()

	if err := c.ExperienceRepo.Update(tx, experience); err != nil {
		c.Log.WithError(err).Error("error updating Experience")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update experience")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing update experience")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save experience update")
	}

	return converter.ExperienceToResponse(experience), nil
}

func (c *ExperienceUseCase) Delete(ctx context.Context, request *model.DeleteExperienceRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experience := new(entity.Experience)
	if err := c.ExperienceRepo.FindByIdAndUserId(tx, experience, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding experience")
		return fiber.NewError(fiber.StatusNotFound, "Experience not found")
	}

	if err := c.ExperienceRepo.Delete(tx, experience); err != nil {
		c.Log.WithError(err).Error("error deleting experience")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete experience")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing delete experience")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to confirm deletion")
	}

	return nil
}

func (c *ExperienceUseCase) GetAll(ctx context.Context, request *model.GetExperienceRequest) ([]model.ExperienceResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experiences := new([]entity.Experience)
	if err := c.ExperienceRepo.FindAllByUserId(tx, experiences, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting experiences")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experiences")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get experiences")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experiences")
	}

	responses := make([]model.ExperienceResponse, len(*experiences))
	for i, experience := range *experiences {
		responses[i] = *converter.ExperienceToResponse(&experience)
	}

	return responses, nil
}

func (c *ExperienceUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicExperienceRequest) ([]model.ExperienceResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experiences := new([]entity.Experience)
	if err := c.ExperienceRepo.FindAllByUsername(tx, experiences, request.Username); err != nil {
		c.Log.WithError(err).Error("error getting experiences by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experiences")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get experiences by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experiences")
	}

	responses := make([]model.ExperienceResponse, len(*experiences))
	for i, experience := range *experiences {
		responses[i] = *converter.ExperienceToResponse(&experience)
	}

	return responses, nil
}

func (c *ExperienceUseCase) Get(ctx context.Context, request *model.GetByIdExperienceRequest) (*model.ExperienceResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experience := new(entity.Experience)
	if err := c.ExperienceRepo.FindByIdAndUserId(tx, experience, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting experience")
		return nil, fiber.NewError(fiber.StatusNotFound, "Experience not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get experience")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experience")
	}

	return converter.ExperienceToResponse(experience), nil
}

func (c *ExperienceUseCase) GetByUsername(ctx context.Context, request *model.GetPublicExperienceByIdRequest) (*model.ExperienceResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	experience := new(entity.Experience)
	if err := c.ExperienceRepo.FindByUsername(tx, experience, request.Username, request.ID); err != nil {
		c.Log.WithError(err).Error("error getting experience by username")
		return nil, fiber.NewError(fiber.StatusNotFound, "Experience not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get experience by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get experience")
	}

	return converter.ExperienceToResponse(experience), nil
}
