import {
  BrainIcon,
  GlobeIcon,
  SearchIcon,
  DatabaseIcon,
  UserCheckIcon,
  SparklesIcon,
  NetworkIcon,
  ShieldCheckIcon,
} from "lucide-react";

import { GoogleIcon, LinkedinIcon, GitHubIcon } from "@/components/utils/icons";

/* ─── Web Sources ────────────────────────────────── */
const WEB_SOURCES = [
  { key: "google", label: "Google", icon: GoogleIcon, delay: 0 },
  { key: "linkedin", label: "LinkedIn", icon: LinkedinIcon, delay: 150 },
  { key: "github", label: "GitHub", icon: GitHubIcon, delay: 300 },
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
  {
    prefix: "→",
    text: "Searching Google for 'Muhammad Rizky developer'...",
    status: "done",
  },
  {
    prefix: "→",
    text: "Found LinkedIn profile — extracting work history...",
    status: "done",
  },
  {
    prefix: "→",
    text: "Scanning GitHub repos — analyzing tech stack...",
    status: "done",
  },
  {
    prefix: "→",
    text: "Cross-referencing education records...",
    status: "done",
  },
  {
    prefix: "✦",
    text: "Background verification complete — 94% match",
    status: "result",
  },
];

export default function RAGIllustration() {
  return (
    <div className="relative w-full max-w-[1200px] mx-auto py-10 px-5">
      {/* ── Ambient Glows ──────────────────────────── */}
      <div className="absolute w-[350px] h-[350px] top-[10%] left-[10%] rounded-full pointer-events-none blur-[140px] bg-[rgba(0,212,255,0.05)]" />
      <div className="absolute w-[300px] h-[300px] bottom-[10%] right-[10%] rounded-full pointer-events-none blur-[140px] bg-[rgba(0,212,255,0.04)]" />

      {/* ═══ MAIN LAYOUT: Left (diagram) + Right (terminal) ═══ */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-10">
        {/* ────────────────────────────────────────────
            LEFT: Visual Diagram (Sources → Brain → Results)
        ──────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col lg:flex-row items-center gap-4">
          {/* Sources column */}
          <div className="flex flex-col items-center shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
              <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
                Sources
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {WEB_SOURCES.map((src, idx) => (
                <div
                  key={src.key}
                  className="group relative flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[rgba(18,18,18,0.85)] border border-white/[0.06] backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_20px_rgba(0,212,255,0.06)] animate-cv-agent-fade-in w-[150px]"
                  style={{ animationDelay: `${idx * 120}ms` }}
                >
                  <div className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.12)]">
                    <src.icon size={12} className="text-[#00d4ff]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[10px] font-semibold text-slate-200">
                      {src.label}
                    </div>
                  </div>
                  <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff] shadow-[0_0_6px_rgba(0,212,255,0.5)] animate-cv-status-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* ── SVG Fan-in connector: Sources → Brain ── */}
          <div className="hidden lg:flex items-center shrink-0">
            <svg
              width="80"
              height="160"
              viewBox="0 0 80 160"
              fill="none"
              className="overflow-visible"
            >
              {/* 4 curved paths from each source card to center */}
              {[20, 56, 96, 136].map((y, i) => (
                <g key={i}>
                  <path
                    d={`M 0 ${y} C 30 ${y}, 50 80, 80 80`}
                    stroke="url(#rag-grad-left)"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                    className="animate-rag-dash"
                    style={{ animationDelay: `${i * 0.4}s` }}
                  />
                  {/* Traveling dot */}
                  <circle r="2.5" fill="#00d4ff" opacity="0.8">
                    <animateMotion
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                      path={`M 0 ${y} C 30 ${y}, 50 80, 80 80`}
                    />
                    <animate
                      attributeName="opacity"
                      values="0;0.9;0.9;0"
                      dur="2.5s"
                      repeatCount="indefinite"
                      begin={`${i * 0.5}s`}
                    />
                  </circle>
                  {/* Start dot */}
                  <circle cx="0" cy={y} r="2" fill="#00d4ff" opacity="0.3" />
                </g>
              ))}
              {/* Merge point glow */}
              <circle cx="80" cy="80" r="3" fill="#00d4ff" opacity="0.5" />
              <circle
                cx="80"
                cy="80"
                r="6"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.5"
                opacity="0.2"
              />
              {/* Gradient */}
              <defs>
                <linearGradient id="rag-grad-left" x1="0" y1="0" x2="80" y2="0">
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.4" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Brain orbital */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative w-[120px] h-[120px]">
              <div className="absolute inset-0 rounded-full border border-[rgba(0,212,255,0.1)] animate-rag-orbit-spin" />
              <div className="absolute inset-2.5 rounded-full border border-dashed border-[rgba(0,212,255,0.08)]" />
              <div className="absolute inset-5 rounded-full bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.12)]" />
              <div className="absolute inset-0 animate-rag-orbit-spin">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_8px_rgba(0,212,255,0.6)]" />
              </div>
              <div className="absolute inset-0 animate-rag-orbit-spin-reverse">
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[rgba(0,212,255,0.5)]" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center animate-cv-upload-glow">
                  <BrainIcon size={20} className="text-[#00d4ff]" />
                </div>
              </div>
            </div>
            <div className="mt-2 text-center">
              <div className="text-xs font-bold text-slate-200">RAG Agent</div>
              <div className="text-[9px] text-slate-500 mt-0.5">
                Retrieval-Augmented
              </div>
            </div>
          </div>

          {/* ── SVG connector: Brain → Matched ── */}
          <div className="hidden lg:flex items-center shrink-0">
            <svg
              width="80"
              height="40"
              viewBox="0 0 80 40"
              fill="none"
              className="overflow-visible"
            >
              {/* Main path */}
              <path
                d="M 0 20 L 80 20"
                stroke="url(#rag-grad-right)"
                strokeWidth="1.2"
                strokeDasharray="4 3"
                className="animate-rag-dash"
              />
              {/* Side accent lines */}
              <path
                d="M 10 12 Q 40 20, 70 12"
                stroke="#00d4ff"
                strokeWidth="0.6"
                strokeOpacity="0.1"
              />
              <path
                d="M 10 28 Q 40 20, 70 28"
                stroke="#00d4ff"
                strokeWidth="0.6"
                strokeOpacity="0.1"
              />
              {/* Traveling dot */}
              <circle r="3" fill="#00d4ff" opacity="0.8">
                <animateMotion
                  dur="2s"
                  repeatCount="indefinite"
                  path="M 0 20 L 80 20"
                />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Glow ring at start */}
              <circle cx="0" cy="20" r="3" fill="#00d4ff" opacity="0.4" />
              <circle
                cx="0"
                cy="20"
                r="6"
                fill="none"
                stroke="#00d4ff"
                strokeWidth="0.5"
                opacity="0.15"
              />
              {/* Arrow at end */}
              <circle cx="80" cy="20" r="3" fill="#00d4ff" opacity="0.4" />
              <path
                d="M 74 16 L 80 20 L 74 24"
                stroke="#00d4ff"
                strokeWidth="1"
                strokeOpacity="0.4"
                fill="none"
              />
              {/* Gradient */}
              <defs>
                <linearGradient
                  id="rag-grad-right"
                  x1="0"
                  y1="0"
                  x2="80"
                  y2="0"
                >
                  <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.15" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Matched results card */}
          <div className="flex flex-col items-center shrink-0">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
              <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
                Matched
              </span>
            </div>
            <div className="relative bg-[rgba(18,18,18,0.85)] border border-[rgba(0,212,255,0.1)] rounded-2xl px-4 py-3 backdrop-blur-[20px] w-[200px]">
              <div className="space-y-2">
                {MATCHED_RESULTS.map((r, idx) => (
                  <div
                    key={r.field}
                    className="flex items-center justify-between gap-2 animate-cv-agent-fade-in"
                    style={{ animationDelay: `${600 + idx * 100}ms` }}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-[8px] text-slate-500 uppercase tracking-wider">
                        {r.field}
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium truncate">
                        {r.value}
                      </div>
                    </div>
                    <span className="text-[8px] font-bold text-[#00d4ff] bg-[rgba(0,212,255,0.08)] px-1.5 py-0.5 rounded-full shrink-0">
                      {r.confidence}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <UserCheckIcon size={10} className="text-[#00d4ff]" />
                  <span className="text-[9px] text-slate-400 font-semibold">
                    Match
                  </span>
                </div>
                <span className="text-xs font-bold text-[#00d4ff]">94%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            RIGHT: Terminal / Agent Reasoning
        ──────────────────────────────────────────── */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="flex items-center gap-2 mb-3">
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
      </div>

      {/* ═══ BOTTOM: Feature Pills ═════════════════ */}
      <div className="relative z-10 flex gap-2.5 justify-center flex-wrap mt-10">
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
