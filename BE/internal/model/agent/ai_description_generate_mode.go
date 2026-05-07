package model

// Request About
type GenerateAboutDescRequest struct {
	Name     string   `json:"name"`
	Role     string   `json:"role"`      // "Full Stack Developer"
	YearsExp int      `json:"years_exp"` // 5
	Skills   []string `json:"skills"`    // ["Go", "React", "PostgreSQL"]
	Tone     string   `json:"tone"`      // "professional" | "casual" | "creative"
	Location string   `json:"location"`  // "Jakarta, Indonesia"
	Language string   `json:"language"`  // "id" | "en"

	UserContext string `json:"user_context"`
}

// Response About
type GenerateAboutDescResponse struct {
    Paragraphs []string `json:"paragraphs"`
}

// Request Experience
type GenerateExperienceDescRequest struct {
	Company   string `json:"company"`
	Role      string `json:"role"`
	StartDate string `json:"start_date"` // "Jan 2022"
	EndDate   string `json:"end_date"`   // "Present" | "Dec 2023"
	Tone      string `json:"tone"`
	Language  string `json:"language"`

	UserContext string `json:"user_context"`
}

type DescBullet struct {
    Title       string `json:"title"`        // "High-Performance API"
    Description string `json:"description"`  // "Engineered a robust REST API..."
}

// Response Experience
type GenerateExperienceDescResponse struct {
    Summary  string             `json:"summary"`   // 2-4 baris narasi singkat
    Bullets  []DescBullet `json:"bullets"`   // 4-7 bullet points
}

// Request Education
type GenerateEducationDescRequest struct {
    Institution  string   `json:"institution"`
    Degree       string   `json:"degree"`           // "S1 Teknik Informatika"
    StartYear    string   `json:"start_year"`        // "2017"
    EndYear      string   `json:"end_year"`          // "2021" | "Present"
    GPA          string   `json:"gpa"`               // optional, "3.7/4.0"
    Tone         string   `json:"tone"`
    Language     string   `json:"language"`

	UserContext string `json:"user_context"`
}

// Response Education
type GenerateEducationDescResponse struct {
    Summary string            `json:"summary"`  // 2-3 kalimat
    Bullets []DescBullet `json:"bullets"`  // 3-5 poin highlight
}

// Request Project
type GenerateProjectDescRequest struct {
    Title       string   `json:"title"`
    Role        string   `json:"role"`
    Stack       []string `json:"stack"`
    Duration    string   `json:"duration"`
    Tone        string   `json:"tone"`
    Language    string   `json:"language"`

    UserNotes   string   `json:"user_notes"` 
}

type ProjectFeatureGroup struct {
    GroupTitle string   `json:"group_title"`   // "AI-Powered Content Generation"
    Items      []string `json:"items"`         // ["AI Description Generator...", "CV Parser..."]
}

// Response Project
type GenerateProjectDescResponse struct {
    Tagline     string                `json:"tagline"`      // 1 hook sentence
    Summary     string                `json:"summary"`      // 3-5 baris deskripsi singkat
    Challenge   string                `json:"challenge"`    // 1 paragraf tantangan
    Solution    string                `json:"solution"`     // 1 paragraf solusi
    KeyFeatures []ProjectFeatureGroup `json:"key_features"` // grouped features
    Tags        []string              `json:"tags"`         // keyword tags
}