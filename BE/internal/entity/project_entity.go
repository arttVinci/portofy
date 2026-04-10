package entity

import "tratech.my.id/server/internal/model"

type Project struct {
	ID          string `gorm:"column:id;primaryKey;type:uuid"`
	UserId      string `gorm:"column:user_id;index"`
	Title       string `gorm:"column:title;type:varchar(100)"`
	ImageUrl    string `gorm:"column:image_url;type:varchar(255)"`
	Description string `gorm:"column:description;type:text"`
	LinkUrl     string `gorm:"column:link_url;type:varchar(255)"`
	Challenge   string `gorm:"column:challenge;type:text"`
	Solution    string `gorm:"column:solution;type:text"`
	IsFeatured  bool   `gorm:"column:is_featured;default:false"`

	Tools    []string               `gorm:"column:tools;type:json;serializer:json"`
	Gallery  []model.ProjectGallery `gorm:"column:gallery;type:json;serializer:json"`
	Features []model.ProjectFeature `gorm:"column:features;type:json;serializer:json"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (p *Project) TableName() string {
	return "projects"
}
