# Upload Image SOP

## Tujuan
Gunakan SOP ini saat menambah atau mengubah fitur upload image di backend Portofid.

## Storage
Project memakai Cloudinary untuk penyimpanan image.

## Flow Umum
```text
HTTP multipart file -> Controller parse file -> Usecase validate -> Upload Cloudinary -> Update DB -> Response URL
```

## Controller Responsibilities
- Ambil file dari request multipart.
- Ambil user id dari `ctx.Locals("auth")` jika endpoint auth.
- Ambil resource id dari params jika upload untuk resource tertentu.
- Panggil usecase upload.
- Return response sesuai format existing.

Controller tidak boleh:
- Upload langsung ke Cloudinary.
- Query DB langsung.
- Hapus image lama langsung.

## Usecase Responsibilities
- Validasi file wajib ada.
- Validasi ukuran maksimal mengikuti pattern existing: 7MB.
- Validasi ownership resource jika image milik user/resource tertentu.
- Jika resource sudah punya image lama, extract public ID dari URL lalu delete dari Cloudinary.
- Upload file baru ke Cloudinary.
- Simpan secure URL ke database via repository.
- Commit transaction.

## Repository Responsibilities
- Ambil resource existing.
- Update field image/avatar/thumbnail/gallery sesuai kebutuhan.
- Tidak tahu detail Cloudinary.

## Delete Old Image Pattern
Jika image lama ada:
1. Extract public ID dari URL Cloudinary.
2. Call delete Cloudinary.
3. Lanjut upload image baru.
4. Update DB dengan URL baru.

Jika delete old image gagal, tentukan berdasarkan pattern existing apakah operasi harus gagal atau cukup log warning. Untuk data penting, prefer fail agar tidak ada orphan state tersembunyi.

## Gallery Upload
Untuk gallery project:
- Validasi setiap file.
- Upload semua file.
- Simpan list URL sesuai struktur entity/model existing.
- Jika salah satu upload gagal, rollback DB transaction.
- Pertimbangkan cleanup image yang sudah ter-upload jika batch gagal di tengah.

## Guardrail
- Jangan menyimpan file binary ke repo.
- Jangan hardcode credential Cloudinary baru.
- Jangan menerima file terlalu besar.
- Jangan percaya filename user untuk path/public id tanpa sanitasi.
- Jangan return Cloudinary secret/API key ke client.
