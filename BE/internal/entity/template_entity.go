package entity

type Template struct {
	ID          string   `gorm:"column:id;primaryKey;type:uuid"`
	Name        string   `gorm:"column:name;type:varchar(100);not null"`
	Category    string   `gorm:"column:category;type:varchar(50);index"`
	Tags        []string `gorm:"column:tags;type:json;serializer:json"`
	Description string   `gorm:"column:description;type:varchar(255)"`
	Badge       string   `gorm:"column:badge;type:varchar(50)"`
	UsedCount   int      `gorm:"column:used_count;default:0"`
	IsPro       bool     `gorm:"column:is_pro;default:false"`

	CreatedAt int64 `gorm:"column:created_at;autoCreateTime:milli"`
	UpdatedAt int64 `gorm:"column:updated_at;autoCreateTime:milli;autoUpdateTime:milli"`
}

func (t *Template) TableName() string {
	return "templates"
}
