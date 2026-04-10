package repository

import (
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
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
