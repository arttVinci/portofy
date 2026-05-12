package controller

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model"
	agent "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/usecase"
)

type CVParserController struct {
	CVParserUseCase *usecase.CVParserUseCase
	Log             *logrus.Logger
}

func NewCVParserController(cvParserUseCase *usecase.CVParserUseCase, log *logrus.Logger) *CVParserController {
	return &CVParserController{
		CVParserUseCase: cvParserUseCase,
		Log:             log,
	}
}

func (c *CVParserController) ParseCV(ctx *fiber.Ctx) error {
	file, err := ctx.FormFile("cv")
	if err != nil {
		c.Log.WithError(err).Error("error getting cv file from form")
		return fiber.NewError(fiber.StatusBadRequest, "CV file is required")
	}

	contentType := file.Header.Get("Content-Type")
	allowedTypes := map[string]bool{
		"application/pdf": true,
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document": true,
	}
	if !allowedTypes[contentType] {
		return fiber.NewError(fiber.StatusBadRequest, "Only PDF and DOCX files are allowed")
	}

	if file.Size > 5*1024*1024 {
		return fiber.NewError(fiber.StatusBadRequest, "File size must not exceed 5MB")
	}

	tempFilePath := fmt.Sprintf("./%s", file.Filename)
	if err := ctx.SaveFile(file, tempFilePath); err != nil {
		return fiber.NewError(fiber.StatusInternalServerError, "Failed to save temporary file")
	}

	defer os.Remove(tempFilePath)

	response, err := c.CVParserUseCase.ParseCV(ctx.UserContext(), tempFilePath)
	if err != nil {
		c.Log.WithError(err).Error("error parsing CV")
		return err
	}

	return ctx.JSON(model.WebResponse[*agent.ParsedCVResponse]{Data: response})
}
