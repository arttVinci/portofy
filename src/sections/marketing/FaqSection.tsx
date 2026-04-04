import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconPlus, IconArrowRight } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#080d1a", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(139,92,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 400,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-3xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth }}
          className="text-center mb-14"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
            style={{
              backgroundColor: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "#a78bfa",
            }}
          >
            ❓ FAQ
          </motion.span>
          <h2
            className="text-[40px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Pertanyaan Umum
          </h2>
          <p className="mt-4 text-[14px]" style={{ color: "rgba(148,163,184,0.5)" }}>
            Jawaban untuk keraguan Anda
          </p>
        </motion.div>

        {/* ── FAQ Items ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth, delay: 0.1 }}
          className="space-y-3"
        >
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.04 }}
                className="rounded-2xl overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: isOpen ? "#0e1a30" : "#0a1020",
                  border: isOpen ? "1px solid rgba(139,92,246,0.2)" : "1px solid rgba(255,255,255,0.04)",
                  boxShadow: isOpen ? "0 0 32px rgba(139,92,246,0.06)" : "none",
                }}
              >
                {/* Top glow for open item */}
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-px"
                    style={{ background: "linear-gradient(to right, transparent, #8b5cf6, transparent)" }}
                  />
                )}

                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer focus:outline-none"
                >
                  <span
                    className="text-[14px] font-semibold leading-snug transition-colors duration-200"
                    style={{ color: isOpen ? "rgba(241,245,249,0.9)" : "rgba(148,163,184,0.6)" }}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: smooth }}
                    className="shrink-0 flex items-center justify-center size-7 rounded-full"
                    style={{
                      backgroundColor: isOpen ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.04)",
                      border: isOpen ? "1px solid rgba(139,92,246,0.25)" : "1px solid rgba(255,255,255,0.06)",
                      color: isOpen ? "#a78bfa" : "rgba(148,163,184,0.3)",
                    }}
                  >
                    <IconPlus size={14} strokeWidth={2} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: smooth }}
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
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Contact link ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-[13px] mb-2" style={{ color: "rgba(148,163,184,0.4)" }}>
            Belum terjawab?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-purple-400/70 hover:text-purple-400 transition-colors duration-200"
          >
            Hubungi kami langsung
            <IconArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
