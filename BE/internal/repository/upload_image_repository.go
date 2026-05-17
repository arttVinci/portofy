package repository

import (
	"context"
	"mime/multipart"

	"github.com/sirupsen/logrus"

	"tratech.my.id/server/internal/pkg/storage"
)

type UploadRepository struct {
	Storage *storage.CloudinaryStorage
	Log     *logrus.Logger
}

func NewUploadRepository(s *storage.CloudinaryStorage, log *logrus.Logger) *UploadRepository {
    return &UploadRepository{Storage: s, Log: log}
}

func (r *UploadRepository) UploadImage(ctx context.Context, file multipart.File, folder string) (string, error) {
    url, err := r.Storage.Upload(ctx, file, folder)
    if err != nil {
        r.Log.WithError(err).Error("error uploading image to cloudinary")
        return "", err
    }
    return url, nil
}