package usecase

import (
	"context"
	"encoding/json"
	"mime/multipart"

	"code.sajari.com/docconv/v2"
	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/repository"
)

type CVParserUseCase struct {
	CVParserRepo *repository.CVParserRepository
	Log          *logrus.Logger
}

func NewCVParserUseCase(cvParserRepo *repository.CVParserRepository, log *logrus.Logger) *CVParserUseCase {
	return &CVParserUseCase{
		CVParserRepo: cvParserRepo,
		Log:          log,
	}
}

func (u *CVParserUseCase) ParseCV(ctx context.Context, file *multipart.FileHeader) (*model.ParsedCVResponse, error) {
	src, err := file.Open()
	if err != nil {
		u.Log.WithError(err).Error("error opening uploaded file")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to read uploaded file")
	}
	defer src.Close()

	contentType := file.Header.Get("Content-Type")
	res, err := docconv.Convert(src, contentType, false)
	if err != nil {
		u.Log.WithError(err).Error("error converting file to text")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to parse CV file")
	}

	if res.Body == "" {
		return nil, fiber.NewError(fiber.StatusBadRequest, "Could not extract text from the uploaded file")
	}

	response, err := u.CVParserRepo.ParseCV(ctx, res.Body)
	if err != nil {
		u.Log.WithError(err).Error("error parsing CV via AI")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to parse CV with AI")
	}

	result := new(model.ParsedCVResponse)
	err = json.Unmarshal([]byte(response), result)
	if err != nil {
		u.Log.WithError(err).Error("error unmarshalling parsed CV JSON")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to parse CV response")
	}

	return result, nil
}
