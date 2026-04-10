package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type SocialRepository struct {
	Repository[entity.Social]
}

func NewSocialRepository() *SocialRepository {
	return &SocialRepository{}
}

func (r *SocialRepository) FindAllByUserId(db *gorm.DB, social *[]entity.Social, userId string) error {
	return db.Where("user_id = ?", userId).Find(social).Error
}

func (r *SocialRepository) FindByIdAndUserId(db *gorm.DB, social *entity.Social, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(social).Error
}

// Public Endpoint
func (r *SocialRepository) FindAllByUsername(db *gorm.DB, social *[]entity.Social, username string) error {
	return db.Table("socials").
		Joins("JOIN users ON users.id = socials.user_id").
		Where("users.username = ?", username).
		Find(social).Error
}

// Public Endpoint
func (r *SocialRepository) FindByUsername(db *gorm.DB, social *entity.Social, username string, id string) error {
	return db.Table("socials").
		Joins("JOIN users ON users.id = socials.user_id").
		Where("socials.id = ? AND users.username = ?", id, username).
		Find(social).Error
}
