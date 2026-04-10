package model

type SocialResponse struct {
	ID       string `json:"id"`
	Platform string `json:"platform"` // Contoh: "github", "linkedin", "instagram"
	LinkUrl  string `json:"link_url"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateSocialRequest struct {
	UserId   string `json:"-" validate:"required"`
	Platform string `json:"platform" validate:"required,oneof=github linkedin instagram x twitter facebook youtube discord website"`
	LinkUrl  string `json:"link_url" validate:"required,url"`
}

type UpdateSocialRequest struct {
	ID       string `json:"-" validate:"required,uuid"`
	UserId   string `json:"-" validate:"required"`
	Platform string `json:"platform" validate:"omitempty,oneof=github linkedin instagram x twitter facebook youtube discord website"`
	LinkUrl  string `json:"link_url" validate:"omitempty,url"`
}

type DeleteSocialRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetSocialRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdSocialRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicSocialRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicSocialByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
