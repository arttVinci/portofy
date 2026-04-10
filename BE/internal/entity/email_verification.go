package entity

import "time"

type EmailVerification struct {
	ID        string    `gorm:"column:id;primaryKey;type:uuid"`
	Email     string    `gorm:"column:email"`
	OtpCode   string    `gorm:"column:otp_code"`
	ExpiredAt time.Time `gorm:"column:expired_at"`
}
