package repository

import (
	"gorm.io/gorm"
	"tratech.my.id/server/internal/entity"
)

type EmailVerificationRepository struct {
	Repository[entity.EmailVerification]
}

func NewEmailVerificationRepository() *EmailVerificationRepository {
	return &EmailVerificationRepository{}
}

func (r *EmailVerificationRepository) FindByCodeAndEmail(db *gorm.DB, EmailVerification *entity.EmailVerification, otpCode string, email string) error {
	return db.Where("otp_code = ? AND email = ?", otpCode, email).Find(EmailVerification).Error
}

func (r *EmailVerificationRepository) FindByEmail(db *gorm.DB, EmailVerification *entity.EmailVerification, email string) error {
	return db.Where("email = ?", email).Find(EmailVerification).Error
}
