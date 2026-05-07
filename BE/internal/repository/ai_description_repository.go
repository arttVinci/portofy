package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
	"tratech.my.id/server/internal/pkg/agent"
	"tratech.my.id/server/internal/pkg/utils"
)

type AIDescRepository struct {
	aiAgent agent.AIAgent
	Log *logrus.Logger
}

// Constructor nerima agent buatan lu
func NewAIDescRepository(aiAgent agent.AIAgent, log *logrus.Logger) *AIDescRepository {
	return &AIDescRepository{
		aiAgent: aiAgent,
		Log: log,
	}
}


func (r *AIDescRepository) GenerateAboutDescription(ctx context.Context, request model.GenerateAboutDescRequest) (*model.GenerateAboutDescResponse, error) {
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
		1. "paragraphs": An array of 3-4 paragraph strings.
		- paragraphs[0]: Who they are — role, background, identity
		- paragraphs[1]: What they do — skills, approach, how they work
		- paragraphs[2] (optional): What drives them — passion, goals, values

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
    utils.UserContextPromptDesc(request.UserContext),
)

	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		r.Log.WithError(err).Error("error generating content from gemini")
		return nil, err
	}

	var result model.GenerateAboutDescResponse
	err = json.Unmarshal([]byte(jsonString), &result)
	if err != nil {
		r.Log.WithError(err).Error("error unmarshalling json from gemini")
		return nil, err
	}

	return &result, nil
}