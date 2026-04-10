package entity

import "time"

type Achievement struct {
	ID            string     `gorm:"column:id;primaryKey;type:uuid"`
	UserId        string     `gorm:"column:user_id;index"`
	Title         string     `gorm:"column:title;type:varchar(255)"`
	ImageUrl      string     `gorm:"column:image_url;type:varchar(255)"`
	Organization  string     `gorm:"column:organization;type:varchar(255)"`
	IssuedDate    *time.Time `gorm:"column:issued_date"`
	CredentialUrl string     `gorm:"column:credential_url;type:varchar(255)"`
	CredentialId  string     `gorm:"column:credential_id;type:varchar(100)"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (a *Achievement) TableName() string {
	return "achievements"
}
