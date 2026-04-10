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

type EducationUseCase struct {
	DB            *gorm.DB
	Log           *logrus.Logger
	Validate      *validator.Validate
	EducationRepo *repository.EducationRepository
}

func NewEducationUseCase(
	db *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	educationRepo *repository.EducationRepository,
) *EducationUseCase {
	return &EducationUseCase{
		DB:            db,
		Log:           log,
		Validate:      validate,
		EducationRepo: educationRepo,
	}
}

func (c *EducationUseCase) Create(ctx context.Context, request *model.CreateEducationRequest) (*model.EducationResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	education := &entity.Education{
		ID:           uuid.NewString(),
		UserId:       request.UserId,
		Institution:  request.Institution,
		Degree:       request.Degree,
		FieldOfStudy: request.FieldOfStudy,
		Grade:        request.Grade,
		ImageUrl:     request.ImageUrl,
		Location:     request.Location,
		StartDate:    request.StartDate,
		EndDate:      request.EndDate,
		Description:  request.Description,
	}

	if err := c.EducationRepo.Create(tx, education); err != nil {
		c.Log.Warnf("Failed create Education to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create education")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save education")
	}

	return converter.EducationToResponse(education), nil
}

func (c *EducationUseCase) Update(ctx context.Context, request *model.UpdateEducationRequest) (*model.EducationResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	education := new(entity.Education)
	if err := c.EducationRepo.FindByIdAndUserId(tx, education, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting education")
		return nil, fiber.NewError(fiber.StatusNotFound, "Education not found")
	}

	education.Institution = request.Institution
	education.Degree = request.Degree
	education.FieldOfStudy = request.FieldOfStudy
	education.Grade = request.Grade
	education.ImageUrl = request.ImageUrl
	education.Location = request.Location
	// TODO: nil check — fix before prod
	if request.StartDate != nil {
		education.StartDate = request.StartDate
	}
	education.EndDate = request.EndDate
	education.Description = request.Description
	education.UpdatedAt = time.Now().UnixMilli()

	if err := c.EducationRepo.Update(tx, education); err != nil {
		c.Log.WithError(err).Error("error updating Education")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update education")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing update education")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save education update")
	}

	return converter.EducationToResponse(education), nil
}

func (c *EducationUseCase) Delete(ctx context.Context, request *model.DeleteEducationRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	education := new(entity.Education)
	if err := c.EducationRepo.FindByIdAndUserId(tx, education, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding education")
		return fiber.NewError(fiber.StatusNotFound, "Education not found")
	}

	if err := c.EducationRepo.Delete(tx, education); err != nil {
		c.Log.WithError(err).Error("error deleting education")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete education")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing delete education")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to confirm deletion")
	}

	return nil
}

func (c *EducationUseCase) GetAll(ctx context.Context, request *model.GetEducationRequest) ([]model.EducationResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	educations := new([]entity.Education)
	if err := c.EducationRepo.FindAllByUserId(tx, educations, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting educations")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get educations")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get educations")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get educations")
	}

	responses := make([]model.EducationResponse, len(*educations))
	for i, education := range *educations {
		responses[i] = *converter.EducationToResponse(&education)
	}

	return responses, nil
}

func (c *EducationUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicEducationRequest) ([]model.EducationResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	educations := new([]entity.Education)
	if err := c.EducationRepo.FindAllByUsername(tx, educations, request.Username); err != nil {
		c.Log.WithError(err).Error("error getting educations by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get educations")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get educations by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get educations")
	}

	responses := make([]model.EducationResponse, len(*educations))
	for i, education := range *educations {
		responses[i] = *converter.EducationToResponse(&education)
	}

	return responses, nil
}

func (c *EducationUseCase) Get(ctx context.Context, request *model.GetByIdEducationRequest) (*model.EducationResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	education := new(entity.Education)
	if err := c.EducationRepo.FindByIdAndUserId(tx, education, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting education")
		return nil, fiber.NewError(fiber.StatusNotFound, "Education not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get education")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get education")
	}

	return converter.EducationToResponse(education), nil
}

func (c *EducationUseCase) GetByUsername(ctx context.Context, request *model.GetPublicEducationByIdRequest) (*model.EducationResponse, error) {
	// TODO: read-only, tidak perlu tx — refactor setelah prod
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	education := new(entity.Education)
	if err := c.EducationRepo.FindByUsername(tx, education, request.Username, request.ID); err != nil {
		c.Log.WithError(err).Error("error getting education by username")
		return nil, fiber.NewError(fiber.StatusNotFound, "Education not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get education by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get education")
	}

	return converter.EducationToResponse(education), nil
}
