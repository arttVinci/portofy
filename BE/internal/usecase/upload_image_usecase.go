package usecase

import (
	"context"
	"mime/multipart"

	"tratech.my.id/server/internal/repository"

	"github.com/sirupsen/logrus"
)

type UploadUsecase struct {	
	UploadRepo *repository.UploadRepository
	Log        *logrus.Logger
}

func NewUploadUsecase(repo *repository.UploadRepository, log *logrus.Logger) *UploadUsecase {
	return &UploadUsecase{UploadRepo: repo, Log: log}
}

func (u *UploadUsecase) UploadImage(ctx context.Context, file multipart.File, folder string) (string, error) {
	url, err := u.UploadRepo.UploadImage(ctx, file, folder)
	if err != nil {
		u.Log.WithError(err).Error("error in upload usecase")
		return "", err
	}
	return url, nil
}