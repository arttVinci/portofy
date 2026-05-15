package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type EducationRepository struct {
	Repository[entity.Education]
}

func NewEducationRepository() *EducationRepository {
	return &EducationRepository{}
}

func (r *EducationRepository) FindAllByUserId(db *gorm.DB, education *[]entity.Education, userId string) error {
	return db.Where("user_id = ?", userId).Find(education).Error
}

func (r *EducationRepository) FindByIdAndUserId(db *gorm.DB, education *entity.Education, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(education).Error
}

func (r *EducationRepository) BulkDeleteByUserIdAndIds(db *gorm.DB, userId string, ids []string) error {
	return db.Where("user_id = ? AND id IN ?", userId, ids).Delete(&entity.Education{}).Error
}

func (r *EducationRepository) BulkCreate(db *gorm.DB, educations []entity.Education) error {
	return db.Create(&educations).Error
}

// Public Endpoint
func (r *EducationRepository) FindAllByUsername(db *gorm.DB, educations *[]entity.Education, username string) error {
	return db.Table("educations").
		Joins("JOIN users ON users.id = educations.user_id").
		Where("users.username = ?", username).
		Find(educations).Error
}

// Public Endpoint
func (r *EducationRepository) FindByUsername(db *gorm.DB, educations *entity.Education, username string, id string) error {
	return db.Table("educations").
		Joins("JOIN users ON users.id = educations.user_id").
		Where("educations.id = ? AND users.username = ?", id, username).
		Find(educations).Error
}
