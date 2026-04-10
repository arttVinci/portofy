package model

type Auth struct {
	ID string
}

type SendOTPRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Username string `json:"username" validate:"required"`
}
