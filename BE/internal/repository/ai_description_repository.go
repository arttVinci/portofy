package repository

import (
	"context"
	"fmt"
	"strings"

	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/pkg/agent"
	"tratech.my.id/server/internal/pkg/utils"
)

type AIDescriptionRepository struct {
	aiAgent agent.GeminiAgent
	Log *logrus.Logger
}

func NewAIDescriptionRepository(aiAgent agent.GeminiAgent, log *logrus.Logger) *AIDescriptionRepository {
	return &AIDescriptionRepository{
		aiAgent: aiAgent,
		Log: log,
	}
}


func (r *AIDescriptionRepository) GenerateAboutDescription(ctx context.Context, request *model.GenerateAboutDescRequest) (string, error) {
	prompt := fmt.Sprintf(`
		You are a professional copywriter specializing in personal branding for portfolios.

		User Information:
		- Full Name: %s
		- Current Role: %s
		- Years of Experience: %d years
		- Core Skills: %s
		- Location: %s
		- Tone: %s

		%s

		Generate:
		1. "paragraphs": An array of 5-6 paragraph strings.
		- paragraphs[0]: Who they are — role, background, identity
		- paragraphs[1]: What they do — skills, approach, how they work
		- paragraphs[2] (optional): What drives them — passion, goals, values

		2. 1 paragraph must 300 - 500 characters

		%s

		Tone guide:
		- professional: formal, authoritative, achievement-focused
		- casual: friendly, approachable, first-person conversational
		- creative: expressive, metaphor-driven, memorable

		STRICT RULE: Return ONLY valid JSON. No markdown, no explanation outside JSON.
		{"paragraphs":["paragraph 1...","paragraph 2...","paragraph 3..."]}
		`,
    request.Name, request.Role, request.YearsExp,
    strings.Join(request.Skills, ", "),
    request.Location, request.Tone,
    utils.BuildUserNotesBlock(request.UserNotes),
	utils.BuildUserNotesLanguage(request.Language),
)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error generating content from gemini")
		return "", err
	}

	return jsonString, nil
}

func (r *AIDescriptionRepository) GenerateExperienceDesc(ctx context.Context, request *model.GenerateExperienceDescRequest) (string, error) {
	prompt := fmt.Sprintf(`
		You are a professional resume and portfolio copywriter.

		Experience Details:
		- Company: %s
		- Role/Title: %s
		- Period: %s – %s
		- Tone: %s

		%s

		Generate this exact structure:

		1. "summary": A short narrative of 2-4 sentences describing the role, scope, and overall contribution.
		Keep it grounded and specific — not generic filler.

		2. "bullets": An array of 4-7 objects, each with:
		- "title": A 2-5 word bold label (e.g. "High-Performance API", "Security & Auth")
		- "description": One sentence starting with a strong action verb (Built, Designed, Led, Implemented, etc.)
			Include measurable impact or technical specifics when available from context.
			Max 35 words per description.

		%s

		STRICT RULE: Return ONLY valid JSON. No markdown, no explanation.
		{
		"summary": "...",
		"bullets": [
			{"title": "...", "description": "..."},
			{"title": "...", "description": "..."}
		]
		}
		`,
		request.Company, request.Role,
		request.StartDate, request.EndDate,
		request.Tone,
		utils.BuildUserNotesBlock(request.UserNotes),
		utils.BuildUserNotesLanguage(request.Language),
	)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error generating experience description from gemini")
		return "", err
	}

	return jsonString, nil
}

func (r *AIDescriptionRepository) GenerateEducationDesc(ctx context.Context, request *model.GenerateEducationDescRequest) (string, error) {

	prompt := fmt.Sprintf(`
		You are a portfolio copywriter writing an education section for a developer's portfolio website.

		Education Details:
		- Institution: %s
		- Degree: %s
		- Period: %s – %s
		- GPA: %s
		- Tone: %s

		%s

		Generate this exact structure:

		1. "summary": 2-3 sentences summarizing the academic background and its relevance to the developer's career path.

		2. "bullets": An array of 3-5 objects, each with:
		- "title": A 2-5 word label (e.g. "Thesis Project", "Academic Achievement", "Organization")
		- "description": One concise sentence with specific detail. Max 30 words.
		Rules:
		- Only include GPA if it is 3.5 or above
		- Skip fields that are empty or "none"
		- Focus on what's most impressive and relevant

		%s

		STRICT RULE: Return ONLY valid JSON. No markdown, no explanation.
		{
		"summary": "...",
		"bullets": [
			{"title": "...", "description": "..."},
			{"title": "...", "description": "..."}
		]
		}
		`,
		request.Institution, request.Degree,
		request.StartYear, request.EndYear, request.GPA,
		request.Tone,
		utils.BuildUserNotesBlock(request.UserNotes),
		utils.BuildUserNotesLanguage(request.Language),
	)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error generating education description from gemini")
		return "", err
	}

	return jsonString, nil
}

func (r *AIDescriptionRepository) GenerateProjectDesc(ctx context.Context, request *model.GenerateProjectDescRequest) (string, error) {
	prompt := fmt.Sprintf(`
		You are a portfolio copywriter specializing in developer project showcases.

		Project Details:
		- Title: %s
		- Role: %s
		- Tech Stack: %s
		- Duration: %s
		- Tone: %s

		%s

		Generate this exact structure:

		1. "tagline": One hook sentence (max 15 words) that captures the essence of the project.

		2. "summary": 3-5 sentences describing the project scope, purpose, and your contribution.

		3. "challenge": One paragraph describing the main technical or business challenge faced.

		4. "solution": One paragraph describing how you solved the challenge — mention tools, architecture, or approach.

		5. "key_features": An array of 2-4 grouped feature objects, each with:
		- "group_title": A 2-5 word category label (e.g. "AI-Powered Content Generation")
		- "items": An array of 2-4 short feature descriptions (max 15 words each)

		6. "tags": An array of 5-10 keyword tags relevant to the project (e.g. "Go", "REST API", "CI/CD").

		%s

		STRICT RULE: Return ONLY valid JSON. No markdown, no explanation.
		{
		"tagline": "...",
		"summary": "...",
		"challenge": "...",
		"solution": "...",
		"key_features": [
			{"group_title": "...", "items": ["...", "..."]},
			{"group_title": "...", "items": ["...", "..."]}
		],
		"tags": ["...", "..."]
		}
		`,
		request.Title, request.Role,
		strings.Join(request.Stack, ", "),
		request.Duration,
		request.Tone,
		utils.BuildUserNotesBlock(request.UserNotes),
		utils.BuildUserNotesLanguage(request.Language),
	)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error generating project description from gemini")
		return "", err
	}

	return jsonString, nil
}