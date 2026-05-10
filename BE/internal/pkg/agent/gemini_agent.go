package agent

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"

	"github.com/google/generative-ai-go/genai"
	"github.com/sirupsen/logrus"
)


type GeminiAgent interface {
	GenerateJSON(ctx context.Context, prompt string) (string, error)
}

type geminiAgent struct {
	Client *genai.Client
	Log    *logrus.Logger

}


func NewGeminiAgent(client *genai.Client, log *logrus.Logger) *geminiAgent {
	return &geminiAgent{
		Client: client,
		Log:    log,
	}
}


func (g *geminiAgent) GenerateJSON(ctx context.Context, prompt string) (string, error) {
    model := g.Client.GenerativeModel("gemini-1.5-flash")
    model.ResponseMIMEType = "application/json"

    response, err := model.GenerateContent(ctx, genai.Text(prompt))
    if err != nil {
        g.Log.WithError(err).Error("error generating content from gemini")
        return "", err
    }

    if len(response.Candidates) == 0 {
        return "", errors.New("gemini returned no candidates")
    }

    candidate := response.Candidates[0]

    if candidate.FinishReason != genai.FinishReasonStop {
        return "", fmt.Errorf("gemini stopped early, reason: %v", candidate.FinishReason)
    }
	
    if candidate.Content == nil || len(candidate.Content.Parts) == 0 {
        return "", errors.New("gemini returned empty content")
    }

    part, ok := candidate.Content.Parts[0].(genai.Text)
    if !ok {
        return "", errors.New("gemini response part is not text")
    }

    jsonStr := string(part)

    if !json.Valid([]byte(jsonStr)) {
        g.Log.WithField("raw", jsonStr).Warn("gemini returned invalid JSON")
        return "", errors.New("gemini returned invalid JSON structure")
    }

    return jsonStr, nil
}