package utils

import (
	"fmt"
	"strings"
)

func BuildUserNotesBlock(notes string) string {
	if strings.TrimSpace(notes) == "" {
		return ""
	}
	return fmt.Sprintf(`
Additional Notes from User (HIGH PRIORITY):
"""
%s
"""
Extract and incorporate all key points from these notes into the generated content.
Preserve the user's intent — do not ignore or summarize away specific details they mentioned.
`, notes)
}
