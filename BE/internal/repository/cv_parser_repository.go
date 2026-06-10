package repository

import (
	"context"
	"encoding/json"

	"github.com/sirupsen/logrus"
	model "tratech.my.id/server/internal/model/agent"
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

func (r *CVParserRepository) CleanerText(ctx context.Context, rawText string) (string, error) {
	// GenerateText — no JSON MIME type, so Gemini won't try to force JSON
	// structure on what is intentionally a plain-text normalisation task.
	cleaned, err := r.aiAgent.GenerateText(ctx, utils.CleanerPrompt(rawText))
	if err != nil {
		return "", err
	}
	return cleaned, nil
}

func (r *CVParserRepository) ProfileAgent(ctx context.Context, cleanedText string) (*model.ProfileDTO, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ProfilePrompt(cleanedText))
	if err != nil {
		r.Log.WithError(err).Error("error generating profile")
		return nil, err
	}
	profile := new(model.ProfileDTO)
	if err := json.Unmarshal([]byte(raw), profile); err != nil {
		r.Log.WithError(err).Error("error unmarshalling profile")
		return nil, err
	}
	return profile, nil
}

func (r *CVParserRepository) ExperienceAgent(ctx context.Context, cleanedText string) ([]model.ExperienceDTO, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ExperiencePrompt(cleanedText))
	if err != nil {
		r.Log.WithError(err).Error("error generating experience")
		return nil, err
	}
	expriences := new([]model.ExperienceDTO)
	if err := json.Unmarshal([]byte(raw), expriences); err != nil {
		r.Log.WithError(err).Error("error unmarshalling experience")
		return nil, err
	}
	return *expriences, nil
}

func (r *CVParserRepository) EducationAgent(ctx context.Context, cleanedText string) ([]model.EducationDTO, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.EducationPrompt(cleanedText))
	if err != nil {
		r.Log.WithError(err).Error("error generating education")
		return nil, err
	}
	educations := new([]model.EducationDTO)
	if err := json.Unmarshal([]byte(raw), educations); err != nil {
		r.Log.WithError(err).Error("error unmarshalling education")
		return nil, err
	}
	return *educations, nil
}

func (r *CVParserRepository) SkillsAgent(ctx context.Context, cleanedText string) ([]model.SkillDTO, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.SkillsPrompt(cleanedText))
	if err != nil {
		r.Log.WithError(err).Error("error generating skills")
		return nil, err
	}
	skills := new([]model.SkillDTO)
	if err := json.Unmarshal([]byte(raw), skills); err != nil {
		r.Log.WithError(err).Error("error unmarshalling skills")
		return nil, err
	}
	return *skills, nil
}

func (r *CVParserRepository) ProjectsAgent(ctx context.Context, cleanedText string) ([]model.ProjectDTO, error) {
	raw, err := r.aiAgent.GenerateJSON(ctx, utils.ProjectsPrompt(cleanedText))
	if err != nil {
		r.Log.WithError(err).Error("error generating projects")
		return nil, err
	}
	projects := new([]model.ProjectDTO)
	if err := json.Unmarshal([]byte(raw), projects); err != nil {
		r.Log.WithError(err).Error("error unmarshalling projects")
		return nil, err
	}
	return *projects, nil
}
