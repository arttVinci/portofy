# Create Endpoint SOP

## Tujuan
Gunakan SOP ini saat membuat resource/endpoint baru di backend Portofid.

## Urutan Wajib
1. Buat entity.
2. Buat model request/response.
3. Buat converter entity -> response.
4. Buat repository.
5. Buat usecase.
6. Buat controller.
7. Daftarkan route.
8. Wire dependency di bootstrap/config.
9. Tambahkan Swagger annotation bila endpoint publik/API.
10. Jalankan format dan build/test.

## 1. Entity
Letakkan di `entity/`. Entity adalah representasi tabel GORM.

Checklist:
- Gunakan GORM tags sesuai file existing.
- Sertakan field relasi user jika data dimiliki user.
- Pastikan naming field konsisten dengan entity lain.

## 2. Model DTO
Letakkan request/response di `model/`.

Pattern:
- `CreateXRequest`
- `UpdateXRequest`
- `XResponse`
- `SearchXRequest` / pagination jika perlu

Controller hanya menerima/mengirim model, bukan entity mentah.

## 3. Converter
Letakkan mapping di `model/converter/`.

Rule:
- Converter hanya mapping data.
- Jangan query DB di converter.
- Jangan taruh business logic berat di converter.

## 4. Repository
Letakkan di `repository/`.

Pattern project:
- Pakai generic base repository jika cocok.
- Query custom dibuat sebagai method repository spesifik.
- Repository menerima `*gorm.DB`, sehingga bisa menerima transaction dari usecase.
- Repository tidak membuat transaksi sendiri kecuali memang ada pattern existing yang sama.

## 5. Usecase
Letakkan di `usecase/`.

Rule:
- Semua business logic utama ada di sini.
- Pakai `ctx context.Context`.
- Untuk write operation, mulai transaksi: `tx := u.DB.WithContext(ctx).Begin()`.
- Gunakan `defer tx.Rollback()` lalu `tx.Commit()` di akhir.
- Return error pakai `fiber.NewError(status, message)` sesuai pattern existing.
- Validasi kepemilikan user di usecase, bukan controller.

## 6. Controller
Letakkan di `delivery/http/controller/`.

Rule:
- Parse body/params/query/file.
- Ambil user id dari `ctx.Locals("auth")` untuk auth route.
- Panggil usecase.
- Return JSON response dengan format existing.
- Jangan taruh query DB atau business logic kompleks di controller.

## 7. Route
Daftarkan endpoint di route file yang sesuai.

Rule:
- Guest endpoint masuk guest route.
- Endpoint CRUD user login masuk auth route + middleware JWT.
- Endpoint portfolio publik masuk public route by username.

## 8. Bootstrap DI
Daftarkan repository, usecase, controller baru di bootstrap/config app.

Pastikan dependency order benar:
```text
repository -> usecase -> controller -> route
```

## 9. Verification
Jalankan:
```bash
gofmt -w <changed-go-files>
go test ./...
go build ./...
```

Jika test belum tersedia, minimal pastikan `go build ./...` lolos.
