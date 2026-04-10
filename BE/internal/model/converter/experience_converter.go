package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func ExperienceToResponse(exp *entity.Experience) *model.ExperienceResponse {
	return &model.ExperienceResponse{
		ID:             exp.ID,
		Position:       exp.Position,
		CompanyName:    exp.CompanyName,
		LinkUrl:        exp.LinkUrl,
		ImageUrl:       exp.ImageUrl,
		Location:       exp.Location,
		EmploymentType: exp.EmploymentType,
		LocationType:   exp.LocationType,
		StartDate:      exp.StartDate,
		EndDate:        exp.EndDate,
		Description:    exp.Description,
	}
}
