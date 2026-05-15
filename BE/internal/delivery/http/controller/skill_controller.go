package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type SkillController struct {
	UseCase *usecase.SkillUseCase
	Log     *logrus.Logger
}

func NewSkillController(useCase *usecase.SkillUseCase, log *logrus.Logger) *SkillController {
	return &SkillController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create skill
// @Tags         Skill
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateSkillRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.SkillResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/skills [post]
func (c *SkillController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateSkillRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed creating Skill")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SkillResponse]{Data: response})
}

// Update godoc
// @Summary      Update skill
// @Tags         Skill
// @Accept       json
// @Produce      json
// @Param        skillId  path      string                    true  "Skill ID"
// @Param        request  body      model.UpdateSkillRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.SkillResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/skills/{skillId} [put]
func (c *SkillController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateSkillRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("skillId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed Creating Skill")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SkillResponse]{Data: response})
}

// Delete godoc
// @Summary      Delete skill
// @Tags         Skill
// @Produce      json
// @Param        skillId  path      string  true  "Skill ID"
// @Success      200      {object}  model.WebResponse[bool]
// @Failure      401      {object}  model.ApiErrorResponse
// @Failure      404      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/skills/{skillId} [delete]
func (c *SkillController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	skillId := ctx.Params("skillId")

	request := &model.DeleteSkillRequest{
		ID:     skillId,
		UserId: auth.ID,
	}

	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *SkillController) BulkDelete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkDeleteSkillRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	if err := c.UseCase.BulkDelete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error bulk deleting skills")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *SkillController) BulkCreate(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkCreateSkillRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	responses, err := c.UseCase.BulkCreate(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error bulk creating skills")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.SkillResponse]{Data: responses})
}

// GetAll godoc
// @Summary      Get all skills (user)
// @Tags         Skill
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.SkillResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/skills [get]
func (c *SkillController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetSkillRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed GetAll Skill by UserId")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.SkillResponse]{Data: response})
}

// GetAllByUsername godoc
// @Summary      Get all skills (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.SkillResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/skills [get]
func (c *SkillController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicSkillRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed GetAll By Username")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.SkillResponse]{Data: response})
}

// Get godoc
// @Summary      Get skill by ID (user)
// @Tags         Skill
// @Produce      json
// @Param        skillId  path      string  true  "Skill ID"
// @Success      200      {object}  model.WebResponse[model.SkillResponse]
// @Failure      401      {object}  model.ApiErrorResponse
// @Failure      404      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/skills/{skillId} [get]
func (c *SkillController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	skillId := ctx.Params("skillId")

	request := &model.GetByIdSkillRequest{
		ID:     skillId,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed Get Skill by userId")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SkillResponse]{Data: response})
}
