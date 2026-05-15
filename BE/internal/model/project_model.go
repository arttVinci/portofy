package model

type ProjectFeature struct {
	Title string   `json:"title"`
	Items []string `json:"items"`
}

type ProjectGallery struct {
	ImageUrl string `json:"image_url"`
	Caption  string `json:"caption"`
}

type ProjectResponse struct {
	ID          string           `json:"id"`
	Title       string           `json:"title"`
	Description string           `json:"description"`
	ImageUrl    string           `json:"image_url"`
	LinkUrl     string           `json:"link_url"`
	IsFeatured  bool             `json:"featured"`
	Challenges  string           `json:"challenges"`
	Solution    string           `json:"solution"`
	Tools       []string         `json:"tools"`
	Gallery     []ProjectGallery `json:"gallery"`
	Features    []ProjectFeature `json:"features"`

	CreatedAt int64 `json:"created_at,omitempty"`
	UpdatedAt int64 `json:"updated_at,omitempty"`
}

type CreateProjectRequest struct {
	UserId      string `json:"-" validate:"required"`
	Title       string `json:"title" validate:"required,min=3,max=100"`
	Description string `json:"description" validate:"required,max=2000"`
	ImageUrl    string `json:"image_url" validate:"omitempty,url"`
	LinkUrl     string `json:"link_url" validate:"omitempty,url"`
	IsFeatured  bool   `json:"featured"`
	Challenges  string `json:"challenges" validate:"omitempty,max=3000"`
	Solution    string `json:"solution" validate:"omitempty,max=3000"`

	Tools    []string         `json:"tools" validate:"omitempty,max=20,dive,max=30"`
	Gallery  []ProjectGallery `json:"gallery" validate:"omitempty,max=10,dive"`
	Features []ProjectFeature `json:"features" validate:"omitempty,max=15,dive"`
}

type UpdateProjectRequest struct {
	ID          string `json:"-" validate:"required,uuid"`
	UserId      string `json:"-" validate:"required"`
	Title       string `json:"title" validate:"omitempty,min=3,max=100"`
	Description string `json:"description" validate:"omitempty,max=2000"`
	ImageUrl    string `json:"image_url" validate:"omitempty,url"`
	LinkUrl     string `json:"link_url" validate:"omitempty,url"`
	IsFeatured  bool   `json:"featured" validate:"omitempty"`
	Challenges  string `json:"challenges" validate:"omitempty,max=3000"`
	Solution    string `json:"solution" validate:"omitempty,max=3000"`

	Tools    []string         `json:"tools" validate:"omitempty,max=20,dive,max=30"`
	Gallery  []ProjectGallery `json:"gallery" validate:"omitempty,max=10,dive"`
	Features []ProjectFeature `json:"features" validate:"omitempty,max=15,dive"`
}

type DeleteProjectRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

type SearchProjectRequest struct {
	UserId string `json:"-" validate:"required"`
	Title  string `json:"title" validate:"omitempty"`
	Page   int    `json:"page" validate:"min=1"`
	Size   int    `json:"size" validate:"min=1,max=100"`
}

// Middleware
type GetProjectRequest struct {
	UserId string `json:"-" validate:"required"`
}

// Middleware
type GetByIdProjectRequest struct {
	ID     string `json:"-" validate:"required,max=100"`
	UserId string `json:"-" validate:"required"`
}

// Public
type GetPublicProjectRequest struct {
	Username string `json:"-" validate:"required"`
}

// Public
type GetPublicProjectByIdRequest struct {
	ID       string `json:"-" validate:"required,max=100"`
	Username string `json:"-" validate:"required"`
}
