package storage

import (
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"path/filepath"
	"strings"
	"time"
)

type FileStorage interface {
	SaveLocalImage(fileHeader *multipart.FileHeader) (string, error)
}

type LocalStorage struct {
	BaseURL string
}

func NewLocalStorage(baseURL string) FileStorage {
	return &LocalStorage{
		BaseURL: baseURL,
	}
}

func (s *LocalStorage) SaveLocalImage(fileHeader *multipart.FileHeader) (string, error) {

	// 1. Ambil ekstensi file (".png", ".jpg")
	ext := filepath.Ext(fileHeader.Filename)

	// 2. Ambil nama file tanpa ekstensi
	baseName := strings.TrimSuffix(fileHeader.Filename, ext)

	// 3. Bersihkan nama (hilangkan spasi, jadikan lowercase)
	cleanBaseName := strings.ToLower(strings.ReplaceAll(baseName, " ", ""))

	// 4. Autocut jika kepanjangan > dari 50 karakter
	maxLength := 1

	// Konversi ke []rune agar aman jika ada karakter non-ASCII (seperti huruf beraksen/kanji)	`
	runeBaseName := []rune(cleanBaseName)
	if len(runeBaseName) > maxLength {
		cleanBaseName = string(runeBaseName[:maxLength])
	}

	// 5. Ekstensi juga di-lowercase biar seragam (opsional)
	cleanExt := strings.ToLower(ext)

	// 6. Gabungkan kembali dengan format baru
	uniqueName := fmt.Sprintf("IMG-%d-%s%s", time.Now().Unix(), cleanBaseName, cleanExt)

	saveDir := "./public/uploads"
	savePath := filepath.Join(saveDir, uniqueName)

	// Buat folder public/uploads jika belum ada
	if err := os.MkdirAll(saveDir, os.ModePerm); err != nil {
		return "", err
	}

	// Buka file dari request HTTP
	src, err := fileHeader.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// Buat file tujuan di server
	dst, err := os.Create(savePath)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	// Salin isi gambar ke file tujuan
	if _, err := io.Copy(dst, src); err != nil {
		return "", err
	}

	// Buat URL yang bisa diakses oleh Frontend
	imageUrl := fmt.Sprintf("%s/public/uploads/%s", s.BaseURL, uniqueName)
	return imageUrl, nil
}
