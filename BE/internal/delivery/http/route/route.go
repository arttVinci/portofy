package route

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"tratech.my.id/server/internal/delivery/http/controller"
)

type RouteConfig struct {
	App                     *fiber.App
	AuthMiddleware          fiber.Handler
	UserController          *controller.UserController
	ProfileController       *controller.ProfileController
	AchievementController   *controller.AchievementController
	ProjectController       *controller.ProjectController
	ExperienceController    *controller.ExperienceController
	EducationController     *controller.EducationController
	SkillController         *controller.SkillController
	SocialController        *controller.SocialController
	UploadController        *controller.UploadController
	AIDescriptionController *controller.AIDescriptionController
	CVParserController      *controller.CVParserController
}

func (c *RouteConfig) Setup() {
	c.App.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowHeaders: "Origin, Content-Type, Accept, Authorization",
		AllowMethods: "GET, POST, PUT, DELETE, PATCH",
	}))

	c.SetupGuestRoute()
	c.SetupPublicRoute()
	c.SetupAuthRoute()
}

func (c *RouteConfig) SetupGuestRoute() {
	c.App.Post("/api/users", c.UserController.Register)
	c.App.Post("/api/users/_otp", c.UserController.RequestOTP)
	c.App.Post("/api/users/_login", c.UserController.Login)
}

func (c *RouteConfig) SetupPublicRoute() {
	c.App.Get("/api/public/:username", c.ProfileController.GetByUsername)

	c.App.Get("/api/public/:username/achievements", c.AchievementController.GetAllByUsername)
	c.App.Get("/api/public/:username/achievements/:achievementId", c.AchievementController.GetByUsername)

	c.App.Get("/api/public/:username/projects", c.ProjectController.GetAllByUsername)
	c.App.Get("/api/public/:username/projects/:projectId", c.ProjectController.GetByUsername)

	c.App.Get("/api/public/:username/experiences", c.ExperienceController.GetAllByUsername)
	c.App.Get("/api/public/:username/experiences/:experienceId", c.ExperienceController.GetByUsername)

	c.App.Get("/api/public/:username/educations", c.EducationController.GetAllByUsername)
	c.App.Get("/api/public/:username/educations/:educationId", c.EducationController.GetByUsername)

	c.App.Get("/api/public/:username/skills", c.SkillController.GetAllByUsername)

	c.App.Get("/api/public/:username/socials", c.SocialController.GetAllByUsername)
}

func (c *RouteConfig) SetupAuthRoute() {
	c.App.Use(c.AuthMiddleware)
	c.App.Post("/api/upload/image", c.UploadController.UploadImage)

	c.App.Delete("/api/users", c.UserController.Logout)
	c.App.Patch("/api/users/_current", c.UserController.Update)
	c.App.Get("/api/users/_current", c.UserController.Current)

	c.App.Get("/api/profiles", c.ProfileController.Get)
	c.App.Post("/api/profiles", c.ProfileController.Create)
	c.App.Put("/api/profiles", c.ProfileController.Update)

	c.App.Get("/api/achievements", c.AchievementController.GetAll)
	c.App.Get("/api/achievements/:achievementId", c.AchievementController.Get)
	c.App.Post("/api/achievements", c.AchievementController.Create)
	c.App.Put("/api/achievements/:achievementId", c.AchievementController.Update)
	c.App.Delete("/api/achievements/:achievementId", c.AchievementController.Delete)

	c.App.Get("/api/projects", c.ProjectController.GetAll)
	c.App.Get("/api/projects/:projectId", c.ProjectController.Get)
	c.App.Post("/api/projects", c.ProjectController.Create)
	c.App.Put("/api/projects/:projectId", c.ProjectController.Update)
	c.App.Delete("/api/projects/:projectId", c.ProjectController.Delete)

	c.App.Get("/api/experiences", c.ExperienceController.GetAll)
	c.App.Get("/api/experiences/:experienceId", c.ExperienceController.Get)
	c.App.Post("/api/experiences", c.ExperienceController.Create)
	c.App.Put("/api/experiences/:experienceId", c.ExperienceController.Update)
	c.App.Delete("/api/experiences/:experienceId", c.ExperienceController.Delete)

	c.App.Get("/api/educations", c.EducationController.GetAll)
	c.App.Get("/api/educations/:educationId", c.EducationController.Get)
	c.App.Post("/api/educations", c.EducationController.Create)
	c.App.Put("/api/educations/:educationId", c.EducationController.Update)
	c.App.Delete("/api/educations/:educationId", c.EducationController.Delete)

	c.App.Get("/api/skills", c.SkillController.GetAll)
	c.App.Get("/api/skills/:skillId", c.SkillController.Get)
	c.App.Post("/api/skills", c.SkillController.Create)
	c.App.Put("/api/skills/:skillId", c.SkillController.Update)
	c.App.Delete("/api/skills/:skillId", c.SkillController.Delete)

	c.App.Get("/api/socials", c.SocialController.GetAll)
	c.App.Get("/api/socials/:socialId", c.SocialController.Get)
	c.App.Post("/api/socials", c.SocialController.Create)
	c.App.Put("/api/socials/:socialId", c.SocialController.Update)
	c.App.Delete("/api/socials/:socialId", c.SocialController.Delete)

	c.App.Post("/api/agent/description/about", c.AIDescriptionController.GenerateAboutDescription)
	c.App.Post("/api/agent/description/experience", c.AIDescriptionController.GenerateExperienceDesc)
	c.App.Post("/api/agent/description/education", c.AIDescriptionController.GenerateEducationDesc)
	c.App.Post("/api/agent/description/project", c.AIDescriptionController.GenerateProjectDesc)

	c.App.Post("/api/agent/cv/parse", c.CVParserController.ParseCV)
}
