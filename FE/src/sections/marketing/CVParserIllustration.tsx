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
import "./CVParserIllustration.css";

/* ─── Agent definitions ──────────────────────────── */
const AGENTS = [
  {
    key: "profile",
    label: "Profile",
    sublabel: "Nama, Bio, Tags",
    icon: <UserIcon size={15} className="text-[#00d4ff]" />,
    modifier: "profile",
    color: "#00d4ff",
  },
  {
    key: "experience",
    label: "Experience",
    sublabel: "Posisi, Perusahaan",
    icon: <BriefcaseIcon size={15} className="text-[#00d4ff]" />,
    modifier: "experience",
    color: "#00d4ff",
  },
  {
    key: "education",
    label: "Education",
    sublabel: "Gelar, Institusi",
    icon: <GraduationCapIcon size={15} className="text-[#00d4ff]" />,
    modifier: "education",
    color: "#00d4ff",
  },
  {
    key: "skills",
    label: "Skills",
    sublabel: "Level & Kategori",
    icon: <WrenchIcon size={15} className="text-[#00d4ff]" />,
    modifier: "skills",
    color: "#00d4ff",
  },
  {
    key: "projects",
    label: "Projects",
    sublabel: "Tools, Fitur, Detail",
    icon: <FolderIcon size={15} className="text-[#00d4ff]" />,
    modifier: "projects",
    color: "#00d4ff",
  },
];

const TECH_BADGES = [
  {
    label: "PDF Extract",
    icon: <FileUpIcon size={10} className="text-[#00d4ff]" />,
  },
  {
    label: "Gemini AI",
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

export default function CVParserIllustration() {
  return (
    <div className="cv-parser-illustration">
      {/* Ambient Glows */}
      <div className="cv-parser-glow cv-parser-glow--left" />
      <div className="cv-parser-glow cv-parser-glow--center" />
      <div className="cv-parser-glow cv-parser-glow--right" />

      {/* Floating Particles */}
      {[
        { top: "10%", left: "15%" },
        { top: "30%", right: "10%" },
        { top: "60%", left: "8%" },
        { top: "75%", right: "20%" },
        { top: "45%", left: "80%" },
      ].map((style, i) => (
        <div key={i} className="cv-particle" style={style} />
      ))}

      {/* ═══ MAIN FLOW ═══ */}
      <div className="cv-flow">
        {/* ── LAYER 1: Upload ──────────────────────── */}
        <div className="cv-node cv-upload-node">
          <div className="cv-section-label" style={{ justifyContent: "center" }}>
            <span className="cv-section-label__dot" />
            <span className="cv-section-label__text">Input</span>
          </div>
          <div className="cv-node__icon">
            <FileTextIcon size={22} className="text-[#00d4ff]" />
          </div>
          <div className="cv-node__label" style={{ fontSize: "14px" }}>
            Upload CV
          </div>
          <div className="cv-node__sublabel" style={{ textAlign: "center" }}>
            PDF / DOCX · Max 5MB
          </div>
          <div className="cv-upload-file">
            <FileTextIcon size={12} className="text-[#00d4ff]" />
            <span className="cv-upload-file__name">Muhammad_Rizky_CV.pdf</span>
            <span className="cv-upload-file__badge">✓ Uploaded</span>
          </div>
        </div>

        {/* Connector */}
        <div className="cv-connector" />

        {/* ── LAYER 2: Cleaner Agent ───────────────── */}
        <div className="cv-node cv-cleaner-node">
          <div className="cv-section-label">
            <span className="cv-section-label__dot" />
            <span className="cv-section-label__text">Pre-Process</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="cv-node__icon">
              <SparklesIcon size={17} className="text-[#00d4ff]" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="cv-node__label">Cleaner Agent</div>
              <div className="cv-node__sublabel">
                Normalisasi & bersihkan teks PDF
              </div>
            </div>
            <div className="cv-node__status cv-node__status--done" />
          </div>
          <div className="cv-cleaner-typing">
            <span style={{ color: "#94a3b8" }}>
              Fixing broken words... merging sentences...
            </span>
            <span> |</span>
          </div>
        </div>

        {/* Fan-Out Lines */}
        <div className="cv-split-lines">
          <svg viewBox="0 0 700 36" preserveAspectRatio="none">
            {/* Center point */}
            <circle cx="350" cy="0" r="3" fill="#00d4ff" opacity="0.5" />
            {/* Fan out to 5 agents */}
            {[70, 210, 350, 490, 630].map((x, i) => (
              <path
                key={i}
                d={`M 350 0 Q 350 18, ${x} 36`}
                className="cv-split-line"
                style={{
                  stroke: AGENTS[i].color,
                  strokeOpacity: 0.2,
                }}
              />
            ))}
          </svg>
        </div>

        {/* ── LAYER 3: Parallel Agents ─────────────── */}
        <div style={{ width: "100%", textAlign: "center", marginBottom: "6px" }}>
          <div
            className="cv-section-label"
            style={{ justifyContent: "center" }}
          >
            <span className="cv-section-label__dot" />
            <span className="cv-section-label__text">Parallel Extraction</span>
            <ZapIcon
              size={10}
              className="text-[#00d4ff]"
              style={{ marginLeft: 2 }}
            />
          </div>
        </div>

        <div className="cv-agents-row">
          {AGENTS.map((agent) => (
            <div
              key={agent.key}
              className={`cv-node cv-agent-card cv-agent-card--${agent.modifier}`}
            >
              <div className="cv-node__icon">{agent.icon}</div>
              <div className="cv-node__label" style={{ fontSize: "12px" }}>
                {agent.label}
              </div>
              <div className="cv-node__sublabel" style={{ textAlign: "center" }}>
                {agent.sublabel}
              </div>
              <div className="cv-agent-card__gemini">Gemini 3.5 Flash</div>
            </div>
          ))}
        </div>

        {/* Fan-In Lines */}
        <div className="cv-split-lines">
          <svg viewBox="0 0 700 36" preserveAspectRatio="none">
            {[70, 210, 350, 490, 630].map((x, i) => (
              <path
                key={i}
                d={`M ${x} 0 Q ${x} 18, 350 36`}
                className="cv-split-line"
                style={{
                  stroke: AGENTS[i].color,
                  strokeOpacity: 0.2,
                }}
              />
            ))}
            <circle cx="350" cy="36" r="3" fill="#00d4ff" opacity="0.5" />
          </svg>
        </div>

        {/* ── LAYER 4: Reviewer Agent ──────────────── */}
        <div className="cv-node cv-reviewer-node">
          <div className="cv-section-label">
            <span
              className="cv-section-label__dot"
            />
            <span
              className="cv-section-label__text"
            >
              Quality Gate
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="cv-node__icon">
              <ShieldCheckIcon size={17} className="text-[#00d4ff]" />
            </div>
            <div style={{ flex: 1 }}>
              <div className="cv-node__label">Reviewer Agent</div>
              <div className="cv-node__sublabel">
                Validasi kelengkapan & konsistensi data
              </div>
            </div>
            <div className="cv-node__status cv-node__status--active" />
          </div>
          <div className="cv-reviewer-verdicts">
            {REVIEW_SECTIONS.map((section) => (
              <span
                key={section}
                className="cv-reviewer-verdict cv-reviewer-verdict--pass"
              >
                {section}
              </span>
            ))}
          </div>
        </div>

        {/* Connector */}
        <div className="cv-connector" />

        {/* ── LAYER 5: Output ──────────────────────── */}
        <div className="cv-node cv-output-node">
          <div className="cv-node__icon">
            <RocketIcon size={20} className="text-[#00d4ff]" />
          </div>
          <div
            className="cv-node__label"
            style={{ fontSize: "14px", color: "#00d4ff" }}
          >
            Portfolio Ready
          </div>
          <div className="cv-node__sublabel" style={{ textAlign: "center" }}>
            Data terstruktur siap mengisi portofolio
          </div>
        </div>
      </div>

      {/* ═══ TECH BADGES ═══ */}
      <div className="cv-tech-badges">
        {TECH_BADGES.map((badge) => (
          <div key={badge.label} className="cv-tech-badge">
            <div className="cv-tech-badge__icon">{badge.icon}</div>
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
}
