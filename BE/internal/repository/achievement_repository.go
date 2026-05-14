package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

type AchievementRepository struct {
	Repository[entity.Achievement]
}

func NewAchievementRepository() *AchievementRepository {
	return &AchievementRepository{}
}

func (r *AchievementRepository) FindByIdAndUserId(db *gorm.DB, achievement *entity.Achievement, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(achievement).Error
}

func (r *AchievementRepository) Search(db *gorm.DB, request *model.SearchAchievementRequest) ([]entity.Achievement, int64, error) {
	var achievements []entity.Achievement
	
	err := db.Scopes(r.FilterAchievement(request)).
		Offset((request.Page - 1) * request.Size).
		Limit(request.Size).
		Find(&achievements).Error

	if err != nil {
		return nil, 0, err
	}

	var total int64 = 0
	err = db.Model(&entity.Achievement{}).
		Scopes(r.FilterAchievement(request)).
		Count(&total).Error
		
	if err != nil {
		return nil, 0, err
	}

	return achievements, total, nil
}

func (r *AchievementRepository) FilterAchievement(request *model.SearchAchievementRequest) func(tx *gorm.DB) *gorm.DB {
	return func(tx *gorm.DB) *gorm.DB {
		tx = tx.Where("user_id = ?", request.UserId)

		if title := request.Title; title != "" {
			title = "%" + title + "%"
			tx = tx.Where("title LIKE ?", title) 
		}

		return tx
	}
}

// Public Endpoint
func (r *AchievementRepository) FindAllByUsername(db *gorm.DB, achievements *[]entity.Achievement, username string) error {
	return db.Table("achievements").
		Joins("JOIN users ON users.id = achievements.user_id").
		Where("users.username = ?", username).
		Take(achievements).Error
}

// Public Endpoint
func (r *AchievementRepository) FindByUsername(db *gorm.DB, achievement *entity.Achievement, username string, id string) error {
	return db.Table("achievements").
		Joins("JOIN users ON users.id = achievements.user_id").
		Where("achievements.id = ? AND users.username = ?", id, username).
		Take(achievement).Error
}
