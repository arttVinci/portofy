package config

import (
	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
	"github.com/google/generative-ai-go/genai"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/delivery/http/controller"
	"tratech.my.id/server/internal/delivery/http/middleware"
	"tratech.my.id/server/internal/delivery/http/route"
	"tratech.my.id/server/internal/pkg/agent"
	"tratech.my.id/server/internal/pkg/mail"
	"tratech.my.id/server/internal/pkg/storage"
	"tratech.my.id/server/internal/repository"
	"tratech.my.id/server/internal/usecase"
)

type BootstrapConfig struct {
	App              *fiber.App
	DB               *gorm.DB
	Config           *viper.Viper
	Log              *logrus.Logger
	Validate         *validator.Validate
	GoogleAiStudio   *genai.Client
	Cloudinary       *cloudinary.Cloudinary
}

func Bootstrap(config *BootstrapConfig) {
	resend := mail.NewResend(config.Log, config.Config)
	gemini := agent.NewGeminiAgent(config.GoogleAiStudio, config.Log)
	cloudinary := storage.NewCloudinaryStorage(config.Cloudinary)

	//Setup Repository
	userRepository := repository.NewUserRepository(config.Log)
	profileRepository := repository.NewProfileRepository()
	achievementRepository := repository.NewAchievementRepository()
	projectRepository := repository.NewProjectRepository()
	experienceRepository := repository.NewExperienceRepository()
	educationRepository := repository.NewEducationRepository()
	skillRepository := repository.NewSkillRepository()
	socialRepository := repository.NewSocialRepository()
	emailVerificationRepository := repository.NewEmailVerificationRepository()
	aiDescriptionRepository := repository.NewAIDescriptionRepository(gemini, config.Log)
	cvParserRepository := repository.NewCVParserRepository(gemini, config.Log)
	uploadRepository := repository.NewUploadRepository(cloudinary, config.Log)

	//Setup UseCase
	userUseCase := usecase.NewUserUseCase(config.DB, config.Log, config.Validate, userRepository, emailVerificationRepository, config.Config, resend)
	profileUseCase := usecase.NewProfileUseCase(config.DB, config.Log, config.Validate, profileRepository, achievementRepository, projectRepository, educationRepository, experienceRepository)
	achievementUseCase := usecase.NewAchievementUseCase(config.DB, config.Log, config.Validate, achievementRepository)
	projectUseCase := usecase.NewProjectUsecase(config.DB, config.Log, config.Validate, projectRepository)
	experienceUseCase := usecase.NewExperienceUseCase(config.DB, config.Log, config.Validate, experienceRepository)
	educationUseCase := usecase.NewEducationUseCase(config.DB, config.Log, config.Validate, educationRepository)
	skillUseCase := usecase.NewSkillUsecase(config.DB, config.Log, config.Validate, skillRepository)
	socialUseCase := usecase.NewSocialUsecase(config.DB, config.Log, config.Validate, socialRepository)
	aiDescriptionUseCase := usecase.NewAIDescriptionUseCase(aiDescriptionRepository, config.Validate ,config.Log)
	cvParserUseCase := usecase.NewCVParserUseCase(cvParserRepository, config.Log)

	//Setup Controller
	userController := controller.NewUserController(userUseCase, config.Log)
	profileController := controller.NewProfileController(profileUseCase, config.Log)
	achievementController := controller.NewAchievementController(achievementUseCase, config.Log)
	projectController := controller.NewProjectController(projectUseCase, config.Log)
	experienceController := controller.NewExperienceController(experienceUseCase, config.Log)
	educationController := controller.NewEducationController(educationUseCase, config.Log)
	skillController := controller.NewSkillController(skillUseCase, config.Log)
	socialController := controller.NewSocialController(socialUseCase, config.Log)
	aiDescriptionController := controller.NewAIDescriptionController(aiDescriptionUseCase, config.Log)
	cvParserController := controller.NewCVParserController(cvParserUseCase, config.Log)

	//Setup Middleware
	authMiddleware := middleware.AuthMiddleware(config.Config)

	routeConfig := route.RouteConfig{
		App:                   config.App,
		AuthMiddleware:        authMiddleware,
		UserController:        userController,
		ProfileController:     profileController,
		AchievementController: achievementController,
		ProjectController:     projectController,
		ExperienceController:  experienceController,
		EducationController:   educationController,
		SkillController:       skillController,
		SocialController:      socialController,
		AIDescriptionController: aiDescriptionController,
		CVParserController:      cvParserController,

	}
	routeConfig.Setup()
}
