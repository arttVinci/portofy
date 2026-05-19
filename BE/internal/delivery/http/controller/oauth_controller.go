package controller

import (
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/pkg/utils"
	"tratech.my.id/server/internal/usecase"
)

type OauthController struct {
	OauthUseCase *usecase.OauthUseCase
	Log 		 *logrus.Logger
}

func NewOauthController(oauthUseCase *usecase.OauthUseCase, log *logrus.Logger) *OauthController {
	return &OauthController{
		OauthUseCase: oauthUseCase,
		Log: log,
	}
}

func (c *OauthController) Login(ctx *fiber.Ctx) error {
	state, err := utils.GenerateState()
	if err != nil {
		c.Log.WithError(err).Error("error generating state")
		return fiber.NewError(fiber.StatusBadRequest, "Gagal generate state")
	}

	url, err := c.OauthUseCase.Login(ctx.UserContext(), state)
	if err != nil {
		c.Log.WithError(err).Error("Error get url login oauth")
		return fiber.NewError(fiber.StatusBadRequest, "Gagal mendapatkan url login oauth")
	}
	
	return ctx.Redirect(url)
}