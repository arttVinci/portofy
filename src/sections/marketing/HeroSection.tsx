import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  Eye,
  MousePointerClick,
  Share2,
  Palette,
  Zap,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: smooth, delay },
});

const TICKER_ITEMS = [
  "Developer",
  "Designer",
  "Photographer",
  "Writer",
  "Freelancer",
  "Data Analyst",
  "Product Manager",
  "Mahasiswa",
  "Fresh Graduate",
  "Content Creator",
];

// ── Floating Card Components ──────────────────────────────────────────────────

function TemplatePreviewCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="rounded-2xl p-4 w-[200px]"
      style={{
        backgroundColor: "rgba(17,26,46,0.92)",
        border: "1px solid rgba(56,189,248,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(56,189,248,0.08)",
      }}
    >
      <div
        className="rounded-lg mb-3 p-3"
        style={{ backgroundColor: "rgba(56,189,248,0.06)" }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="size-6 rounded-full"
            style={{ backgroundColor: "rgba(56,189,248,0.2)" }}
          />
          <div>
            <div
              className="h-1.5 w-16 rounded-full"
              style={{ backgroundColor: "rgba(56,189,248,0.3)" }}
            />
            <div
              className="h-1 w-10 rounded-full mt-1"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          </div>
        </div>
        <div className="space-y-1">
          {[75, 55, 65].map((w, i) => (
            <div
              key={i}
              className="h-1 rounded-full"
              style={{
                width: `${w}%`,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
      </div>
      <p
        className="text-[11px] font-semibold"
        style={{ color: "rgba(241,245,249,0.85)" }}
      >
        Template Preview
      </p>
      <p className="text-[10px]" style={{ color: "rgba(148,163,184,0.6)" }}>
        Minimal · Clean
      </p>
      <div className="flex items-center gap-1.5 mt-2">
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
        <span
          className="text-[9px] font-medium"
          style={{ color: "rgba(52,211,153,0.8)" }}
        >
          Active
        </span>
      </div>
    </motion.div>
  );
}

function StatsCard() {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.8,
      }}
      className="rounded-2xl p-4 w-[190px]"
      style={{
        backgroundColor: "rgba(17,26,46,0.92)",
        border: "1px solid rgba(56,189,248,0.15)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(59,130,246,0.08)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <BarChart3 size={14} style={{ color: "rgba(56,189,248,0.8)" }} />
          <span
            className="text-[11px] font-semibold"
            style={{ color: "rgba(241,245,249,0.85)" }}
          >
            Analitik
          </span>
        </div>
        <span
          className="px-1.5 py-0.5 rounded-full text-[9px] font-bold"
          style={{
            backgroundColor: "rgba(52,211,153,0.15)",
            color: "rgba(52,211,153,0.9)",
          }}
        >
          +24%
        </span>
      </div>
      <div className="flex items-end gap-1 h-10 mb-2">
        {[35, 50, 40, 65, 55, 80, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm"
            style={{
              height: `${h}%`,
              background:
                i === 5
                  ? "linear-gradient(to top, #3b82f6, #06b6d4)"
                  : "rgba(56,189,248,0.15)",
            }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[
          { icon: Eye, val: "1.2k", label: "Views" },
          { icon: MousePointerClick, val: "328", label: "Klik" },
          { icon: Share2, val: "89", label: "Share" },
        ].map((s) => (
          <div key={s.label} className="text-center">
            <p
              className="text-[10px] font-bold"
              style={{ color: "rgba(241,245,249,0.8)" }}
            >
              {s.val}
            </p>
            <p
              className="text-[8px]"
              style={{ color: "rgba(148,163,184,0.4)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function DomainCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1.5,
      }}
      className="rounded-2xl p-3.5 w-[185px]"
      style={{
        backgroundColor: "rgba(17,26,46,0.92)",
        border: "1px solid rgba(56,189,248,0.12)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="size-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
        >
          <Globe size={14} style={{ color: "rgba(56,189,248,0.8)" }} />
        </div>
        <div>
          <p
            className="text-[10px] font-semibold"
            style={{ color: "rgba(241,245,249,0.85)" }}
          >
            Custom Domain
          </p>
          <p className="text-[8px]" style={{ color: "rgba(148,163,184,0.5)" }}>
            SSL · HTTPS
          </p>
        </div>
      </div>
      <div
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
        <span className="text-[9px]" style={{ color: "rgba(148,163,184,0.5)" }}>
          portofy.net/
        </span>
        <span
          className="text-[9px] font-semibold"
          style={{ color: "rgba(241,245,249,0.7)" }}
        >
          namakamu
        </span>
      </div>
    </motion.div>
  );
}

function ThemeCard() {
  return (
    <motion.div
      animate={{ y: [0, -7, 0] }}
      transition={{
        duration: 4.2,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.4,
      }}
      className="rounded-2xl p-3.5 w-[170px]"
      style={{
        backgroundColor: "rgba(17,26,46,0.92)",
        border: "1px solid rgba(56,189,248,0.12)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <div
          className="size-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "rgba(139,92,246,0.12)" }}
        >
          <Palette size={14} style={{ color: "rgba(167,139,250,0.85)" }} />
        </div>
        <p
          className="text-[10px] font-semibold"
          style={{ color: "rgba(241,245,249,0.85)" }}
        >
          Kustomisasi
        </p>
      </div>
      <div className="flex gap-1.5 mb-2">
        {["#3b82f6", "#06b6d4", "#8b5cf6", "#f59e0b", "#ef4444"].map((c) => (
          <div
            key={c}
            className="size-5 rounded-full border-2"
            style={{
              backgroundColor: c,
              borderColor: "rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className="h-1.5 flex-1 rounded-full"
          style={{
            background: "linear-gradient(to right, #3b82f6, #06b6d4)",
          }}
        />
        <span
          className="text-[8px] font-medium"
          style={{ color: "rgba(148,163,184,0.5)" }}
        >
          Theme
        </span>
      </div>
    </motion.div>
  );
}

function PublishCard() {
  return (
    <motion.div
      animate={{ y: [0, -9, 0] }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 2,
      }}
      className="rounded-2xl p-3.5 w-[175px]"
      style={{
        backgroundColor: "rgba(17,26,46,0.92)",
        border: "1px solid rgba(56,189,248,0.12)",
        backdropFilter: "blur(12px)",
        boxShadow:
          "0 8px 32px rgba(0,0,0,0.4), 0 0 40px rgba(56,189,248,0.06)",
      }}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="size-7 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: "rgba(52,211,153,0.12)" }}
        >
          <Zap size={14} style={{ color: "rgba(52,211,153,0.85)" }} />
        </div>
        <div>
          <p
            className="text-[10px] font-semibold"
            style={{ color: "rgba(241,245,249,0.85)" }}
          >
            1-Click Publish
          </p>
        </div>
      </div>
      <div
        className="rounded-lg px-2.5 py-2 flex items-center justify-between"
        style={{
          backgroundColor: "rgba(52,211,153,0.06)",
          border: "1px solid rgba(52,211,153,0.12)",
        }}
      >
        <span className="text-[9px]" style={{ color: "rgba(52,211,153,0.7)" }}>
          🚀 Portfolio Live!
        </span>
        <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
      </div>
      <p className="text-[8px] mt-1.5" style={{ color: "rgba(148,163,184,0.4)" }}>
        Deploy dalam hitungan detik
      </p>
    </motion.div>
  );
}

// Card positions for layout + connection lines
// Positions are [left%, top%] of the container
const CARD_POSITIONS = [
  { id: 0, left: "2%", top: "5%" },      // TemplatePreview (top-left)
  { id: 1, left: "52%", top: "0%" },      // Stats (top-right)
  { id: 2, left: "58%", top: "42%" },     // Theme (mid-right)
  { id: 3, left: "5%", top: "48%" },      // Domain (mid-left)
  { id: 4, left: "28%", top: "78%" },     // Publish (bottom-center)
];

// Connection lines between cards: [fromIdx, toIdx]
const CONNECTIONS: [number, number][] = [
  [0, 1],
  [0, 3],
  [1, 2],
  [2, 4],
  [3, 4],
  [0, 2],
];

// Approximate center points of each card for SVG lines (px values for a ~500x480 container)
const CARD_CENTERS = [
  { x: 110, y: 80 },   // 0: TemplatePreview
  { x: 365, y: 65 },   // 1: Stats
  { x: 390, y: 280 },  // 2: Theme
  { x: 120, y: 310 },  // 3: Domain
  { x: 250, y: 430 },  // 4: Publish
];

// ── Main Hero Section ─────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#0c1222",
      }}
    >
      {/* ── Grid background ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Ambient glows ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/4"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(ellipse, rgba(59,130,246,0.12) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 right-0"
        style={{
          width: 500,
          height: 500,
          background:
            "radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />

      {/* ── Floating particles ── */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            backgroundColor: `rgba(56,189,248,${0.15 + (i % 3) * 0.08})`,
            left: `${15 + i * 14}%`,
            top: `${20 + (i % 4) * 18}%`,
          }}
          animate={{
            y: [0, -20 - i * 5, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 4 + i * 0.7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center w-full">
          {/* ── LEFT: Text content ── */}
          <div className="max-w-xl">
            {/* Badge */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide border"
                style={{
                  backgroundColor: "rgba(59,130,246,0.15)",
                  borderColor: "rgba(56,189,248,0.25)",
                  color: "#38bdf8",
                }}
              >
                <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                No-code · Instant · Gratis untuk mulai
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="mt-6 text-[52px] leading-[1.08] font-extrabold tracking-[-0.03em]"
              style={{ color: "#f1f5f9" }}
            >
              Buat Portfolio
              <br />
              Profesional{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Tanpa Ribet
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              {...fadeUp(0.3)}
              className="mt-5 text-[17px] leading-[1.65]"
              style={{ color: "#94a3b8" }}
            >
              Pilih template, isi profil kamu, dan portfolio siap ditampilkan ke
              dunia — dalam hitungan menit, bukan minggu.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.4)} className="mt-8 flex items-center gap-3">
              <a
                href="/auth/register"
                className="px-7 py-3.5 rounded-full text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.35)",
                }}
              >
                Mulai Gratis →
              </a>
              <a
                href="#cara-kerja"
                className="px-7 py-3.5 rounded-full text-[15px] font-medium transition-colors duration-150"
                style={{
                  color: "rgba(148,163,184,0.9)",
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(56,189,248,0.15)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(56,189,248,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                    "rgba(255,255,255,0.05)";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor =
                    "rgba(56,189,248,0.15)";
                }}
              >
                Lihat Cara Kerjanya
              </a>
            </motion.div>

            {/* Trust */}
            <motion.p
              {...fadeUp(0.45)}
              className="mt-5 flex items-center gap-2 text-[13px]"
              style={{ color: "rgba(148,163,184,0.4)" }}
            >
              <span className="size-1.5 rounded-full bg-emerald-400 inline-block" />
              Dibangun untuk kreator Indonesia
            </motion.p>
          </div>

          {/* ── RIGHT: Floating UI cards with connection lines ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: smooth, delay: 0.3 }}
            className="relative h-[520px] hidden lg:block"
          >
            {/* ── SVG connection lines ── */}
            <svg
              className="pointer-events-none absolute inset-0 w-full h-full"
              viewBox="0 0 500 520"
              fill="none"
              style={{ overflow: "visible" }}
            >
              <defs>
                <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {CONNECTIONS.map(([from, to], i) => (
                <motion.line
                  key={i}
                  x1={CARD_CENTERS[from].x}
                  y1={CARD_CENTERS[from].y}
                  x2={CARD_CENTERS[to].x}
                  y2={CARD_CENTERS[to].y}
                  stroke="url(#lineGrad)"
                  strokeWidth="1.2"
                  strokeDasharray="6 6"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: smooth,
                    delay: 0.6 + i * 0.15,
                  }}
                />
              ))}
              {/* Node dots at card centers */}
              {CARD_CENTERS.map((pos, i) => (
                <motion.circle
                  key={i}
                  cx={pos.x}
                  cy={pos.y}
                  r="3"
                  fill="#38bdf8"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.6 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                />
              ))}
            </svg>

            {/* ── Floating cards ── */}
            {/* Card 0: TemplatePreview (top-left) */}
            <div
              className="absolute"
              style={{ left: CARD_POSITIONS[0].left, top: CARD_POSITIONS[0].top }}
            >
              <TemplatePreviewCard />
            </div>

            {/* Card 1: Stats (top-right) */}
            <div
              className="absolute"
              style={{ left: CARD_POSITIONS[1].left, top: CARD_POSITIONS[1].top }}
            >
              <StatsCard />
            </div>

            {/* Card 2: Theme (mid-right) */}
            <div
              className="absolute"
              style={{ left: CARD_POSITIONS[2].left, top: CARD_POSITIONS[2].top }}
            >
              <ThemeCard />
            </div>

            {/* Card 3: Domain (mid-left) */}
            <div
              className="absolute"
              style={{ left: CARD_POSITIONS[3].left, top: CARD_POSITIONS[3].top }}
            >
              <DomainCard />
            </div>

            {/* Card 4: Publish (bottom-center) */}
            <div
              className="absolute"
              style={{ left: CARD_POSITIONS[4].left, top: CARD_POSITIONS[4].top }}
            >
              <PublishCard />
            </div>

            {/* Center glow */}
            <div
              className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                width: 350,
                height: 350,
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* ── BOTTOM TICKER ── */}
      <div
        className="relative z-10 overflow-hidden py-4"
        style={{
          borderTop: "1px solid rgba(56,189,248,0.08)",
          borderBottom: "1px solid rgba(56,189,248,0.08)",
        }}
      >
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              className="text-[14px] font-medium tracking-wide"
              style={{ color: "rgba(148,163,184,0.25)" }}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── ICON BLOCKS (below hero) ── */}
      <IconBlocksInline />
    </section>
  );
}

// ── Inline Icon Blocks ────────────────────────────────────────────────────────
function IconBlocksInline() {
  const features = [
    {
      icon: "🎯",
      title: "Tanpa Coding Sama Sekali",
      desc: "Cukup isi form, pilih template, dan portfolio kamu langsung hidup.",
    },
    {
      icon: "🎨",
      title: "Template Siap Pakai",
      desc: "Pilih dari puluhan template profesional yang dirancang khusus.",
    },
    {
      icon: "📱",
      title: "Tampil di Semua Perangkat",
      desc: "Otomatis responsif — sempurna di laptop, tablet, maupun HP.",
    },
    {
      icon: "✏️",
      title: "Update Kapan Saja",
      desc: "Edit portfolio kamu dalam hitungan menit — selalu fresh.",
    },
  ];

  return (
    <div className="relative z-10 max-w-7xl px-6 py-16 mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: smooth }}
        className="text-center text-[12px] font-semibold tracking-[0.15em] uppercase mb-10"
        style={{ color: "rgba(56,189,248,0.6)" }}
      >
        Kenapa pilih platform kami
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth, delay: i * 0.1 }}
          >
            <div
              className="size-12 rounded-xl flex items-center justify-center text-xl mb-4"
              style={{
                backgroundColor: "rgba(56,189,248,0.08)",
                border: "1px solid rgba(56,189,248,0.12)",
              }}
            >
              {f.icon}
            </div>

            <div
              className="h-px mb-4"
              style={{
                background:
                  "linear-gradient(to right, rgba(59,130,246,0.5), rgba(6,182,212,0.2), transparent)",
              }}
            />

            <h3
              className="text-[15px] font-semibold leading-snug"
              style={{ color: "rgba(241,245,249,0.9)" }}
            >
              {f.title}
            </h3>
            <p
              className="mt-2 text-[13px] leading-relaxed"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
