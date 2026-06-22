package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type EducationController struct {
	UseCase *usecase.EducationUseCase
	Log     *logrus.Logger
}

func NewEducationController(useCase *usecase.EducationUseCase, log *logrus.Logger) *EducationController {
	return &EducationController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create education
// @Tags         Education
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateEducationRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.EducationResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/educations [post]
func (c *EducationController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateEducationRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error creating education")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.EducationResponse]{Data: response})
}

// Update godoc
// @Summary      Update education
// @Tags         Education
// @Accept       json
// @Produce      json
// @Param        educationId  path      string                        true  "Education ID"
// @Param        request      body      model.UpdateEducationRequest  true  "Request body"
// @Success      200          {object}  model.WebResponse[model.EducationResponse]
// @Failure      400          {object}  model.ApiErrorResponse
// @Failure      401          {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/educations/{educationId} [put]
func (c *EducationController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateEducationRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("educationId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error update education")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.EducationResponse]{Data: response})
}



// Delete godoc
// @Summary      Delete education
// @Tags         Education
// @Produce      json
// @Param        educationId  path      string  true  "Education ID"
// @Success      200          {object}  model.WebResponse[bool]
// @Failure      401          {object}  model.ApiErrorResponse
// @Failure      404          {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/educations/{educationId} [delete]
func (c *EducationController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	experienceId := ctx.Params("educationId")

	request := &model.DeleteEducationRequest{
		ID:     experienceId,
		UserId: auth.ID,
	}

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting education")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *EducationController) BulkDelete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkDeleteEducationRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	if err := c.UseCase.BulkDelete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error bulk deleting educations")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *EducationController) BulkCreate(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkCreateEducationRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	responses, err := c.UseCase.BulkCreate(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error bulk creating educations")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.EducationResponse]{Data: responses})
}

// GetAll godoc
// @Summary      Get all educations (user)
// @Tags         Education
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.EducationResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/educations [get]
func (c *EducationController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetEducationRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get educations")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.EducationResponse]{
		Data: response,
	})
}

// GetAllByUsername godoc
// @Summary      Get all educations (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.EducationResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/educations [get]
func (c *EducationController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicEducationRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get educations")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.EducationResponse]{
		Data: response,
	})
}

// Get godoc
// @Summary      Get education by ID (user)
// @Tags         Education
// @Produce      json
// @Param        educationId  path      string  true  "Education ID"
// @Success      200          {object}  model.WebResponse[model.EducationResponse]
// @Failure      401          {object}  model.ApiErrorResponse
// @Failure      404          {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/educations/{educationId} [get]
func (c *EducationController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	id := ctx.Params("educationId")

	request := &model.GetByIdEducationRequest{
		ID:     id,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get education")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.EducationResponse]{Data: response})
}

// GetByUsername godoc
// @Summary      Get education by ID (public)
// @Tags         Public
// @Produce      json
// @Param        username     path      string  true  "Username"
// @Param        educationId  path      string  true  "Education ID"
// @Success      200          {object}  model.WebResponse[model.EducationResponse]
// @Failure      404          {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/educations/{educationId} [get]
func (c *EducationController) GetByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")
	id := ctx.Params("educationId")

	request := &model.GetPublicEducationByIdRequest{
		ID:       id,
		Username: username,
	}

	response, err := c.UseCase.GetByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get education")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.EducationResponse]{Data: response})
}

func (c *EducationController) UploadImage(ctx *fiber.Ctx) error {
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
