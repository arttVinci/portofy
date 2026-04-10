package model

type TemplateResponse struct {
	ID          string   `json:"id"`
	Title       string   `json:"title"`
	Category    string   `json:"category"`
	Tags        []string `json:"tags"`
	Description string   `json:"description"`
	Badge       string   `json:"badge"`
	UsedCount   string   `json:"used_count"` // Contoh: "8.2k"
	IsPro       bool     `json:"is_pro"`
}

type CreateTemplateRequest struct {
	Title       string   `json:"title" validate:"required,min=3,max=50"`
	Category    string   `json:"category" validate:"required,max=50"`
	Tags        []string `json:"tags" validate:"omitempty,max=10,dive,max=20"`
	Description string   `json:"description" validate:"required,max=255"`
	Badge       string   `json:"badge" validate:"omitempty,max=50"`
	IsPro       bool     `json:"is_pro"`
}

type UpdateTemplateRequest struct {
	Title       string   `json:"title" validate:"required,min=3,max=50"`
	Category    string   `json:"category" validate:"required,max=50"`
	Tags        []string `json:"tags" validate:"omitempty,max=10,dive,max=20"`
	Description string   `json:"description" validate:"required,max=255"`
	Badge       string   `json:"badge" validate:"omitempty,max=50"`
	IsPro       bool     `json:"is_pro"`
}
