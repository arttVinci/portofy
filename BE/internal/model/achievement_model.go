package model

import "time"

type AchievementResponse struct {
	ID            string     `json:"id"`
	Title         string     `json:"title"`
	ImageUrl      string     `json:"image_url"`
	Organization  string     `json:"organization"`
	IssuedDate    *time.Time `json:"issued_date"`
	CredentialUrl string     `json:"credential_url"`
	CredentialId  string     `json:"credential_id"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateAchievementRequest struct {
	UserId        string     `json:"-" validate:"required"`
	Title         string     `json:"title" validate:"required,min=3,max=100"`
	ImageUrl      string     `json:"image_url" validate:"omitempty"`
	Organization  string     `json:"organization" validate:"required,max=100"`
	IssuedDate    *time.Time `json:"issued_date" validate:"omitempty"`
	CredentialUrl *string    `json:"credential_url" validate:"omitempty"`
	CredentialId  *string    `json:"credential_id" validate:"omitempty,max=100"`
}

type UpdateAchievementRequest struct {
	ID            string     `json:"-" validate:"required,uuid"`
	UserId        string     `json:"-" validate:"required"`
	Title         string     `json:"title" validate:"omitempty,min=3,max=100"`
	ImageUrl      string     `json:"image_url" validate:"omitempty"`
	Organization  string     `json:"organization" validate:"omitempty,max=100"`
	IssuedDate    *time.Time `json:"issued_date" validate:"omitempty"`
	CredentialUrl string     `json:"credential_url" validate:"omitempty"`
	CredentialId  string     `json:"credential_id" validate:"omitempty,max=100"`
}

type DeleteAchievementRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetAchievementRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdAchievementRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicAchievementRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicAchievementByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
