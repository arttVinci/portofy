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
		You are an expert CV/Resume parser. Your sole task is to extract structured information from the CV text below and return it as a single valid JSON object.

		CV Text:
		"""
		%s
		"""

		=== EXTRACTION RULES ===

		GENERAL:
		- Return ONLY a raw JSON object. No markdown, no code blocks, no explanation, no preamble.
		- Do NOT wrap output in triple backticks or any formatting.
		- All system fields (id, image_url, link_url, created_at, updated_at) must be left as empty string "".

		TEXT FIELDS:
		- If information is not found, use empty string "".
		- "about" = full objective/summary paragraph from CV.
		- "bio" = short 1-sentence version of the objective (you may summarize).
		- "theme" = always empty string "".

		ARRAY FIELDS:
		- If information is not found, use empty array [].
		- "tags" = up to 10 keywords representing the person's core expertise (e.g. "Golang", "Clean Architecture", "Docker"). Extract from skills, experiences, and projects.

		DATES (CRITICAL):
		- Use ISO 8601 format: "2022-01-01T00:00:00Z".
		- If only month and year are known: use the 1st day of that month.
		- If only the year is known: use January 1st of that year.
		- If the person is CURRENTLY working/studying there (e.g. "Present", "Now", "Until now", "Sekarang"): use null (no quotes, not "null", not "").
		- If the date is completely missing or unknown: use null (no quotes).
		- NEVER use empty string "" for date fields.

		EXPERIENCES:
		- Parse ALL work experiences found.
		- "employment_type": one of → "Full-time" | "Part-time" | "Freelance" | "Contract" | "Internship" | "Self-employed". Infer from context (e.g. "Intern" → "Internship").
		- "location_type": one of → "Remote" | "On-site" | "Hybrid". Default to "On-site" if not mentioned.
		- "description": combine all bullet points into a single paragraph or keep as newline-separated string.

		EDUCATIONS:
		- Parse ALL education entries found.
		- "degree": infer if not explicit (e.g. "S1", "Bachelor", "Diploma", etc.).
		- "grade": use empty string "" if not mentioned.

		SKILLS:
		- Parse ALL skills found (languages, frameworks, tools, soft skills).
		- "level": one of → "Beginner" | "Intermediate" | "Advanced" | "Expert". Infer from context, years of use, or project complexity. Default to "Intermediate" if unclear.

		PROJECTS:
		- Parse ALL projects found.
		- "tools": extract tech stack mentioned in the project description.
		- "featured": set to false unless explicitly stated.
		- "challenges", "solution": use empty string "" if not mentioned.
		- "gallery": use empty array [].
		- "features": use empty array [] if not explicitly listed.

		=== OUTPUT FORMAT ===

		{
		"profile": {
			"id": "",
			"full_name": "",
			"image_url": "",
			"address": "",
			"about": "",
			"bio": "",
			"theme": "",
			"tags": []
		},
		"experiences": [
			{
			"id": "",
			"position": "",
			"company_name": "",
			"link_url": "",
			"image_url": "",
			"location": "",
			"employment_type": "",
			"location_type": "",
			"start_date": null,
			"end_date": null,
			"description": ""
			}
		],
		"educations": [
			{
			"id": "",
			"institution": "",
			"degree": "",
			"field_of_study": "",
			"grade": "",
			"image_url": "",
			"location": "",
			"start_date": null,
			"end_date": null,
			"description": ""
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
			"title": "",
			"level": ""
			}
		]
		}`, cvText)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error parsing CV from gemini")
		return "", err
	}

	return jsonString, nil
}
