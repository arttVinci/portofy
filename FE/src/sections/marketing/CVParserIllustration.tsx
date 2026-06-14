import {
  FileTextIcon,
  SparklesIcon,
  UserIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  WrenchIcon,
  FolderIcon,
  ShieldCheckIcon,
  RocketIcon,
  FileUpIcon,
  ZapIcon,
  CpuIcon,
  LayersIcon,
  SearchCheckIcon,
} from "lucide-react";

/* ─── Agent definitions ──────────────────────────── */
const AGENTS = [
  {
    key: "profile",
    label: "Profile",
    sublabel: "Nama, Bio, Tags",
    icon: <UserIcon size={15} className="text-[#00d4ff]" />,
  },
  {
    key: "experience",
    label: "Experience",
    sublabel: "Posisi, Perusahaan",
    icon: <BriefcaseIcon size={15} className="text-[#00d4ff]" />,
  },
  {
    key: "education",
    label: "Education",
    sublabel: "Gelar, Institusi",
    icon: <GraduationCapIcon size={15} className="text-[#00d4ff]" />,
  },
  {
    key: "skills",
    label: "Skills",
    sublabel: "Level & Kategori",
    icon: <WrenchIcon size={15} className="text-[#00d4ff]" />,
  },
  {
    key: "projects",
    label: "Projects",
    sublabel: "Tools, Fitur, Detail",
    icon: <FolderIcon size={15} className="text-[#00d4ff]" />,
  },
];

const TECH_BADGES = [
  {
    label: "PDF Extract",
    icon: <FileUpIcon size={10} className="text-[#00d4ff]" />,
  },
  {
    label: "AI Agent",
    icon: <SparklesIcon size={10} className="text-[#00d4ff]" />,
  },
  {
    label: "Multi-Agent",
    icon: <CpuIcon size={10} className="text-[#00d4ff]" />,
  },
  {
    label: "Parallel Proc.",
    icon: <LayersIcon size={10} className="text-[#00d4ff]" />,
  },
  {
    label: "Quality Review",
    icon: <SearchCheckIcon size={10} className="text-[#00d4ff]" />,
  },
];

const REVIEW_SECTIONS = [
  "Profile",
  "Experience",
  "Education",
  "Skills",
  "Projects",
];

/* ─── Shared tiny components ─────────────────────── */
function SectionLabel({
  text,
  center = false,
  children,
}: {
  text: string;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex items-center gap-2 mb-1.5 ${center ? "justify-center" : ""}`}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-[#00d4ff]" />
      <span className="text-[9px] text-[#00d4ff] uppercase tracking-[2px] font-bold">
        {text}
      </span>
      {children}
    </div>
  );
}

function Connector() {
  return (
    <div className="relative w-0.5 h-10 mx-auto bg-gradient-to-b from-[#00d4ff4d] to-[#00d4ff14]">
      <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 rounded bg-[#00d4ff] shadow-[0_0_10px_rgba(0,212,255,0.6)] animate-cv-data-flow" />
    </div>
  );
}

/* ─── Main Component ─────────────────────────────── */
export default function CVParserIllustration() {
  return (
    <div className="relative w-full max-w-[900px] mx-auto py-10 px-5">
      {/* ── Ambient Glows ──────────────────────────── */}
      <div className="absolute w-[300px] h-[300px] top-[20%] -left-[5%] rounded-full pointer-events-none blur-[120px] bg-[rgba(0,212,255,0.06)]" />
      <div className="absolute w-[400px] h-[400px] top-[30%] left-1/2 -translate-x-1/2 rounded-full pointer-events-none blur-[120px] bg-[rgba(0,212,255,0.04)]" />
      <div className="absolute w-[250px] h-[250px] top-[15%] -right-[5%] rounded-full pointer-events-none blur-[120px] bg-[rgba(0,212,255,0.05)]" />

      {/* ── Floating Particles ─────────────────────── */}
      {[
        { top: "10%", left: "15%", cls: "animate-cv-particle-1" },
        { top: "30%", right: "10%", cls: "animate-cv-particle-2" },
        { top: "60%", left: "8%", cls: "animate-cv-particle-3" },
        { top: "75%", right: "20%", cls: "animate-cv-particle-4" },
        { top: "45%", left: "80%", cls: "animate-cv-particle-5" },
      ].map((p, i) => (
        <div
          key={i}
          className={`absolute w-[3px] h-[3px] rounded-full bg-[rgba(0,212,255,0.4)] pointer-events-none ${p.cls}`}
          style={{ top: p.top, left: p.left, right: p.right }}
        />
      ))}

      {/* ═══ MAIN FLOW ═══════════════════════════════ */}
      <div className="relative z-10 flex flex-col items-center">
        {/* ── LAYER 1: Upload ──────────────────────── */}
        <div className="relative bg-[rgba(18,18,18,0.85)] border border-white/[0.06] rounded-2xl px-5 py-4 backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 w-[260px] text-center">
          <SectionLabel text="Input" center />
          <div className="w-[52px] h-[52px] mx-auto mb-3 rounded-[14px] flex items-center justify-center bg-[rgba(0,212,255,0.07)] border border-[rgba(0,212,255,0.15)] animate-cv-upload-glow">
            <FileTextIcon size={22} className="text-[#00d4ff]" />
          </div>
          <div className="text-sm font-semibold text-slate-200 tracking-[0.01em]">
            Upload CV
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 text-center">
            PDF / DOCX · Max 5MB
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-[10px] bg-white/[0.03] border border-dashed border-white/[0.08] mt-2.5">
            <FileTextIcon size={12} className="text-[#00d4ff]" />
            <span className="text-[11px] text-slate-400 flex-1 text-left truncate">
              Muhammad_Rizky_CV.pdf
            </span>
            <span className="text-[9px] text-[#00d4ff] bg-[rgba(0,212,255,0.08)] px-2 py-0.5 rounded-full font-bold">
              ✓ Uploaded
            </span>
          </div>
        </div>

        <Connector />

        {/* ── LAYER 2: Cleaner Agent ───────────────── */}
        <div className="relative bg-[rgba(18,18,18,0.85)] border border-white/[0.06] rounded-2xl px-5 py-4 backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 w-[300px]">
          <SectionLabel text="Pre-Process" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(0,212,255,0.07)] border border-[rgba(0,212,255,0.12)]">
              <SparklesIcon size={17} className="text-[#00d4ff]" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-slate-200 tracking-[0.01em]">
                Cleaner Agent
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Normalisasi & bersihkan teks PDF
              </div>
            </div>
            <span className="w-[7px] h-[7px] rounded-full shrink-0 bg-[#00d4ff] shadow-[0_0_8px_rgba(0,212,255,0.5)]" />
          </div>
          <div className="mt-2.5 px-3 py-2 rounded-lg bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.06)] text-[10px] text-slate-500 font-mono">
            <span className="text-slate-400">
              Fixing broken words... merging sentences...
            </span>
            <span className="text-[#00d4ff] animate-cv-type-flicker"> |</span>
          </div>
        </div>

        {/* ── Fan-Out Lines ────────────────────────── */}
        <div className="relative w-full h-9 max-w-[700px] hidden md:block">
          <svg
            viewBox="0 0 700 36"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            <circle cx="350" cy="0" r="3" fill="#00d4ff" opacity="0.5" />
            {[70, 210, 350, 490, 630].map((x, i) => (
              <path
                key={i}
                d={`M 350 0 Q 350 18, ${x} 36`}
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
            ))}
          </svg>
        </div>

        {/* ── LAYER 3: Parallel Agents ─────────────── */}
        <div className="w-full text-center mb-1.5">
          <SectionLabel text="Parallel Extraction" center>
            <ZapIcon size={10} className="text-[#00d4ff] ml-0.5" />
          </SectionLabel>
        </div>

        <div className="flex gap-2.5 justify-center flex-wrap relative">
          {AGENTS.map((agent, idx) => (
            <div
              key={agent.key}
              className="relative bg-[rgba(18,18,18,0.85)] border border-white/[0.06] rounded-2xl px-3 py-3.5 backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 w-[140px] text-center overflow-hidden animate-cv-agent-fade-in md:w-[140px] max-md:w-[calc(50%-8px)] max-md:min-w-[120px] max-sm:w-full"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-0.5 rounded-t bg-[#00d4ff] opacity-60" />
              <div className="w-8 h-8 mx-auto mb-2 rounded-lg flex items-center justify-center bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.12)]">
                {agent.icon}
              </div>
              <div className="text-xs font-semibold text-slate-200 tracking-[0.01em]">
                {agent.label}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5 text-center">
                {agent.sublabel}
              </div>
              <span className="inline-flex items-center gap-[3px] text-[8px] text-slate-500 bg-white/[0.03] border border-white/[0.05] px-[7px] py-0.5 rounded-full mt-2">
                <span className="text-[#00d4ff] text-[7px]">✦</span>
                Agent
              </span>
            </div>
          ))}
        </div>

        {/* ── Fan-In Lines ─────────────────────────── */}
        <div className="relative w-full h-9 max-w-[700px] hidden md:block">
          <svg
            viewBox="0 0 700 36"
            preserveAspectRatio="none"
            className="w-full h-full overflow-visible"
          >
            {[70, 210, 350, 490, 630].map((x, i) => (
              <path
                key={i}
                d={`M ${x} 0 Q ${x} 18, 350 36`}
                fill="none"
                stroke="#00d4ff"
                strokeWidth="1.5"
                strokeOpacity="0.2"
              />
            ))}
            <circle cx="350" cy="36" r="3" fill="#00d4ff" opacity="0.5" />
          </svg>
        </div>

        {/* ── LAYER 4: Reviewer Agent ──────────────── */}
        <div className="relative bg-[rgba(18,18,18,0.85)] border border-[rgba(0,212,255,0.12)] rounded-2xl px-5 py-4 backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 w-[320px] max-sm:w-full max-sm:max-w-[300px]">
          <SectionLabel text="Quality Gate" />
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-[10px] flex items-center justify-center shrink-0 bg-[rgba(0,212,255,0.07)] border border-[rgba(0,212,255,0.12)]">
              <ShieldCheckIcon size={17} className="text-[#00d4ff]" />
            </div>
            <div className="flex-1">
              <div className="text-[13px] font-semibold text-slate-200 tracking-[0.01em]">
                Reviewer Agent
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                Validasi kelengkapan & konsistensi data
              </div>
            </div>
            <span className="w-[7px] h-[7px] rounded-full shrink-0 bg-[#00d4ff] shadow-[0_0_8px_rgba(0,212,255,0.5)] animate-cv-status-pulse" />
          </div>
          <div className="flex gap-1.5 mt-2.5 flex-wrap">
            {REVIEW_SECTIONS.map((section) => (
              <span
                key={section}
                className="text-[9px] px-2.5 py-[3px] rounded-full font-semibold flex items-center gap-1 text-[#00d4ff] bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.1)]"
              >
                ✓ {section}
              </span>
            ))}
          </div>
        </div>

        <Connector />

        {/* ── LAYER 5: Output ──────────────────────── */}
        <div className="relative bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.15)] rounded-2xl px-5 py-4 backdrop-blur-[20px] transition-all duration-400 hover:border-[rgba(0,212,255,0.2)] hover:shadow-[0_0_30px_rgba(0,212,255,0.06),inset_0_1px_0_rgba(255,255,255,0.04)] hover:-translate-y-0.5 w-[260px] text-center max-sm:w-full max-sm:max-w-[300px]">
          <div className="w-11 h-11 mx-auto mb-2.5 rounded-xl flex items-center justify-center bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.15)] animate-cv-output-pulse">
            <RocketIcon size={20} className="text-[#00d4ff]" />
          </div>
          <div className="text-sm font-semibold text-[#00d4ff] tracking-[0.01em]">
            Portfolio Ready
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 text-center">
            Data terstruktur siap mengisi portofolio
          </div>
        </div>
      </div>

      {/* ═══ TECH BADGES ═══════════════════════════ */}
      <div className="flex gap-2.5 justify-center flex-wrap mt-10">
        {TECH_BADGES.map((badge) => (
          <div
            key={badge.label}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[rgba(18,18,18,0.6)] border border-white/[0.05] text-[11px] text-slate-400 font-medium backdrop-blur-[10px] transition-all duration-300 hover:border-[rgba(0,212,255,0.15)] hover:text-slate-200 hover:bg-[rgba(0,212,255,0.04)]"
          >
            <span className="w-[18px] h-[18px] rounded-[5px] flex items-center justify-center bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.1)]">
              {badge.icon}
            </span>
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
}
