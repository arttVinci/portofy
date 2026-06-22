package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type ExperienceController struct {
	UseCase *usecase.ExperienceUseCase
	Log     *logrus.Logger
}

func NewExperienceController(useCase *usecase.ExperienceUseCase, log *logrus.Logger) *ExperienceController {
	return &ExperienceController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create experience
// @Tags         Experience
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateExperienceRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.ExperienceResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/experiences [post]
func (c *ExperienceController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateExperienceRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error creating experience")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ExperienceResponse]{Data: response})
}

// Update godoc
// @Summary      Update experience
// @Tags         Experience
// @Accept       json
// @Produce      json
// @Param        experienceId  path      string                         true  "Experience ID"
// @Param        request       body      model.UpdateExperienceRequest  true  "Request body"
// @Success      200           {object}  model.WebResponse[model.ExperienceResponse]
// @Failure      400           {object}  model.ApiErrorResponse
// @Failure      401           {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/experiences/{experienceId} [put]
func (c *ExperienceController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateExperienceRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("experienceId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error update experience")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ExperienceResponse]{Data: response})
}



// Delete godoc
// @Summary      Delete experience
// @Tags         Experience
// @Produce      json
// @Param        experienceId  path      string  true  "Experience ID"
// @Success      200           {object}  model.WebResponse[bool]
// @Failure      401           {object}  model.ApiErrorResponse
// @Failure      404           {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/experiences/{experienceId} [delete]
func (c *ExperienceController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	experienceId := ctx.Params("experienceId")

	request := &model.DeleteExperienceRequest{
		ID:     experienceId,
		UserId: auth.ID,
	}

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting experience")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *ExperienceController) BulkDelete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkDeleteExperienceRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	if err := c.UseCase.BulkDelete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error bulk deleting experiences")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *ExperienceController) BulkCreate(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkCreateExperienceRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	responses, err := c.UseCase.BulkCreate(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error bulk creating experiences")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ExperienceResponse]{Data: responses})
}

// GetAll godoc
// @Summary      Get all experiences (user)
// @Tags         Experience
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.ExperienceResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/experiences [get]
func (c *ExperienceController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetExperienceRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get experiences")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ExperienceResponse]{
		Data: response,
	})
}

// GetAllByUsername godoc
// @Summary      Get all experiences (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.ExperienceResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/experiences [get]
func (c *ExperienceController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicExperienceRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get experiences")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ExperienceResponse]{
		Data: response,
	})
}

// Get godoc
// @Summary      Get experience by ID (user)
// @Tags         Experience
// @Produce      json
// @Param        experienceId  path      string  true  "Experience ID"
// @Success      200           {object}  model.WebResponse[model.ExperienceResponse]
// @Failure      401           {object}  model.ApiErrorResponse
// @Failure      404           {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/experiences/{experienceId} [get]
func (c *ExperienceController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	id := ctx.Params("experienceId")

	request := &model.GetByIdExperienceRequest{
		ID:     id,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get experience")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ExperienceResponse]{Data: response})
}

// GetByUsername godoc
// @Summary      Get experience by ID (public)
// @Tags         Public
// @Produce      json
// @Param        username      path      string  true  "Username"
// @Param        experienceId  path      string  true  "Experience ID"
// @Success      200           {object}  model.WebResponse[model.ExperienceResponse]
// @Failure      404           {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/experiences/{experienceId} [get]
func (c *ExperienceController) GetByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")
	id := ctx.Params("experienceId")

	request := &model.GetPublicExperienceByIdRequest{
		ID:       id,
		Username: username,
	}

	response, err := c.UseCase.GetByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get experience")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ExperienceResponse]{Data: response})
}

func (c *ExperienceController) UploadImage(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UploadImageRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	file, err := ctx.FormFile("image")
	if err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	if file.Size > 7*1024*1024 {
		c.Log.Warn("Upload failed: file size exceeds 7MB limit")
		return fiber.NewError(fiber.StatusBadRequest, "Ukuran file melebihi 7MB")
	}

	request.Image = file
	request.UserID = auth.ID

	response, err := c.UseCase.UploadImage(ctx.UserContext(), request)
	if err != nil {
		return err
	}

	return ctx.JSON(model.WebResponse[string]{Data: response})
}
