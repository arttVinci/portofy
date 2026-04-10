package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type ExperienceRepository struct {
	Repository[entity.Experience]
}

func NewExperienceRepository() *ExperienceRepository {
	return &ExperienceRepository{}
}

func (r *ExperienceRepository) FindAllByUserId(db *gorm.DB, experience *[]entity.Experience, userId string) error {
	return db.Where("user_id = ?", userId).Find(experience).Error
}

func (r *ExperienceRepository) FindByIdAndUserId(db *gorm.DB, experience *entity.Experience, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(experience).Error
}

// Public Endpoint
func (r *ExperienceRepository) FindAllByUsername(db *gorm.DB, experiences *[]entity.Experience, username string) error {
	return db.Table("experiences").
		Joins("JOIN users ON users.id = experiences.user_id").
		Where("users.username = ?", username).
		Find(experiences).Error
}

// Public Endpoint
func (r *ExperienceRepository) FindByUsername(db *gorm.DB, experiences *entity.Experience, username string, id string) error {
	return db.Table("experiences").
		Joins("JOIN users ON users.id = experiences.user_id").
		Where("experiences.id = ? AND users.username = ?", id, username).
		Find(experiences).Error
}
