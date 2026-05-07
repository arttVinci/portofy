type GenerateDescRequest struct {
	Role   string   `json:"role" validate:"required"`
	Skills []string `json:"skills" validate:"required"`
	Tone   string   `json:"tone"` // Misal: "Profesional", "Santai", "Hacker"
}