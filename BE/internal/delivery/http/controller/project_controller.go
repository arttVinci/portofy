package controller

import (
	"math"

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
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
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
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
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

func (c *ProjectController) UploadThumbnail(ctx *fiber.Ctx) error {
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

	request.UserID = auth.ID
	request.Image = file

	response, err := c.UseCase.UploadThumbnail(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error upload project thumbnail")
		return err
	}

	return ctx.JSON(model.WebResponse[string]{Data: response})
}

func (c *ProjectController) UploadGallery(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UploadImageRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	multiFile, err := ctx.MultipartForm()
	if err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	if files, ok := multiFile.File["gallery"]; ok {
		for _, file := range files {
			if file.Size > 7*1024*1024 {
				c.Log.Warn("Upload failed: file size exceeds 7MB limit")
				return fiber.NewError(fiber.StatusBadRequest, "Ukuran file melebihi 7MB")
			}
		}

		request.Gallery = files
	}
	
	request.UserID = auth.ID

	response, err := c.UseCase.UploadGallery(ctx.UserContext(), request)
	if err != nil {
		return err
	}

	return ctx.JSON(model.WebResponse[[]string]{Data: response})
}

func (c *ProjectController) BulkDelete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkDeleteProjectRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	if err := c.UseCase.BulkDelete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error bulk deleting projects")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

func (c *ProjectController) BulkCreate(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.BulkCreateProjectRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}
	request.UserId = auth.ID

	responses, err := c.UseCase.BulkCreate(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error bulk creating projects")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.ProjectResponse]{Data: responses})
}

func (c *ProjectController) List(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.SearchProjectRequest{
		UserId: auth.ID,
		Title:  ctx.Query("title"),
		Page:   ctx.QueryInt("page", 1),
		Size:   ctx.QueryInt("size", 10),
	}

	responses, total, err := c.UseCase.Search(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error searching projects")
		return err
	}

	paging := &model.PageMetadata{
		Page:      request.Page,
		Size:      request.Size,
		TotalItem: total,
		TotalPage: int64(math.Ceil(float64(total) / float64(request.Size))),
	}

	return ctx.JSON(model.WebResponse[[]model.ProjectResponse]{
		Data:   responses,
		Paging: paging,
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



