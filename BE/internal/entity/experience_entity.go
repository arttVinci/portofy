package entity

import (
	"time"
)

type Experience struct {
	ID     string `gorm:"column:id;primaryKey;type:uuid"`
	UserId string `gorm:"column:user_id;index"`

	CompanyName string `gorm:"column:company_name;type:varchar(100)"`
	Position    string `gorm:"column:position;type:varchar(100)"`
	LinkUrl     string `gorm:"column:link_url;type:varchar(255)"`
	ImageUrl    string `gorm:"column:image_url;type:varchar(255)"`
	Location    string `gorm:"column:location;type:varchar(100)"`

	// Contoh isi: Full-time, Freelance, dll.
	EmploymentType string `gorm:"column:employment_type;type:varchar(50)"`
	// Contoh isi: Remote, On-site, Hybrid
	LocationType string `gorm:"column:location_type;type:varchar(50)"`

	StartDate *time.Time `gorm:"column:start_date"`
	EndDate   *time.Time `gorm:"column:end_date"`

	Description string `gorm:"column:description;type:text"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (e *Experience) TableName() string {
	return "experiences"
}
