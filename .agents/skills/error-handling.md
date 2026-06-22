# Error Handling SOP

## Tujuan
Menjaga cara error handling backend Portofid tetap konsisten.

## Pattern Utama
Project memakai `fiber.NewError(statusCode, message)` untuk error yang akan diteruskan ke HTTP layer.

Contoh status umum:
- `fiber.StatusBadRequest`: request invalid, body salah, file invalid, validation gagal.
- `fiber.StatusUnauthorized`: token tidak ada/salah, login gagal.
- `fiber.StatusForbidden`: user tidak punya akses ke resource.
- `fiber.StatusNotFound`: data tidak ditemukan.
- `fiber.StatusConflict`: data duplikat seperti username/email sudah digunakan.
- `fiber.StatusInternalServerError`: error tak terduga dari DB/external service.

## Per Layer

### Controller
Controller bertugas:
- Parse request.
- Jika parse gagal, return bad request.
- Panggil usecase.
- Jika usecase return error, teruskan ke response handler sesuai pattern existing.

Controller tidak boleh:
- Menentukan business validation kompleks.
- Query database langsung.
- Menelan error tanpa response jelas.

### Usecase
Usecase bertugas:
- Validasi business rule.
- Mapping error repository/external service ke `fiber.NewError`.
- Menjaga transaksi commit/rollback.

Untuk write operation:
```go
tx := u.DB.WithContext(ctx).Begin()
defer tx.Rollback()

// business operation...

if err := tx.Commit().Error; err != nil {
    return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
}
```

### Repository
Repository bertugas:
- Return error asli dari GORM.
- Jangan mapping ke HTTP status di repository.
- Jangan membuat response HTTP.

## Transaksi
- Usecase yang membuat/mengatur transaksi.
- Repository menerima `tx` agar semua query masuk transaksi yang sama.
- Selalu `defer tx.Rollback()` setelah `Begin()` untuk safety.
- Commit hanya di akhir setelah semua operasi sukses.

## Pesan Error
- Gunakan pesan singkat dan jelas.
- Jangan bocorkan secret/token/API key.
- Untuk error eksternal, boleh log detail internal tapi response user tetap aman.

## Anti-Pattern
- Jangan `panic` untuk normal application error.
- Jangan `fmt.Println` untuk debug production; pakai Logrus jika perlu.
- Jangan return entity/database error mentah kalau berisi detail sensitif.
- Jangan ignore error dari DB, upload, parsing, atau AI service.
