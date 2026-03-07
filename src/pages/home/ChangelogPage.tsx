import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: smooth, delay },
});

// ── Types ─────────────────────────────────────────────────────────────────────
type ChangeType = "new" | "improved" | "fixed" | "removed";

interface ChangeItem {
  type: ChangeType;
  text: string;
}

interface Release {
  version: string;
  date: string;
  label?: string;
  summary: string;
  changes: ChangeItem[];
}

// ── Changelog Data ────────────────────────────────────────────────────────────
const releases: Release[] = [
  {
    version: "0.5.0",
    date: "Feb 2026",
    label: "Terbaru",
    summary:
      "Rilis besar pertama yang menyentuh frontend secara menyeluruh — multi-theme engine, live preview, dan onboarding yang didesain ulang dari nol.",
    changes: [
      {
        type: "new",
        text: "Multi-theme engine: pengguna bisa preview dan switch template secara realtime tanpa reload halaman",
      },
      {
        type: "new",
        text: "Live preview saat onboarding — perubahan form langsung terlihat di mock portfolio",
      },
      {
        type: "new",
        text: "Onboarding flow didesain ulang: dari 7 langkah menjadi 3 langkah yang lebih natural",
      },
      {
        type: "new",
        text: "Halaman dashboard baru dengan ringkasan portfolio, views, dan shortcut aksi cepat",
      },
      {
        type: "improved",
        text: "Performa rendering template meningkat signifikan dengan lazy loading per section",
      },
      {
        type: "improved",
        text: "Animasi transisi antar halaman lebih halus dan konsisten",
      },
      {
        type: "fixed",
        text: "Bug: skill tags tidak tersimpan jika jumlahnya lebih dari 5",
      },
      {
        type: "fixed",
        text: "Bug: custom domain tidak aktif setelah propagasi DNS selesai",
      },
    ],
  },
  {
    version: "0.4.2",
    date: "Jan 2026",
    summary:
      "Patch stabilitas setelah internal testing batch pertama — fokus pada bug kritis dan peningkatan responsivitas mobile.",
    changes: [
      {
        type: "fixed",
        text: "Portfolio tidak tampil dengan benar di layar < 375px",
      },
      {
        type: "fixed",
        text: "Upload foto profil gagal untuk file PNG dengan transparansi",
      },
      {
        type: "fixed",
        text: "Session token expired terlalu cepat pada beberapa browser",
      },
      {
        type: "improved",
        text: "Waktu load halaman portfolio turun rata-rata 40% dengan optimasi asset bundling",
      },
      {
        type: "improved",
        text: "Error message saat registrasi lebih informatif dan spesifik",
      },
    ],
  },
  {
    version: "0.4.0",
    date: "Jan 2026",
    summary:
      "Penambahan sistem analytics pertama dan fondasi custom domain — dua fitur yang paling banyak diminta selama internal alpha.",
    changes: [
      {
        type: "new",
        text: "Analytics dashboard: views harian, pengunjung unik, dan sumber traffic",
      },
      {
        type: "new",
        text: "Custom domain: hubungkan domain sendiri via DNS dengan panduan step-by-step",
      },
      {
        type: "new",
        text: "SSL otomatis untuk semua custom domain yang terhubung",
      },
      { type: "new", text: "Export data analytics dalam format CSV" },
      {
        type: "improved",
        text: "Sistem template sekarang mendukung variabel warna yang bisa dikustomisasi per user",
      },
      {
        type: "fixed",
        text: "Bug: URL portfolio tidak konsisten antara uppercase dan lowercase",
      },
    ],
  },
  {
    version: "0.3.0",
    date: "Des 2025",
    summary:
      "Core engine multi-tenant selesai dibangun. Backend siap menangani multiple user dengan isolasi data yang ketat.",
    changes: [
      {
        type: "new",
        text: "Multi-tenant isolation: setiap user memiliki namespace data yang sepenuhnya terpisah",
      },
      {
        type: "new",
        text: "User management: registrasi, login, dan manajemen session dengan JWT",
      },
      {
        type: "new",
        text: "Sistem template dasar: 3 template pertama tersedia (Minimal, Editorial, Grid)",
      },
      { type: "new", text: "Portfolio publish/unpublish dengan satu klik" },
      {
        type: "new",
        text: "URL slug otomatis berdasarkan username saat registrasi",
      },
      {
        type: "improved",
        text: "Repository pattern diterapkan secara konsisten di semua entitas utama",
      },
    ],
  },
  {
    version: "0.2.0",
    date: "Des 2025",
    summary:
      "Fondasi arsitektur selesai dirancang dan diimplementasi. Database schema, repository pattern, dan struktur folder Golang sudah terbentuk.",
    changes: [
      {
        type: "new",
        text: "Clean Architecture diterapkan: separation of concerns antara handler, usecase, dan repository",
      },
      {
        type: "new",
        text: "Database schema versi pertama: tabel user, portfolio, project, dan template",
      },
      {
        type: "new",
        text: "Migration management system menggunakan golang-migrate",
      },
      { type: "new", text: "Docker setup untuk development environment" },
      {
        type: "new",
        text: "Go Concurrency diterapkan untuk proses batch yang berat",
      },
    ],
  },
  {
    version: "0.1.0",
    date: "Nov 2025",
    label: "Awal",
    summary:
      "Kick-off. Ide dituangkan ke dalam dokumen teknis pertama — problem statement, arsitektur high-level, dan tech stack decision.",
    changes: [
      {
        type: "new",
        text: "Problem statement: platform SaaS portfolio untuk kalangan umum tanpa perlu coding",
      },
      {
        type: "new",
        text: "Arsitektur awal: SaaS Multi-Tenant dengan Golang backend dan React frontend",
      },
      {
        type: "new",
        text: "Repo pertama dibuat, project structure Golang dan React diinisialisasi",
      },
      { type: "new", text: "ERD versi pertama dirancang" },
    ],
  },
];

// ── Type config ───────────────────────────────────────────────────────────────
const typeConfig: Record<
  ChangeType,
  { label: string; color: string; bg: string; border: string }
> = {
  new: {
    label: "Baru",
    color: "rgba(255,255,255,0.75)",
    bg: "rgba(255,255,255,0.07)",
    border: "rgba(255,255,255,0.12)",
  },
  improved: {
    label: "Improved",
    color: "rgba(255,255,255,0.55)",
    bg: "rgba(255,255,255,0.04)",
    border: "rgba(255,255,255,0.07)",
  },
  fixed: {
    label: "Fixed",
    color: "rgba(255,255,255,0.45)",
    bg: "rgba(255,255,255,0.03)",
    border: "rgba(255,255,255,0.06)",
  },
  removed: {
    label: "Removed",
    color: "rgba(255,255,255,0.3)",
    bg: "rgba(255,255,255,0.02)",
    border: "rgba(255,255,255,0.05)",
  },
};

const filterOptions: Array<{ label: string; value: ChangeType | "all" }> = [
  { label: "Semua", value: "all" },
  { label: "Baru", value: "new" },
  { label: "Improved", value: "improved" },
  { label: "Fixed", value: "fixed" },
];

function TypeBadge({ type }: { type: ChangeType }) {
  const cfg = typeConfig[type];
  return (
    <span
      className="shrink-0 text-[9px] font-bold tracking-[0.08em] uppercase px-2 py-0.5 rounded-full"
      style={{
        color: cfg.color,
        backgroundColor: cfg.bg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      {cfg.label}
    </span>
  );
}

export default function ChangelogPage() {
  const [filter, setFilter] = useState<ChangeType | "all">("all");

  const filteredReleases = releases
    .map((r) => ({
      ...r,
      changes:
        filter === "all"
          ? r.changes
          : r.changes.filter((c) => c.type === filter),
    }))
    .filter((r) => r.changes.length > 0);

  return (
    <div
      id="changelog"
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
              width: 700,
              height: 360,
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-4xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: smooth }}
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Changelog
            </motion.p>
            <div className="flex items-end justify-between gap-10 flex-wrap">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smooth, delay: 0.06 }}
                className="text-white"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(38px, 5vw, 56px)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.03em",
                }}
              >
                Apa yang{" "}
                <span
                  className="italic"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  berubah.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[14px] leading-relaxed max-w-xs mb-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Catatan setiap update, perbaikan, dan improvement yang kami
                rilis.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── MAIN ── */}
        <div className="max-w-4xl mx-auto px-6 pb-24">
          {/* Filter pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smooth, delay: 0.15 }}
            className="flex items-center gap-2 mb-14 pb-6"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span
              className="text-[11px] mr-1"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Filter:
            </span>
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className="px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor:
                    filter === opt.value
                      ? "rgba(255,255,255,0.09)"
                      : "transparent",
                  color:
                    filter === opt.value
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.3)",
                  border:
                    filter === opt.value
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "1px solid transparent",
                }}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>

          {/* Timeline */}
          <div className="grid lg:grid-cols-[160px_1fr] gap-0">
            {/* Left: version column (hidden on mobile, shown on lg) */}
            <div className="hidden lg:block" />

            {/* Right: releases */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="hidden lg:block absolute left-[-33px] top-2 bottom-0 w-px"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              />

              <AnimatePresence mode="wait">
                <motion.div
                  key={filter}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-12"
                >
                  {filteredReleases.map((release, ri) => (
                    <motion.div
                      key={release.version}
                      {...fadeUp(ri * 0.05)}
                      className="relative"
                    >
                      {/* Dot on the line */}
                      <div
                        className="hidden lg:block absolute left-[-38px] top-[6px] z-10"
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor:
                            ri === 0 ? "rgba(255,255,255,0.65)" : "#0a0a0f",
                          border: `1.5px solid ${ri === 0 ? "rgba(255,255,255,0.65)" : "rgba(255,255,255,0.2)"}`,
                        }}
                      />

                      {/* Version + date shown above card on lg, embedded on mobile */}
                      <div className="flex items-center gap-3 mb-4">
                        <span
                          className="text-[13px] font-bold tracking-[-0.01em]"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          v{release.version}
                        </span>
                        {release.label && (
                          <span
                            className="text-[9px] font-bold tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                            style={{
                              backgroundColor:
                                ri === 0
                                  ? "rgba(255,255,255,0.08)"
                                  : "rgba(255,255,255,0.04)",
                              color:
                                ri === 0
                                  ? "rgba(255,255,255,0.6)"
                                  : "rgba(255,255,255,0.3)",
                              border: `1px solid ${ri === 0 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)"}`,
                            }}
                          >
                            {release.label}
                            {ri === 0 && (
                              <span className="ml-1.5 size-1.5 rounded-full bg-white opacity-60 animate-pulse inline-block align-middle" />
                            )}
                          </span>
                        )}
                        <span
                          className="text-[11px]"
                          style={{ color: "rgba(255,255,255,0.2)" }}
                        >
                          {release.date}
                        </span>
                      </div>

                      {/* Card */}
                      <div
                        className="rounded-2xl overflow-hidden"
                        style={{
                          backgroundColor: "#0e0e14",
                          border: `1px solid ${ri === 0 ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)"}`,
                        }}
                      >
                        {/* Summary */}
                        <div
                          className="px-5 py-4"
                          style={{
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                          }}
                        >
                          <p
                            className="text-[13px] leading-relaxed"
                            style={{ color: "rgba(255,255,255,0.45)" }}
                          >
                            {release.summary}
                          </p>
                        </div>

                        {/* Change items */}
                        <div
                          className="divide-y"
                          style={{ borderColor: "rgba(255,255,255,0.04)" }}
                        >
                          {release.changes.map((change, ci) => (
                            <div
                              key={ci}
                              className="flex items-start gap-3 px-5 py-3"
                              style={{
                                backgroundColor:
                                  ci % 2 === 0
                                    ? "transparent"
                                    : "rgba(255,255,255,0.01)",
                              }}
                            >
                              <div className="pt-0.5 shrink-0">
                                <TypeBadge type={change.type} />
                              </div>
                              <p
                                className="text-[13px] leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                {change.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* End cap */}
              {filteredReleases.length > 0 && (
                <div className="hidden lg:flex items-center gap-3 mt-10 pl-0">
                  <div
                    className="absolute left-[-38px] size-2.5 rounded-full"
                    style={{
                      backgroundColor: "#0a0a0f",
                      border: "1.5px solid rgba(255,255,255,0.1)",
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Empty state */}
          {filteredReleases.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[28px] mb-3">📭</p>
              <p
                className="text-[14px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Tidak ada entry untuk filter ini.
              </p>
              <button
                onClick={() => setFilter("all")}
                className="mt-4 px-4 py-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all duration-150"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                Reset filter
              </button>
            </motion.div>
          )}
        </div>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-2xl overflow-hidden px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.12), transparent)",
              }}
            />
            <div className="relative">
              <p
                className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Ikuti Perkembangan
              </p>
              <h3
                className="text-[22px] font-normal leading-[1.2] text-white mb-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Dapat notifikasi update terbaru.
              </h3>
              <p
                className="text-[13px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Kami kabari setiap kali ada fitur baru atau peningkatan penting.
              </p>
            </div>
            <div className="flex items-center gap-2 relative shrink-0 w-full sm:w-auto">
              <input
                type="email"
                placeholder="email@kamu.com"
                className="flex-1 sm:w-48 px-4 py-2.5 rounded-xl text-[13px] outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <button
                className="shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-semibold cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#0a0a0f",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
