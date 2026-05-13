package repository

import (
	"context"
	"fmt"

	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/pkg/agent"
)

type CVParserRepository struct {
	aiAgent agent.GeminiAgent
	Log     *logrus.Logger
}

func NewCVParserRepository(aiAgent agent.GeminiAgent, log *logrus.Logger) *CVParserRepository {
	return &CVParserRepository{
		aiAgent: aiAgent,
		Log:     log,
	}
}

func (r *CVParserRepository) ParseCV(ctx context.Context, cvText string) (string, error) {
	prompt := fmt.Sprintf(`
		You are a professional CV/Resume parser. Extract structured data from the following CV text.

		CV Text:
		"""
		%s
		"""

		Extract ALL available information into this exact JSON structure.
		Rules:
        - For text fields, if information is not found, use empty string "".
        - For arrays/lists, if information is not found, use empty array [].
        - For skill level, choose one of: "Beginner", "Intermediate", "Advanced", "Expert" — infer from context.
        - For employment_type, choose one of: "Full-time", "Part-time", "Freelance", "Contract", "Internship", "Self-employed".
        - For location_type, choose one of: "Remote", "On-site", "Hybrid".
        - For tags, extract keywords that represent the person's expertise areas (max 10).
        - Parse ALL experiences, educations, projects, and skills found.
        - Leave id, image_url, link_url, created_at, updated_at as empty/zero — they are system fields.
        - For start_date and end_date, use ISO 8601 format (e.g. "2022-01-01T00:00:00Z"). If only the year is known, use January 1st of that year.
        - CRITICAL DATE RULE: If a date is completely missing or the person is currently working/studying there (Present), you MUST use null (without quotes). DO NOT use an empty string "" for dates.

		STRICT RULE: Return ONLY valid JSON. No markdown, no explanation.
		{
			"profile": {
				"id": "",
				"full_name": "...",
				"image_url": "",
				"address": "...",
				"about": "...",
				"bio": "...",
				"theme": "",
				"tags": ["...", "..."]
			},
			"experiences": [
				{
					"id": "",
					"position": "...",
					"company_name": "...",
					"link_url": "",
					"image_url": "",
					"location": "...",
					"employment_type": "Full-time",
					"location_type": "On-site",
					"start_date": "2022-01-01T00:00:00Z",
					"end_date": "2023-12-01T00:00:00Z",
					"description": "..."
				}
			],
			"educations": [
				{
					"id": "",
					"institution": "...",
					"degree": "...",
					"field_of_study": "...",
					"grade": "...",
					"image_url": "",
					"location": "...",
					"start_date": "2017-01-01T00:00:00Z",
					"end_date": "2021-01-01T00:00:00Z",
					"description": "..."
				}
			],
			"projects": [
				{
					"id": "",
					"title": "...",
					"description": "...",
					"image_url": "",
					"link_url": "",
					"featured": false,
					"challenges": "",
					"solution": "",
					"tools": ["...", "..."],
					"gallery": [{
						"image_url": "",
						"caption": ""
					}],
					"features": [{
						"title": "",
						"items": ["..."]
					}]
				}
			],
			"skills": [
				{
					"id": "",
					"title": "...",
					"level": "Intermediate"
				}
			]
		}
	`, cvText)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error parsing CV from gemini")
		return "", err
	}

	return jsonString, nil
}
