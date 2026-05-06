import {
  IconArrowRight,
  IconPlayerPlay,
  IconBrain,
  IconStar,
  IconTemplate,
  IconChartBar,
  IconFileText,
  IconMapPin,
  IconBriefcase,
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

/* ─── Social proof avatars ─────────────────────────────── */
const AVATARS = [
  { initials: "RA", color: "#3b82f6" },
  { initials: "DS", color: "#8b5cf6" },
  { initials: "FH", color: "#10b981" },
  { initials: "KP", color: "#f59e0b" },
];

/* ─── Feature pill badges ──────────────────────────────── */
const PILLS = [
  { icon: IconTemplate, label: "Template Builder", color: "#34d399", bg: "rgba(52,211,153,0.07)",  border: "rgba(52,211,153,0.15)"  },
  { icon: IconBrain,    label: "AI Description",   color: "#a78bfa", bg: "rgba(167,139,250,0.07)", border: "rgba(167,139,250,0.15)" },
  { icon: IconChartBar, label: "Analyzer",          color: "#fbbf24", bg: "rgba(251,191,36,0.07)",  border: "rgba(251,191,36,0.15)"  },
  { icon: IconFileText, label: "CV Parser",          color: "#f87171", bg: "rgba(248,113,113,0.07)", border: "rgba(248,113,113,0.15)" },
];

/* ─── Mock project rows ────────────────────────────────── */
const MOCK_PROJECTS = [
  { name: "E-Commerce Dashboard",   tech: "React · Node.js",      dot: "#60a5fa" },
  { name: "Brand Identity System",  tech: "Figma · Illustrator",  dot: "#a78bfa" },
  { name: "Data Visualization App", tech: "Python · D3.js",       dot: "#34d399" },
];

/* ─── Skill tags ───────────────────────────────────────── */
const SKILLS = ["React", "TypeScript", "Figma", "Node.js", "Tailwind"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#070e1b] overflow-hidden flex items-center">

      {/* ── Background ─────────────────────────────────────────── */}
      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage: "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        }}
      />
      {/* Vignette to fade edges */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{ background: "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #070e1b 80%)" }}
      />
      {/* Very muted color blobs */}
      <div className="absolute top-[10%] left-[5%]  w-[480px] h-[480px] bg-blue-700/[0.06]   blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[5%] w-[380px] h-[380px] bg-violet-700/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl py-28 lg:py-0 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">

          {/* ═══════════════════════════════
              LEFT — Copy
          ═══════════════════════════════ */}
          <div className="flex flex-col items-start text-left">

            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 bg-blue-500/[0.07] border border-blue-500/[0.18] rounded-full px-4 py-1.5 mb-7">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <span className="text-blue-200 text-xs font-semibold tracking-widest uppercase">
                Platform Portfolio Builder untuk Indonesia
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-[2.6rem] sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.1] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
            >
              Portofolio Profesional,{" "}
              <br className="hidden sm:block" />
              Tanpa Satu Pun{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300">
                Baris Kode
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="text-slate-400 text-base md:text-[1.05rem] max-w-lg mb-8 leading-[1.8]"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              Portofy membantu mahasiswa, freelancer, dan kreator Indonesia tampil
              profesional di dunia digital — dengan AI yang menulis, menganalisis,
              dan memberi saran langsung untuk portofoliomu.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-9">
              {PILLS.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
                  style={{ color: pill.color, background: pill.bg, border: `1px solid ${pill.border}` }}
                >
                  <pill.icon size={12} />
                  {pill.label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2 cursor-pointer"
              >
                <span className="font-semibold">Mulai Gratis Sekarang</span>
                <IconArrowRight size={17} stroke={2.5} />
              </HoverBorderGradient>
              <button
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm font-semibold hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer"
              >
                <IconPlayerPlay size={16} stroke={1.5} />
                Lihat Cara Kerjanya
              </button>
            </div>

            {/* Social proof */}
            <div className="flex items-center gap-3 mt-8">
              <div className="flex -space-x-2">
                {AVATARS.map((av) => (
                  <div
                    key={av.initials}
                    className="w-8 h-8 rounded-full border-2 border-[#070e1b] flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: av.color }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-0.5 mb-0.5">
                  {[...Array(5)].map((_, i) => (
                    <IconStar key={i} size={11} className="text-amber-400" fill="#fbbf24" />
                  ))}
                </div>
                <p className="text-slate-500 text-[11px]">
                  Dipercaya <span className="text-slate-300 font-semibold">2,400+</span> kreator Indonesia
                </p>
              </div>
            </div>

            {/* Micro trust */}
            <p className="mt-5 text-[11px] text-slate-600 tracking-wide">
              Gratis selamanya · Tidak perlu coding · Publish instan
            </p>
          </div>

          {/* ═══════════════════════════════
              RIGHT — Portfolio card stack
          ═══════════════════════════════ */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Wrapper — sized to give room for floating card overflow */}
            <div className="relative w-[390px] h-[440px]">

              {/* ── Main portfolio card ────────────────── */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: "rgba(11,20,42,0.92)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
                }}
              >
                {/* Profile header */}
                <div className="flex items-center gap-3.5 px-5 pt-5 pb-4 border-b border-white/[0.05]">
                  <div
                    className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-base font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #2563eb, #7c3aed)" }}
                  >
                    AN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-sm font-bold">Ahmad Naufal</span>
                      <span
                        className="text-[9px] text-blue-300 rounded-full px-2 py-0.5 font-semibold"
                        style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.18)" }}
                      >
                        Open to Work
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">Full-stack Developer & UI Designer</p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1"><IconMapPin size={9} />Bandung, ID</span>
                      <span className="flex items-center gap-1"><IconBriefcase size={9} />3 yr exp</span>
                    </div>
                  </div>
                </div>

                {/* Projects list */}
                <div className="px-5 pt-4 flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest">Projects</span>
                    <span className="text-slate-600 text-[10px]">24 total</span>
                  </div>
                  <div className="space-y-2">
                    {MOCK_PROJECTS.map((p) => (
                      <div
                        key={p.name}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        {/* Colored dot */}
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: p.dot }}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-[11px] font-semibold truncate">{p.name}</p>
                          <p className="text-slate-500 text-[10px]">{p.tech}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills strip */}
                <div className="px-5 pb-5 pt-3 flex flex-wrap gap-1.5">
                  {SKILLS.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] text-slate-400 px-2.5 py-1 rounded-md"
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  <span className="text-[10px] text-slate-600 px-1.5 py-1">+13</span>
                </div>
              </div>

              {/* ── Floating accent card — top-right, tilted ──── */}
              <div
                className="absolute -top-5 -right-6 w-[180px] rounded-2xl p-4"
                style={{
                  background: "linear-gradient(140deg, #1d4ed8, #4338ca)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
                  transform: "rotate(5deg)",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-lg bg-white/[0.12] flex items-center justify-center">
                    <IconBrain size={14} className="text-white" />
                  </div>
                  <span className="text-[9px] text-white/70 font-semibold bg-white/[0.12] rounded-full px-2 py-0.5">
                    AI
                  </span>
                </div>
                <p className="text-blue-200/80 text-[10px] mb-1">Template baru tersedia</p>
                <p className="text-white text-sm font-bold leading-tight">Portfolio Pro</p>
                {/* Thin progress bar */}
                <div className="mt-3 w-full h-[3px] rounded-full bg-white/[0.12]">
                  <div className="h-full w-3/4 rounded-full bg-white/50" />
                </div>
              </div>

              {/* ── Status pill — bottom-left ──────────────────── */}
              <div
                className="absolute -bottom-3 -left-3 flex items-center gap-2 rounded-full px-4 py-2"
                style={{
                  background: "rgba(7,14,27,0.97)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] font-medium">Portfolio Published</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
