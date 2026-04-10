package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func EducationToResponse(edu *entity.Education) *model.EducationResponse {
	return &model.EducationResponse{
		ID:           edu.ID,
		Institution:  edu.Institution,
		Degree:       edu.Degree,
		FieldOfStudy: edu.FieldOfStudy,
		Grade:        edu.Grade,
		ImageUrl:     edu.ImageUrl,
		Location:     edu.Location,
		StartDate:    edu.StartDate,
		EndDate:      edu.EndDate,
		Description:  edu.Description,
	}
}
