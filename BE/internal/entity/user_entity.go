package entity

type User struct {
	ID           string `gorm:"column:id;primaryKey"`
	Username     string `gorm:"column:username;type:varchar(50);unique;index"`
	Password     string `gorm:"column:password;type:varchar(255)"`
	Email        string `gorm:"column:email;type:varchar(100);unique;index"`
	AuthProvider string `gorm:"column:auth_provider;type:varchar(10)"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

func (u *User) TableName() string {
	return "users"
}
