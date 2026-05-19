package controller

import (
	"time"

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

const (
	oauthStateCookie = "oauth_state"
	stateTTL         = 10 * time.Minute
)

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

	ctx.Cookie(&fiber.Cookie{
		Name:     oauthStateCookie,
		Value:    state,
		Expires:  time.Now().Add(stateTTL),
		HTTPOnly: true,
		Secure:   true,
		SameSite: fiber.CookieSameSiteStrictMode,
	})
	
	return ctx.Redirect(url)
}

func (c *OauthController) Callback(ctx *fiber.Ctx) error {
	cookieState := ctx.Cookies(oauthStateCookie)
	if cookieState == "" {
		c.Log.Error("cookie oauth state not found")
		return fiber.NewError(fiber.StatusBadRequest, "Cookie oauth state tidak ditemukan")
	}

	queryState :=ctx.Query("state")
	if cookieState != queryState {
		c.Log.Error("state tidak cocok")
		return fiber.NewError(fiber.StatusBadRequest, "State tidak cocok")
	}

	ctx.Cookie(&fiber.Cookie{
		Name:     oauthStateCookie,
		Value:    "",
		Expires:  time.Now().Add(-1 * time.Hour),
		HTTPOnly: true,
		Secure:   true,
		SameSite: fiber.CookieSameSiteStrictMode,
	})

	
	
}