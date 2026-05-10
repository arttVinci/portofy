package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model"
	agent "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/usecase"
)

type AIDescriptionController struct {
	AIDescUseCase *usecase.AIDescriptionUseCase
	Log           *logrus.Logger
}

func NewAIDescriptionController(aIDescriptionUseCase *usecase.AIDescriptionUseCase, log *logrus.Logger) *AIDescriptionController {
	return &AIDescriptionController{
		AIDescUseCase: aIDescriptionUseCase,
		Log:           log,
	}
}

func (c *AIDescriptionController) GenerateAboutDescription(ctx *fiber.Ctx) error {
	request := new(agent.GenerateAboutDescRequest)

	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := c.AIDescUseCase.GenerateAboutDescription(ctx.UserContext(), request)
	if err != nil{
		c.Log.WithError(err).Error("error generating about description")
		return err
	}

	return ctx.JSON(model.WebResponse[*agent.GenerateAboutDescResponse]{Data: response})
}

func (c *AIDescriptionController) GenerateExperienceDesc(ctx *fiber.Ctx) error {
	request := new(agent.GenerateExperienceDescRequest)

	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := c.AIDescUseCase.GenerateExperienceDesc(ctx.UserContext(), request)
	if err != nil{
		c.Log.WithError(err).Error("error generating experience description")
		return err
	}

	return ctx.JSON(model.WebResponse[*agent.GenerateExperienceDescResponse]{Data: response})
}

func (c *AIDescriptionController) GenerateEducationDesc(ctx *fiber.Ctx) error {
	request := new(agent.GenerateEducationDescRequest)

	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := c.AIDescUseCase.GenerateEducationDesc(ctx.UserContext(), request)
	if err != nil{
		c.Log.WithError(err).Error("error generating education description")
		return err
	}

	return ctx.JSON(model.WebResponse[*agent.GenerateEducationDescResponse]{Data: response})
}

func (c *AIDescriptionController) GenerateProjectDesc(ctx *fiber.Ctx) error {
	request := new(agent.GenerateProjectDescRequest)

	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Invalid request body")
	}

	response, err := c.AIDescUseCase.GenerateProjectDesc(ctx.UserContext(), request)
	if err != nil{
		c.Log.WithError(err).Error("error generating project description")
		return err
	}

	return ctx.JSON(model.WebResponse[*agent.GenerateProjectDescResponse]{Data: response})
}
