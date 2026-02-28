import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: smooth, delay },
});

// ── FAQ Data ──────────────────────────────────────────────────────────────────
const faqGroups = [
  {
    category: "Umum",
    items: [
      {
        q: "Apa itu portof.id?",
        a: "portof.id adalah platform SaaS yang memungkinkan siapapun membuat portfolio website profesional secara dinamis — tanpa perlu coding atau menyewa jasa developer. Cukup isi form, pilih template, dan portfolio kamu langsung online.",
      },
      {
        q: "Apakah saya perlu bisa coding untuk menggunakan portof.id?",
        a: "Sama sekali tidak. Platform ini dibangun khusus agar orang yang tidak tahu coding pun bisa punya portfolio yang terlihat dibuat oleh professional. Semua kustomisasi dilakukan lewat antarmuka yang intuitif.",
      },
      {
        q: "Berapa lama waktu yang dibutuhkan untuk setup portfolio?",
        a: "Rata-rata pengguna bisa menyelesaikan portfolio dalam 3 menit. Isi nama, profesi, bio singkat, pilih template — selesai. URL kamu langsung aktif dan bisa dibagikan.",
      },
      {
        q: "Apakah portfolio saya akan terlihat seperti template pada umumnya?",
        a: "Template kami dirancang oleh designer profesional dengan tampilan yang premium dan bisa dikustomisasi. Setiap template dioptimasi agar terlihat unik dan mencerminkan identitas penggunanya, bukan sekadar layout generik.",
      },
    ],
  },
  {
    category: "Akun & Harga",
    items: [
      {
        q: "Apakah plan Gratis benar-benar gratis selamanya?",
        a: "Ya. Plan Gratis tidak pernah kadaluarsa dan tidak memerlukan kartu kredit. Kamu bisa membuat portfolio dan menggunakannya tanpa batas waktu dengan fitur dasar yang tersedia.",
      },
      {
        q: "Apa perbedaan plan Gratis dan Pro?",
        a: "Plan Gratis mencakup 1 portfolio aktif, 3 template pilihan, URL portofolio.id/username, dan statistik dasar. Plan Pro menambahkan portfolio tidak terbatas, semua template premium, custom domain, analytics lengkap, AI Bio Generator, dan hapus watermark.",
      },
      {
        q: "Bagaimana cara upgrade ke Pro?",
        a: "Masuk ke dashboard, klik menu 'Upgrade', pilih metode pembayaran yang tersedia. Proses instan — fitur Pro langsung aktif setelah pembayaran dikonfirmasi.",
      },
      {
        q: "Metode pembayaran apa yang diterima?",
        a: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI), QRIS, GoPay, OVO, Dana, dan kartu kredit/debit Visa & Mastercard.",
      },
      {
        q: "Bisakah saya batalkan langganan kapan saja?",
        a: "Ya. Batalkan kapan saja dari halaman pengaturan akun. Setelah dibatalkan, akses Pro tetap aktif sampai akhir periode billing yang sedang berjalan.",
      },
    ],
  },
  {
    category: "Portfolio & Tampilan",
    items: [
      {
        q: "Apakah portfolio saya mobile responsive?",
        a: "Ya. Semua template kami diuji dan dioptimasi untuk tampil sempurna di semua ukuran layar — dari smartphone hingga monitor ultrawide.",
      },
      {
        q: "Bisakah saya mengedit portfolio setelah dipublish?",
        a: "Tentu. Kamu bisa mengubah konten, foto, template, atau informasi apapun kapan saja. Semua perubahan langsung live tanpa perlu republish manual.",
      },
      {
        q: "Apakah ada batasan jumlah proyek yang bisa ditampilkan?",
        a: "Untuk plan Gratis, kamu bisa menampilkan hingga 6 proyek. Plan Pro tidak ada batasnya — tampilkan sebanyak yang kamu mau.",
      },
      {
        q: "Bisakah saya memakai lebih dari satu template?",
        a: "Ya, kamu bisa mengganti template kapan saja tanpa kehilangan konten. Konten secara otomatis menyesuaikan dengan layout template baru.",
      },
    ],
  },
  {
    category: "Domain & URL",
    items: [
      {
        q: "URL apa yang akan saya dapatkan setelah daftar?",
        a: "Setiap akun mendapat URL unik di portofolio.id/username. URL ini aktif secara instan setelah kamu publish portfolio.",
      },
      {
        q: "Bagaimana cara menghubungkan custom domain?",
        a: "Di dashboard, masuk ke menu Domain, masukkan nama domain kamu, lalu ikuti panduan DNS yang kami sediakan. Proses biasanya memakan waktu 10-30 menit untuk propagasi. Kami menyediakan panduan langkah demi langkah untuk semua provider domain populer.",
      },
      {
        q: "Apakah SSL otomatis tersedia untuk custom domain?",
        a: "Ya. SSL certificate digenerate otomatis untuk semua domain yang terhubung — termasuk custom domain. Portfolio kamu akan selalu berjalan di HTTPS tanpa konfigurasi tambahan.",
      },
    ],
  },
  {
    category: "Data & Privasi",
    items: [
      {
        q: "Apakah data saya aman?",
        a: "Ya. Data kamu disimpan dengan enkripsi dan tidak pernah dijual atau dibagikan ke pihak ketiga untuk keperluan iklan. Kamu memiliki kendali penuh atas data kamu.",
      },
      {
        q: "Bisakah saya menghapus akun dan semua data saya?",
        a: "Ya. Kamu bisa menghapus akun beserta semua data terkait kapan saja dari halaman pengaturan. Penghapusan bersifat permanen dan tidak bisa dibatalkan.",
      },
      {
        q: "Apa yang terjadi dengan portfolio saya jika saya downgrade ke Gratis?",
        a: "Portfolio kamu tetap online dan URL-nya tidak berubah. Fitur Pro seperti custom domain dan analytics lengkap akan nonaktif, namun semua konten portfolio tetap terjaga.",
      },
    ],
  },
];

const allCategories = ["Semua", ...faqGroups.map((g) => g.category)];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [openItem, setOpenItem] = useState<string | null>("Umum-0");

  const visibleGroups =
    activeCategory === "Semua"
      ? faqGroups
      : faqGroups.filter((g) => g.category === activeCategory);

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-16 overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 800,
              height: 400,
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6 text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smooth }}
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              FAQ
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: smooth, delay: 0.06 }}
              className="text-white mb-5"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(40px, 5.5vw, 56px)",
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
              }}
            >
              Ada pertanyaan?{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Kami siap jawab.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smooth, delay: 0.12 }}
              className="text-[15px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Temukan jawaban dari pertanyaan yang paling sering ditanyakan.
              Tidak ketemu? Hubungi kami langsung.
            </motion.p>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-[220px_1fr] gap-12 items-start">
            {/* ── Sidebar categories ── */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: smooth, delay: 0.15 }}
              className="lg:sticky lg:top-28"
            >
              <p
                className="text-[10px] font-bold tracking-[0.12em] uppercase mb-3 px-1"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Kategori
              </p>
              <div className="flex flex-row lg:flex-col gap-1.5 flex-wrap">
                {allCategories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="text-left px-3.5 py-2 rounded-xl text-[13px] font-medium transition-all duration-150 cursor-pointer"
                      style={{
                        backgroundColor: isActive
                          ? "rgba(255,255,255,0.08)"
                          : "transparent",
                        color: isActive
                          ? "rgba(255,255,255,0.85)"
                          : "rgba(255,255,255,0.35)",
                        border: isActive
                          ? "1px solid rgba(255,255,255,0.12)"
                          : "1px solid transparent",
                      }}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* Contact card */}
              <div
                className="hidden lg:block mt-8 rounded-2xl p-5"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="text-[13px] font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Masih ada pertanyaan?
                </p>
                <p
                  className="text-[12px] leading-relaxed mb-4"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Tim kami siap membantu lewat email atau chat.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-150"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.9)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.55)")
                  }
                >
                  Hubungi kami →
                </a>
              </div>
            </motion.div>

            {/* ── Accordion ── */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: smooth }}
                  className="space-y-8"
                >
                  {visibleGroups.map((group, gi) => (
                    <motion.div
                      key={group.category}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: smooth,
                        delay: gi * 0.06,
                      }}
                    >
                      {/* Group label */}
                      {activeCategory === "Semua" && (
                        <p
                          className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3 px-1"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          {group.category}
                        </p>
                      )}

                      {/* Items */}
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{ border: "1px solid rgba(255,255,255,0.07)" }}
                      >
                        {group.items.map((item, ii) => {
                          const key = `${group.category}-${ii}`;
                          const isOpen = openItem === key;

                          return (
                            <div
                              key={ii}
                              style={{
                                backgroundColor: isOpen ? "#111118" : "#0e0e14",
                                borderBottom:
                                  ii < group.items.length - 1
                                    ? "1px solid rgba(255,255,255,0.05)"
                                    : "none",
                                transition: "background-color 0.2s",
                              }}
                            >
                              <button
                                onClick={() => setOpenItem(isOpen ? null : key)}
                                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus:outline-none"
                              >
                                <span
                                  className="text-[14px] font-medium"
                                  style={{
                                    color: isOpen
                                      ? "rgba(255,255,255,0.9)"
                                      : "rgba(255,255,255,0.6)",
                                  }}
                                >
                                  {item.q}
                                </span>
                                <motion.span
                                  animate={{ rotate: isOpen ? 45 : 0 }}
                                  transition={{ duration: 0.22, ease: smooth }}
                                  className="shrink-0 size-6 rounded-full flex items-center justify-center"
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
                                    transition={{
                                      duration: 0.28,
                                      ease: smooth,
                                    }}
                                    style={{ overflow: "hidden" }}
                                  >
                                    <p
                                      className="px-5 pb-5 text-[13px] leading-relaxed pr-14"
                                      style={{ color: "rgba(255,255,255,0.4)" }}
                                    >
                                      {item.a}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: 600,
                height: 300,
                background:
                  "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Masih ragu?
            </p>
            <h2
              className="text-[38px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Coba dulu,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                gratis selamanya.
              </span>
            </h2>
            <p
              className="text-[14px] max-w-sm mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tidak perlu kartu kredit. Daftar sekarang dan portfolio kamu
              online dalam 3 menit.
            </p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="/register"
                className="px-7 py-3 rounded-xl text-[14px] font-semibold text-[#0a0a0f] transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Buat Portfolio Gratis →
              </a>
              <a
                href="/contact"
                className="px-7 py-3 rounded-xl text-[14px] font-medium transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.8)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                Hubungi Kami
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
