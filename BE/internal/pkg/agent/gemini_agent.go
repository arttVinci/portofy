package agent

import (
	"context"
	"fmt"

	"github.com/google/generative-ai-go/genai"
	"github.com/sirupsen/logrus"
)


type AIAgent interface {
	GenerateJSON(ctx context.Context, prompt string) (string, error)
}

type geminiAgent struct {
	Client *genai.Client
	Log    *logrus.Logger

}


func NewGeminiAgent(client *genai.Client, log *logrus.Logger) AIAgent {
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

	if len(response.Candidates) > 0 && len(response.Candidates[0].Content.Parts) > 0 {
		jsonString := fmt.Sprintf("%v", response.Candidates[0].Content.Parts[0])
		return jsonString, nil
	}

	return "", nil
}