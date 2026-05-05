package controller

import (
	"strings"

	"github.com/gofiber/fiber/v2"
	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/pkg/storage"
)

type UploadController struct {
	Storage storage.FileStorage
	Log     *logrus.Logger
}

func NewUploadController(storage storage.FileStorage, logger *logrus.Logger) *UploadController {
	return &UploadController{
		Storage: storage,
		Log:     logger,
	}
}

// UploadImage godoc
// @Summary      Upload general image
// @Tags         Media
// @Accept       multipart/form-data
// @Produce      json
// @Param        image  formData  file  true  "File gambar"
// @Success      200    {object}  model.WebResponse[map[string]string]
// @Router       /api/upload/image [post]
func (c *UploadController) UploadImage(ctx *fiber.Ctx) error {
	// 1. Parsing seluruh Multipart Form
	form, err := ctx.MultipartForm()
	if err != nil {
		c.Log.WithError(err).Error("Failed parsing multipart form")
		return fiber.NewError(fiber.StatusBadRequest, "Gagal membaca form data")
	}

	// 2. Ambil semua file dengan key "images" (Sesuai dengan FE)
	files := form.File["images"]
	if len(files) == 0 {
		return fiber.NewError(fiber.StatusBadRequest, "File gambar tidak ditemukan")
	}

	var imageUrls []string

	// 3. Looping dan proses setiap file
	for _, file := range files {
		// Validasi Ukuran (Max 2MB per file)
		if file.Size > 7*1024*1024 {
			c.Log.Warn("Upload failed: file size exceeds 7MB limit")
			return fiber.NewError(fiber.StatusBadRequest, "Ukuran file melebihi 7MB")
		}

		// Validasi Tipe File
		contentType := file.Header.Get("Content-Type")
		if !strings.HasPrefix(contentType, "image/") {
			c.Log.Warn("Upload failed: file is not an image")
			return fiber.NewError(fiber.StatusBadRequest, "Semua file harus berupa gambar")
		}

		// Lempar ke Pkg Storage untuk disimpan
		url, err := c.Storage.SaveLocalImage(file)
		if err != nil {
			c.Log.WithError(err).Error("Failed save image to server")
			return fiber.NewError(fiber.StatusInternalServerError, "Gagal menyimpan gambar ke server")
		}

		// Masukkan URL yang berhasil ke dalam array
		imageUrls = append(imageUrls, url)
	}

	// 4. Balikkan array string sesuai interface FE kamu (image_url: string[])
	return ctx.JSON(model.WebResponse[map[string][]string]{
		Data:    map[string][]string{"image_url": imageUrls},
		Success: true,
		Message: "Gambar berhasil diunggah",
	})
}
