import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const faqs = [
  {
    q: "Apakah benar-benar gratis? Ada biaya tersembunyi?",
    a: "Gratis selamanya untuk 1 portfolio dengan fitur dasar. Tidak ada biaya tersembunyi, tidak perlu kartu kredit untuk daftar. Kamu hanya bayar kalau memutuskan upgrade ke Pro — dan bisa batalkan kapan saja.",
  },
  {
    q: "Saya tidak bisa coding sama sekali. Apakah tetap bisa pakai?",
    a: "Justru platform ini dibuat untuk kamu. Tidak ada satu baris kode pun yang perlu ditulis. Cukup isi form, pilih template, dan portfolio kamu langsung online. Kalau bisa isi formulir Google, kamu bisa pakai platform ini.",
  },
  {
    q: "Portfolio saya akan terlihat seperti milik orang lain?",
    a: "Tidak. Setiap template bisa dikustomisasi — warna, foto, teks, urutan section, semuanya bisa diatur. Hasilnya tetap unik karena konten dan gayamu sendiri yang mengisinya.",
  },
  {
    q: "Apakah portfolio saya bisa dilihat di HP rekruter?",
    a: "Ya. Semua template otomatis responsif — tampil rapi di desktop, tablet, maupun smartphone. Kami test di semua ukuran layar sebelum template dirilis.",
  },
  {
    q: "Bagaimana dengan custom domain? Perlu bayar hosting sendiri?",
    a: "Tidak perlu hosting sama sekali. Semua berjalan di server kami. Untuk custom domain (misal namakamu.com), kamu hanya perlu mengubah satu pengaturan DNS di domain registrar kamu — kami kasih panduan langkah demi langkah.",
  },
  {
    q: "Data dan konten portfolio saya aman?",
    a: "Data kamu disimpan aman dan tidak pernah kami jual ke pihak ketiga. Kamu juga bisa export atau hapus akun beserta seluruh datanya kapan saja.",
  },
  {
    q: "Kalau saya upgrade ke Pro lalu batalkan, apa yang terjadi?",
    a: "Portfolio kamu tetap online dengan fitur gratis. Fitur-fitur Pro seperti custom domain dan analytics lengkap akan nonaktif, tapi konten dan URL kamu tidak akan hilang.",
  },
  {
    q: "Bisa dipakai untuk portofolio freelance, bukan hanya cari kerja?",
    a: "Tentu. Banyak freelancer menggunakan platform ini sebagai halaman utama untuk menampilkan layanan dan hasil kerja mereka ke klien. URL yang clean dan tampilan profesional sangat membantu closing klien baru.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ── Layout: left header + right accordion ── */}
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* ── Left: sticky header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="lg:sticky lg:top-28"
          >
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              FAQ
            </p>
            <h2
              className="text-[38px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Ada yang{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                ingin ditanya?
              </span>
            </h2>
            <p
              className="text-[13px] leading-relaxed mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Pertanyaan yang paling sering muncul. Kalau belum terjawab, kami
              siap membantu.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-200"
              style={{ color: "rgba(255,255,255,0.4)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.8)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "rgba(255,255,255,0.4)")
              }
            >
              Hubungi kami
              <svg
                className="size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </a>
          </motion.div>

          {/* ── Right: accordion ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
            className="space-y-0"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer focus:outline-none group"
                  >
                    <span
                      className="text-[14px] font-medium leading-snug transition-colors duration-200"
                      style={{
                        color: isOpen
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: smoothEase }}
                      className="shrink-0 flex items-center justify-center size-6 rounded-full"
                      style={{
                        backgroundColor: isOpen
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: isOpen
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <Plus size={12} strokeWidth={2} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: smoothEase }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="pb-5 text-[13px] leading-relaxed pr-10"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
