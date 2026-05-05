package entity

type Profile struct {
	ID       string `gorm:"column:id;primaryKey;type:uuid"`
	UserId   string `gorm:"column:user_id;index"`
	FullName string `gorm:"column:full_name;type:varchar(100)"`
	ImageUrl string `gorm:"column:image_url;type:varchar(255)"`
	Address  string `gorm:"column:address;type:varchar(200)"`
	About    string `gorm:"column:about;type:text"`
	Bio      string `gorm:"column:bio;type:text"`
	Theme    string `gorm:"column:theme;type:varchar(20);default:'system'"`

	Tags []string `gorm:"column:tags;type:json;serializer:json"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`

	// Relasi ke User
	User User `gorm:"foreignKey:UserId;references:ID"`
}

func (p *Profile) TableName() string {
	return "profiles"
}
