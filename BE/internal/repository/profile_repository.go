package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type ProfileRepository struct {
	Repository[entity.Profile]
}

func NewProfileRepository() *ProfileRepository {
	return &ProfileRepository{}
}

func (r *ProfileRepository) FindAllByUserId(db *gorm.DB, profile *[]entity.Profile, userId string) error {
	return db.Where("user_id = ?", userId).Find(profile).Error
}

func (r *ProfileRepository) FindByUserId(db *gorm.DB, profile *entity.Profile, userId string) error {
	return db.Where("user_id = ?", userId).Take(profile).Error
}

func (r *ProfileRepository) FindByIdAndUserId(db *gorm.DB, profile *entity.Profile, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(profile).Error
}

// Public Endpoint
func (r *ProfileRepository) FindAllByUsername(db *gorm.DB, profile *[]entity.Profile, username string) error {
	return db.Table("profiles").
		Joins("JOIN users ON users.id = profiles.user_id").
		Where("users.username = ?", username).
		Find(profile).Error
}

// Public Endpoint
func (r *ProfileRepository) FindByUsername(db *gorm.DB, profile *entity.Profile, username string) error {
	return db.Table("profiles").
		Joins("JOIN users ON users.id = profiles.user_id").
		Where("users.username = ?", username).
		Find(profile).Error
}
