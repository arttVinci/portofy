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
        backgroundColor: "#0c1222",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* ── Header (centered, Elysian style) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to right, transparent, #38bdf8)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: "#38bdf8" }}
            >
              FAQ
            </p>
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to left, transparent, #38bdf8)",
              }}
            />
          </div>
          <h2
            className="text-[40px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Pertanyaan Umum
          </h2>
          <p
            className="mt-4 text-[14px]"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            Jawaban untuk keraguan Anda
          </p>
        </motion.div>

        {/* ── FAQ Cards (individual rounded cards like Elysian) ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "#162035" : "#111a2e",
                  border: isOpen
                    ? "1px solid rgba(56,189,248,0.2)"
                    : "1px solid rgba(56,189,248,0.08)",
                  boxShadow: isOpen
                    ? "0 0 30px rgba(56,189,248,0.05)"
                    : "none",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none"
                >
                  <span
                    className="text-[14px] font-semibold leading-snug transition-colors duration-200"
                    style={{
                      color: isOpen
                        ? "rgba(241,245,249,0.9)"
                        : "rgba(148,163,184,0.7)",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22, ease: smoothEase }}
                    className="shrink-0 flex items-center justify-center size-7 rounded-full"
                    style={{
                      backgroundColor: isOpen
                        ? "rgba(56,189,248,0.15)"
                        : "rgba(56,189,248,0.06)",
                      border: "1px solid rgba(56,189,248,0.15)",
                      color: isOpen
                        ? "#38bdf8"
                        : "rgba(148,163,184,0.4)",
                    }}
                  >
                    <Plus size={14} strokeWidth={2} />
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
                        className="px-6 pb-5 text-[13px] leading-relaxed"
                        style={{ color: "rgba(148,163,184,0.5)" }}
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

        {/* ── Contact link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 text-center"
        >
          <p
            className="text-[13px] mb-2"
            style={{ color: "rgba(148,163,184,0.4)" }}
          >
            Belum terjawab?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-200"
            style={{ color: "rgba(56,189,248,0.6)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#38bdf8")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(56,189,248,0.6)")
            }
          >
            Hubungi kami langsung
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
      </div>
    </section>
  );
}
