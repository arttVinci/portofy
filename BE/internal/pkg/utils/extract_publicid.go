package utils

import (
	"path/filepath"
	"regexp"
	"strings"
)

// Extract publicid for cloudinary
func ExtractPublicID(url string) string {
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