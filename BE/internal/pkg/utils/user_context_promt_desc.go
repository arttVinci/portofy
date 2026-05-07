package utils

import (
	"fmt"
	"strings"
)

func UserContextPromptDesc(notes string) string {
	if strings.TrimSpace(notes) == "" {
		return ""
	}
	return fmt.Sprintf(`
Additional Context from User (HIGH PRIORITY):
"""
%s
"""
Extract and incorporate all key points from this context into the generated content.
Preserve the user's intent — do not ignore or summarize away specific details they mentioned.
`, notes)
}