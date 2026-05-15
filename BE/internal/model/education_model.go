package model

import "time"

type EducationResponse struct {
	ID           string     `json:"id"`
	Institution  string     `json:"institution"`
	Degree       string     `json:"degree"`
	FieldOfStudy string     `json:"field_of_study"`
	Grade        string     `json:"grade"`
	ImageUrl     string     `json:"image_url"`
	Location     string     `json:"location"`
	StartDate    *time.Time `json:"start_date"`
	EndDate      *time.Time `json:"end_date"`
	Description  string     `json:"description"`
}

type CreateEducationRequest struct {
	UserId       string     `json:"-" validate:"required"`
	Institution  string     `json:"institution" validate:"required,min=3,max=100"`
	Degree       string     `json:"degree" validate:"omitempty,max=100"`
	FieldOfStudy string     `json:"field_of_study" validate:"omitempty,max=100"`
	Grade        string     `json:"grade" validate:"omitempty,max=20"`
	ImageUrl     string     `json:"image_url" validate:"omitempty,url"`
	Location     string     `json:"location" validate:"omitempty,max=100"`
	StartDate    *time.Time `json:"start_date" validate:"required"`
	EndDate      *time.Time `json:"end_date" validate:"omitempty,gtfield=StartDate"`
	Description  string     `json:"description" validate:"omitempty,max=1000"`
}

type UpdateEducationRequest struct {
	ID           string     `json:"-" validate:"required,uuid"`
	UserId       string     `json:"-" validate:"required"`
	Institution  string     `json:"institution" validate:"omitempty,min=3,max=100"`
	Degree       string     `json:"degree" validate:"omitempty,max=100"`
	FieldOfStudy string     `json:"field_of_study" validate:"omitempty,max=100"`
	Grade        string     `json:"grade" validate:"omitempty,max=20"`
	ImageUrl     string     `json:"image_url" validate:"omitempty,url"`
	Location     string     `json:"location" validate:"omitempty,max=100"`
	StartDate    *time.Time `json:"start_date" validate:"omitempty"`
	EndDate      *time.Time `json:"end_date" validate:"omitempty"`
	Description  string     `json:"description" validate:"omitempty,max=1000"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type DeleteEducationRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

type BulkDeleteEducationRequest struct {
	ID     []string `json:"ids" validate:"required"`
	UserId string   `json:"-" validate:"required"`
}

type BulkCreateEducationRequest struct {
	UserId string                    `json:"-" validate:"required"`
	Items  []CreateEducationRequest  `json:"items" validate:"required"`
}

// Middleware
type GetEducationRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdEducationRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicEducationRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicEducationByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
