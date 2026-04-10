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

// TODO(post-prod): SkillRepo jadi interface untuk testability
type SkillUseCase struct {
	DB        *gorm.DB
	Log       *logrus.Logger
	Validate  *validator.Validate
	SkillRepo *repository.SkillRepository
}

func NewSkillUsecase(
	db *gorm.DB,
	log *logrus.Logger,
	validate *validator.Validate,
	skillRepo *repository.SkillRepository,
) *SkillUseCase {
	return &SkillUseCase{
		DB:        db,
		Log:       log,
		Validate:  validate,
		SkillRepo: skillRepo,
	}
}

func (c *SkillUseCase) Create(ctx context.Context, request *model.CreateSkillRequest) (*model.SkillResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skill := &entity.Skill{
		ID:     uuid.NewString(),
		UserId: request.UserId,
		Title:  request.Title,
		Level:  request.Level,
	}

	if err := c.SkillRepo.Create(tx, skill); err != nil {
		c.Log.Warnf("Failed create Skill to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to create skill")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.Warnf("Failed commit transaction : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save skill")
	}

	return converter.SkillToResponse(skill), nil
}

func (c *SkillUseCase) Update(ctx context.Context, request *model.UpdateSkillRequest) (*model.SkillResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skill := new(entity.Skill)
	if err := c.SkillRepo.FindByIdAndUserId(tx, skill, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting skill by id and user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Skill not found")
	}

	skill.Title = request.Title
	skill.Level = request.Level

	if err := c.SkillRepo.Update(tx, skill); err != nil {
		c.Log.WithError(err).Error("error updating skill")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to update skill")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing update skill")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to save skill update")
	}

	return converter.SkillToResponse(skill), nil
}

func (c *SkillUseCase) Delete(ctx context.Context, request *model.DeleteSkillRequest) error {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skill := new(entity.Skill)
	if err := c.SkillRepo.FindByIdAndUserId(tx, skill, request.ID, request.UserId); err != nil {
		c.Log.WithError(err).Error("error finding skill by id and user_id")
		return fiber.NewError(fiber.StatusNotFound, "Skill not found")
	}

	if err := c.SkillRepo.Delete(tx, skill); err != nil {
		c.Log.WithError(err).Error("error deleting skill")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to delete skill")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing delete skill")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to confirm deletion")
	}

	return nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SkillUseCase) GetAll(ctx context.Context, request *model.GetSkillRequest) ([]model.SkillResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skills := new([]entity.Skill)
	if err := c.SkillRepo.FindAllByUserId(tx, skills, request.UserId); err != nil {
		c.Log.WithError(err).Error("error getting skills")
		// TODO(post-prod): bedakan DB error vs empty — pakai errors.Is(err, gorm.ErrRecordNotFound)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get skills")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get skills")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get skills")
	}

	responses := make([]model.SkillResponse, len(*skills))
	for i, skill := range *skills {
		responses[i] = *converter.SkillToResponse(&skill)
	}

	return responses, nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SkillUseCase) GetAllByUsername(ctx context.Context, request *model.GetPublicSkillRequest) ([]model.SkillResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skills := new([]entity.Skill)
	if err := c.SkillRepo.FindAllByUsername(tx, skills, request.Username); err != nil {
		// fix: log message sebelumnya bilang "achievement" padahal ini skill
		c.Log.WithError(err).Error("error getting skills by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get skills")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get skills by username")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get skills")
	}

	responses := make([]model.SkillResponse, len(*skills))
	for i, skill := range *skills {
		responses[i] = *converter.SkillToResponse(&skill)
	}

	return responses, nil
}

// TODO(post-prod): read-only, tidak perlu tx — ganti ke c.DB.WithContext(ctx)
func (c *SkillUseCase) Get(ctx context.Context, request *model.GetByIdSkillRequest) (*model.SkillResponse, error) {
	tx := c.DB.WithContext(ctx).Begin()
	defer tx.Rollback()

	if err := c.Validate.Struct(request); err != nil {
		c.Log.WithError(err).Error("error validating request body")
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	skill := new(entity.Skill)
	if err := c.SkillRepo.FindByIdAndUserId(tx, skill, request.ID, request.UserId); err != nil {
		// fix: log message sebelumnya bilang "achievement" padahal ini skill
		c.Log.WithError(err).Error("error getting skill by id and user_id")
		return nil, fiber.NewError(fiber.StatusNotFound, "Skill not found")
	}

	if err := tx.Commit().Error; err != nil {
		c.Log.WithError(err).Error("error committing get skill")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to get skill")
	}

	return converter.SkillToResponse(skill), nil
}
