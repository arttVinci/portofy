package http

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type ProjectController struct {
	UseCase *usecase.ProjectUseCase
	Log     *logrus.Logger
}

func NewProjectController(usecase *usecase.ProjectUseCase, log *logrus.Logger) *ProjectController {
	return &ProjectController{
		UseCase: usecase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create project
// @Tags         Project
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateProjectRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.ProjectResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/projects [post]
func (c *ProjectController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateProjectRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return err
	}
	request.UserId = auth.ID

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error creating Project")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProjectResponse]{Data: response})
}

// Update godoc
// @Summary      Update project
// @Tags         Project
// @Accept       json
// @Produce      json
// @Param        projectId  path      string                      true  "Project ID"
// @Param        request    body      model.UpdateProjectRequest  true  "Request body"
// @Success      200        {object}  model.WebResponse[model.ProjectResponse]
// @Failure      400        {object}  model.ApiErrorResponse
// @Failure      401        {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/projects/{projectId} [put]
func (c *ProjectController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateProjectRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return err
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("projectId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error updating Project")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProjectResponse]{Data: response})
}

// Delete godoc
// @Summary      Delete project
// @Tags         Project
// @Produce      json
// @Param        projectId  path      string  true  "Project ID"
// @Success      200        {object}  model.WebResponse[bool]
// @Failure      401        {object}  model.ApiErrorResponse
// @Failure      404        {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/projects/{projectId} [delete]
func (c *ProjectController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.DeleteProjectRequest)

	request.ID = ctx.Params("projectId")
	request.UserId = auth.ID

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting Project")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

// GetAll godoc
// @Summary      Get all projects (user)
// @Tags         Project
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.ProjectResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/projects [get]
func (c *ProjectController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetProjectRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get Projects")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ProjectResponse]{
		Data: response,
	})
}

// GetAllByUsername godoc
// @Summary      Get all projects (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.ProjectResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/projects [get]
func (c *ProjectController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicProjectRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get Projects")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ProjectResponse]{
		Data: response,
	})
}

// Get godoc
// @Summary      Get project by ID (user)
// @Tags         Project
// @Produce      json
// @Param        projectId  path      string  true  "Project ID"
// @Success      200        {object}  model.WebResponse[model.ProjectResponse]
// @Failure      401        {object}  model.ApiErrorResponse
// @Failure      404        {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/projects/{projectId} [get]
func (c *ProjectController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	id := ctx.Params("projectId")

	request := &model.GetByIdProjectRequest{
		ID:     id,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get project")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProjectResponse]{Data: response})
}

// GetByUsername godoc
// @Summary      Get project by ID (public)
// @Tags         Public
// @Produce      json
// @Param        username   path      string  true  "Username"
// @Param        projectId  path      string  true  "Project ID"
// @Success      200        {object}  model.WebResponse[model.ProjectResponse]
// @Failure      404        {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/projects/{projectId} [get]c
func (c *ProjectController) GetByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")
	id := ctx.Params("projectId")

	request := &model.GetPublicProjectByIdRequest{
		ID:       id,
		Username: username,
	}

	response, err := c.UseCase.GetByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get project")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProjectResponse]{Data: response})
}
