package converter

import (
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

func SocialToResponse(social *entity.Social) *model.SocialResponse {
	return &model.SocialResponse{
		ID:       social.ID,
		Platform: social.Platform,
		LinkUrl:  social.LinkUrl,
	}
}
