package model

import "time"

type ExperienceResponse struct {
	ID             string     `json:"id"`
	Position       string     `json:"position"`
	CompanyName    string     `json:"company_name"`
	LinkUrl        string     `json:"link_url"`
	ImageUrl       string     `json:"image_url"`
	Location       string     `json:"location"`
	EmploymentType string     `json:"employment_type"`
	LocationType   string     `json:"location_type"`
	StartDate      *time.Time `json:"start_date"`
	EndDate        *time.Time `json:"end_date"`
	Description    string     `json:"description"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateExperienceRequest struct {
	UserId      string `json:"-" validate:"required"`
	Position    string `json:"position" validate:"required,min=2,max=100"`
	CompanyName string `json:"company_name" validate:"required,max=100"`
	LinkUrl     string `json:"link_url" validate:"omitempty,url"`
	ImageUrl    string `json:"image_url" validate:"omitempty,url"`
	Location    string `json:"location" validate:"omitempty,max=100"`
	// EmploymentType: Full-time, Part-time, Freelance, Contract, Internship, Self-employed
	EmploymentType string `json:"employment_type" validate:"omitempty,oneof=Full-time Part-time Freelance Contract Internship Self-employed"`
	// LocationType: Remote, On-site, Hybrid
	LocationType string     `json:"location_type" validate:"omitempty,oneof=Remote On-site Hybrid"`
	StartDate    *time.Time `json:"start_date" validate:"required"`
	EndDate      *time.Time `json:"end_date" validate:"omitempty,gtfield=StartDate"`
	Description  string     `json:"description" validate:"omitempty,max=2000"`
}

type UpdateExperienceRequest struct {
	ID             string     `json:"-" validate:"required,uuid"`
	UserId         string     `json:"-" validate:"required"`
	Position       string     `json:"position" validate:"omitempty,min=2,max=100"`
	CompanyName    string     `json:"company_name" validate:"omitempty,max=100"`
	LinkUrl        string     `json:"link_url" validate:"omitempty,url"`
	ImageUrl       string     `json:"image_url" validate:"omitempty,url"`
	Location       string     `json:"location" validate:"omitempty,max=100"`
	EmploymentType string     `json:"employment_type" validate:"omitempty,oneof=Full-time Part-time Freelance Contract Internship Self-employed"`
	LocationType   string     `json:"location_type" validate:"omitempty,oneof=Remote On-site Hybrid"`
	StartDate      *time.Time `json:"start_date" validate:"omitempty"`
	EndDate        *time.Time `json:"end_date" validate:"omitempty"`
	Description    string     `json:"description" validate:"omitempty,max=2000"`
}

type DeleteExperienceRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

type BulkDeleteExperienceRequest struct {
	ID     []string `json:"ids" validate:"required"`
	UserId string   `json:"-" validate:"required"`
}

type BulkCreateExperienceRequest struct {
	UserId string                     `json:"-" validate:"required"`
	Items  []CreateExperienceRequest  `json:"items" validate:"required"`
}

// Middleware
type GetExperienceRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdExperienceRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicExperienceRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicExperienceByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
