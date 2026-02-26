import { motion } from "framer-motion";
import {
  FormInput,
  LayoutTemplate,
  MonitorSmartphone,
  PencilLine,
  Globe,
  BarChart2,
  Sparkles,
  Link,
  Search,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

// ── Feature grid data ─────────────────────────────────────────────────────────
const features = [
  {
    icon: <FormInput size={20} strokeWidth={1.8} />,
    title: "No-Code Editor",
    desc: "Isi form, portfolio jadi. Tidak ada satu baris kode yang perlu ditulis. Semua bisa dikonfigurasi lewat UI yang intuitif.",
  },
  {
    icon: <LayoutTemplate size={20} strokeWidth={1.8} />,
    title: "30+ Template",
    desc: "Dari minimalis sampai editorial — semua dirancang oleh designer profesional dan dioptimasi untuk kesan pertama yang kuat.",
  },
  {
    icon: <MonitorSmartphone size={20} strokeWidth={1.8} />,
    title: "Mobile Responsive",
    desc: "Portfolio kamu otomatis menyesuaikan tampilan di semua ukuran layar. Dari HP rekruter sampai monitor ultrawide.",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.8} />,
    title: "AI Bio Generator",
    desc: "Bingung nulis deskripsi diri? AI kami bantu tulis bio yang profesional dan personal berdasarkan pengalaman kamu.",
  },
  {
    icon: <BarChart2 size={20} strokeWidth={1.8} />,
    title: "Analytics Dashboard",
    desc: "Pantau siapa yang buka portfolio kamu, dari mana mereka datang, dan konten mana yang paling banyak dilihat.",
  },
  {
    icon: <Globe size={20} strokeWidth={1.8} />,
    title: "Custom Domain",
    desc: "Hubungkan domain sendiri seperti namakamu.com. Cukup ubah satu DNS record — panduan langkah demi langkah tersedia.",
  },
  {
    icon: <Link size={20} strokeWidth={1.8} />,
    title: "URL Bersih",
    desc: "Setiap portfolio dapat URL unik: portofolio.id/username. Mudah diingat, mudah dibagikan ke siapa saja.",
  },
  {
    icon: <Search size={20} strokeWidth={1.8} />,
    title: "SEO Ready",
    desc: "Portfolio kamu bisa ditemukan di Google. Meta tags, structured data, dan sitemap diatur otomatis oleh sistem.",
  },
  {
    icon: <PencilLine size={20} strokeWidth={1.8} />,
    title: "Edit Kapan Saja",
    desc: "Update proyek baru, ganti foto, ubah bio — semua perubahan langsung live tanpa perlu republish manual.",
  },
  {
    icon: <Shield size={20} strokeWidth={1.8} />,
    title: "Data Aman",
    desc: "Data kamu disimpan aman dan tidak pernah dijual ke pihak ketiga. Export atau hapus akun kapan saja.",
  },
  {
    icon: <Zap size={20} strokeWidth={1.8} />,
    title: "Loading Cepat",
    desc: "Dioptimasi untuk performa — portfolio kamu load dalam hitungan milidetik, tidak membuat rekruter menunggu.",
  },
  {
    icon: <Users size={20} strokeWidth={1.8} />,
    title: "Team & Komunitas",
    desc: "Untuk kampus atau bootcamp — onboarding massal, dashboard admin, dan pantau progress seluruh anggota.",
  },
];

// ── Spotlight features ────────────────────────────────────────────────────────
const spotlights = [
  {
    tag: "Andalan",
    title: "Dari form ke portfolio dalam 3 menit",
    desc: "Tidak ada setup yang rumit. Daftar, isi nama dan profesi, pilih template — portfolio kamu sudah online dan bisa dibagikan. Kami yang urus hosting, SSL, dan semua urusan teknis.",
    points: [
      "Tidak perlu akun hosting",
      "SSL certificate otomatis",
      "URL langsung aktif setelah publish",
      "Support via chat jika ada kendala",
    ],
    mockContent: "speed",
    reverse: false,
  },
  {
    tag: "Populer",
    title: "Analytics yang kasih insight nyata",
    desc: "Tahu persis berapa orang yang buka portfolio kamu hari ini, minggu ini, dan dari mana mereka datang — LinkedIn, WhatsApp, atau pencarian Google.",
    points: [
      "Grafik views harian & mingguan",
      "Sumber traffic (referrer)",
      "Perangkat pengunjung",
      "Konten yang paling banyak dilihat",
    ],
    mockContent: "analytics",
    reverse: true,
  },
];

// ── Comparison table ──────────────────────────────────────────────────────────
const comparisonItems = [
  { label: "Tidak perlu coding", us: true, diy: false, notion: false },
  { label: "Template profesional", us: true, diy: false, notion: false },
  { label: "URL bersih", us: true, diy: true, notion: false },
  { label: "Custom domain", us: true, diy: true, notion: false },
  { label: "Analytics bawaan", us: true, diy: false, notion: false },
  { label: "SEO otomatis", us: true, diy: false, notion: false },
  { label: "AI Bio Generator", us: true, diy: false, notion: false },
  { label: "Siap dalam 3 menit", us: true, diy: false, notion: false },
];

function CheckIcon({ val }: { val: boolean }) {
  return val ? (
    <div className="flex items-center justify-center">
      <div
        className="size-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <svg
          className="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div
        className="size-1.5 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}

// ── Mock visuals ──────────────────────────────────────────────────────────────
function SpotlightMock({ type }: { type: string }) {
  if (type === "speed") {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 56px rgba(0,0,0,0.4)",
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            backgroundColor: "#111118",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex gap-1.5">
            {[
              "rgba(255,255,255,0.15)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.07)",
            ].map((c, i) => (
              <div
                key={i}
                className="size-2 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div
            className="flex-1 h-4 mx-2 rounded"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <span
              className="text-[9px] px-2 leading-4 block"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              portofolio.id/budisantoso
            </span>
          </div>
          <span
            className="flex items-center gap-1 text-[9px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Live
          </span>
        </div>
        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="size-10 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ backgroundColor: "#1e1b4b", color: "#818cf8" }}
            >
              BS
            </div>
            <div>
              <div
                className="h-2.5 w-24 rounded-full mb-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              />
              <div
                className="h-1.5 w-16 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              />
            </div>
          </div>
          {[90, 70, 80].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: `${w}%`,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          ))}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
        </div>
        {/* Timer badge */}
        <div className="px-5 pb-5">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Zap size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
            <span
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Portfolio live dalam
            </span>
            <span
              className="text-[11px] font-bold ml-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              2m 48s
            </span>
          </div>
        </div>
      </div>
    );
  }

  // analytics
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 56px rgba(0,0,0,0.4)",
      }}
    >
      <div className="p-5">
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Analytics — 7 hari terakhir
        </p>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Views", val: "1,284" },
            { label: "Pengunjung", val: "847" },
            { label: "Klik CV", val: "132" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[16px] font-bold"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {s.val}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {/* Bar chart mock */}
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md transition-all"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i === 5 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
            <span
              key={d}
              className="text-[9px]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {d}
            </span>
          ))}
        </div>
        {/* Traffic sources */}
        <div className="mt-4 space-y-2">
          <p
            className="text-[10px] font-semibold uppercase tracking-wide mb-2"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Sumber Traffic
          </p>
          {[
            { src: "LinkedIn", pct: 48 },
            { src: "Direct", pct: 31 },
            { src: "Google", pct: 21 },
          ].map((t) => (
            <div key={t.src} className="flex items-center gap-2">
              <span
                className="text-[11px] w-14"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t.src}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${t.pct}%`,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                />
              </div>
              <span
                className="text-[11px] w-8 text-right"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {t.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FiturPage() {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg global */}
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
        <section className="relative pt-40 pb-20 text-center overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 800,
              height: 400,
              background:
                "radial-gradient(ellipse at center top, rgba(99,102,241,0.12) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-3xl mx-auto px-6">
            <motion.div {...fadeUp(0)}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border mb-6"
                style={{
                  backgroundColor: "rgba(109,40,217,0.2)",
                  borderColor: "rgba(167,139,250,0.3)",
                  color: "#c4b5fd",
                }}
              >
                <span className="size-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
                Semua Fitur
              </span>
            </motion.div>
            <motion.h1
              {...fadeUp(0.08)}
              className="text-[52px] font-normal leading-[1.08] tracking-[-0.03em] text-white mb-5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Semua yang kamu butuhkan,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                sudah ada di sini.
              </span>
            </motion.h1>
            <motion.p
              {...fadeUp(0.14)}
              className="text-[15px] leading-relaxed max-w-md mx-auto"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              Dari no-code editor sampai analytics lengkap — satu platform untuk
              bikin portfolio yang benar-benar profesional.
            </motion.p>
          </div>
        </section>

        {/* ── FEATURE GRID ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <motion.div
            {...fadeUp(0)}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: smooth, delay: i * 0.04 }}
                className="group rounded-2xl p-5 transition-all duration-300"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#111118";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#0e0e14";
                }}
              >
                <div
                  className="size-9 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.6)",
                  }}
                >
                  {f.icon}
                </div>
                <p
                  className="text-[14px] font-semibold mb-2"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {f.title}
                </p>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── SPOTLIGHT SECTIONS ── */}
        {spotlights.map((s, idx) => (
          <section key={idx} className="py-16 max-w-5xl mx-auto px-6">
            <div
              className={`flex flex-col ${s.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-center gap-14`}
            >
              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: s.reverse ? 24 : -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: smooth }}
                className="flex-1"
              >
                <span
                  className="inline-block text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full mb-5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.4)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {s.tag}
                </span>
                <h2
                  className="text-[34px] font-normal leading-[1.15] tracking-[-0.025em] text-white mb-4"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {s.title}
                </h2>
                <p
                  className="text-[14px] leading-relaxed mb-6"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  {s.desc}
                </p>
                <ul className="space-y-2.5">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-3">
                      <div
                        className="size-4 rounded-full shrink-0 flex items-center justify-center"
                        style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                      >
                        <svg
                          className="size-2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="rgba(255,255,255,0.5)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                      <span
                        className="text-[13px]"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {pt}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Mock */}
              <motion.div
                initial={{ opacity: 0, x: s.reverse ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: smooth, delay: 0.1 }}
                className="flex-1 w-full"
              >
                <SpotlightMock type={s.mockContent} />
              </motion.div>
            </div>
          </section>
        ))}

        {/* ── COMPARISON TABLE ── */}
        <section className="py-20 max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Perbandingan
            </p>
            <h2
              className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Kenapa pilih{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                platform kami?
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 px-5 py-3"
              style={{
                backgroundColor: "#111118",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[11px] font-semibold"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Fitur
              </p>
              {[
                { label: "PortofId", highlight: true },
                { label: "Bikin Sendiri", highlight: false },
                { label: "Notion/Linktree", highlight: false },
              ].map((col) => (
                <p
                  key={col.label}
                  className="text-[11px] font-semibold text-center"
                  style={{
                    color: col.highlight
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {col.label}
                </p>
              ))}
            </div>

            {/* Rows */}
            {comparisonItems.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-4 px-5 py-3.5"
                style={{
                  backgroundColor: i % 2 === 0 ? "#0e0e14" : "#0a0a0f",
                  borderBottom:
                    i < comparisonItems.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <p
                  className="text-[12px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.label}
                </p>
                <CheckIcon val={item.us} />
                <CheckIcon val={item.diy} />
                <CheckIcon val={item.notion} />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="py-20 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: smooth }}
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
              Mulai Sekarang
            </p>
            <h2
              className="text-[40px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Semua fitur ini,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                gratis untuk dicoba.
              </span>
            </h2>
            <p
              className="text-[14px] max-w-sm mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tidak perlu kartu kredit. Daftar sekarang dan portfolio kamu
              online dalam 3 menit.
            </p>
            <div className="flex items-center justify-center gap-3">
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
                href="#harga"
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
                Lihat Harga
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
