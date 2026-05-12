package model

import "tratech.my.id/server/internal/model"

/* ParsedCVResponse — wrapper yang memakai model Response existing */
type ParsedCVResponse struct {
	Profile     model.ProfileResponse      `json:"profile"`
	Experiences []model.ExperienceResponse `json:"experiences"`
	Educations  []model.EducationResponse  `json:"educations"`
	Projects    []model.ProjectResponse    `json:"projects"`
	Skills      []model.SkillResponse      `json:"skills"`
}
