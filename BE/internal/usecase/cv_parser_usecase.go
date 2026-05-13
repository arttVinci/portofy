package usecase

import (
	"context"
	"encoding/json"

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

func (u *CVParserUseCase) ParseCV(ctx context.Context, filePath string) (*model.ParsedCVResponse, error) {
	res, err := docconv.ConvertPath(filePath)
	if err != nil {
		u.Log.WithError(err).Error("error converting file to text")
		return nil, fiber.NewError(fiber.StatusInternalServerError, "Failed to parse CV file")
	}

	u.Log.Infof("Hasil ekstrak CV: \n%s", res.Body)
	// u.Log.WithField("extracted_text", res.Body).Info("Berhasil ekstrak file CV")

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
