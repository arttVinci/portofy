# ARCHITECTURE REVIEW

> Input: `docs/SYSTEM_MAP.md` (v1.0, scan 2026-06-24)
> Scope: Portofy — Platform Portfolio Digital
> Tanggal review: 2026-06-24

---

## 1. Executive Summary

Portofy adalah **Portfolio Builder SaaS** dengan arsitektur **Two-Tier Monolith**: satu Backend Go (Fiber) dan satu Frontend React SPA. Backend menggunakan **Layered Architecture** (Controller → UseCase → Repository) yang konsisten di hampir semua domain. Frontend menggunakan **Feature-Sliced Structure** (pages / sections / hooks / services / templates) dengan TanStack Query sebagai state server.

Sistem secara keseluruhan sudah memiliki **pola yang solid dan berulang** di 8 dari 13 domain (User, Profile, Project, Experience, Education, Achievement, Skill, Social). Namun ditemukan **9 area variasi atau inkonsistensi** di level storage, konfigurasi, OAuth redirect, dependency injection, dan fitur yang setengah jadi (Template domain).

Terdapat **tiga keputusan arsitektur yang belum diselesaikan** dan berdampak langsung pada arah evolusi sistem: strategi storage, strategi environment/konfigurasi, dan batas tanggung jawab layer Repository terhadap AI calls.

---

## 2. Current Architecture

### 2.1 Architecture Style

| Area | Style yang Ditemukan |
|---|---|
| Backend keseluruhan | **Layered Monolith** (1 binary, 4 layer: Delivery → UseCase → Repository → Infra) |
| Frontend keseluruhan | **SPA (Single Page Application)** dengan **Feature-Sliced** layout |
| Komunikasi FE ↔ BE | **REST over HTTP** via Axios |
| Public portfolio | **Server-side routing via FE** (`/:username` dilayani React Router, data dari API) |
| AI Integration | **In-process** (Gemini dipanggil langsung dari Repository layer, bukan microservice terpisah) |
| Database | **Single MySQL instance**, tidak ada read replica atau sharding |
| File storage | **External service (Cloudinary)** sebagai primary; Local disk ada tapi tidak aktif di bootstrap |

---

### 2.2 Backend Layer Structure

```
[HTTP Request]
      │
      ▼
[Fiber v2]           ← HTTP Framework
      │
      ├── CORS Middleware (AllowOrigins: *)
      │
      ├── [Guest Routes]   /api/users, /api/users/_otp, /api/users/_login, /api/auth/google/*
      │     └── tanpa middleware
      │
      ├── [Public Routes]  /api/public/:username/**
      │     └── tanpa middleware
      │
      └── [Auth Routes]    /api/**  (semua resource domain + /api/agent/**)
            │
            └── [AuthMiddleware]     ← JWT parse → inject Auth{ID} ke Fiber Locals
                  │
                  ▼
            [Controller]             ← Delivery layer: HTTP binding, response shaping
                  │
                  ▼
            [UseCase]                ← Business logic: validasi, flow, transaksi
                  │
                  ▼
            [Repository]             ← Data access: GORM + Gemini AI + Cloudinary
                  │
                  ▼
            [MySQL / Gemini API / Cloudinary]
```

**Catatan observasi:**
- Repository layer memegang **tiga tanggung jawab berbeda**: query DB, call AI, upload file
- Dependency di-inject secara manual di `config/app.go` (Bootstrap function, bukan DI container)
- Semua Repository menerima `*gorm.DB` sebagai parameter per-call (bukan field struct)

---

### 2.3 Backend Domain Boundaries

| Domain | Entity | Repository | UseCase | Controller | Operasi Khusus |
|---|---|---|---|---|---|
| User | ✓ | ✓ | ✓ | ✓ | OTP, bcrypt, JWT |
| Profile | ✓ | ✓ | ✓ | ✓ | Upload avatar |
| Project | ✓ | ✓ | ✓ | ✓ | Bulk, thumbnail, gallery |
| Experience | ✓ | ✓ | ✓ | ✓ | Bulk, image |
| Education | ✓ | ✓ | ✓ | ✓ | Bulk, image |
| Achievement | ✓ | ✓ | ✓ | ✓ | Bulk, image |
| Skill | ✓ | ✓ | ✓ | ✓ | Bulk, tanpa image |
| Social | ✓ | ✓ | ✓ | ✓ | Tanpa bulk, tanpa image |
| AI Description | — | ✓ | ✓ | ✓ | Gemini call only |
| CV Parser | — | ✓ | ✓ | ✓ | docconv + Gemini x6 |
| OAuth | — | — | ✓ | ✓ | Google OAuth 2.0 |
| Template | ✓ | — | — | — | **TIDAK LENGKAP** |
| Email Verification | ✓ | ✓ | — | — | Embedded di UserUseCase |

---

### 2.4 Dependency Direction (Backend)

```
Controller    →  UseCase    →  Repository
                               ├──→ GORM (MySQL)
                               ├──→ GeminiAgent (interface)
                               └──→ CloudinaryStorage (concrete)

pkg/agent     →  genai.Client (Google AI SDK)
pkg/storage   →  cloudinary.Cloudinary
pkg/mail      →  resend.Client
pkg/utils     →  (stateless helpers, tidak ada dependency eksternal)

config/app.go →  (wiring semua layer: new → inject → bootstrap)
```

**Observasi dependency direction:**
- `GeminiAgent` diekspos sebagai **interface** (`pkg/agent/gemini_agent.go`)
- `CloudinaryStorage` dipakai sebagai **concrete struct** (bukan interface)
- `UserRepository`, `ProfileRepository`, dst. dipakai sebagai **concrete struct** di UseCase (bukan interface)
- Satu-satunya abstraksi layer yang konsisten adalah `GeminiAgent` interface

---

### 2.5 Frontend Architecture

```
main.tsx
  └── [Providers]: HelmetProvider → BrowserRouter → QueryClientProvider
        └── App.tsx (Route Tree)
              ├── HomeLayout     → Marketing: /, /about
              ├── DashboardLayout → /app/**  (guard: localStorage + useCurrent)
              │     ├── /app (Dashboard)
              │     ├── /app/profile
              │     ├── /app/projects
              │     ├── /app/achievements
              │     ├── /app/education
              │     ├── /app/experience
              │     ├── /app/skills
              │     ├── /app/cv-parser
              │     └── /app/settings
              ├── AuthLayout     → /auth/login, /auth/register, /auth/callback
              └── DefaultLayout  → /:username (public portfolio)
                    ├── /:username (home)
                    ├── /:username/about
                    ├── /:username/projects
                    ├── /:username/projects/:projectId
                    ├── /:username/achievements
                    └── /:username/contact
```

**Data fetching pattern FE:**

```
Page/Section
    │
    ▼
hooks/queries/  (TanStack Query — READ)
hooks/mutations/ (TanStack Query — WRITE)
    │
    ▼
services/*.service.ts   (Axios class, singleton)
    │
    ▼
api/apiClient.ts   (Axios instance + interceptor: inject token, handle 401)
    │
    ▼
BE REST API
```

**Auth guard FE:**
- `DashboardLayout` mengecek `localStorage.getItem(token)` secara synchronous
- Jika token ada, memanggil `useCurrent` untuk validasi token aktif ke server
- Jika 401, apiClient interceptor otomatis redirect ke `/auth/login` dan hapus token dari localStorage

---

### 2.6 Integration Pattern

| Integrasi | Pattern | Protocol |
|---|---|---|
| FE → BE | REST HTTP (Axios, JSON) | HTTP/HTTPS |
| BE → MySQL | GORM (connection pool) | TCP |
| BE → Gemini AI | Google GenAI SDK (sync call) | HTTPS gRPC |
| BE → Cloudinary | Cloudinary SDK (multipart upload) | HTTPS |
| BE → Resend | Resend SDK (HTTP API) | HTTPS |
| BE → Google OAuth | golang.org/x/oauth2 (redirect + code exchange) | HTTPS |
| BE → Google User Info | plain `net/http` GET | HTTPS |

**Observasi:** Integrasi ke Google User Info menggunakan plain `net/http`, sementara semua integrasi lain menggunakan SDK resmi. Ini satu-satunya integrasi yang tidak menggunakan library wrapper.

---

### 2.7 Configuration Pattern

**Backend:**
- Source utama: `config.json` (Viper)
- Override: environment variable dengan konvensi `KEY_SUBKEY` (dot → underscore)
- DB credentials: bisa dari env (`DB_HOST`, `DB_USER`, dst.) atau config.json
- API keys (Gemini, Cloudinary, Resend): hanya dari `config.json`, tidak ada env override yang terdeteksi secara eksplisit

**Frontend:**
- Source: `FE/.env` (Vite env variables)
- Variables: `VITE_API_URL`, `VITE_APP_URL`, `VITE_AUTH_TOKEN`
- Fallback: `api.config.ts` hardcode URL production jika `VITE_API_URL` tidak di-set

---

### 2.8 Authentication Pattern

- **Metode 1**: Username + Password (local) dengan OTP pre-registrasi
- **Metode 2**: Google OAuth 2.0 (redirect flow)
- **Token**: JWT HS256, 72 jam, claims: `{id, username, exp, iat}`
- **Storage**: `localStorage` di browser
- **Validasi BE**: `AuthMiddleware` — parse JWT per request
- **Logout**: Client-side only (hapus dari localStorage). Server tidak invalidasi token.

---

### 2.9 Storage Pattern

- **Primary**: Cloudinary (aktif, dipakai semua domain yang butuh image)
- **Secondary**: LocalStorage di `./public/uploads/` (implementasi ada, tidak diaktifkan di bootstrap)
- **Database**: MySQL via GORM, beberapa field pakai JSON serializer untuk data array/struct

---

## 3. Architecture Variations

Bagian ini mendokumentasikan semua titik variasi yang ditemukan dalam codebase tanpa memilih salah satu.

---

### VAR-01 · Storage Implementation

**Variasi A — Cloudinary**
- File: `pkg/storage/cloudinary_storage.go`
- Status: **aktif**, diinisialisasi di `config/app.go`
- Return: SecureURL (CDN Cloudinary)
- Delete: support `publicID`
- Tidak memiliki interface formal

**Variasi B — LocalStorage**
- File: `pkg/storage/local_storage.go`
- Status: **tidak aktif** di bootstrap, hanya ada sebagai implementasi
- Interface: `FileStorage` (dengan method `SaveLocalImage`)
- Return: URL local `{baseURL}/public/uploads/{uniqueName}`
- Tidak support Delete

**Catatan tambahan:** `CloudinaryStorage` tidak mengimplementasikan interface `FileStorage`. Keduanya berdiri sendiri tanpa kontrak abstraksi yang sama.

---

### VAR-02 · Google OAuth Redirect URL

**Variasi A — `redirect_url_local`**
- Nilai: `http://127.0.0.1:8080/api/auth/google/callback`
- Status: **yang dipakai** di `config/google_oauth.go` (hardcoded ke key `_local`)

**Variasi B — `redirect_url_prod`**
- Nilai: `https://portofy-be-482363896451.asia-southeast2.run.app/api/auth/google/callback`
- Status: **ada di config.json**, namun tidak dipakai di kode saat ini

Mekanisme pemilihan prod/local tidak ada. Selalu pakai `_local`.

---

### VAR-03 · Frontend URL di Backend Config

**Variasi A — `frontend.url_local`**
- Nilai: `http://localhost:5173`

**Variasi B — `frontend.url_prod`**
- Nilai: `https://portofy.net`

Penggunaan mana yang aktif di runtime tergantung implementasi `oauth_controller` yang belum diverifikasi sepenuhnya (PERLU KLARIFIKASI dari SYSTEM_MAP).

---

### VAR-04 · Repository Dependency Injection Style

**Variasi A — Concrete Struct (mayoritas domain)**
- `UserRepository`, `ProfileRepository`, `ProjectRepository`, dst. diinjeksi sebagai `*repository.XxxRepository`
- UseCase tidak bisa di-mock tanpa modifikasi

**Variasi B — Interface (GeminiAgent)**
- `agent.GeminiAgent` diekspos sebagai interface
- `AIDescriptionRepository` dan `CVParserRepository` menerima `agent.GeminiAgent`
- Memungkinkan mock untuk testing

Satu domain (User) bahkan memiliki komentar eksplisit `TODO(post-prod): UserRepository jadi interface untuk testability`.

---

### VAR-05 · API Base URL di Frontend

**Variasi A — via `VITE_API_URL` env var**
- Aktif ketika `.env` di-set
- Nilai saat ini: `http://127.0.0.1:8080/api` (local)

**Variasi B — Hardcoded fallback di `api.config.ts`**
- Aktif ketika `VITE_API_URL` tidak di-set
- Nilai: `https://portofy-be-482363896451.asia-southeast2.run.app/api` (production)

Dua nilai berbeda (local vs production) dengan mekanisme fallback yang asimetris.

---

### VAR-06 · Transaction Usage Pattern

**Variasi A — Transaction untuk operasi write (sesuai kebutuhan)**
- Contoh: `UserUseCase.Create`, `UserUseCase.Login`
- Transaction digunakan untuk memastikan atomicity

**Variasi B — Transaction untuk operasi read-only**
- Contoh: `UserUseCase.GetByUsername`, `UserUseCase.Current`
- `TODO(post-prod)` ada di kode, mengindikasikan ini disadari sebagai inkonsistensi

---

### VAR-07 · Image Upload Endpoint Naming

Domain yang mendukung upload gambar menggunakan naming yang berbeda-beda:

| Domain | Endpoint Upload |
|---|---|
| Profile | `POST /api/profiles/_avatar` |
| Achievement | `POST /api/achievements/_image` |
| Project | `POST /api/projects/_thumbnail` dan `POST /api/projects/_gallery` |
| Experience | `POST /api/experiences/_image` |
| Education | `POST /api/educations/_image` |

Tidak ada pola naming yang seragam. `_image`, `_avatar`, `_thumbnail`, `_gallery` dipakai bergantian.

---

### VAR-08 · Domain Capability Matrix (Bulk & Image)

| Domain | BulkCreate | BulkDelete | UploadImage |
|---|---|---|---|
| Project | ✓ | ✓ | ✓ (thumbnail + gallery) |
| Experience | ✓ | ✓ | ✓ |
| Education | ✓ | ✓ | ✓ |
| Achievement | ✓ | ✓ | ✓ |
| Skill | ✓ | ✓ | ✗ |
| Social | ✗ | ✗ | ✗ |
| Profile | ✗ | ✗ | ✓ (avatar) |

Social tidak memiliki bulk operation. Skill tidak memiliki image. Tidak ada dokumentasi eksplisit mengapa.

---

### VAR-09 · Template Domain Status

| Artifact | Status |
|---|---|
| DB Migration | ✓ Ada (`20260319184034_create_table_templates`) |
| Entity | ✓ Ada (`entity/template_entity.go`) |
| Model | ✓ Ada (`model/template_model.go`) |
| Repository | ✗ Tidak ada |
| UseCase | ✗ Tidak ada |
| Controller | ✗ Tidak ada |
| Route BE | ✗ Tidak ada |
| Route FE | ✗ Dikomentari |

Domain berada dalam kondisi **parsial**: schema siap, implementasi tidak ada.

---

## 4. Gap Analysis

### 4.1 Area yang Konsisten

| Area | Keterangan |
|---|---|
| **CRUD Domain Pattern** | 8 domain (User, Profile, Project, Experience, Education, Achievement, Skill, Social) mengikuti pola Entity → Model → Converter → Repository → UseCase → Controller → Route secara konsisten |
| **Generic Base Repository** | `Repository[T any]` dipakai sebagai fondasi, semua domain memanfaatkannya |
| **JWT Auth Flow** | Satu middleware (`AuthMiddleware`), satu format token, satu cara inject ke context |
| **Error Handling BE** | `fiber.NewError()` di UseCase → ditangkap `ErrorHandler` di Fiber config, konsisten di semua domain |
| **TanStack Query Dual-Hook** | Semua domain FE memiliki pasangan `useXxx` (public) dan `useAdminXxx` (authenticated) |
| **Service Class Singleton FE** | Semua service file menggunakan class + singleton export |
| **Swagger Documentation** | Semua controller didokumentasikan, tersedia di `/swagger/*` |

---

### 4.2 Area yang Tidak Konsisten

| Area | Ketidakkonsistenan |
|---|---|
| **Storage abstraction** | Cloudinary (concrete) dan LocalStorage (interface) tidak memiliki kontrak yang sama. Tidak ada single storage interface yang keduanya implement |
| **Repository injection style** | GeminiAgent menggunakan interface, semua domain repository menggunakan concrete struct |
| **OAuth redirect URL** | Config memiliki dua key (prod/local), kode hanya pakai satu (local) tanpa mekanisme switch |
| **Image upload endpoint naming** | `_avatar`, `_image`, `_thumbnail`, `_gallery` dipakai bergantian tanpa konvensi tunggal |
| **Transaction usage** | Operasi read-only menggunakan transaction, operasi write juga. Tidak ada pembedaan |
| **Bulk capability** | Social tidak punya bulk, Skill tidak punya image — tidak ada dokumentasi keputusan ini |
| **API URL fallback FE** | Env var arah local, fallback arah production — arah berlawanan |

---

### 4.3 Area yang Setengah Jadi

| Area | Status |
|---|---|
| **Template domain** | Schema + entity + model ada. Repository, UseCase, Controller, Route tidak ada. |
| **LocalStorage** | Implementasi lengkap, interface ada, tapi tidak terhubung ke Bootstrap |
| **Token invalidation (logout)** | Logout function ada, tapi hanya logging. Komentar TODO eksplisit ada di kode |
| **`sections/portfolio/`** | Direktori ada tapi kosong |
| **Test coverage** | Satu file test (25 bytes) untuk 13 domain, 11 usecase, 13 repository |

---

### 4.4 Area yang Belum Selesai (Clarification Items dari SYSTEM_MAP)

| Item | Keterangan |
|---|---|
| Database production | Tidak diketahui bagaimana DB production dikelola |
| Migration execution | Tool migration tidak terdeteksi, SQL files ada |
| CV Parser execution model | Sequential vs parallel tidak jelas |
| `FE/src/data/` | Isi tidak diketahui |
| `FE/src/lib/` | Isi tidak diketahui |
| `FE/src/contants/home/` | Isi tidak diketahui (typo direktori juga ada) |
| `config.json/` di root | Terdeteksi sebagai direktori, bukan file |

---

### 4.5 Dependency Boundary Violations

Berdasarkan layer yang ada, dependency yang melintas batas layer:

| Pelanggaran | Lokasi | Keterangan |
|---|---|---|
| **Repository memegang AI concern** | `repository/ai_description_repository.go`, `repository/cv_parser_repository.go` | Repository biasanya hanya untuk data access. Di sini repository membangun prompt dan memanggil AI |
| **UseCase import `fiber` package** | `usecase/user_usecase.go` (dan usecase lain) | UseCase menggunakan `fiber.NewError()` dan `fiber.StatusXxx` — ini berarti UseCase terikat ke HTTP framework |
| **Config memanggil `InitGoogleOAuth` dua kali** | `cmd/main.go` line 28 dan `config/app.go` line 38 | `InitGoogleOAuth` dipanggil di `main.go` dan lagi di dalam `Bootstrap()` — redundan |

---

## 5. Target Architecture Candidate

> Bagian ini adalah **kandidat** berdasarkan evolusi dari arsitektur yang ada.
> Bukan arsitektur baru. Bukan rekomendasi implementasi.
> Semua keputusan akhir ada di bagian 6 (Architecture Decision Log).

---

### 5.1 Domain Map (Target)

Berdasarkan domain yang ada dan arah yang terlihat dari pola kode:

```
┌─────────────────────────────────────────────────┐
│                  CORE DOMAINS                   │
│  User · Profile · Project · Experience          │
│  Education · Achievement · Skill · Social       │
│  (CRUD penuh, sudah stabil)                     │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│                  AI DOMAINS                     │
│  AI Description · CV Parser                    │
│  (tidak ada entity DB, pure AI calls)           │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│               AUTH DOMAINS                      │
│  Local Auth (OTP + JWT) · Google OAuth          │
│  Email Verification (embedded di User)          │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│             PLATFORM DOMAINS (parsial)          │
│  Template                                       │
│  (status tidak jelas, perlu keputusan)          │
└─────────────────────────────────────────────────┘
```

---

### 5.2 Layer Map (Target)

```
┌──────────────────────────────────────────────────┐
│  DELIVERY LAYER                                  │
│  Controller (HTTP binding, response)             │
│  Middleware (Auth)                               │
│  Route (routing rules)                           │
│  Dependency: hanya ke UseCase                    │
└──────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────┐
│  USECASE LAYER                                   │
│  Business logic, validasi, orchestration         │
│  Dependency: Repository interfaces               │
│  TIDAK boleh import HTTP framework               │
└──────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────┐
│  REPOSITORY LAYER                                │
│  Sub-layer A: DB Repository (GORM)               │
│  Sub-layer B: AI Repository (Gemini calls)       │
│  Sub-layer C: Storage Repository (Cloudinary)    │
│  Dependency: pkg/* (agent, storage, mail)        │
└──────────────────────────────────────────────────┘
            │
            ▼
┌──────────────────────────────────────────────────┐
│  INFRASTRUCTURE / PKG LAYER                      │
│  agent/ · storage/ · mail/ · utils/              │
│  Dependency: external SDK only                   │
└──────────────────────────────────────────────────┘
```

---

### 5.3 Dependency Rules (Target)

| Rule | Deskripsi |
|---|---|
| **R1** | Controller hanya bergantung ke UseCase. Tidak langsung ke Repository. |
| **R2** | UseCase tidak boleh import package HTTP framework (fiber, echo, gin, dll) |
| **R3** | UseCase bergantung ke Repository melalui interface, bukan concrete struct |
| **R4** | Repository layer dibagi berdasarkan concern: DB, AI, Storage — tidak dicampur dalam satu struct |
| **R5** | pkg/ tidak bergantung ke layer di atasnya (tidak import entity, model, usecase, repository) |
| **R6** | `config/app.go` adalah satu-satunya tempat wiring dependency (sudah terpenuhi) |

---

### 5.4 External Service Rules (Target)

| Service | Lokasi Akses | Akses via |
|---|---|---|
| MySQL | Repository DB | GORM — connection pool |
| Gemini AI | Repository AI | GeminiAgent interface (sudah ada) |
| Cloudinary | Repository Storage | Interface tunggal (perlu keputusan) |
| Resend | UseCase atau pkg/mail | pkg/mail.Resend (sudah di-inject via UseCase) |
| Google OAuth | UseCase (OauthUseCase) | via oauth2.Config (sudah ada) |
| Google User Info | UseCase (OauthUseCase) | net/http (plain, satu-satunya yang tidak pakai SDK) |

---

### 5.5 Configuration Rules (Target)

| Rule | Deskripsi |
|---|---|
| **C1** | `config.json` sebagai source of truth untuk semua nilai default |
| **C2** | Semua environment variable digunakan sebagai override — tidak ada hardcode di kode |
| **C3** | Pemilihan env (local vs prod) harus dilakukan via satu variabel flag (misal: `APP_ENV=production`) |
| **C4** | `api.config.ts` di FE tidak boleh memiliki URL hardcoded; selalu pakai env var |
| **C5** | Tidak boleh ada fallback URL yang berlawanan arah (local env → production fallback) |

---

### 5.6 Storage Rules (Target)

Dua kandidat storage rule berdasarkan realitas yang ada:

**Kandidat S1 — Cloudinary sebagai satu-satunya storage:**
```
pkg/storage/ hanya berisi cloudinary_storage.go
LocalStorage dihapus atau diarsip
UploadImageRepository hanya bergantung ke Cloudinary
```

**Kandidat S2 — Abstraksi storage dengan interface tunggal:**
```
Buat interface ImageStorage { Upload, Delete }
CloudinaryStorage implements ImageStorage
LocalStorage implements ImageStorage
Bootstrap memilih implementasi via config
```

Keputusan ada di ADL-01.

---

### 5.7 Auth Rules (Target)

| Rule | Deskripsi |
|---|---|
| **A1** | JWT sebagai satu-satunya token format (sudah terpenuhi) |
| **A2** | Token claims minimal: `{id, username, exp, iat}` (sudah terpenuhi) |
| **A3** | `auth_provider` field di User menentukan flow login yang valid (sudah terpenuhi) |
| **A4** | OAuth redirect URL dipilih berdasarkan satu environment variable, bukan hardcode ke key tertentu |
| **A5** | Logout behavior (client-only vs server-side invalidation) perlu keputusan eksplisit |

---

### 5.8 Frontend Architecture Rules (Target)

| Rule | Deskripsi |
|---|---|
| **F1** | `api/apiClient.ts` sebagai satu pintu masuk semua HTTP call — sudah terpenuhi |
| **F2** | `services/*.service.ts` sebagai satu-satunya layer yang menggunakan `apiClient` — sudah terpenuhi |
| **F3** | `hooks/` menggunakan `services/` sebagai dependency — tidak langsung call apiClient |
| **F4** | `pages/` dan `sections/` tidak memanggil `apiClient` langsung — sudah terpenuhi via hooks |
| **F5** | `templates/default/` adalah isolated module: punya `components/`, `hooks/`, `layout/`, `pages/` sendiri |
| **F6** | Satu direktori `constants/` (dengan ejaan benar) menggantikan `contants/` |

---

## 6. Architecture Decision Log

Setiap keputusan di bawah ini perlu dijawab oleh manusia sebelum implementasi dilanjutkan.

---

### ADL-01 · Storage Strategy

**Decision:**
Strategi storage untuk file/gambar

**Context:**
Dua implementasi storage ada berdampingan: Cloudinary (aktif) dan LocalStorage (tidak aktif, ada di `pkg/storage/local_storage.go`). Keduanya tidak memiliki interface yang sama. `CloudinaryStorage` tidak mengimplementasikan `FileStorage` interface yang ada di local_storage.go.

**Current Variants:**

- **Variant A**: Cloudinary sebagai satu-satunya storage. LocalStorage dihapus.
- **Variant B**: Dua storage dengan satu interface tunggal. Bootstrap memilih via config.
- **Variant C**: LocalStorage untuk development, Cloudinary untuk production — dipilih via env.

**Open Questions:**
- Apakah LocalStorage masih dipertahankan untuk tujuan tertentu (development, testing, offline)?
- Atau Cloudinary menjadi satu-satunya storage yang diakui sistem?
- Jika dua storage dipertahankan, siapa yang memiliki tanggung jawab pemilihan — config, Bootstrap, atau environment?
- Apakah `FileStorage` interface di `local_storage.go` dimaksudkan sebagai kontrak bersama?

---

### ADL-02 · OAuth Redirect URL Environment Selection

**Decision:**
Mekanisme pemilihan OAuth redirect URL antara production dan local

**Context:**
`config.json` memiliki dua key: `google_oauth.redirect_url_local` dan `google_oauth.redirect_url_prod`. Namun `config/google_oauth.go` selalu membaca `redirect_url_local`. Tidak ada logika environment switching. Jika ini di-deploy ke production dengan `config.json` yang sama, redirect akan selalu ke `localhost`.

**Current Variants:**

- **Variant A**: Satu key `google_oauth.redirect_url` — nilai diisi berbeda per environment via env override
- **Variant B**: Dua key (prod/local) + logika pemilihan berdasarkan satu env flag (`APP_ENV`)
- **Variant C**: Satu key, nilai di-set dari environment variable murni tanpa fallback ke config.json

**Open Questions:**
- Bagaimana saat ini production deployment mengatur redirect URL yang benar?
- Apakah ada mekanisme override di luar kode yang mengatasi ini?
- Siapa yang bertanggung jawab memilih redirect URL yang tepat per environment?

---

### ADL-03 · Repository Dependency Injection Style

**Decision:**
Apakah repository diinjeksi sebagai interface atau concrete struct di UseCase

**Context:**
Saat ini ada dua pola:
1. `GeminiAgent` → interface (di `ai_description_repository.go` dan `cv_parser_repository.go`)
2. `UserRepository`, `ProfileRepository`, dan semua domain repository → concrete struct

Komentar `TODO(post-prod): UserRepository jadi interface untuk testability` ada di kode. Ini mengindikasikan ada intent untuk mengubah ke interface, namun belum dilakukan.

**Current Variants:**

- **Variant A**: Semua repository tetap concrete struct (status quo)
- **Variant B**: Semua repository diubah ke interface (konsisten dengan GeminiAgent)
- **Variant C**: Hanya repository yang perlu di-test atau di-mock yang diubah ke interface

**Open Questions:**
- Apakah testing (unit test usecase) adalah priority saat ini?
- Jika ya, domain mana yang didahulukan untuk dijadikan interface?
- Jika tidak, kapan batas waktu untuk meresolusi TODO ini?

---

### ADL-04 · UseCase Error Type

**Decision:**
Apakah UseCase boleh menggunakan `fiber.NewError()` sebagai return type

**Context:**
Saat ini semua UseCase menggunakan `fiber.NewError(statusCode, message)` untuk mengembalikan error. Ini menyebabkan UseCase layer secara implisit terikat ke Fiber HTTP framework. Jika framework diganti, semua UseCase harus diubah juga.

**Current Variants:**

- **Variant A**: Tetap menggunakan `fiber.NewError()` (status quo)
- **Variant B**: UseCase mengembalikan custom error type (misal: `domain.Error{Code, Message}`) — Controller yang melakukan mapping ke HTTP status code
- **Variant C**: UseCase mengembalikan error biasa + sentinel errors, Controller yang interpret

**Open Questions:**
- Apakah ada rencana mengganti HTTP framework?
- Seberapa penting independence UseCase dari framework HTTP?
- Apakah overhead custom error type sepadan dengan manfaatnya di tahap ini?

---

### ADL-05 · Template Domain Status

**Decision:**
Kelanjutan domain Template

**Context:**
Domain Template memiliki: DB migration, entity, model — namun tidak memiliki repository, usecase, controller, atau route. Route di FE dikomentari. Ini bukan bug, ini adalah domain yang ada namun tidak aktif.

**Current Variants:**

- **Variant A**: Template diimplementasikan lengkap (repository → usecase → controller → route)
- **Variant B**: Template dihapus — migration di-drop, entity dan model dihapus
- **Variant C**: Template dibekukan sementara — tidak dikembangkan, tidak dihapus, tidak di-expose

**Open Questions:**
- Apakah Template adalah fitur yang akan dikembangkan?
- Jika ya, kapan dan siapa yang akan mengerjakan?
- Jika tidak, apakah schema DB dan kode terkait akan dibersihkan?
- Apakah `is_pro` field di Template mengindikasikan rencana monetisasi/premium tier?

---

### ADL-06 · Logout & Token Invalidation

**Decision:**
Mekanisme logout dan invalidasi token

**Context:**
Saat ini logout hanya menghapus token dari `localStorage` di sisi client. Server tidak melakukan invalidasi token. Komentar di kode menyebut: `"saat ini logout hanya log saja, tidak invalidate token"` dan `"Implementasi proper: simpan token ke blacklist (Redis) atau pakai refresh token"`.

**Current Variants:**

- **Variant A**: Client-side only logout (status quo) — token tetap valid di server hingga expired (72 jam)
- **Variant B**: Token blacklist — tambah Redis atau tabel DB untuk track revoked tokens
- **Variant C**: Short-lived access token + refresh token — akses token ~15 menit, refresh token untuk renew
- **Variant D**: Tidak ada perubahan, diterima sebagai trade-off

**Open Questions:**
- Apakah 72 jam token lifetime tanpa invalidasi diterima sebagai acceptable risk?
- Jika blacklist dipilih, storage apa yang digunakan (Redis, MySQL, in-memory)?
- Apakah ada skenario nyata yang membutuhkan server-side invalidation segera?

---

### ADL-07 · CV Parser Execution Model

**Decision:**
Model eksekusi 5 Gemini calls di CV Parser

**Context:**
`CVParserRepository` memanggil Gemini API sebanyak 6 kali per request (1 text cleaning + 5 JSON parsing: Profile, Experience, Education, Skills, Projects). Dari SYSTEM_MAP tidak jelas apakah calls ini sequential atau concurrent. Ini berdampak langsung pada latency endpoint `/api/agent/cv/parse`.

**Current Variants:**

- **Variant A**: Sequential — 6 calls satu per satu (lebih mudah di-debug, lebih lambat)
- **Variant B**: Concurrent — 5 JSON calls dijalankan bersamaan via goroutine setelah text cleaning (lebih cepat, lebih kompleks)
- **Variant C**: Hybrid — cleaning sequential, lalu 5 parsing concurrent

**Open Questions:**
- Berapa latency yang saat ini dirasakan untuk endpoint CV parse?
- Apakah Gemini API memiliki rate limit yang perlu dipertimbangkan jika concurrent?
- Apakah ada timeout yang sudah di-set untuk endpoint ini?

---

### ADL-08 · Migration Execution Strategy

**Decision:**
Cara menjalankan database migration

**Context:**
SQL migration files ada di `BE/db/migrations/` dengan format up/down. Namun tidak ada migration tool (golang-migrate, goose, atlas, dll) yang terdeteksi di `go.mod`. Tidak ada script atau command yang terlihat untuk menjalankan migration.

**Current Variants:**

- **Variant A**: Manual — DBA atau developer menjalankan SQL langsung ke DB
- **Variant B**: Tool dedicated (golang-migrate, goose) — migration dijalankan sebagai command terpisah
- **Variant C**: GORM AutoMigrate — schema di-generate dari struct (saat ini tidak dipakai)
- **Variant D**: Migration dijalankan sebagai init container di Docker/Kubernetes

**Open Questions:**
- Bagaimana saat ini migration dijalankan di production?
- Siapa yang bertanggung jawab menjalankan migration?
- Apakah format up/down SQL akan dipertahankan atau ada rencana migrasi ke tool lain?

---

*End of ARCH_REVIEW.md*
