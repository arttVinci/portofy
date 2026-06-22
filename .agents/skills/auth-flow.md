# Auth Flow SOP

## Tujuan
Menjaga perubahan auth di backend Portofid tetap sesuai flow existing.

## Flow Auth Utama
Project mendukung:
- Register username/password/email.
- OTP verification via email.
- Login username/password.
- JWT auth dengan expiry.
- Google OAuth login/register.

## Register Flow
1. Terima request register.
2. Validasi username/email/password.
3. Cek duplikasi username/email.
4. Hash password dengan bcrypt.
5. Generate user id memakai utility existing.
6. Simpan user.
7. Kirim/generate OTP sesuai flow existing jika dibutuhkan.

## OTP Flow
- OTP berupa kode 6 digit.
- Email dikirim via Resend API.
- OTP harus diverifikasi sebelum user dianggap valid jika pattern endpoint mensyaratkan.
- Jangan log OTP di production.

## Login Flow
1. Cari user by username/email sesuai pattern existing.
2. Compare password dengan bcrypt.
3. Jika valid, generate JWT.
4. Return token dan user response sesuai model existing.

## JWT Middleware
Middleware bertugas:
- Ambil header `Authorization`.
- Validasi format `Bearer <token>`.
- Parse claims.
- Simpan user id ke `ctx.Locals("auth")`.

Controller/usecase auth route harus memakai user id dari locals, bukan dari body request.

## Google OAuth
Flow:
1. Redirect user ke Google OAuth.
2. Callback menerima code.
3. Tukar code dengan token.
4. Ambil profile Google.
5. Jika email belum ada, create user baru dengan provider Google.
6. Generate JWT untuk session app.

## Security Rules
- Jangan hardcode secret baru di source code.
- JWT secret/API key harus lewat config/env/secret manager.
- Jangan return password hash ke response.
- Jangan menerima user id dari client untuk operasi resource milik user login.
- Logout existing belum invalidate token; jangan klaim token invalidated kecuali sudah ada mechanism blacklist/session store.

## Error Handling
- Invalid credential: `401 Unauthorized`.
- Duplicate username/email: `409 Conflict` atau pattern existing.
- Missing/invalid token: `401 Unauthorized`.
- Resource bukan milik user: `403 Forbidden`.
