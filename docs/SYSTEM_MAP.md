# SYSTEM MAP

> Dibuat dari: Reverse Engineering Codebase `portofId`
> Tanggal scan: 2026-06-24
> Versi dokumen: 1.0

---

## Executive Summary

**Portofy** adalah platform portfolio digital berbasis web yang memungkinkan pengguna membangun dan mempublikasikan halaman portfolio pribadi melalui URL `/:username`. Sistem terdiri dari dua bagian terpisah: **Backend (BE)** dibangun dengan Go, dan **Frontend (FE)** dibangun dengan React + TypeScript + Vite.

Platform menyediakan:
- Manajemen konten portfolio (profil, proyek, pengalaman, pendidikan, skill, social link, achievement)
- Autentikasi via username/password (local) dan Google OAuth 2.0
- Fitur AI berbasis Google Gemini untuk generate deskripsi teks dan parsing CV
- Upload gambar ke Cloudinary
- Halaman portfolio publik yang dapat diakses via `/:username`

Domain bisnis utama: **Portfolio Builder sebagai SaaS**.

---

## Technology Stack

### Backend (BE)

| Layer | Teknologi | Versi |
|---|---|---|
| Language | Go | 1.25.3 |
| HTTP Framework | Fiber v2 | v2.52.10 |
| ORM | GORM | v1.31.1 |
| Database Driver | MySQL (via GORM) | v1.6.0 |
| Authentication | JWT (golang-jwt/jwt) | v5.3.0 |
| OAuth | golang.org/x/oauth2 + Google | v0.36.0 |
| Password Hashing | bcrypt (golang.org/x/crypto) | v0.50.0 |
| Config | Viper (JSON file + env override) | v1.21.0 |
| Logging | Logrus (JSON formatter) | v1.9.3 |
| Validation | go-playground/validator | v10.30.1 |
| AI / LLM | Google Generative AI Go SDK (Gemini) | v0.20.1 |
| File Storage | Cloudinary Go SDK | v2.15.0 |
| Email | Resend Go SDK | v3.2.0 |
| CV Parsing | docconv/v2 (PDF text extraction) | v2.0.0-pre.4 |
| API Docs | Swagger (swaggo/swag + fiber-swagger) | v1.16.6 |
| ID Generator | google/uuid | v1.6.0 |
| Migration | SQL file manual (tidak ada tool otomatis terdeteksi) | — |
| Containerization | Docker (multi-stage build: golang:1.25.3-alpine → alpine:latest) | — |

### Frontend (FE)

| Layer | Teknologi | Versi |
|---|---|---|
| Language | TypeScript | ~5.9.3 |
| UI Framework | React | ^19.2.0 |
| Build Tool | Vite | ^7.2.4 |
| Routing | React Router DOM | ^7.10.1 |
| Data Fetching | TanStack React Query | ^5.90.21 |
| HTTP Client | Axios | ^1.13.6 |
| CSS Framework | TailwindCSS v4 | ^4.1.18 |
| Animation | Framer Motion, motion | ^12.23.26, ^12.38.0 |
| UI Components | Shadcn/Radix UI | shadcn ^4.0.8, radix-ui ^1.4.3 |
| Charts | Recharts | ^2.15.4 |
| File Upload | react-dropzone | ^15.0.0 |
| Icons | lucide-react | ^0.561.0 |
| Font | @fontsource-variable/geist (Geist font) | ^5.2.8 |
| SEO | react-helmet-async | ^3.0.0 |
| Styling Utils | clsx, tailwind-merge, class-variance-authority | — |
| Containerization | Docker (node:22-alpine build → nginx:alpine serve) | — |

### Database

| Item | Detail |
|---|---|
| Database | MySQL 8.0 |
| ORM | GORM (tanpa AutoMigrate, menggunakan SQL migration files manual) |
| Connection Pool | Idle: 10, Max: 100, Lifetime: 300s |

### Infrastructure

| Item | Detail |
|---|---|
| Orchestration | Docker Compose (lokal) |
| BE Production | Google Cloud Run (`portofy-be-482363896451.asia-southeast2.run.app`) |
| FE Production | `portofy.net` |
| DB Prod | PERLU KLARIFIKASI (tidak terlihat dari kode apakah Cloud SQL atau instance lain) |

---

## Project Structure

```
portofId/
├── .env                        # Secret untuk docker-compose (DB credentials)
├── .gitignore
├── .vite/                      # Cache Vite (generated)
├── docker-compose.yml          # Orchestration lokal: BE + MySQL
├── prompt.md                   # PERLU KLARIFIKASI (file dokumentasi / prompt internal)
├── config.json/                # PERLU KLARIFIKASI (terdeteksi sebagai direktori, bukan file)
│
├── BE/                         # Backend Go
│   ├── cmd/
│   │   └── main.go             # Entrypoint aplikasi
│   ├── config.json             # Konfigurasi aplikasi (dibaca Viper)
│   ├── Dockerfile
│   ├── go.mod / go.sum
│   ├── docs/                   # Generated Swagger docs (docs.go, swagger.json, swagger.yaml)
│   ├── public/                 # Static file serving (uploads lokal)
│   ├── db/
│   │   └── migrations/         # SQL migration files (up/down, 10 tabel)
│   └── internal/
│       ├── auth/               # JWT generation helper
│       ├── config/             # Inisialisasi semua dependency (Fiber, GORM, Viper, Logrus, dll)
│       ├── delivery/
│       │   └── http/
│       │       ├── controller/ # HTTP handler (11 controller)
│       │       ├── middleware/ # Auth middleware (JWT parsing)
│       │       └── route/      # Route registration (guest, public, auth)
│       ├── entity/             # GORM entity (database schema)
│       ├── model/              # Request/response model, AI agent model, converter
│       │   ├── agent/          # Model khusus untuk AI (CV Parser, AI Description)
│       │   └── converter/      # Entity → Response converter
│       ├── pkg/
│       │   ├── agent/          # Gemini AI client wrapper
│       │   ├── mail/           # Resend email client
│       │   ├── storage/        # Cloudinary + LocalStorage
│       │   └── utils/          # Helper functions (OTP, UUID, prompt builder, dll)
│       ├── repository/         # Data access layer (13 repository)
│       └── usecase/            # Business logic layer (11 usecase)
│
└── FE/                         # Frontend React + TypeScript + Vite
    ├── Dockerfile
    ├── index.html
    ├── package.json
    ├── vite.config.ts
    ├── components.json         # Shadcn UI config
    └── src/
        ├── main.tsx            # Entrypoint React
        ├── App.tsx             # Route tree
        ├── index.css           # Global CSS (Tailwind + custom)
        ├── @types/             # TypeScript type definitions
        ├── api/                # Axios client + error wrapper
        ├── config/             # API base URL config, storage key config
        ├── contants/           # PERLU KLARIFIKASI (typo dari "constants"?)
        ├── data/               # PERLU KLARIFIKASI (static data atau seed?)
        ├── hooks/
        │   ├── mutations/      # TanStack Mutation hooks (per domain)
        │   ├── queries/        # TanStack Query hooks (per domain, public + admin)
        │   └── ui/             # UI utility hooks (breadcrumbs)
        ├── layouts/            # Layout wrappers (Auth, Dashboard, Home)
        ├── lib/                # Utility library (PERLU KLARIFIKASI isi)
        ├── pages/              # Page components (Auth, Dashboard, Home)
        ├── sections/           # Section components (auth, dashboard, marketing, portfolio)
        ├── services/           # Axios service classes (per domain)
        ├── templates/
        │   └── default/        # Template portfolio publik "Default"
        │       ├── components/ # Komponen spesifik template
        │       ├── hooks/      # Hook spesifik template
        │       ├── layout/     # Layout template
        │       └── pages/      # Halaman publik template (Home, About, Projects, dll)
        └── utils/              # Utility functions FE
```

---

## Architecture Overview

### Backend — Layered Architecture

```
HTTP Request
    │
    ▼
[Fiber HTTP Server]
    │
    ▼
[CORS Middleware] (AllowOrigins: *)
    │
    ├──► [Guest Routes]   → tidak ada middleware
    ├──► [Public Routes]  → tidak ada middleware
    └──► [Auth Routes]    → [Auth Middleware] (JWT validation)
              │
              ▼
         [Controller]
              │  - Baca request body
              │  - Baca user dari Fiber Locals
              │  - Panggil UseCase
              │  - Tulis HTTP response
              ▼
         [UseCase]
              │  - Validasi input (go-playground/validator)
              │  - Business logic
              │  - Panggil Repository
              │  - Gunakan Fiber Error untuk error response
              ▼
         [Repository]
              │  - Query database via GORM
              │  - Query AI via GeminiAgent
              │  - Upload file via CloudinaryStorage
              ▼
    [MySQL 8.0 / Cloudinary / Gemini API]
```

### Frontend — Layer

```
Browser
    │
    ▼
[React App (Vite SPA)]
    │
    ├── [BrowserRouter]        (React Router DOM)
    ├── [QueryClientProvider]  (TanStack React Query)
    └── [HelmetProvider]       (react-helmet-async)
              │
              ▼
         [App.tsx]             (Route Tree)
              │
              ├── [HomeLayout]        → Marketing pages
              ├── [DashboardLayout]   → Auth-protected dashboard
              │       └── Guard: localStorage.getItem(token) + useCurrent query
              ├── [AuthLayout]        → Login, Register, OAuth Callback
              └── [DefaultLayout]     → Public portfolio /:username
```

---

## Domain Map

### 1. User

- **Tujuan**: Manajemen akun pengguna (registrasi, login, update, logout)
- **File Utama BE**:
  - `entity/user_entity.go` — struct `User` (id, username, password, email, auth_provider)
  - `repository/user_repository.go` — FindByUsername, FindByEmail, dll
  - `usecase/user_usecase.go` — Create, Login, Logout, Update, Current, CreateVerificationCode
  - `controller/user_controller.go`
  - `model/user_model.go`, `model/converter/user_converter.go`
- **File Utama FE**:
  - `services/auth.service.ts`
  - `hooks/mutations/auth/` (useLogin, useLogout, useRegister, useSendOtp, useUpdateUser)
  - `hooks/queries/user/useCurrent`
  - `pages/auth/LoginPage.tsx`, `RegisterPage.tsx`, `OAuthCallbackPage.tsx`
  - `pages/dashboard/SettingsPage.tsx`
- **Dependency Eksternal**: bcrypt (password hashing), Resend (kirim OTP email), JWT

---

### 2. Profile

- **Tujuan**: Data profil portfolio pengguna (nama lengkap, bio, alamat, avatar, tags, tema)
- **File Utama BE**:
  - `entity/profile_entity.go` — struct `Profile` (relasi ke User via UserId)
  - `repository/profile_repository.go`
  - `usecase/profile_usecase.go`
  - `controller/profile_controller.go`
  - `model/profile_model.go`, `model/converter/profile_converter.go`
- **File Utama FE**:
  - `services/profile.service.ts`
  - `hooks/queries/profile/useGetProfile`, `useGetPublicProfile`
  - `pages/dashboard/ProfilePage.tsx`
- **Catatan**: Field `Tags` disimpan sebagai JSON array di kolom MySQL.

---

### 3. Project

- **Tujuan**: Data proyek portfolio (judul, deskripsi, challenge, solution, tools, gallery, features)
- **File Utama BE**:
  - `entity/project_entity.go` — Tools (JSON array), Gallery (JSON array of ProjectGallery), Features (JSON array of ProjectFeature)
  - `repository/project_repository.go`
  - `usecase/project_usecase.go`
  - `controller/project_controller.go`
  - `model/project_model.go`, `model/converter/project_converter.go`
- **File Utama FE**:
  - `services/project.service.ts`
  - `hooks/queries/project/` (useProject, useProjects, useAdminProject, useAdminProjects)
  - `hooks/mutations/project/`
  - `pages/dashboard/ProjectPage.tsx`
  - `templates/default/pages/ProjectsPage.tsx`, `ProjectDetailPage.tsx`
- **Operasi**: Create, Get, List, Update, Delete, BulkCreate, BulkDelete, UploadThumbnail, UploadGallery

---

### 4. Experience

- **Tujuan**: Data pengalaman kerja (perusahaan, posisi, tipe employment, lokasi, periode, deskripsi)
- **File Utama BE**:
  - `entity/experience_entity.go` — StartDate/EndDate pakai `*time.Time`
  - `repository/experience_repository.go`
  - `usecase/experience_usecase.go`
  - `controller/experience_controller.go`
  - `model/experience_model.go`, `model/converter/experience_converter.go`
- **File Utama FE**:
  - `services/experience.service.ts`
  - `hooks/queries/experience/`, `hooks/mutations/experience/`
  - `pages/dashboard/ExperiencePage.tsx`
- **Operasi**: Create, Get, GetAll, Update, Delete, BulkCreate, BulkDelete, UploadImage

---

### 5. Education

- **Tujuan**: Data riwayat pendidikan
- **File Utama BE**:
  - `entity/education_entity.go`
  - `repository/education_repository.go`
  - `usecase/education_usecase.go`
  - `controller/education_controller.go`
  - `model/education_model.go`, `model/converter/education_converter.go`
- **File Utama FE**:
  - `services/education.service.ts`
  - `hooks/queries/education/`, `hooks/mutations/education/`
  - `pages/dashboard/EducationPage.tsx`
- **Operasi**: Create, Get, GetAll, Update, Delete, BulkCreate, BulkDelete, UploadImage

---

### 6. Achievement

- **Tujuan**: Data pencapaian/penghargaan pengguna
- **File Utama BE**:
  - `entity/achievement_entity.go`
  - `repository/achievement_repository.go`
  - `usecase/achievement_usecase.go`
  - `controller/achievement_controller.go`
  - `model/achievement_model.go`, `model/converter/achievement_converter.go`
- **File Utama FE**:
  - `hooks/queries/achievement/`, `hooks/mutations/achievement/`
  - `pages/dashboard/AchievementPage.tsx`
  - `templates/default/pages/AchievementsPage.tsx`
- **Operasi**: Create, Get, List, Update, Delete, BulkCreate, BulkDelete, UploadImage

---

### 7. Skill

- **Tujuan**: Data skill/keahlian pengguna (judul + level)
- **File Utama BE**:
  - `entity/skill_entity.go` — field: title, level
  - `repository/skill_repository.go`
  - `usecase/skill_usecase.go`
  - `controller/skill_controller.go`
  - `model/skill_model.go`, `model/converter/skill_converter.go`
- **File Utama FE**:
  - `services/skill.service.ts`
  - `hooks/queries/skill/`, `hooks/mutations/skill/`
  - `pages/dashboard/SkillPage.tsx`
- **Operasi**: Create, Get, GetAll, Update, Delete, BulkCreate, BulkDelete (tanpa UploadImage)

---

### 8. Social

- **Tujuan**: Link media sosial pengguna (platform + URL)
- **File Utama BE**:
  - `entity/social_entity.go` — field: platform, link_url
  - `repository/social_repository.go`
  - `usecase/social_usecase.go`
  - `controller/social_controller.go`
  - `model/social_model.go`, `model/converter/social_converter.go`
- **File Utama FE**:
  - `services/social.service.ts`
  - `hooks/queries/social/`, `hooks/mutations/social/`
- **Operasi**: Create, Get, GetAll, Update, Delete (tanpa Bulk, tanpa UploadImage)

---

### 9. AI Description (Agent)

- **Tujuan**: Generate deskripsi teks otomatis via Gemini AI untuk konten portfolio
- **File Utama BE**:
  - `pkg/agent/gemini_agent.go` — `GeminiAgent` interface: `GenerateJSON`, `GenerateText`
  - `repository/ai_description_repository.go` — prompt builder + Gemini call untuk About, Experience, Education, Project
  - `usecase/ai_description_usecase.go`
  - `controller/ai_desctiption_controller.go` (perhatikan typo: `desctiption`)
  - `model/agent/ai_description_generate_model.go`
- **File Utama FE**:
  - `services/ai_description.service.ts`
  - `hooks/mutations/agent/`
- **Dependency Eksternal**: Google Gemini API (model: `gemini-3.5-flash`)
- **Endpoint**:
  - `POST /api/agent/description/about`
  - `POST /api/agent/description/experience`
  - `POST /api/agent/description/education`
  - `POST /api/agent/description/project`
- **Output**: JSON structured (paragraphs, summary, bullets, tagline, dll sesuai domain)

---

### 10. CV Parser (Agent)

- **Tujuan**: Parsing file CV (PDF) → ekstrak data portfolio secara otomatis via AI
- **File Utama BE**:
  - `repository/cv_parser_repository.go` — 6 Gemini calls: CleanerText, ProfileAgent, ExperienceAgent, EducationAgent, SkillsAgent, ProjectsAgent
  - `usecase/cv_parser_usecase.go`
  - `controller/cv_parser_controller.go`
  - `pkg/utils/cv_parser_prompt.go` — prompt definitions
  - `model/agent/cv_parser_model.go` — DTO: ProfileDTO, ExperienceDTO, EducationDTO, SkillDTO, ProjectDTO
- **File Utama FE**:
  - `services/parsed_cv.service.ts`
  - `pages/dashboard/CVParserPage.tsx`
- **Dependency Eksternal**: docconv/v2 (PDF text extraction), Gemini API
- **Endpoint**: `POST /api/agent/cv/parse`
- **Flow**: Upload PDF → Extract text (docconv) → Clean text (Gemini text) → Parse sections (Gemini JSON x5)

---

### 11. OAuth (Google)

- **Tujuan**: Login/registrasi via akun Google
- **File Utama BE**:
  - `config/google_oauth.go` — konfigurasi OAuth2
  - `usecase/oauth_usecase.go` — Login (redirect URL), Callback (exchange code → user info → JWT)
  - `controller/oauth_controller.go`
- **File Utama FE**:
  - `pages/auth/OAuthCallbackPage.tsx`
- **Dependency Eksternal**: Google OAuth 2.0 (`https://www.googleapis.com/oauth2/v2/userinfo`)
- **Endpoint**:
  - `GET /api/auth/google/login` → redirect ke Google
  - `GET /api/auth/google/callback` → terima code, buat/cari user, return JWT

---

### 12. Template

- **Tujuan**: Entitas template portfolio yang tersedia di platform
- **File Utama BE**:
  - `entity/template_entity.go` — field: name, category, tags, description, badge, used_count, is_pro
  - `model/template_model.go`
- **Catatan**: Tidak ditemukan controller atau usecase untuk Template. Entitas ada di database (migrasi ada), namun tidak ada endpoint aktif. Route Template di FE dikomentari (`{/* <Route path="templates" ... /> */}`).
- **Status**: PERLU KLARIFIKASI (apakah fitur ini in-progress, dihapus, atau belum diimplementasi)

---

### 13. Email Verification (OTP)

- **Tujuan**: Verifikasi email via OTP 6 digit sebelum registrasi
- **File Utama BE**:
  - `entity/email_verification.go` — field: id, email, otp_code, expired_at
  - `repository/email_verification_repository.go`
  - Terintegrasi langsung dalam `usecase/user_usecase.go`
  - `pkg/mail/resend.go` — kirim email OTP via Resend
  - `pkg/utils/generate_6digit.go` — generate OTP
- **Dependency Eksternal**: Resend (email service)
- **Flow**: Request OTP → Generate 6 digit → Simpan ke DB (15 menit) → Kirim email via Resend

---

## Data Flow

### Flow 1: Registrasi User (Local)

```
FE: RegisterPage
  → POST /api/users/_otp (sendOtp) → BE: UserController.RequestOTP
      → UserUseCase.CreateVerificationCode
          → Generate 6-digit OTP
          → EmailVerificationRepository.Create (simpan ke DB)
          → Resend.SendOtpViaResend (kirim email)

  → POST /api/users (register dengan OTP) → BE: UserController.Register
      → UserUseCase.Create
          → EmailVerificationRepository.FindByEmail (validasi OTP)
          → Cek OTP code + expired_at
          → UserRepository.CountById (cek username unik)
          → bcrypt.GenerateFromPassword (hash password)
          → utils.GenerateUserId (generate ID)
          → UserRepository.Create (simpan user)
          → auth.GenerateJWT (buat token 72 jam)
          → EmailVerificationRepository.Delete (hapus OTP)
          → Commit TX
      → Return: { user, token }
  → FE: Simpan token ke localStorage
```

### Flow 2: Login User (Local)

```
FE: LoginPage
  → POST /api/users/_login → BE: UserController.Login
      → UserUseCase.Login
          → UserRepository.FindByUsername
          → Cek auth_provider == "local"
          → bcrypt.CompareHashAndPassword
          → auth.GenerateJWT (buat token 72 jam)
          → Commit TX
      → Return: { user, token }
  → FE: Simpan token ke localStorage → redirect ke /app
```

### Flow 3: Login via Google OAuth

```
FE: Klik "Login dengan Google"
  → GET /api/auth/google/login → BE: OauthController.Login
      → OauthUseCase.Login (build Google auth URL)
      → Redirect ke Google

Google → Redirect ke /api/auth/google/callback?code=...

  → GET /api/auth/google/callback → BE: OauthController.Callback
      → OauthUseCase.Callback
          → oauth2.Exchange (code → access token)
          → GET https://www.googleapis.com/oauth2/v2/userinfo
          → UserRepository.FindByEmail
              - Jika tidak ada: buat user baru (auth_provider="google")
              - Jika ada: gunakan existing user
          → auth.GenerateJWT
          → Commit TX
      → Return token + redirect ke FE

FE: OAuthCallbackPage menerima token → simpan ke localStorage → redirect ke /app
```

### Flow 4: Request Terautentikasi (Dashboard)

```
FE: DashboardLayout mount
  → localStorage.getItem(token) → jika kosong: redirect ke /auth/login
  → useCurrent query → GET /api/users/_current
      → AuthMiddleware: parse JWT dari header Authorization: Bearer <token>
          → Simpan { id } ke Fiber Locals "auth"
      → UserController.Current
      → Return: UserResponse

  (setelah user verified)
  → Render dashboard content via <Outlet />
```

### Flow 5: Akses Portfolio Publik

```
Browser: GET /:username
  → FE: DefaultLayout (/:username route)
      → useGetPublicProfile hook
          → GET /api/public/:username (tanpa autentikasi)
          → Return: profil publik pengguna
      → Render template portfolio default
      → Sub-routes: /about, /projects, /projects/:id, /achievements, /contact
```

### Flow 6: Upload Image

```
FE: Form upload image
  → POST /api/{domain}/_image atau /api/{domain}/_thumbnail
      → AuthMiddleware: validasi JWT
      → XxxController.UploadImage
          → Baca file dari multipart form
          → XxxUseCase.UploadImage
              → UploadImageRepository.UploadImage
                  → CloudinaryStorage.Upload
                      → Cloudinary API (upload ke folder spesifik)
              → Entity update: simpan URL Cloudinary ke DB
          → Return: URL image
```

### Flow 7: Generate AI Description

```
FE: Dashboard (tombol "Generate with AI")
  → POST /api/agent/description/{domain}
      → AuthMiddleware: validasi JWT
      → AIDescriptionController.GenerateXxxDesc
          → AIDescriptionUseCase.GenerateXxxDesc
              → AIDescriptionRepository.GenerateXxxDesc
                  → Build prompt (fmt.Sprintf + data user)
                  → GeminiAgent.GenerateJSON
                      → Gemini API (model: gemini-3.5-flash)
                  → Return JSON string
      → Return: structured JSON (paragraphs/summary/bullets/dll)
```

### Flow 8: CV Parser

```
FE: CVParserPage
  → POST /api/agent/cv/parse (multipart: file PDF)
      → AuthMiddleware: validasi JWT
      → CVParserController.ParseCV
          → CVParserUseCase
              → docconv: ekstrak teks dari PDF
              → CVParserRepository.CleanerText
                  → GeminiAgent.GenerateText (bersihkan teks)
              → (Parallel atau sequential — PERLU KLARIFIKASI)
              → CVParserRepository.ProfileAgent → Gemini JSON
              → CVParserRepository.ExperienceAgent → Gemini JSON
              → CVParserRepository.EducationAgent → Gemini JSON
              → CVParserRepository.SkillsAgent → Gemini JSON
              → CVParserRepository.ProjectsAgent → Gemini JSON
          → Return: ParsedCVResponse {profile, experiences, educations, skills, projects}
```

---

## Authentication Flow

### Variasi 1: Local Auth (Email/Password + OTP)

1. **Request OTP**: `POST /api/users/_otp` (unauthenticated)
   - Buat OTP 6 digit, simpan ke tabel `email_verifications` (expired 15 menit)
   - Kirim email via Resend
2. **Register**: `POST /api/users` (unauthenticated)
   - Validasi OTP
   - Hash password (bcrypt)
   - Simpan user dengan `auth_provider = "local"`
   - Return JWT (72 jam)
3. **Login**: `POST /api/users/_login` (unauthenticated)
   - Cari user by username
   - Cek `auth_provider == "local"`
   - Compare password bcrypt
   - Return JWT (72 jam)

### Variasi 2: Google OAuth 2.0

1. **Initiate**: `GET /api/auth/google/login` → redirect ke Google
2. **Callback**: `GET /api/auth/google/callback`
   - Exchange code → access token (Google)
   - Fetch user info dari `googleapis.com/oauth2/v2/userinfo`
   - Upsert user (buat baru jika belum ada) dengan `auth_provider = "google"`, password kosong
   - Return JWT (72 jam)

### Token Storage & Validation

- **Storage FE**: `localStorage` dengan key dari `VITE_AUTH_TOKEN` env var (default: `"authToken"`)
- **Format Token**: `Authorization: Bearer <JWT>`
- **JWT Claims**: `{ id, username, exp (72h), iat }`
- **JWT Secret**: Dari `config.json` → `jwt.secret` (atau env override)
- **Validasi**: `AuthMiddleware` — parse dan validasi JWT, inject `*model.Auth{ID}` ke Fiber Locals
- **Logout**: Hanya log sisi server. Token **tidak diinvalidasi** di server. Komentar di kode: `"saat ini logout hanya log saja, tidak invalidate token"`

---

## Authorization Flow

Tidak ditemukan role-based authorization. Otorisasi yang ada hanya:

1. **Autentikasi vs tidak**: Route dibagi menjadi `GuestRoute`, `PublicRoute`, `AuthRoute`
2. **Ownership check**: Setiap usecase menggunakan `user_id` dari JWT untuk memfilter data. Contoh: hanya mengambil project milik user yang sedang login

Tidak ada sistem role (admin/user), permission matrix, atau multi-tenant authorization yang ditemukan.

---

## Storage Flow

### 1. Cloudinary (Primary Image Storage)

- **Digunakan untuk**: Avatar profile, thumbnail project, gallery project, image experience, image education, image achievement
- **File**:
  - `config/cloudinary.go` — inisialisasi client
  - `pkg/storage/cloudinary_storage.go` — `Upload(ctx, file, folder)` → return `SecureURL`; `Delete(ctx, publicID)`
  - `repository/upload_image_repository.go` — wrapper untuk usecase
- **Config**: `cloudinary.cloud_name`, `cloudinary.api_key`, `cloudinary.api_secret` dari `config.json`
- **Folder Organization**: PERLU KLARIFIKASI (tidak terlihat konvensi folder yang eksplisit di level config, diteruskan sebagai parameter ke repository)

### 2. Local Storage (Ada tapi tidak digunakan di bootstrap)

- **File**: `pkg/storage/local_storage.go`
- **Interface**: `FileStorage` dengan method `SaveLocalImage`
- **Implementasi**: Simpan ke `./public/uploads/` dengan nama unik `IMG-{timestamp}-{char}.{ext}`
- **Status**: Struct dan fungsi ada, namun `NewLocalStorage` **tidak dipanggil** di `config/app.go`. Yang dipakai hanya `CloudinaryStorage`.

### 3. Static File Serving (BE)

- Fiber melayani `/public` dari direktori `./public` (untuk local storage fallback)

### 4. Database (MySQL 8.0)

- Semua data relasional disimpan di MySQL via GORM
- JSON columns: `tags`, `tools`, `gallery`, `features` (disimpan sebagai JSON string di MySQL dengan `serializer:json`)
- Timestamps: `created_at`, `updated_at` dalam milliseconds (Unix)

---

## External Integrations

| Service | Tujuan | Library | Config Key |
|---|---|---|---|
| **Google Gemini AI** | Generate teks AI (deskripsi, CV parser) | `github.com/google/generative-ai-go/genai` | `google_ai_studio.api_key` |
| **Cloudinary** | Upload dan hosting gambar | `github.com/cloudinary/cloudinary-go/v2` | `cloudinary.{cloud_name,api_key,api_secret}` |
| **Resend** | Kirim email OTP | `github.com/resend/resend-go/v3` | `resend.{api_key,email}` |
| **Google OAuth 2.0** | Login dengan Google | `golang.org/x/oauth2` + `golang.org/x/oauth2/google` | `google_oauth.{client_id,client_secret,redirect_url_*}` |
| **Google User Info API** | Ambil data user setelah OAuth | `net/http` (plain HTTP call) | — (via access token dari OAuth) |
| **Google Cloud Run** | Hosting Backend production | (infrastructure) | Konfigurasi di Dockerfile + deploy target |

---

## Configuration System

### Backend

- **Tool**: Viper (`github.com/spf13/viper`)
- **Format**: JSON (`config.json`)
- **Path Search**: `./../` dan `./` (relatif dari binary)
- **Override via Env**: `config.AutomaticEnv()` + `SetEnvKeyReplacer("." → "_")`
  - Contoh: `database.host` dapat di-override via `DATABASE_HOST`
- **Env yang dikenali** (dari `gorm.go`): `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `DB_PORT`
- **Env PORT** (dari `main.go`): `PORT` untuk override port server

Konfigurasi utama dalam `config.json`:
```
app.name          → "portofy"
web.port          → 8080
web.prefork       → false
log.level         → 6
database.*        → MySQL connection
jwt.secret        → JWT signing key
resend.*          → Email API key
google_ai_studio.api_key → Gemini API key
cloudinary.*      → Cloudinary credentials
google_oauth.*    → Google OAuth credentials
frontend.url_*    → Frontend URL (prod/local)
```

### Frontend

- **Tool**: Vite environment variables (`import.meta.env`)
- **File**: `.env` di root `FE/`
- **Variabel**:
  - `VITE_API_URL` — base URL API backend (default: production Cloud Run URL jika tidak di-set)
  - `VITE_APP_URL` — URL frontend
  - `VITE_AUTH_TOKEN` — key name untuk localStorage token (nilai: `"authToken"`)

---

## Repeated Patterns

### 1. Pola CRUD Seragam per Domain

Setiap domain (Project, Experience, Education, Achievement, Skill, Social) mengikuti pola yang sama:
- `entity/{domain}_entity.go` → database struct
- `model/{domain}_model.go` → request/response model
- `model/converter/{domain}_converter.go` → entity ↔ response conversion
- `repository/{domain}_repository.go` → data access
- `usecase/{domain}_usecase.go` → business logic
- `controller/{domain}_controller.go` → HTTP handler
- Route di `route.go`

### 2. Generic Base Repository

`repository/repository.go` menyediakan `Repository[T any]` generik dengan method: `Create`, `Update`, `Delete`, `CountById`, `FindById`. Semua domain repository meng-embed atau memanfaatkan ini.

### 3. GORM Transaction Pattern

Setiap operasi usecase membuka transaksi:
```go
tx := c.DB.WithContext(ctx).Begin()
defer tx.Rollback()
// ... operasi ...
tx.Commit()
```
Termasuk untuk operasi read-only. Komentar di kode (`TODO(post-prod): read-only, tidak perlu tx`) mengindikasikan ini disadari sebagai pola yang bisa dioptimasi.

### 4. Fiber Error Pattern

UseCase melempar error menggunakan `fiber.NewError(statusCode, message)` yang langsung ditangkap oleh `ErrorHandler` di Fiber config untuk dikonversi ke JSON response.

### 5. TanStack Query Dual-Pattern (Public + Admin)

Setiap domain di FE memiliki dua set query hooks:
- `useXxx` / `useXxxs` → query data publik (via `/api/public/:username/...`)
- `useAdminXxx` / `useAdminXxxs` → query data dashboard terautentikasi (via `/api/{domain}`)

### 6. Service Class Pattern (FE)

Semua komunikasi API di FE menggunakan class dengan singleton instance:
```typescript
class XxxService { ... }
export default new XxxService();
```

### 7. BulkCreate / BulkDelete Pattern

Domain Project, Experience, Education, Achievement, Skill memiliki endpoint bulk:
- `POST /api/{domain}/_bulk` → BulkCreate
- `DELETE /api/{domain}/_bulk` → BulkDelete

Social tidak memiliki endpoint bulk.

### 8. Image Upload Pattern

Domain yang mendukung gambar (Project, Experience, Education, Achievement, Profile) memiliki endpoint terpisah untuk upload:
- `POST /api/{domain}/_image` atau `_thumbnail` atau `_gallery` atau `_avatar`

Skill dan Social tidak memiliki upload gambar.

### 9. JSON Column Pattern

Beberapa field disimpan sebagai JSON di MySQL menggunakan GORM serializer:
- `Profile.Tags` → `[]string`
- `Project.Tools` → `[]string`
- `Project.Gallery` → `[]ProjectGallery`
- `Project.Features` → `[]ProjectFeature`
- `Template.Tags` → `[]string`

---

## Variations & Inconsistencies

### 1. Dua Storage System (Cloudinary vs LocalStorage)

**Variasi A** — `pkg/storage/cloudinary_storage.go`: Upload ke Cloudinary, return SecureURL
**Variasi B** — `pkg/storage/local_storage.go`: Simpan ke `./public/uploads/`, return local URL

`LocalStorage` mengimplementasikan interface `FileStorage`, namun tidak dipakai di `Bootstrap()`. Hanya `CloudinaryStorage` yang diregistrasikan. Kedua file ada berdampingan di `pkg/storage/`.

### 2. Dua Mode Redirect URL Google OAuth

Dalam `config/google_oauth.go`, `RedirectURL` di-hardcode ke `redirect_url_local`:
```go
RedirectURL: config.GetString("google_oauth.redirect_url_local"),
```
Namun `config.json` memiliki dua key: `redirect_url_prod` dan `redirect_url_local`. Pemilihan prod/local tidak dilakukan secara dinamis di `google_oauth.go`; selalu pakai `_local`.

### 3. Dua Environment untuk Frontend URL

`config.json` memiliki:
- `frontend.url_prod` → `https://portofy.net`
- `frontend.url_local` → `http://localhost:5173`

Penggunaan mana yang dipilih di runtime: PERLU KLARIFIKASI (bergantung pada implementasi di oauth_controller yang belum dibaca penuh).

### 4. Typo pada Nama File Controller

File: `controller/ai_desctiption_controller.go` (typo: `desctiption` bukan `description`)

### 5. Typo pada Nama Direktori FE

Direktori: `FE/src/contants/` (typo: `contants` bukan `constants`)

### 6. Dua API Base URL di FE

`FE/src/config/api.config.ts`:
```typescript
baseURL: import.meta.env.VITE_API_URL || "https://portofy-be-482363896451.asia-southeast2.run.app/api"
```
`FE/.env`:
```
VITE_API_URL=http://127.0.0.1:8080/api  (aktif)
# VITE_API_URL=https://... (dikomentari)
```
Default fallback hardcode ke production URL jika env tidak di-set.

### 7. UseCase Menerima Concrete Type, Bukan Interface

Di `user_usecase.go`:
```go
// TODO(post-prod): UserRepository jadi interface untuk testability
UserRepository *repository.UserRepository
```
Sebagian besar UseCase menerima concrete struct repository, bukan interface. Ini berbeda dengan `pkg/agent/gemini_agent.go` yang mengekspos interface `GeminiAgent`.

### 8. Read-only Operation Menggunakan Transaction

Beberapa operasi baca (Get, Current, GetByUsername) membuka GORM transaction padahal tidak diperlukan. Komentar `TODO(post-prod)` mengindikasikan ini diketahui oleh developer.

### 9. Template Fitur — Entitas Ada, Controller Tidak Ada

Tabel `templates` ada di database migration dan ada `entity/template_entity.go` dan `model/template_model.go`, namun tidak ada controller, usecase, atau repository untuk domain ini. Route di FE juga dikomentari.

---

## Areas Requiring Clarification

1. **`config.json` di root project** — Terdeteksi sebagai direktori (`"isDir":true`), bukan file. Ini berbeda dengan `BE/config.json` yang merupakan file konfigurasi valid. Perlu klarifikasi apakah ini artefak atau salah.

2. **`prompt.md` di root project** — Tidak dibaca. Perlu klarifikasi isi dan fungsinya.

3. **Database production** — Tidak terlihat konfigurasi Cloud SQL atau managed database untuk environment production. DB production terhubung ke apa?

4. **Migration execution** — Tidak ada tool migrasi (golang-migrate, goose, dll) yang terdeteksi dalam dependencies. File SQL migration ada di `db/migrations/`. Bagaimana migration ini dijalankan di production?

5. **Sequential vs Parallel CV Parsing** — Di `cv_parser_usecase.go` (tidak dibaca penuh), tidak jelas apakah 5 Gemini calls untuk parsing CV dilakukan secara sequential atau concurrent (goroutine).

6. **`FE/src/contants/home/`** — Isi direktori ini tidak di-scan. Tidak jelas apakah berisi data statis untuk halaman home.

7. **`FE/src/data/`** — Isi direktori ini tidak di-scan. Tidak jelas apakah berisi mock data, seed data, atau static content.

8. **`FE/src/lib/`** — Isi direktori ini tidak di-scan. Kontennya tidak diketahui.

9. **Template domain** — Entitas, model, dan migrasi ada. Controller/Usecase tidak ada. Route FE dikomentari. Status pengembangan fitur ini tidak jelas.

10. **Google OAuth `redirect_url` selection** — `config/google_oauth.go` selalu menggunakan `redirect_url_local`. Bagaimana switch ke production URL dikelola?

11. **`FE/src/sections/portfolio/`** — Direktori ini terdeteksi kosong (`Empty directory`). Apakah ini placeholder yang belum terisi?

12. **`FE/src/templates/default/hooks/`** — Isi tidak di-scan. Tidak jelas hook apa saja yang dimiliki template default.

13. **Logout token invalidation** — Kode menyebutkan bahwa logout hanya logging. Tidak ada blacklist token (Redis atau lain). Apakah ini intended behavior untuk saat ini?

14. **Body limit upload** — Fiber dikonfigurasi `BodyLimit: 10 * 1024 * 1024` (10 MB). Apakah ini mencukupi untuk semua skenario upload (terutama PDF CV dan gallery gambar)?

15. **`BE/public/` directory** — Direktori ini ada di BE untuk static file serving. Apakah digunakan untuk sesuatu selain fallback local storage?

16. **Test coverage** — Hanya satu file test ditemukan (`test/repository/ai_desc_test.go`, 25 bytes). Direktori `test/usecase/` kosong. Kondisi aktual test coverage tidak diketahui.
