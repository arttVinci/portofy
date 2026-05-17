package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type ProfileController struct {
	UseCase *usecase.ProfileUseCase
	Log     *logrus.Logger
}

func NewProfileController(useCase *usecase.ProfileUseCase, log *logrus.Logger) *ProfileController {
	return &ProfileController{
		UseCase: useCase,
		Log:     log,
	}
}

// Create godoc
// @Summary      Create profile
// @Description  Buat profil untuk user yang sedang login
// @Tags         Profile
// @Accept       json
// @Produce      json
// @Param        request  body      model.CreateProfileRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.ProfileResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/profiles [post]
func (c *ProfileController) Create(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.CreateProfileRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing body request")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("Error creating profile")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProfileResponse]{Data: response})
}

// Update godoc
// @Summary      Update profile
// @Description  Update profil milik user yang sedang login
// @Tags         Profile
// @Accept       json
// @Produce      json
// @Param        request  body      model.UpdateProfileRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.ProfileResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/profiles [put]
func (c *ProfileController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateProfileRequest)
	if err := ctx.BodyParser(request); err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	request.UserId = auth.ID

	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error update Profile")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProfileResponse]{Data: response})
}

func (c *ProfileController) UploadAvatar(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	file, err := ctx.FormFile("avatar")
	if err != nil {
		c.Log.WithError(err).Error("error parsing request body")
		return fiber.NewError(fiber.StatusBadRequest, "Format data request tidak valid")
	}

	src, err := file.Open()
	if err != nil {
		c.Log.WithError(err).Error("Failed open file")
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to open file")
	}

	defer src.Close()

	if file.Size > 7*1024*1024 {
		c.Log.Warn("Upload failed: file size exceeds 7MB limit")
		return fiber.NewError(fiber.StatusBadRequest, "Ukuran file melebihi 7MB")
	}

	response, err := c.UseCase.UploadAvatar(ctx.UserContext(), auth.ID, file)
	if err != nil {
		c.Log.WithError(err).Error("error upload avatar")
		return err
	}

	return ctx.JSON(model.WebResponse[string]{Data: response})
}

// Get godoc
// @Summary      Get profile (user)
// @Description  Ambil profil milik user yang sedang login
// @Tags         Profile
// @Produce      json
// @Success      200  {object}  model.WebResponse[model.ProfileResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Failure      404  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/profiles [get]
func (c *ProfileController) Get(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetProfileRequest{
		UserId: auth.ID,
	}

	response, err := c.UseCase.Get(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get Profile")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProfileResponse]{Data: response})
}

// GetByUsername godoc
// @Summary      Get profile by username (public)
// @Description  Ambil profil publik berdasarkan username
// @Tags         Public
// @Produce      json
// @Param        username  path      string  true  "Username"
// @Success      200       {object}  model.WebResponse[model.ProfileResponse]
// @Failure      404       {object}  model.ApiErrorResponse
// @Router       /api/public/{username} [get]
func (c *ProfileController) GetByUsername(ctx *fiber.Ctx) error {
	username := ctx.Params("username")

	request := &model.GetPublicProfileRequest{
		Username: username,
	}

	response, err := c.UseCase.GetByUsername(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Error("error get Profile")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.ProfileResponse]{Data: response})
}
