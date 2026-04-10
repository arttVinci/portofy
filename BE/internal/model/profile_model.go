package model

type ProfileResponse struct {
	ID       string   `json:"id"`
	FullName string   `json:"full_name"`
	ImageUrl string   `json:"image_url"`
	Address  string   `json:"address"`
	About    string   `json:"about"`
	Bio      string   `json:"bio"`
	Theme    string   `json:"theme"`
	Tags     []string `json:"tags"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateProfileRequest struct {
	UserId   string   `json:"-" validate:"required"`
	FullName string   `json:"full_name" validate:"required,min=3,max=100"`
	ImageUrl string   `json:"image_url" validate:"omitempty,url"`
	Address  string   `json:"address" validate:"omitempty,max=200"`
	About    string   `json:"about" validate:"omitempty,max=10000"`
	Bio      string   `json:"bio" validate:"omitempty,max=2000"`
	Theme    string   `json:"theme"`
	Tags     []string `json:"tags" validate:"omitempty,max=10,dive,max=30"`
}

type UpdateProfileRequest struct {
	UserId   string   `json:"-" validate:"required"`
	FullName string   `json:"full_name" validate:"omitempty,min=3,max=100"`
	ImageUrl string   `json:"image_url" validate:"omitempty,url"`
	Address  string   `json:"address" validate:"omitempty,max=200"`
	About    string   `json:"about" validate:"omitempty,max=10000"`
	Bio      string   `json:"bio" validate:"omitempty,max=2000"`
	Theme    string   `json:"theme"`
	Tags     []string `json:"tags" validate:"omitempty,max=10,dive,max=30"`
}
type ProfileImageResponse struct {
	ImageUrl string `json:"image_url"`
}

// Middleware
type GetProfileRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdProfileRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicProfileRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicProfileByIdRequest struct {
	Username string `json:"-" validate:"required"`
}
