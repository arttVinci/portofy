package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type AchievementController struct {
	UseCase *usecase.AchievementUseCase
	Log     *logrus.Logger
}

func NewAchievementController(useCase *usecase.AchievementUseCase, log *logrus.Logger) *AchievementController {
	return &AchievementController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create achievement
// @Tags         Achievement
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateAchievementRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.AchievementResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/achievements [post]
func (c *AchievementController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateAchievementRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.ErrBadRequest
	}
	request.UserId = auth.ID

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error creating achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.AchievementResponse]{Data: response})
}

// Update godoc
// @Summary      Update achievement
// @Tags         Achievement
// @Accept       json
// @Produce      json
// @Param        achievementId  path      string                          true  "Achievement ID"
// @Param        request        body      model.UpdateAchievementRequest  true  "Request body"
// @Success      200            {object}  model.WebResponse[model.AchievementResponse]
// @Failure      400            {object}  model.ApiErrorResponse
// @Failure      401            {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/achievements/{achievementId} [put]
func (c *AchievementController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateAchievementRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.ErrBadRequest
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("achievementId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error update achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.AchievementResponse]{Data: response})
}

// Delete godoc
// @Summary      Delete achievement
// @Tags         Achievement
// @Produce      json
// @Param        achievementId  path      string  true  "Achievement ID"
// @Success      200            {object}  model.WebResponse[bool]
// @Failure      401            {object}  model.ApiErrorResponse
// @Failure      404            {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/achievements/{achievementId} [delete]
func (c *AchievementController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	achievemenetId := ctx.Params("achievementId")

	request := &model.DeleteAchievementRequest{
		ID:     achievemenetId,
		UserId: auth.ID,
	}

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

// GetAll godoc
// @Summary      Get all achievements (user)
// @Tags         Achievement
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.AchievementResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/achievements [get]
func (c *AchievementController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetAchievementRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get achievements")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.AchievementResponse]{
		Data: response,
	})
}

// GetAllByUsername godoc
// @Summary      Get all achievements (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.AchievementResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/achievements [get]
func (c *AchievementController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicAchievementRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get achievements")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.AchievementResponse]{
		Data: response,
	})
}

// Get godoc
// @Summary      Get achievement by ID (user)
// @Tags         Achievement
// @Produce      json
// @Param        achievementId  path      string  true  "Achievement ID"
// @Success      200            {object}  model.WebResponse[model.AchievementResponse]
// @Failure      401            {object}  model.ApiErrorResponse
// @Failure      404            {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/achievements/{achievementId} [get]
func (c *AchievementController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	id := ctx.Params("achievementId")

	request := &model.GetByIdAchievementRequest{
		ID:     id,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.AchievementResponse]{Data: response})
}

// GetByUsername godoc
// @Summary      Get achievement by ID (public)
// @Tags         Public
// @Produce      json
// @Param        username       path      string  true  "Username"
// @Param        achievementId  path      string  true  "Achievement ID"
// @Success      200            {object}  model.WebResponse[model.AchievementResponse]
// @Failure      404            {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/achievements/{achievementId} [get]
func (c *AchievementController) GetByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")
	id := ctx.Params("achievementId")

	request := &model.GetPublicAchievementByIdRequest{
		ID:       id,
		Username: username,
	}

	response, err := c.UseCase.GetByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get achievement")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.AchievementResponse]{Data: response})
}
