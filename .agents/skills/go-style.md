# Go Style SOP

## Tujuan
Menjaga gaya koding Go backend Portofid konsisten dengan codebase existing.

## General
- Jalankan `gofmt` untuk semua file Go yang diubah.
- Pakai nama package sesuai folder existing.
- Hindari membuat abstraction baru kalau pattern existing sudah cukup.
- Jangan pakai `fmt.Println` untuk production/debug permanen; gunakan Logrus jika perlu logging.

## Context
- Method usecase/repository harus menerima `ctx context.Context` jika melakukan operasi I/O atau DB.
- Context diteruskan ke GORM dengan `DB.WithContext(ctx)`.

## Controller Style
- Controller berada di `delivery/http/controller`.
- Method menerima `*fiber.Ctx`.
- Tugas controller hanya parse request, call usecase, dan return response.
- Ambil auth user dari `ctx.Locals("auth")` sesuai middleware existing.
- Gunakan nama method konsisten: `Create`, `Update`, `Delete`, `Get`, `List`, `BulkCreate`, `BulkDelete`, `GetAllByUsername`, `GetByUsername`.

## Usecase Style
- Usecase berisi business logic.
- Untuk write operation, gunakan transaction pattern existing:

```go
tx := u.DB.WithContext(ctx).Begin()
defer tx.Rollback()

// operations

if err := tx.Commit().Error; err != nil {
    return nil, fiber.NewError(fiber.StatusInternalServerError, err.Error())
}
```

- Jangan query database langsung dari controller.
- Jangan simpan logic bisnis di repository.

## Repository Style
- Repository berisi query GORM saja.
- Gunakan generic repository base jika cocok.
- Method repository menerima `*gorm.DB` / transaction sesuai pattern existing.
- Return error dari GORM ke usecase untuk dimapping.

## Entity & Model
- Entity adalah GORM model, simpan di `entity`.
- Request/response DTO simpan di `model`.
- Mapping entity ke response simpan di `model/converter`.
- Jangan expose entity langsung sebagai response kalau pattern existing memakai converter.

## Validation
- Gunakan validator existing jika sudah tersedia.
- Validasi format request di boundary/controller atau usecase sesuai pattern existing.
- Validasi business ownership di usecase.

## Swagger
- Endpoint controller perlu godoc Swagger annotation jika API harus masuk docs.
- Ikuti gaya annotation existing.

## Naming
- Nama file snake_case mengikuti domain: `project_controller.go`, `project_usecase.go`, `project_repository.go`.
- Nama struct pakai PascalCase: `ProjectController`, `ProjectUseCase`, `ProjectRepository`.
- Jangan pakai naked return untuk logic yang tidak trivial.

## Verification
Sebelum selesai:
```bash
gofmt -w <changed-go-files>
go test ./...
go build ./...
```
