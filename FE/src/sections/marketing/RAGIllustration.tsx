import {
  BrainIcon,
  GlobeIcon,
  LinkedinIcon,
  GithubIcon,
  SearchIcon,
  DatabaseIcon,
  UserCheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  NetworkIcon,
  ShieldCheckIcon,
} from "lucide-react";

/* ─── Web Sources ────────────────────────────────── */
const WEB_SOURCES = [
  { key: "google", label: "Google", icon: GlobeIcon, delay: 0 },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, delay: 150 },
  { key: "github", label: "GitHub", icon: GithubIcon, delay: 300 },
  { key: "web", label: "Web Data", icon: SearchIcon, delay: 450 },
];

/* ─── Matched Results ────────────────────────────── */
const MATCHED_RESULTS = [
  { field: "Nama", value: "Muhammad Rizky", confidence: 98 },
  { field: "Universitas", value: "UI - Teknik Informatika", confidence: 95 },
  { field: "Perusahaan", value: "PT Teknologi Nusantara", confidence: 92 },
  { field: "GitHub Repos", value: "23 public repositories", confidence: 100 },
  { field: "Skills Match", value: "React, Go, Docker +8", confidence: 89 },
];

/* ─── Agent Reasoning Steps ──────────────────────── */
const REASONING_STEPS = [
  { prefix: "→", text: "Searching Google for 'Muhammad Rizky developer'...", status: "done" },
  { prefix: "→", text: "Found LinkedIn profile — extracting work history...", status: "done" },
  { prefix: "→", text: "Scanning GitHub repos — analyzing tech stack...", status: "done" },
  { prefix: "→", text: "Cross-referencing education records...", status: "done" },
  { prefix: "✦", text: "Background verification complete — 94% match", status: "result" },
];

export default function RAGIllustration() {
  return (
    <div className="relative w-full max-w-[1000px] mx-auto py-10 px-5">
      {/* ── Ambient Glows ──────────────────────────── */}
      <div className="absolute w-[350px] h-[350px] top-[10%] left-[10%] rounded-full pointer-events-none blur-[140px] bg-[rgba(0,212,255,0.05)]" />
      <div className="absolute w-[300px] h-[300px] bottom-[10%] right-[10%] rounded-full pointer-events-none blur-[140px] bg-[rgba(0,212,255,0.04)]" />

      {/* ═══ MAIN LAYOUT: 3-column horizontal ═══════ */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 lg:gap-0 items-center">
        {/* ────────────────────────────────────────────
            LEFT: Web Sources
        ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 items-center lg:items-end">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
            <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
              Data Sources
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-1 lg:gap-3">
            {WEB_SOURCES.map((src, idx) => (
              <div
                key={src.key}
                className="group relative flex items-center gap-3 px-4 py-3 rounded-xl bg-[rgba(18,18,18,0.85)] border border-white/[0.06] backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.06)] hover:-translate-x-1 lg:w-[200px] animate-cv-agent-fade-in"
                style={{ animationDelay: `${idx * 120}ms` }}
              >
                {/* Scanning pulse line on the right */}
                <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent to-[rgba(0,212,255,0.3)] group-hover:to-[rgba(0,212,255,0.6)] transition-all" />
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.12)]">
                  <src.icon size={15} className="text-[#00d4ff]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-semibold text-slate-200">
                    {src.label}
                  </div>
                  <div className="text-[9px] text-slate-500">Crawling...</div>
                </div>
                <span className="w-[6px] h-[6px] rounded-full bg-[#00d4ff] shadow-[0_0_6px_rgba(0,212,255,0.5)] animate-cv-status-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* ────────────────────────────────────────────
            CENTER: RAG Agent Brain
        ──────────────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center px-4 lg:px-10 py-6">
          {/* Orbital ring container */}
          <div className="relative w-[160px] h-[160px] lg:w-[180px] lg:h-[180px]">
            {/* Outer orbit ring */}
            <div className="absolute inset-0 rounded-full border border-[rgba(0,212,255,0.1)] animate-rag-orbit-spin" />
            {/* Middle orbit ring */}
            <div className="absolute inset-3 rounded-full border border-dashed border-[rgba(0,212,255,0.08)]" />
            {/* Inner glow ring */}
            <div className="absolute inset-6 rounded-full bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.12)]" />

            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-rag-orbit-spin">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
            </div>
            <div className="absolute inset-0 animate-rag-orbit-spin-reverse">
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[rgba(0,212,255,0.5)]" />
            </div>

            {/* Center brain icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-2xl bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center animate-cv-upload-glow">
                <BrainIcon size={28} className="text-[#00d4ff]" />
              </div>
            </div>

            {/* Connection lines left */}
            <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full w-10 h-[1px]">
              <div className="w-full h-full bg-gradient-to-l from-[rgba(0,212,255,0.25)] to-transparent" />
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-rag-dot-travel-left" />
            </div>

            {/* Connection lines right */}
            <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-10 h-[1px]">
              <div className="w-full h-full bg-gradient-to-r from-[rgba(0,212,255,0.25)] to-transparent" />
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-rag-dot-travel-right" />
            </div>
          </div>

          {/* Label under brain */}
          <div className="mt-4 text-center">
            <div className="text-sm font-bold text-slate-200">RAG Agent</div>
            <div className="text-[10px] text-slate-500 mt-0.5">
              Retrieval-Augmented Generation
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            RIGHT: Matched Results
        ──────────────────────────────────────────── */}
        <div className="flex flex-col gap-3 items-center lg:items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
            <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
              Matched Profile
            </span>
          </div>
          <div className="relative bg-[rgba(18,18,18,0.85)] border border-[rgba(0,212,255,0.1)] rounded-2xl px-5 py-4 backdrop-blur-[20px] lg:w-[260px] w-full max-w-[300px]">
            {/* Result rows */}
            <div className="space-y-2.5">
              {MATCHED_RESULTS.map((r, idx) => (
                <div
                  key={r.field}
                  className="flex items-center justify-between gap-3 animate-cv-agent-fade-in"
                  style={{ animationDelay: `${600 + idx * 100}ms` }}
                >
                  <div className="min-w-0 flex-1">
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">
                      {r.field}
                    </div>
                    <div className="text-[11px] text-slate-300 font-medium truncate">
                      {r.value}
                    </div>
                  </div>
                  <span className="text-[9px] font-bold text-[#00d4ff] bg-[rgba(0,212,255,0.08)] px-2 py-0.5 rounded-full shrink-0">
                    {r.confidence}%
                  </span>
                </div>
              ))}
            </div>
            {/* Overall match score */}
            <div className="mt-4 pt-3 border-t border-white/[0.05] flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <UserCheckIcon size={12} className="text-[#00d4ff]" />
                <span className="text-[10px] text-slate-400 font-semibold">
                  Overall Match
                </span>
              </div>
              <span className="text-sm font-bold text-[#00d4ff]">94%</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ LIVE TERMINAL — Agent Reasoning ════════ */}
      <div className="relative z-10 mt-10 max-w-[600px] mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
          <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
            Agent Reasoning
          </span>
        </div>
        <div className="bg-[rgba(10,10,10,0.9)] border border-white/[0.06] rounded-xl overflow-hidden backdrop-blur-[20px]">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/[0.04]">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/[0.08]" />
            </div>
            <span className="text-[10px] text-slate-500 font-mono ml-2">
              rag-agent — background-search
            </span>
          </div>
          {/* Terminal body */}
          <div className="px-4 py-3 space-y-1.5 font-mono">
            {REASONING_STEPS.map((step, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2 text-[11px] leading-relaxed animate-cv-agent-fade-in ${
                  step.status === "result"
                    ? "text-[#00d4ff] font-semibold"
                    : "text-slate-400"
                }`}
                style={{ animationDelay: `${800 + idx * 200}ms` }}
              >
                <span
                  className={`shrink-0 mt-[1px] ${
                    step.status === "result"
                      ? "text-[#00d4ff]"
                      : "text-slate-600"
                  }`}
                >
                  {step.prefix}
                </span>
                <span>{step.text}</span>
                {step.status === "done" && (
                  <span className="shrink-0 text-[9px] text-[#00d4ff]/60 mt-[1px]">
                    ✓
                  </span>
                )}
              </div>
            ))}
            {/* Blinking cursor */}
            <div className="flex items-center gap-1 mt-1">
              <span className="text-slate-600 text-[11px]">$</span>
              <span className="w-[6px] h-3.5 bg-[#00d4ff] animate-cv-type-flicker" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══ BOTTOM: Feature Pills ═════════════════ */}
      <div className="relative z-10 flex gap-2.5 justify-center flex-wrap mt-8">
        {[
          { label: "Web Crawling", icon: GlobeIcon },
          { label: "Smart Matching", icon: SparklesIcon },
          { label: "Cross-Reference", icon: NetworkIcon },
          { label: "Embedding Search", icon: DatabaseIcon },
          { label: "Verified Data", icon: ShieldCheckIcon },
        ].map((b) => (
          <div
            key={b.label}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[rgba(18,18,18,0.6)] border border-white/[0.05] text-[11px] text-slate-400 font-medium backdrop-blur-[10px] transition-all duration-300 hover:border-[rgba(0,212,255,0.15)] hover:text-slate-200 hover:bg-[rgba(0,212,255,0.04)]"
          >
            <span className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.1)]">
              <b.icon size={10} className="text-[#00d4ff]" />
            </span>
            {b.label}
          </div>
        ))}
      </div>
    </div>
  );
}
