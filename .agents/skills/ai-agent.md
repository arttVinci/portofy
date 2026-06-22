# AI Agent SOP

## Tujuan
Gunakan SOP ini saat mengubah atau menambah fitur AI/Gemini di backend Portofid.

## AI Provider
Project memakai Google Generative AI / Gemini melalui wrapper/interface internal.

## Interface Pattern
AI logic harus lewat interface seperti `GeminiAgent`, bukan hardcode langsung di semua usecase.

Pattern method:
- `GenerateJSON`: untuk output structured JSON.
- `GenerateText`: untuk output text biasa/deskripsi.

Tujuannya:
- Lebih mudah di-mock saat testing.
- Prompt dan provider bisa diganti lebih aman.
- Business usecase tidak terlalu tergantung SDK langsung.

## CV Parser Flow
Flow parsing CV:
```text
Upload CV PDF/DOCX -> extract text -> cleaner agent -> parallel extraction agents -> merge structured result -> response/save
```

Extraction agent yang pernah teridentifikasi:
- Profile
- Experience
- Education
- Skills
- Projects

## Parallel Extraction Pattern
Untuk parsing beberapa bagian CV, gunakan goroutine dengan:
- `sync.WaitGroup` untuk menunggu semua agent selesai.
- `sync.Mutex` untuk menulis hasil/error bersama secara aman.
- Context tetap diteruskan.

Guardrail:
- Jangan membiarkan goroutine leak.
- Kumpulkan error dari agent dan return response yang jelas.
- Validasi JSON hasil AI sebelum dipakai.

## Prompting Rules
- Prompt harus eksplisit soal format JSON yang diharapkan.
- Sertakan instruksi agar AI tidak menambah markdown jika output harus JSON.
- Untuk field kosong, tentukan apakah harus `null`, empty string, atau empty array.
- Jangan kirim secret/API key ke prompt.

## Generate Description Flow
Untuk fitur generate deskripsi:
1. Controller terima request/context dari user.
2. Usecase membangun prompt sesuai tipe deskripsi: about, experience, education, project, dll.
3. Panggil `GenerateText`.
4. Validasi hasil tidak kosong.
5. Return response.

## Error Handling
- Error SDK/API dimapping di usecase pakai `fiber.NewError`.
- Jangan expose raw provider error yang berisi credential/detail sensitif.
- Log detail internal dengan Logrus jika perlu.

## Testing Strategy
- Mock `GeminiAgent` interface.
- Test prompt builder jika ada.
- Test parsing JSON valid dan invalid.
- Test partial failure untuk parallel extraction.

## Anti-Pattern
- Jangan memanggil Gemini SDK langsung dari controller.
- Jangan percaya output AI tanpa validasi.
- Jangan menyimpan response AI ke DB sebelum validasi schema minimal.
- Jangan membuat prompt panjang tidak terstruktur tanpa contoh output.
