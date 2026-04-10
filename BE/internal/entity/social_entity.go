package entity

type Social struct {
	ID       string `gorm:"column:id;primaryKey;type:uuid"`
	UserId   string `gorm:"column:user_id;index"`
	Platform string `gorm:"column:platform;type:varchar(50)"`
	LinkUrl  string `gorm:"column:link_url;type:varchar(255)"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (s *Social) TableName() string {
	return "socials"
}
