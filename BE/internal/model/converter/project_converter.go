package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func ProjectToResponse(project *entity.Project) *model.ProjectResponse {
	return &model.ProjectResponse{
		ID:          project.ID,
		Title:       project.Title,
		Description: project.Description,
		ImageUrl:    project.ImageUrl,
		LinkUrl:     project.LinkUrl,
		IsFeatured:  project.IsFeatured,
		Challenges:  project.Challenge,
		Solution:    project.Solution,

		Tools:    project.Tools,
		Gallery:  project.Gallery,
		Features: project.Features,

		CreatedAt: project.CreatedAt,
	}
}
