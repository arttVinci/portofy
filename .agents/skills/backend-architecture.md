# Portofid Backend Architecture

## Tujuan
Gunakan SOP ini saat memahami, mengubah, atau menambah fitur di backend Portofid.

## Arsitektur Utama
Backend memakai layered / clean-ish architecture dengan alur:

```text
Route -> Controller -> Usecase -> Repository -> Database / External Service
```

## Struktur Layer
- `cmd/main.go`: entry point aplikasi.
- `config/`: konfigurasi, bootstrap dependency injection, database, external services.
- `delivery/http/route`: pendaftaran route HTTP.
- `delivery/http/controller`: parsing request, ambil param/body/file, panggil usecase, balikin response.
- `usecase`: business logic, validasi bisnis, transaksi database, orkestrasi repository dan service eksternal.
- `repository`: query database via GORM, tidak berisi business logic.
- `entity`: representasi tabel database / GORM model.
- `model`: request dan response DTO.
- `model/converter`: mapping entity ke response DTO.
- `utils`: helper reusable seperti JWT, password, ID generator, Cloudinary helper, dan lain-lain.

## Dependency Flow
Dependency harus satu arah:

```text
Controller depends on Usecase
Usecase depends on Repository / External Service
Repository depends on GORM DB
```

Jangan membuat repository memanggil controller/usecase. Jangan taruh business logic di controller atau repository.

## Bootstrap Pattern
Dependency injection dilakukan manual di bootstrap/config app:
1. Init database dan external services.
2. Buat semua repository.
3. Buat semua usecase dengan dependency repository/service.
4. Buat semua controller dengan dependency usecase.
5. Daftarkan controller ke route.

## Route Group
Umumnya route dipisah menjadi:
- Guest route: register, login, OTP, OAuth.
- Auth route: CRUD milik user login, wajib JWT.
- Public route: endpoint publik berdasarkan username.

## Guardrail
- Ikuti pattern file existing sebelum bikin pattern baru.
- Tambah domain baru dengan urutan entity -> model -> converter -> repository -> usecase -> controller -> route -> bootstrap.
- Jangan bypass usecase dari controller langsung ke repository.
- Jangan simpan credential baru ke source code; prefer env/secret manager.
