package entity

import (
	"time"
)

type Education struct {
	ID           string `gorm:"column:id;primaryKey;type:uuid"`
	UserId       string `gorm:"column:user_id;index"`
	Institution  string `gorm:"column:institution;type:varchar(100)"`
	Degree       string `gorm:"column:degree;type:varchar(100)"`
	FieldOfStudy string `gorm:"column:field_of_study;type:varchar(100)"`
	Grade        string `gorm:"column:grade;type:varchar(20)"`
	ImageUrl     string `gorm:"column:image_url;type:varchar(255)"`
	Location     string `gorm:"column:location;type:varchar(100)"`

	StartDate *time.Time `gorm:"column:start_date"`
	EndDate   *time.Time `gorm:"column:end_date"`

	Description string `gorm:"column:description;type:text"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (e *Education) TableName() string {
	return "educations"
}
