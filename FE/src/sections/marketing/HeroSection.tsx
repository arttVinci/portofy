import {
  ArrowRightIcon,
  PlayIcon,
  BrainIcon,
  BarChartIcon,
  FileTextIcon,
  MapPinIcon,
  BriefcaseIcon,
} from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { PointerHighlight } from "@/components/ui/pointer-highlight";

import { Link } from "react-router-dom";

/* ─── AI Analyzer criteria ─────────────────────────────── */
const ANALYZER_CRITERIA = [
  { label: "Kelengkapan Profil", pct: 95, color: "#60a5fa" },
  { label: "Kualitas Deskripsi", pct: 91, color: "#60a5fa" },
  { label: "Relevansi Skill", pct: 92, color: "#60a5fa" },
];

/* ─── CV Parser auto-fill rows ─────────────────────────── */
const CV_FIELDS = [
  { field: "Nama", val: "Your name" },
  { field: "Role", val: "Full-stack Dev" },
  { field: "Skills", val: "React, Node, Figma" },
];

/* ─── Skill tags ───────────────────────────────────────── */
const SKILLS = ["React", "TypeScript", "Figma", "Node.js", "Tailwind"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      {/* ── Background ─────────────────────────────────────── */}

      {/* ── Main content ───────────────────────────────────── */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl py-28 lg:py-0 min-h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-20 items-center w-full">
          {/* ═══════════════════════
              LEFT — Copy
          ═══════════════════════ */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2.5 bg-blue-500/[0.07] rounded-full px-4 py-1.5 mb-7"
              style={{ border: "2px dashed rgba(255,255,255,0.12)" }}
            >
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
            <div className="flex items-center gap-2 sm:gap-4">
              <Link to="/auth/register">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="bg-black text-white flex items-center space-x-1.5 sm:space-x-2 cursor-pointer text-sm px-6 py-3 sm:px-5 sm:py-2.5"
                >
                  <span className="font-semibold whitespace-nowrap">
                    Mulai Gratis
                  </span>
                  <ArrowRightIcon
                    size={14}
                    strokeWidth={2.5}
                    className="sm:w-[17px] sm:h-[17px]"
                  />
                </HoverBorderGradient>
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-1.5 sm:gap-2 px-6 py-3 sm:px-6 sm:py-3 rounded-full border border-slate-700 hover:border-slate-500 text-slate-400 hover:text-white text-sm font-semibold hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <PlayIcon size={14} strokeWidth={1.5} className="shrink-0" />
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
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-[320px] h-[420px] lg:w-[390px] lg:h-[500px] mt-12">
              {/* ══ Main portfolio card ════════════════════════════════ */}
              <div
                className="absolute inset-0 rounded-3xl flex flex-col"
                style={{
                  border: "2px dashed rgba(255,255,255,0.12)",
                }}
              >
                {/* ── Profile header ─────────────────────────── */}
                <div className="flex items-center gap-3.5 px-5 pt-5 pb-4 border-b border-white/[0.05]">
                  <div
                    className="w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center text-base font-bold text-white"
                    style={{
                      border: "2px dashed rgba(255,255,255,0.12)",
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
                        className="text-[9px] text-blue-300 rounded-full px-2 py-0.5 font-semibold"
                        style={{
                          background: "rgba(96,165,250,0.08)",
                          border: "1px solid rgba(96,165,250,0.15)",
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
                        <MapPinIcon size={9} />
                        Jakarta, Indonesia
                      </span>
                      <span className="flex items-center gap-1">
                        <BriefcaseIcon size={9} />3 yr exp
                      </span>
                    </div>
                  </div>
                </div>

                {/* ── AI Description Generator ───────────────── */}
                <div className="px-5 pt-4 pb-4 border-b border-white/[0.04]">
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <BrainIcon size={11} className="text-blue-400" />
                      <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                        AI Description
                      </span>
                    </div>
                    <span
                      className="text-[9px] font-bold rounded-full px-2 py-0.5"
                      style={{
                        color: "#60a5fa",
                        background: "rgba(96,165,250,0.07)",
                        border: "1px solid rgba(96,165,250,0.13)",
                      }}
                    >
                      ✦ Generated
                    </span>
                  </div>
                  <div
                    className="rounded-xl px-3 py-2.5"
                    style={{
                      background: "rgba(59,130,246,0.05)",
                      border: "1px solid rgba(59,130,246,0.09)",
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
                    <BarChartIcon size={11} className="text-blue-400" />
                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-widest">
                      AI Analyzer
                    </span>
                    <span
                      className="ml-auto text-blue-300 text-[9px] font-bold rounded-full px-2 py-0.5"
                      style={{
                        background: "rgba(96,165,250,0.08)",
                        border: "1px solid rgba(96,165,250,0.15)",
                      }}
                    >
                      Skor 94
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
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.07)",
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
                className="absolute -top-4 -right-8 lg:-top-8 lg:-right-16 w-[160px] lg:w-[185px] rounded-2xl p-3 lg:p-4"
                style={{
                  border: "2px dashed rgba(255,255,255,0.15)",
                  transform: "rotate(4deg)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "rgba(59,130,246,0.09)",
                      border: "1px solid rgba(59,130,246,0.13)",
                    }}
                  >
                    <FileTextIcon size={13} className="text-blue-400" />
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

                <div
                  className="flex items-center gap-2 rounded-lg px-2.5 py-1.5 mb-2.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <FileTextIcon
                    size={11}
                    className="text-blue-400 flex-shrink-0"
                  />
                  <span className="text-slate-400 text-[10px] flex-1 truncate">
                    Your_CV.pdf
                  </span>
                  <span
                    className="text-[9px] text-blue-400 font-bold rounded-full px-1.5 py-0.5 flex-shrink-0"
                    style={{ background: "rgba(96,165,250,0.08)" }}
                  >
                    ✓
                  </span>
                </div>

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
                className="absolute -bottom-5 right-2 flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  border: "1px dashed rgba(96,165,250,0.3)",
                }}
              >
                <BrainIcon size={11} className="text-blue-400 flex-shrink-0" />
                <span className="text-slate-300 text-[11px] font-medium">
                  AI Consultation aktif
                </span>
              </div>

              {/* ══ Published status pill — bottom-left ════════════════ */}
              <div
                className="absolute -bottom-5 -left-2 flex items-center gap-2 rounded-full px-3.5 py-2"
                style={{
                  border: "1px dashed rgba(255,255,255,0.15)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
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
