package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type SkillRepository struct {
	Repository[entity.Skill]
}

func NewSkillRepository() *SkillRepository {
	return &SkillRepository{}
}

func (r *SkillRepository) FindAllByUserId(db *gorm.DB, skill *[]entity.Skill, userId string) error {
	return db.Where("user_id = ?", userId).Find(skill).Error
}

func (r *SkillRepository) FindByIdAndUserId(db *gorm.DB, skill *entity.Skill, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(skill).Error
}

func (r *SkillRepository) BulkDeleteByUserIdAndIds(db *gorm.DB, userId string, ids []string) error {
	return db.Where("user_id = ? AND id IN ?", userId, ids).Delete(&entity.Skill{}).Error
}

func (r *SkillRepository) BulkCreate(db *gorm.DB, skills []entity.Skill) error {
	return db.Create(&skills).Error
}

// Public Endpoint
func (r *SkillRepository) FindAllByUsername(db *gorm.DB, skill *[]entity.Skill, username string) error {
	return db.Table("skills").
		Joins("JOIN users ON users.id = skills.user_id").
		Where("users.username = ?", username).
		Find(skill).Error
}

// Public Endpoint
func (r *SkillRepository) FindByUsername(db *gorm.DB, skill *entity.Skill, username string, id string) error {
	return db.Table("skills").
		Joins("JOIN users ON users.id = skills.user_id").
		Where("skills.id = ? AND users.username = ?", id, username).
		Find(skill).Error
}
