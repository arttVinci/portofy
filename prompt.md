# TASK: Implementasi Upload Image — Achievement, Project, Education, Experience

## ── KONTEKS ───────────────────────────────────────────
Kamu sudah paham:
- Arsitektur project ini: controller → usecase → repository → entity
- Flow upload image ke Cloudinary (sudah kamu pelajari dari flow profile)
- Struktur model request/response di folder model/request/ dan model/response/
- Cara penulisan test BE di folder test/
- Stack FE yang dipakai beserta cara konsumsi API-nya

Tugas ini adalah ekstensi dari flow upload image yang sudah ada di layer profile.
lalu replikasi pola yang sama ke 4 domain berikut.

## ── DOMAIN TARGET ────────────────────────────────────
Implementasikan endpoint upload image untuk field image_url di:
  1. Achievement
  2. Project
  3. Education
  4. Experience

Masing-masing domain harus punya endpoint upload sendiri,
mengikuti pola yang sama persis seperti di profile.

## ── YANG HARUS KAMU BUAT ────────────────────────────
Untuk setiap domain (Achievement / Project / Education / Experience):

[Route]
- Daftarkan endpoint baru di route masing-masing domain
- Ikuti pola penamaan dan grouping route yang sudah ada

## ── TEST BACKEND ─────────────────────────────────────
Buat file test di folder test/ untuk masing-masing domain:

Setiap file test wajib mencakup:
- ID tidak ditemukan → upload untuk ID yang tidak exist

## ── TEST FRONTEND ────────────────────────────────────
Kamu sudah memahami stack dan pola FE project ini.

Gunakan gambar dummy yang sudah tersedia di direktori image-dummy/
sebagai fixture untuk test upload di sisi FE.

Yang harus ditest di FE:
- Upload berhasil   → gambar ter-preview / image_url muncul di UI
- Upload gagal      → tampil pesan error yang sesuai
- File tidak valid  → validasi sebelum hit API (tipe / ukuran)
- Loading state     → UI disable tombol / tampil loader saat proses upload

Pakai gambar dari image-dummy/ untuk semua skenario test,
jangan hardcode URL eksternal.

## ── URUTAN PENGERJAAN YANG DISARANKAN ───────────────
1. Pelajari dulu implementasi upload di domain profile (BE + FE)
2. Identifikasi pola yang bisa direplikasi
3. Kerjakan per domain, satu-satu sampai tuntas (usecase → controller → route → test)
4. Ketika BE di test dan hasil nya oke semua baru implementasikan di FE, dari endpoint tersebut
5. Setelah semua FE selesai, baru kerjakan test FE

## ── OUTPUT YANG DIHARAPKAN ──────────────────────────
Setelah kamu analisa flow profile, sebelum mulai coding:
→ Jelaskan dulu pemahamanmu tentang flow upload image di profile
→ Sebutkan file-file yang akan kamu buat / modifikasi
→ Tanyakan jika ada yang ambigu sebelum lanjut implementasi
→ Buatkan laporan hasil test nya

Jangan langsung generate kode tanpa konfirmasi pemahaman dulu (Kasih gw plan nya dulu baru kalo gw approve lngsg lu eksekusi).