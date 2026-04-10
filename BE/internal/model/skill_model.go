package model

type SkillResponse struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Level string `json:"level"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateSkillRequest struct {
	UserId string `json:"-" validate:"required"`
	Title  string `json:"title" validate:"required,min=1,max=50"`
	// Level: Beginner, Intermediate, Advanced, Expert
	Level string `json:"level" validate:"required,oneof=Beginner Intermediate Advanced Expert"`
}

type UpdateSkillRequest struct {
	ID     string `json:"-" validate:"required,uuid"`
	UserId string `json:"-" validate:"required"`
	Title  string `json:"title" validate:"omitempty,min=1,max=50"`
	Level  string `json:"level" validate:"omitempty,oneof=Beginner Intermediate Advanced Expert"`
}

type DeleteSkillRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetSkillRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdSkillRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicSkillRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicSkillByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
