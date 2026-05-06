import {
  IconArrowRight,
  IconPlayerPlay,
  IconBrain,
  IconChartBar,
  IconFileText,
  IconMapPin,
  IconBriefcase,
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

/* ─── AI Analyzer criteria ─────────────────────────────── */
const ANALYZER_CRITERIA = [
  { label: "Kelengkapan Profil", pct: 90, color: "#60a5fa" },
  { label: "Kualitas Deskripsi", pct: 85, color: "#a78bfa" },
  { label: "Relevansi Skill", pct: 78, color: "#34d399" },
];

/* ─── CV Parser auto-fill rows ─────────────────────────── */
const CV_FIELDS = [
  { field: "Nama", val: "Ahmad Naufal" },
  { field: "Role", val: "Full-stack Dev" },
  { field: "Skills", val: "React, Node, Figma" },
];

/* ─── Skill tags ───────────────────────────────────────── */
const SKILLS = ["React", "TypeScript", "Figma", "Node.js", "Tailwind"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#070e1b] overflow-hidden flex items-center">
      {/* ── Background ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundSize: "40px 40px",
          backgroundImage:
            "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, transparent 30%, #070e1b 80%)",
        }}
      />
      <div className="absolute top-[10%] left-[5%]  w-[480px] h-[480px] bg-blue-700/[0.06]   blur-[140px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[5%] right-[5%] w-[380px] h-[380px] bg-violet-700/[0.05] blur-[120px] rounded-full pointer-events-none z-0" />

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-6 max-w-7xl py-28 lg:py-0 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center w-full">
          {/* ═══════════════════════
              LEFT — Copy
          ═══════════════════════ */}
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
              className="text-[2.6rem] sm:text-5xl lg:text-[3.25rem] font-bold text-white leading-[1.2] tracking-tight mb-6"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Buat Portofolio Kamu, <br className="hidden sm:block" />
              Tunjukan{" "}
              <PointerHighlight
                rectangleClassName="border-blue-400/40 rounded-sm"
                pointerClassName="text-cyan-400 h-4 w-4"
                containerClassName="inline-block"
              >
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300">
                  Pada Mereka
                </span>
              </PointerHighlight>
            </h1>

            {/* Subtitle */}
            <p
              className="text-slate-400 text-base md:text-[1.05rem] max-w-lg mb-8 leading-[1.8]"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              Portofy membantu mahasiswa, freelancer, dan kreator Indonesia
              tampil profesional di dunia digital — dengan AI yang menulis,
              menganalisis, dan memberi saran langsung untuk portofoliomu.
            </p>

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
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm font-semibold hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer"
              >
                <IconPlayerPlay size={16} stroke={1.5} />
                Lihat Cara Kerjanya
              </button>
            </div>

            {/* Micro trust */}
            <p className="mt-5 text-[11px] text-slate-600 tracking-wide">
              Gratis selamanya · Tidak perlu coding · Publish instan
            </p>
          </div>

          {/* ═══════════════════════
              RIGHT — AI card stack
          ═══════════════════════ */}
          <div className="hidden lg:flex justify-center items-center">
            {/* Container — extra height for floating card overflow */}
            <div className="relative w-[390px] h-[500px]">
              {/* ══ Main portfolio card ════════════════════════════════ */}
              <div
                className="absolute inset-0 rounded-3xl overflow-hidden flex flex-col"
                style={{
                  background: "rgba(11,20,42,0.93)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 12px 40px rgba(0,0,0,0.28)",
                }}
              >
                {/* ── Profile header ─────────────────────────── */}
                <div className="flex items-center gap-3.5 px-5 pt-5 pb-4 border-b border-white/[0.05]">
                  <div
                    className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-base font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    }}
                  >
                    AN
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-white text-sm font-bold">
                        Nama Kamu
                      </span>
                      <span
                        className="text-[9px] text-emerald-300 rounded-full px-2 py-0.5 font-semibold"
                        style={{
                          background: "rgba(52,211,153,0.08)",
                          border: "1px solid rgba(52,211,153,0.15)",
                        }}
                      >
                        Open to Work
                      </span>
                    </div>
                    <p className="text-slate-400 text-[11px]">
                      Full-stack Developer & UI Designer
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <IconMapPin size={9} />
                        Jakarta, Indonesia
                      </span>
                      <span className="flex items-center gap-1">
                        <IconBriefcase size={9} />3 yr exp
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── AI Description Generator ───────────────── */}
                <div className="px-5 pt-4 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <IconBrain size={11} className="text-violet-400" />
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                        AI Description
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-bold rounded-full px-2 py-0.5"
                      style={{
                        color: "#a78bfa",
                        background: "rgba(167,139,250,0.07)",
                        border: "1px solid rgba(167,139,250,0.13)",
                      }}
                    >
                      ✦ Generated
                    </span>
                  </div>
                  {/* Generated text block */}
                  <div
                    className="rounded-xl px-3 py-2.5"
                    style={{
                      background: "rgba(139,92,246,0.05)",
                      border: "1px solid rgba(139,92,246,0.09)",
                    }}
                  >
                    <p className="text-slate-300 text-[10px] leading-[1.75]">
                      Full-stack developer berpengalaman 3 tahun, spesialisasi
                      membangun aplikasi web scalable dengan React & Node.js.
                      Rekam jejak kuat di bidang UI/UX dan sistem e-commerce
                      bervolume tinggi.
                    </p>
                  </div>
                </div>

                {/* ── AI Analyzer — criteria bars ────────────── */}
                <div className="px-5 pt-4 pb-4 flex-1 border-b border-white/[0.04]">
                  <div className="flex items-center gap-1.5 mb-3">
                    <IconChartBar size={11} className="text-amber-400" />
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                      AI Analyzer
                    </span>
                    <span
                      className="ml-auto text-[9px] font-bold rounded-full px-2 py-0.5"
                      style={{
                        color: "#fbbf24",
                        background: "rgba(251,191,36,0.07)",
                        border: "1px solid rgba(251,191,36,0.12)",
                      }}
                    >
                      Skor 87
                    </span>
                  </div>
                  <div className="space-y-2.5">
                    {ANALYZER_CRITERIA.map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] text-slate-400">
                            {item.label}
                          </span>
                          <span
                            className="text-[10px] font-semibold"
                            style={{ color: item.color }}
                          >
                            {item.pct}%
                          </span>
                        </div>
                        <div className="w-full h-[3px] rounded-full bg-white/[0.05]">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.pct}%`,
                              background: item.color,
                              opacity: 0.65,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── Skills strip ───────────────────────────── */}
                <div className="px-5 pb-4 pt-3 flex flex-wrap gap-1.5">
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
                  <span className="text-[10px] text-slate-600 px-1.5 py-1">
                    +13
                  </span>
                </div>
              </div>

              {/* ══ Floating card — AI CV Parser (top-right, tilted) ═══ */}
              <div
                className="absolute -top-6 -right-8 w-[195px] rounded-2xl p-4"
                style={{
                  background: "rgba(12,22,46,0.97)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.28)",
                  transform: "rotate(5deg)",
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "rgba(248,113,113,0.09)",
                      border: "1px solid rgba(248,113,113,0.13)",
                    }}
                  >
                    <IconFileText size={13} className="text-red-400" />
                  </div>
                  <div>
                    <p className="text-white text-[10px] font-bold leading-none">
                      CV Parser
                    </p>
                    <p className="text-slate-500 text-[9px] mt-0.5">
                      Upload → Auto-fill
                    </p>
                  </div>
                </div>

                {/* File chip */}
                <div
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 mb-2.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <IconFileText
                    size={11}
                    className="text-red-300/50 flex-shrink-0"
                  />
                  <span className="text-slate-400 text-[10px] flex-1 truncate">
                    Ahmad_CV.pdf
                  </span>
                  <span
                    className="text-[9px] text-emerald-400 font-bold rounded-full px-1.5 py-0.5 flex-shrink-0"
                    style={{ background: "rgba(52,211,153,0.08)" }}
                  >
                    ✓
                  </span>
                </div>

                {/* Auto-filled field rows */}
                <div className="space-y-1.5">
                  {CV_FIELDS.map((row) => (
                    <div
                      key={row.field}
                      className="flex items-center justify-between"
                    >
                      <span className="text-slate-600 text-[9px]">
                        {row.field}
                      </span>
                      <span className="text-slate-300 text-[9px] font-medium">
                        {row.val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ══ AI Consultation pill — bottom-right ════════════════ */}
              <div
                className="absolute -bottom-4 right-0 flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  background: "rgba(7,14,27,0.97)",
                  border: "1px solid rgba(167,139,250,0.14)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
                }}
              >
                <IconBrain
                  size={11}
                  className="text-violet-400 flex-shrink-0"
                />
                <span className="text-slate-300 text-[11px] font-medium">
                  AI Consultation aktif
                </span>
              </div>

              {/* ══ Published status pill — bottom-left ════════════════ */}
              <div
                className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  background: "rgba(7,14,27,0.97)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  boxShadow: "0 4px 14px rgba(0,0,0,0.22)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] font-medium">
                  Portfolio Published
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
