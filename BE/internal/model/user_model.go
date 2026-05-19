package model

type UserResponse struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type LoginUserResponse struct {
	User  UserResponse `json:"user"`
	Token string       `json:"token"`
}

type RegisterUserRequest struct {
	Username string `json:"username" validate:"required,min=3,max=30,alphanum"` // Hanya huruf & angka
	Password string `json:"password" validate:"required,min=8,max=100"`         // Min 8 karakter
	Email    string `json:"email" validate:"required,email"`                    // Validasi format email wajib

	OtpCode string `json:"otp_code" validate:"required,len=6"`
}

type LoginUserRequest struct {
	Username string `json:"username" validate:"required"`
	Password string `json:"password" validate:"required"`
}

type UpdateUserRequest struct {
	ID       string `json:"-" validate:"required"`
	Username string `json:"username,omitempty" validate:"omitempty,min=3,max=30,alphanum"`
	Password string `json:"password,omitempty" validate:"omitempty,min=8,max=100"`
	Email    string `json:"email,omitempty" validate:"omitempty,email"`
}

type LogoutUserRequest struct {
	ID string `json:"id" validate:"required,max=100"`
}

type GetUserRequest struct {
	ID string `json:"id" validate:"required,max=100"`
}
