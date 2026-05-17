// @title           Tratech API
// @version         1.0
// @description     API untuk platform portofolio Tratech
// @host            localhost:8080
// @BasePath        /

// @securityDefinitions.apikey  BearerAuth
// @in                          header
// @name                        Authorization
// @description                 Format: Bearer <token>
package main

import (
	"fmt"
	"os"

	"tratech.my.id/server/internal/config"
)

func main() {
	viperConfig := config.NewViper()
	log := config.NewLogger(viperConfig)
	db := config.NewDatabase(viperConfig, log)
	validate := config.NewValidator(viperConfig)
	app := config.NewFiber(viperConfig)
	googleAiStudio := config.NewGoogleAiStudio(viperConfig)
	cloudinary, _ := config.NewCloudinary(viperConfig)

	config.Bootstrap(&config.BootstrapConfig{
		DB:               db,
		App:              app,
		Log:              log,
		Validate:         validate,
		Config:           viperConfig,
		GoogleAiStudio:   googleAiStudio,
		Cloudinary:       cloudinary,
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = fmt.Sprintf("%d", viperConfig.GetInt("web.port"))
	}

	log.Infof("Server is starting on port :%s", port)

	webPort := viperConfig.GetInt("web.port")
	err := app.Listen(fmt.Sprintf(":%d", webPort))
	if err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
