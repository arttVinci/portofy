package usecase

import (
	"context"
	"fmt"

	"github.com/sirupsen/logrus"
	"golang.org/x/oauth2"
)

type OauthUseCase struct {
	GoogleOAuth *oauth2.Config
	Log         *logrus.Logger
}

func NewOauthUseCase(googleOAuth *oauth2.Config, log *logrus.Logger) *OauthUseCase {
	return &OauthUseCase{
		GoogleOAuth: googleOAuth,
		Log: log,
	}
}

func (u *OauthUseCase) Login(_ context.Context, state string) (string, error) {
	if state == "" {
		return "", fmt.Errorf("state tidak boleh kosong")
	}

	authUrl := u.GoogleOAuth.AuthCodeURL(state, oauth2.AccessTypeOffline)
	
	return authUrl, nil
}