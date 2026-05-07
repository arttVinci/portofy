package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type SocialController struct {
	UseCase *usecase.SocialUseCase
	Log     *logrus.Logger
}

func NewSocialController(useCase *usecase.SocialUseCase, log *logrus.Logger) *SocialController {
	return &SocialController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create social
// @Tags         Social
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateSocialRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.SocialResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/socials [post]
func (c *SocialController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateSocialRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed creating Social")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SocialResponse]{Data: response})
}

// Update godoc
// @Summary      Update social
// @Tags         Social
// @Accept       json
// @Produce      json
// @Param        socialId  path      string                     true  "Social ID"
// @Param        request   body      model.UpdateSocialRequest  true  "Request body"
// @Success      200       {object}  model.WebResponse[model.SocialResponse]
// @Failure      400       {object}  model.ApiErrorResponse
// @Failure      401       {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/socials/{socialId} [put]
func (c *SocialController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateSocialRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID
	request.ID = ctx.Params("socialId")

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed Creating Social")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SocialResponse]{Data: response})
}

// Delete godoc
// @Summary      Delete social
// @Tags         Social
// @Produce      json
// @Param        socialId  path      string  true  "Social ID"
// @Success      200       {object}  model.WebResponse[bool]
// @Failure      401       {object}  model.ApiErrorResponse
// @Failure      404       {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/socials/{socialId} [delete]
func (c *SocialController) Delete(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	skillId := ctx.Params("socialId")

	request := &model.DeleteSocialRequest{
		ID:     skillId,
		UserId: auth.ID,
	}

	if err := c.UseCase.Delete(ctx.UserContext(), request); err != nil {
		c.Log.WithError(err).Error("error deleting social")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: true})
}

// GetAll godoc
// @Summary      Get all socials (user)
// @Tags         Social
// @Produce      json
// @Success      200  {object}  model.WebResponse[[]model.SocialResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/socials [get]
func (c *SocialController) GetAll(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetSocialRequest{
		UserId: auth.ID,
	}



	response, err := c.UseCase.GetAll(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed GetAll Social by UserId")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.SocialResponse]{Data: response})
}

// GetAllByUsername godoc
// @Summary      Get all socials (public)
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[[]model.SocialResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username}/socials [get]
func (c *SocialController) GetAllByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicSocialRequest{
		Username: username,
	}

	response, err := c.UseCase.GetAllByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed GetAll Social By Username")
		return err
	}

	return ctx.JSON(model.WebResponse[[]model.SocialResponse]{Data: response})
}

// Get godoc
// @Summary      Get social by ID (user)
// @Tags         Social
// @Produce      json
// @Param        socialId  path      string  true  "Social ID"
// @Success      200       {object}  model.WebResponse[model.SocialResponse]
// @Failure      401       {object}  model.ApiErrorResponse
// @Failure      404       {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/socials/{socialId} [get]
func (c *SocialController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)
	skillId := ctx.Params("socialId")

	request := &model.GetByIdSocialRequest{
		ID:     skillId,
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Failed Get Social by userId")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.SocialResponse]{Data: response})
}
