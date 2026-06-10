package repository

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/sirupsen/logrus"
	"tratech.my.id/server/internal/model"
	"tratech.my.id/server/internal/pkg/agent"
	"tratech.my.id/server/internal/pkg/utils"
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

func (r *CVParserRepository) runCleaner(ctx context.Context, rawText string) (string, error) {
	// GenerateText — no JSON MIME type, so Gemini won't try to force JSON
	// structure on what is intentionally a plain-text normalisation task.
	cleaned, err := r.aiAgent.GenerateText(ctx, utils.CleanerPrompt(rawText))
	if err != nil {
		return "", err
	}
	return cleaned, nil
}

func (r *CVParserRepository) ProfileAgent(ctx context.Context, cleanedText string) (*model.ProfileResponse, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ProfilePrompt(cleanedText))
	if err != nil {
		return nil, err
	}
	profile := new(model.ProfileResponse)
	if err := json.Unmarshal([]byte(raw), profile); err != nil {
		return nil, fmt.Errorf("unmarshal profile: %w (raw: %.200s)", err, raw)
	}
	return profile, nil
}

func (r *CVParserRepository) ExperienceAgent(ctx context.Context, cleanedText string) ([]model.ExperienceResponse, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ExperiencePrompt(cleanedText))
	if err != nil {
		return nil, err
	}
	expriences := new([]model.ExperienceResponse)
	if err := json.Unmarshal([]byte(raw), expriences); err != nil {
		return nil, fmt.Errorf("unmarshal experiences: %w (raw: %.200s)", err, raw)
	}
	return *expriences, nil
}

func (r *CVParserRepository) EducationAgent(ctx context.Context, cleanedText string) ([]model.EducationResponse, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.EducationPrompt(cleanedText))
	if err != nil {
		return nil, err
	}
	educations := new([]model.EducationResponse)
	if err := json.Unmarshal([]byte(raw), educations); err != nil {
		return nil, fmt.Errorf("unmarshal educations: %w (raw: %.200s)", err, raw)
	}
	return *educations, nil
}

func (r *CVParserRepository) SkillsAgent(ctx context.Context, cleanedText string) ([]model.SkillResponse, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.SkillsPrompt(cleanedText))
	if err != nil {
		return nil, err
	}
	skills := new([]model.SkillResponse)
	if err := json.Unmarshal([]byte(raw), skills); err != nil {
		return nil, fmt.Errorf("unmarshal skills: %w (raw: %.200s)", err, raw)
	}
	return *skills, nil
}

func (r *CVParserRepository) ProjectsAgent(ctx context.Context, cleanedText string) ([]model.ProjectResponse, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ProjectsPrompt(cleanedText))
	if err != nil {
		return nil, err
	}
	projects := new([]model.ProjectResponse)
	if err := json.Unmarshal([]byte(raw), projects); err != nil {
		return nil, fmt.Errorf("unmarshal projects: %w (raw: %.200s)", err, raw)
	}
	return *projects, nil
}
