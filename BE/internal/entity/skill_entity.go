package entity

type Skill struct {
	ID     string `gorm:"column:id;primaryKey;type:uuid"`
	UserId string `gorm:"column:user_id;index"`
	Title  string `gorm:"column:title;type:varchar(50)"`
	Level  string `gorm:"column:level;type:varchar(20)"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (s *Skill) TableName() string {
	return "skills"
}
