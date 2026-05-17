package repository

import (
	"context"
	"mime/multipart"

	"github.com/sirupsen/logrus"

	"tratech.my.id/server/internal/pkg/storage"
)

type UploadImageRepository struct {
	Storage *storage.CloudinaryStorage
	Log     *logrus.Logger
}

func NewUploadImageRepository(s *storage.CloudinaryStorage, log *logrus.Logger) *UploadImageRepository {
    return &UploadImageRepository{Storage: s, Log: log}
}

func (r *UploadImageRepository) UploadImage(ctx context.Context, oldUrl string, file *multipart.FileHeader, folder string) (string, error) {
    if oldUrl != "" {
        publicID := r.Storage.ExtractPublicID(oldUrl)
        if err := r.Storage.Delete(ctx, publicID); err != nil {
            r.Log.WithError(err).Warn("failed to delete old image, continuing upload")
        }
    }
    url, err := r.Storage.Upload(ctx, file, folder)
    if err != nil {
        r.Log.WithError(err).Error("error uploading image to cloudinary")
        return "", err
    }
    return url, nil
}
