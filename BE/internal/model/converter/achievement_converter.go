package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func AchievementToResponse(achiv *entity.Achievement) *model.AchievementResponse {
	return &model.AchievementResponse{
		ID:            achiv.ID,
		Title:         achiv.Title,
		ImageUrl:      achiv.ImageUrl,
		Organization:  achiv.Organization,
		IssuedDate:    achiv.IssuedDate,
		CredentialUrl: achiv.CredentialUrl,
		CredentialId:  achiv.CredentialId,
	}
}
