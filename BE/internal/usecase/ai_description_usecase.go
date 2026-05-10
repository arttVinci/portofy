package usecase

import (
	"context"
	"encoding/json"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/repository"
)

type AIDescriptionUseCase struct {
	AIDescRepo     *repository.AIDescriptionRepository
	Validate       *validator.Validate
	Log            *logrus.Logger
}

func NewAIDescriptionUseCase(aiDescRepo *repository.AIDescriptionRepository, validate *validator.Validate, log *logrus.Logger) *AIDescriptionUseCase {
	return &AIDescriptionUseCase{
		AIDescRepo:     aiDescRepo,
		Validate:       validate,
		Log:            log,
	}
}

func (u *AIDescriptionUseCase) GenerateAboutDescription(ctx context.Context, request *model.GenerateAboutDescRequest) (*model.GenerateAboutDescResponse, error) {
	err := u.Validate.Struct(request)
	if err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := u.AIDescRepo.GenerateAboutDescription(ctx, request)
	if err != nil {
		u.Log.Warnf("Failed generate about description to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate about description")
	}

	result := new(model.GenerateAboutDescResponse)
	
	err = json.Unmarshal([]byte(response), result)
	if err != nil {
		u.Log.WithError(err).Error("error unmarshalling json from ai agent")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate about description")
	}

	return result, nil
}

func (u *AIDescriptionUseCase) GenerateExperienceDesc(ctx context.Context, request *model.GenerateExperienceDescRequest) (*model.GenerateExperienceDescResponse, error) {
	err := u.Validate.Struct(request)
	if err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := u.AIDescRepo.GenerateExperienceDesc(ctx, request)
	if err != nil {
		u.Log.Warnf("Failed generate experience description to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate experience description")
	}

	result := new(model.GenerateExperienceDescResponse)
	
	err = json.Unmarshal([]byte(response), result)
	if err != nil {
		u.Log.WithError(err).Error("error unmarshalling json from ai agent")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate experience description")
	}

	return result, nil
}

func (u *AIDescriptionUseCase) GenerateEducationDesc(ctx context.Context, request *model.GenerateEducationDescRequest) (*model.GenerateEducationDescResponse, error) {
	err := u.Validate.Struct(request)
	if err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := u.AIDescRepo.GenerateEducationDesc(ctx, request)
	if err != nil {
		u.Log.Warnf("Failed generate education description to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate education description")
	}

	result := new(model.GenerateEducationDescResponse)
	
	err = json.Unmarshal([]byte(response), result)
	if err != nil {
		u.Log.WithError(err).Error("error unmarshalling json from ai agent")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate education description")
	}

	return result, nil
}

func (u *AIDescriptionUseCase) GenerateProjectDesc(ctx context.Context, request *model.GenerateProjectDescRequest) (*model.GenerateProjectDescResponse, error) {
	err := u.Validate.Struct(request)
	if err != nil {
		u.Log.Warnf("Invalid request body : %+v", err)
		return nil, fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := u.AIDescRepo.GenerateProjectDesc(ctx, request)
	if err != nil {
		u.Log.Warnf("Failed generate project description to database : %+v", err)
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate project description")
	}

	result := new(model.GenerateProjectDescResponse)
	
	err = json.Unmarshal([]byte(response), result)
	if err != nil {
		u.Log.WithError(err).Error("error unmarshalling json from ai agent")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to generate project description")
	}

	return result, nil
}