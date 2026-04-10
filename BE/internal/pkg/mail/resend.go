package mail

import (
	"bytes"
	"errors"
	"fmt"
	"html/template"
	"time"

	"github.com/resend/resend-go/v3"
	"github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type Resend struct {
	Log    *logrus.Logger
	Config *viper.Viper
}

func NewResend(log *logrus.Logger, config *viper.Viper) *Resend {
	return &Resend{
		Log:    log,
		Config: config,
	}
}

type OTPTemplateData struct {
	LogoURL   string
	InstName  string
	Tagline   string
	Username  string
	OTPCode   string
	ExpiryMin string
	Year      string
}

func (p *Resend) SendOtpViaResend(username string, toEmail string, otpCode string) error {
	apiKey := p.Config.GetString("resend.api_key")
	from := p.Config.GetString("resend.email")

	if apiKey == "" || from == "" {
		p.Log.Warnf("failed get api key or email sender from config")
		return errors.New("failed get api key or email sender")
	}

	// 2. Siapin data dinamisnya
	data := OTPTemplateData{
		LogoURL:   "https://tratech.my.id/logo.png",
		InstName:  "Portofy",
		Tagline:   "Portfolio System",
		Username:  username,
		OTPCode:   otpCode,
		ExpiryMin: "15",
		Year:      fmt.Sprintf("%d", time.Now().Year()),
	}

	const emailTemplate = `
	<!DOCTYPE html>
	<html lang="id">
	<head>
	<meta charset="UTF-8"/>
	<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
	<title>Kode OTP</title>
	<style>
	  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
	  body{margin:0;padding:0;background:#f1f5f9;font-family:'Inter',sans-serif;}
	  .wrap{max-width:560px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);}
	  .banner{background:linear-gradient(135deg,#1d4ed8 0%,#0ea5e9 100%);padding:36px 40px 28px;text-align:center;}
	  .logo{width:64px;height:64px;background:rgba(255,255,255,.15);border:2px solid rgba(255,255,255,.3);border-radius:16px;margin:0 auto 14px;overflow:hidden;}
	  .logo img{width:100%;height:100%;object-fit:contain;}
	  .inst-name{font-size:18px;font-weight:700;color:#fff;margin:0;}
	  .inst-tag{font-size:11px;color:rgba(255,255,255,.65);margin:4px 0 0;}
	  .body{padding:36px 40px;}
	  .greet{font-size:13px;color:#6b7280;margin:0 0 4px;}
	  .uname{font-size:20px;font-weight:700;color:#0f172a;margin:0 0 16px;}
	  .desc{font-size:13px;color:#6b7280;line-height:1.75;margin:0 0 28px;}
	  .otp-box{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1.5px solid #bfdbfe;border-radius:14px;padding:24px;text-align:center;margin:0 0 28px;}
	  .otp-label{font-size:10px;font-weight:700;color:#3b82f6;letter-spacing:2px;text-transform:uppercase;margin:0 0 10px;}
	  .otp-code{font-family:monospace;font-size:38px;font-weight:700;color:#1d4ed8;letter-spacing:14px;text-indent:14px;margin:0;}
	  .otp-exp{font-size:11px;color:#94a3b8;margin:10px 0 0;}
	  .otp-exp b{color:#ef4444;}
	  .divider{height:1px;background:#f1f5f9;margin:0 0 20px;}
	  .note{font-size:12px;color:#9ca3af;line-height:1.7;margin:0;}
	  .note b{color:#6b7280;}
	  .footer{background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 40px;text-align:center;}
	  .f-name{font-size:12px;font-weight:600;color:#94a3b8;margin:0;}
	  .f-copy{font-size:11px;color:#cbd5e1;margin:4px 0 0;}
	</style>
	</head>
	<body>
	<div class="wrap">
	  <div class="banner">
	    <div class="logo">
	      <img src="{{.LogoURL}}" alt="{{.InstName}}"/>
	    </div>
	    <p class="inst-name">{{.InstName}}</p>
	    <p class="inst-tag">{{.Tagline}}</p>
	  </div>
	  <div class="body">
	    <p class="greet">Halo,</p>
	    <p class="uname">{{.Username}} 👋</p>
	    <p class="desc">
	      Kami menerima permintaan kode OTP untuk akun Anda.
	      Gunakan kode di bawah ini untuk melanjutkan proses verifikasi.
	    </p>
	    <div class="otp-box">
	      <p class="otp-label">Kode OTP Anda</p>
	      <p class="otp-code">{{.OTPCode}}</p>
	      <p class="otp-exp">Berlaku selama <b>{{.ExpiryMin}} menit</b> sejak email ini dikirim</p>
	    </div>
	    <div class="divider"></div>
	    <p class="note">
	      <b>Penting:</b> Jangan bagikan kode ini kepada siapapun, termasuk pihak yang mengaku
	      dari <b>{{.InstName}}</b>. Jika Anda tidak meminta kode ini, abaikan email ini.
	    </p>
	  </div>
	  <div class="footer">
	    <p class="f-name">{{.InstName}} — {{.Tagline}}</p>
	    <p class="f-copy">© {{.Year}} {{.InstName}}. Semua hak dilindungi.</p>
	  </div>
	</div>
	</body>
	</html>`

	t, err := template.New("otp").Parse(emailTemplate)
	if err != nil {
		p.Log.Warnf("Failed to parse HTML template: %v", err)
		return errors.New("failed to parse email template")
	}

	var bodyBuffer bytes.Buffer
	if err := t.Execute(&bodyBuffer, data); err != nil {
		p.Log.Warnf("Failed to execute HTML template: %v", err)
		return errors.New("failed to generate email body")
	}

	// 5. Tembak Resend
	client := resend.NewClient(apiKey)
	params := &resend.SendEmailRequest{
		From:    from,
		To:      []string{toEmail},
		Subject: "Your Account Verification Code",
		Html:    bodyBuffer.String(),
		Text:    fmt.Sprintf("Halo %s! Kode OTP Anda adalah: %s. Berlaku selama 15 menit.", username, otpCode),
	}

	_, err = client.Emails.Send(params)
	if err != nil {
		p.Log.Warnf("Error sending email to %s: %v", toEmail, err)
		return errors.New("failed sending email")
	}

	return nil
}
