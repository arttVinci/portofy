package model

import "time"

type CVParseResult struct {
	Profile     ProfileDTO     `json:"profile"`
	Experiences []ExperienceDTO `json:"experiences"`
	Educations  []EducationDTO  `json:"educations"`
	Projects    []ProjectDTO    `json:"projects"`
	Skills      []SkillDTO      `json:"skills"`
}

type ProfileDTO struct {
	ID       string   `json:"id"`
	FullName string   `json:"full_name"`
	ImageURL string   `json:"image_url"`
	Address  string   `json:"address"`
	About    string   `json:"about"`
	Bio      string   `json:"bio"`
	Theme    string   `json:"theme"`
	Tags     []string `json:"tags"`
}

type ExperienceDTO struct {
	ID             string     `json:"id"`
	Position       string     `json:"position"`
	CompanyName    string     `json:"company_name"`
	LinkURL        string     `json:"link_url"`
	ImageURL       string     `json:"image_url"`
	Location       string     `json:"location"`
	EmploymentType string     `json:"employment_type"`
	LocationType   string     `json:"location_type"`
	StartDate      *time.Time `json:"start_date"`
	EndDate        *time.Time `json:"end_date"`
	Description    string     `json:"description"`
}

type EducationDTO struct {
	ID           string     `json:"id"`
	Institution  string     `json:"institution"`
	Degree       string     `json:"degree"`
	FieldOfStudy string     `json:"field_of_study"`
	Grade        string     `json:"grade"`
	ImageURL     string     `json:"image_url"`
	Location     string     `json:"location"`
	StartDate    *time.Time `json:"start_date"`
	EndDate      *time.Time `json:"end_date"`
	Description  string     `json:"description"`
}

type ProjectDTO struct {
	ID          string            `json:"id"`
	Title       string            `json:"title"`
	Description string            `json:"description"`
	ImageURL    string            `json:"image_url"`
	LinkURL     string            `json:"link_url"`
	Featured    bool              `json:"featured"`
	Challenges  string            `json:"challenges"`
	Solution    string            `json:"solution"`
	Tools       []string          `json:"tools"`
	Gallery     []GalleryItemDTO  `json:"gallery"`
	Features    []ProjectFeatureDTO `json:"features"`
}

type GalleryItemDTO struct {
	ImageURL string `json:"image_url"`
	Caption  string `json:"caption"`
}

type ProjectFeatureDTO struct {
	Title string   `json:"title"`
	Items []string `json:"items"`
}

type SkillDTO struct {
	ID    string `json:"id"`
	Title string `json:"title"`
	Level string `json:"level"`
}

type AgentSection string

const (
	AgentSectionProfile    AgentSection = "profile"
	AgentSectionExperience AgentSection = "experience"
	AgentSectionEducation  AgentSection = "education"
	AgentSectionSkill      AgentSection = "skill"
	AgentSectionProject    AgentSection = "project"
)

type AgentResult[T any] struct {
	Section AgentSection
	Data    T
	Err     error
}

type ReviewVerdict struct {
	Section AgentSection `json:"section"`
	Valid   bool         `json:"valid"`
	Reason  string       `json:"reason"`
}

type ReviewResult struct {
	Verdicts []ReviewVerdict `json:"verdicts"`
}