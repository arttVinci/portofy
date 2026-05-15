package repository

import (
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
	"tratech.my.id/server/internal/model"
)

type ProjectRepository struct {
	Repository[entity.Project]
	Log *logrus.Logger
}

func NewProjectRepository() *ProjectRepository {
	return &ProjectRepository{}
}

func (r *ProjectRepository) FindAllByUserId(db *gorm.DB, project *[]entity.Project, userId string) error {
	return db.Where("user_id = ?", userId).Find(project).Error
}

func (r *ProjectRepository) FindByIdAndUserId(db *gorm.DB, project *entity.Project, id string, userId string) error {
	return db.Where("id = ? AND user_id = ?", id, userId).Take(project).Error
}

func (r *ProjectRepository) BulkDeleteByUserIdAndIds(db *gorm.DB, userId string, ids []string) error {
	return db.Where("user_id = ? AND id IN ?", userId, ids).Delete(&entity.Project{}).Error
}

func (r *ProjectRepository) BulkCreate(db *gorm.DB, projects []entity.Project) error {
	return db.Create(&projects).Error
}

func (r *ProjectRepository) Search(db *gorm.DB, request *model.SearchProjectRequest) ([]entity.Project, int64, error) {
	var projects []entity.Project

	err := db.Scopes(r.FilterProject(request)).
		Offset((request.Page - 1) * request.Size).
		Limit(request.Size).
		Find(&projects).Error

	if err != nil {
		return nil, 0, err
	}

	var total int64 = 0
	err = db.Model(&entity.Project{}).
		Scopes(r.FilterProject(request)).
		Count(&total).Error

	if err != nil {
		return nil, 0, err
	}

	return projects, total, nil
}

func (r *ProjectRepository) FilterProject(request *model.SearchProjectRequest) func(tx *gorm.DB) *gorm.DB {
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
func (r *ProjectRepository) FindAllByUsername(db *gorm.DB, projects *[]entity.Project, username string) error {
	return db.Table("projects").
		Joins("JOIN users ON users.id = projects.user_id").
		Where("users.username = ?", username).
		Find(projects).Error
}

// Public Endpoint
func (r *ProjectRepository) FindByUsername(db *gorm.DB, project *entity.Project, username string, id string) error {
	return db.Table("projects").
		Joins("JOIN users ON users.id = projects.user_id").
		Where("projects.id = ? AND users.username = ?", id, username).
		Find(project).Error
}

