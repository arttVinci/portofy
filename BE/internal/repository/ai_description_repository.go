package repository

import (
	"context"
	"encoding/json"
	"fmt"

	"tratech.my.id/server/internal/pkg/agent"
)

type AIDescRepository struct {
	aiAgent agent.AIAgent
}

// Constructor nerima agent buatan lu
func NewAIDescRepository(aiAgent agent.AIAgent) *AIDescRepository {
	return &AIDescRepository{
		aiAgent: aiAgent,
	}
}


func (r *aiDescRepository) GenerateDescription(ctx context.Context, request domain.GenerateDescRequest) (*domain.GenerateDescResponse, error) {
	// 1. Rakit Prompt Maut
	prompt := fmt.Sprintf(`
	Kamu adalah AI Copywriter profesional. Buatkan deskripsi profil singkat (maksimal 3 paragraf) untuk ditaruh di website portofolio pribadi.
	Informasi User:
	- Role/Pekerjaan: %s
	- Keahlian Utama: %v
	- Gaya Bahasa: %s

	ATURAN MUTLAK: 
	Kembalikan HANYA dalam format JSON dengan struktur: {"generated_description": "hasil teks kamu di sini"}
	`, req.Role, req.Skills, req.Tone)

	// 2. Lempar ke Agent "Buta Huruf" lu
	jsonString, err := r.aiAgent.GenerateJSON(ctx, prompt)
	if err != nil {
		return nil, err
	}

	// 3. Unmarshal string JSON dari AI ke struct Go
	var result domain.GenerateDescResponse
	err = json.Unmarshal([]byte(jsonString), &result)
	if err != nil {
		return nil, fmt.Errorf("gagal parse balasan AI: %v", err)
	}

	return &result, nil
}