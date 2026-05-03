package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/usecase"
)

type UserController struct {
	Log     *logrus.Logger
	UseCase *usecase.UserUseCase
}

func NewUserController(useCase *usecase.UserUseCase, logger *logrus.Logger) *UserController {
	return &UserController{
		Log:     logger,
		UseCase: useCase,
	}
}

// Current godoc
// @Summary      Get current user
// @Description  Ambil data user yang sedang login
// @Tags         Auth
// @Produce      json
// @Success      200  {object}  model.WebResponse[model.UserResponse]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/users/_current [get]
func (c *UserController) Current(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.GetUserRequest{
		ID: auth.ID,
	}

	response, err := c.UseCase.Current(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Warnf("Failed to get current user")
		return err
	}

	return ctx.JSON(model.WebResponse[*model.UserResponse]{Data: response})
}

// Register godoc
// @Summary      Register user
// @Description  Daftarkan akun baru
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        request  body      model.RegisterUserRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.UserResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      409      {object}  model.ApiErrorResponse
// @Router       /api/users [post]
func (c *UserController) Register(ctx *fiber.Ctx) error {
	request := new(model.RegisterUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.Create(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to register user : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.LoginUserResponse]{Data: response})
}

// Login godoc
// @Summary      Login user
// @Description  Login dan dapatkan token JWT
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        request  body      model.LoginUserRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.UserResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Router       /api/users/_login [post]
func (c *UserController) Login(ctx *fiber.Ctx) error {
	request := new(model.LoginUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.Login(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to login user : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.LoginUserResponse]{Data: response})
}

// Update godoc
// @Summary      Update current user
// @Description  Update data akun user yang sedang login
// @Tags         Auth
// @Accept       json
// @Produce      json
// @Param        request  body      model.UpdateUserRequest  true  "Request body"
// @Success      200      {object}  model.WebResponse[model.UserResponse]
// @Failure      400      {object}  model.ApiErrorResponse
// @Failure      401      {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/users/_current [patch]
func (c *UserController) Update(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := new(model.UpdateUserRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	request.ID = auth.ID
	response, err := c.UseCase.Update(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to login user : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[*model.UserResponse]{Data: response})
}

// Logout godoc
// @Summary      Logout user
// @Description  Hapus sesi / token user yang sedang login
// @Tags         Auth
// @Produce      json
// @Success      200  {object}  model.WebResponse[bool]
// @Failure      401  {object}  model.ApiErrorResponse
// @Security     BearerAuth
// @Router       /api/users [delete]
func (c *UserController) Logout(ctx *fiber.Ctx) error {
	auth := middleware.GetUser(ctx)

	request := &model.LogoutUserRequest{
		ID: auth.ID,
	}

	response, err := c.UseCase.Logout(ctx.UserContext(), request)
	if err != nil {
		c.Log.WithError(err).Warnf("Failed to logout user")
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: response})
}

func (c *UserController) RequestOTP(ctx *fiber.Ctx) error {
	request := new(model.SendOTPRequest)
	err := ctx.BodyParser(request)
	if err != nil {
		c.Log.Warnf("Failed to parse request body : %+v", err)
		return fiber.ErrBadRequest
	}

	response, err := c.UseCase.CreateVerificationCode(ctx.UserContext(), request)
	if err != nil {
		c.Log.Warnf("Failed to Create Verification Code : %+v", err)
		return err
	}

	return ctx.JSON(model.WebResponse[bool]{Data: response})
}
