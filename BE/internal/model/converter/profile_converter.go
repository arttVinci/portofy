package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func ProfileToResponse(profile *entity.Profile) *model.ProfileResponse {
	return &model.ProfileResponse{
		ID:       profile.ID,
		FullName: profile.FullName,
		ImageUrl: profile.ImageUrl,
		Address:  profile.Address,
		About:    profile.About,
		Bio:      profile.Bio,
		Tags:     profile.Tags,
		Theme:    profile.Theme,
	}
}
