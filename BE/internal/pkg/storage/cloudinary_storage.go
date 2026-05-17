package storage

import (
	"context"
	"mime/multipart"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/cloudinary/cloudinary-go/v2"
	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
)

type CloudinaryStorage struct {
	Client *cloudinary.Cloudinary
}

func NewCloudinaryStorage(client *cloudinary.Cloudinary) *CloudinaryStorage {
    return &CloudinaryStorage{Client: client}
}

func (s *CloudinaryStorage) Upload(ctx context.Context, file multipart.File, folder string) (string, error) {
    response, err := s.Client.Upload.Upload(ctx, file, uploader.UploadParams{
        Folder: folder,
    })
    if err != nil {
        return "", err
    }
    return response.SecureURL, nil
}

func (s *CloudinaryStorage) Delete(ctx context.Context, publicID string) error {
    _, err := s.Client.Upload.Destroy(ctx, uploader.DestroyParams{
        PublicID: publicID,
    })
    return err
}

func (s *CloudinaryStorage) ExtractPublicID(url string) string {
    // url: https://res.cloudinary.com/cloud/image/upload/v123/portofy/avatars/abc123.jpg
    // result: portofy/avatars/abc123
    parts := strings.Split(url, "/upload/")
    if len(parts) < 2 {
        return ""
    }
    // buang version cntoh (v123/) 
    withoutVersion := regexp.MustCompile(`v\d+/`).ReplaceAllString(parts[1], "")

    // buang ekstensi
    ext := filepath.Ext(withoutVersion)
	
    return strings.TrimSuffix(withoutVersion, ext)
}