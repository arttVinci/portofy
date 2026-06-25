package config

import (
	"github.com/spf13/viper"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/google"
)

func InitGoogleOAuth(config *viper.Viper) *oauth2.Config {
		return &oauth2.Config{
		ClientID:     config.GetString("google_oauth.client_id"),
		ClientSecret: config.GetString("google_oauth.client_secret"),
		RedirectURL:  config.GetString("google_oauth.redirect_url_local"),
		Scopes: []string{
			"https://www.googleapis.com/auth/userinfo.email",
			"https://www.googleapis.com/auth/userinfo.profile",
		},
		Endpoint: google.Endpoint,
	}
}