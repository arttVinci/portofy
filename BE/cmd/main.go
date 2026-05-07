// @title           Tratech API
// @version         1.0
// @description     API untuk platform portofolio Tratech
// @host            localhost:3000
// @BasePath        /

// @securityDefinitions.apikey  BearerAuth
// @in                          header
// @name                        Authorization
// @description                 Format: Bearer <token>
package main

import (
	"fmt"

	"tratech.my.id/server/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	log := config.NewLogger(viperConfig)
	db := config.NewDatabase(viperConfig, log)
	validate := config.NewValidator(viperConfig)
	app := config.NewFiber(viperConfig)
	googleAiStudio := config.NewGoogleAiStudio(viperConfig)

	config.Bootstrap(&config.BootstrapConfig{
		DB:               db,
		App:              app,
		Log:              log,
		Validate:         validate,
		Config:           viperConfig,
		GoogleAiStudio:   googleAiStudio,
	})

	webPort := viperConfig.GetInt("web.port")
	err := app.Listen(fmt.Sprintf(":%d", webPort))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
