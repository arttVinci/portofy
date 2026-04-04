import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconTemplate, IconForms, IconRocket, IconCheck, IconArrowRight } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    num: "01",
    label: "Pilih Template",
    desc: "Pilih dari puluhan template profesional. Tinggal klik, langsung bisa preview hasilnya secara realtime.",
    icon: IconTemplate,
    mockContent: "template",
    accent: "#3b82f6",
  },
  {
    num: "02",
    label: "Isi Profil & Karya",
    desc: "Form sederhana — nama, bio, skill, dan upload proyek. Tidak perlu coding, drag & drop saja.",
    icon: IconForms,
    mockContent: "form",
    accent: "#8b5cf6",
  },
  {
    num: "03",
    label: "Publish & Share",
    desc: "Satu klik publish. Dapat URL unik yang bisa langsung dibagikan ke recruiter atau LinkedIn.",
    icon: IconRocket,
    mockContent: "publish",
    accent: "#06b6d4",
  },
];

// ── Mock screen per step ──────────────────────────────────────────────────
function MockScreen({ content, accent }: { content: string; accent: string }) {
  if (content === "template") {
    return (
      <div className="p-6 h-full flex flex-col">
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
          style={{ color: `${accent}80` }}
        >
          Pilih Template
        </p>
        <div className="grid grid-cols-3 gap-3 flex-1">
          {[
            { name: "Minimal", active: true },
            { name: "Editorial", active: false },
            { name: "Grid", active: false },
            { name: "Résumé", active: false },
            { name: "Mono", active: false },
            { name: "Studio", active: false },
          ].map((t) => (
            <motion.div
              key={t.name}
              whileHover={{ scale: 1.04, y: -2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="rounded-xl flex flex-col overflow-hidden cursor-pointer"
              style={{
                backgroundColor: t.active ? `${accent}14` : "rgba(255,255,255,0.03)",
                border: t.active ? `1.5px solid ${accent}60` : "1px solid rgba(255,255,255,0.06)",
                boxShadow: t.active ? `0 4px 20px ${accent}15` : "none",
              }}
            >
              <div
                className="flex-1 m-2 rounded-lg"
                style={{
                  backgroundColor: t.active ? `${accent}0d` : "rgba(255,255,255,0.02)",
                  minHeight: 56,
                }}
              >
                <div className="p-2 space-y-1.5">
                  {[70, 50, 60].map((w, i) => (
                    <div
                      key={i}
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${w}%`,
                        backgroundColor: t.active ? `${accent}40` : "rgba(255,255,255,0.06)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p
                className="text-center text-[10px] pb-2 font-medium"
                style={{
                  color: t.active ? `${accent}dd` : "rgba(148,163,184,0.4)",
                }}
              >
                {t.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  if (content === "form") {
    return (
      <div className="p-6 h-full flex flex-col gap-3">
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-1"
          style={{ color: `${accent}80` }}
        >
          Isi Profil
        </p>
        {[
          { label: "Nama Lengkap", value: "Budi Santoso" },
          { label: "Profesi", value: "UI/UX Designer" },
          { label: "Bio Singkat", value: "Saya seorang designer dengan 3 tahun pengalaman..." },
        ].map((f) => (
          <div key={f.label}>
            <p className="text-[10px] mb-1 font-medium" style={{ color: "rgba(148,163,184,0.5)" }}>
              {f.label}
            </p>
            <div
              className="w-full px-3 py-2 rounded-lg text-[12px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: `1px solid ${accent}1a`,
                color: "rgba(241,245,249,0.7)",
              }}
            >
              {f.value}
            </div>
          </div>
        ))}
        <div className="mt-1">
          <p className="text-[10px] mb-2 font-medium" style={{ color: "rgba(148,163,184,0.5)" }}>
            Skill
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Figma", "React", "Tailwind", "After Effects"].map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: `${accent}1a`,
                  color: `${accent}cc`,
                  border: `1px solid ${accent}33`,
                }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // publish
  return (
    <div className="p-6 h-full flex flex-col items-center justify-center text-center gap-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
        className="size-16 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          backgroundColor: `${accent}1a`,
          border: `1px solid ${accent}33`,
        }}
      >
        🚀
      </motion.div>
      <div>
        <p className="text-[16px] font-semibold mb-2" style={{ color: "rgba(241,245,249,0.9)" }}>
          Portfolio kamu live!
        </p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: `1px solid ${accent}26`,
          }}
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span style={{ color: "rgba(148,163,184,0.5)" }}>portofy.net/</span>
          <span className="font-semibold" style={{ color: "rgba(241,245,249,0.7)" }}>
            budisantoso
          </span>
        </div>
      </div>
      <div className="w-full grid grid-cols-3 gap-2 mt-2">
        {[
          { label: "Views", val: "0" },
          { label: "Klik", val: "0" },
          { label: "Bagikan", val: "—" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl py-3 text-center"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              border: `1px solid ${accent}1a`,
            }}
          >
            <p className="text-[14px] font-bold" style={{ color: "rgba(241,245,249,0.8)" }}>
              {s.val}
            </p>
            <p className="text-[10px] mt-0.5" style={{ color: "rgba(148,163,184,0.4)" }}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Timeline Step Card ────────────────────────────────────────────────────
function TimelineStep({
  step,
  index,
  isActive,
  onClick,
}: {
  step: (typeof steps)[0];
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const Icon = step.icon;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: smooth, delay: index * 0.15 }}
      onClick={onClick}
      className="group relative flex items-start gap-5 cursor-pointer"
    >
      {/* Timeline dot + line */}
      <div className="relative flex flex-col items-center">
        <motion.div
          animate={{
            backgroundColor: isActive ? step.accent : "rgba(255,255,255,0.06)",
            boxShadow: isActive ? `0 0 24px ${step.accent}40` : "0 0 0 transparent",
            scale: isActive ? 1 : 0.85,
          }}
          transition={{ duration: 0.35, ease: smooth }}
          className="size-12 rounded-xl flex items-center justify-center z-10 border"
          style={{
            borderColor: isActive ? `${step.accent}60` : "rgba(255,255,255,0.08)",
          }}
        >
          <Icon
            size={20}
            style={{ color: isActive ? "#ffffff" : "rgba(148,163,184,0.4)" }}
          />
        </motion.div>
        {/* Connecting line */}
        {index < steps.length - 1 && (
          <div
            className="w-px flex-1 min-h-[40px]"
            style={{
              background: `linear-gradient(to bottom, ${step.accent}30, transparent)`,
            }}
          />
        )}
      </div>

      {/* Content */}
      <div className="pb-8 pt-1 flex-1">
        <div className="flex items-center gap-3 mb-1.5">
          <span
            className="text-[11px] font-bold tracking-wider uppercase"
            style={{ color: isActive ? step.accent : "rgba(148,163,184,0.3)" }}
          >
            Step {step.num}
          </span>
          {isActive && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-2 py-0.5 rounded-full text-[9px] font-bold"
              style={{
                backgroundColor: `${step.accent}1a`,
                color: step.accent,
                border: `1px solid ${step.accent}33`,
              }}
            >
              Active
            </motion.span>
          )}
        </div>
        <h3
          className="text-[18px] font-bold leading-snug transition-colors duration-300"
          style={{ color: isActive ? "#f1f5f9" : "rgba(148,163,184,0.5)" }}
        >
          {step.label}
        </h3>
        <motion.p
          animate={{ opacity: isActive ? 1 : 0.4, height: isActive ? "auto" : "0px" }}
          transition={{ duration: 0.3 }}
          className="text-[13px] mt-2 leading-relaxed overflow-hidden"
          style={{ color: "rgba(148,163,184,0.6)" }}
        >
          {step.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="cara-kerja"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0a0f1e",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(56,189,248,0.07) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: 500,
          height: 500,
          background: "radial-gradient(ellipse at top right, rgba(59,130,246,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{
          width: 400,
          height: 400,
          background: "radial-gradient(ellipse at bottom left, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
            style={{
              backgroundColor: "rgba(59,130,246,0.1)",
              border: "1px solid rgba(59,130,246,0.2)",
              color: "#60a5fa",
            }}
          >
            <span className="size-1.5 rounded-full bg-blue-400 animate-pulse inline-block" />
            3 langkah mudah
          </motion.span>

          <h2
            className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Dari nol ke live,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              dalam 3 langkah.
            </span>
          </h2>
          <p className="mt-4 text-[15px] max-w-md mx-auto" style={{ color: "rgba(148,163,184,0.5)" }}>
            Tidak perlu coding. Tidak perlu desainer. Cukup 5 menit dan portfolio profesional kamu sudah online.
          </p>
        </motion.div>

        {/* ── Main content: Timeline + Mock ── */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: Timeline */}
          <div className="space-y-0">
            {steps.map((step, i) => (
              <TimelineStep
                key={step.num}
                step={step}
                index={i}
                isActive={i === activeStep}
                onClick={() => setActiveStep(i)}
              />
            ))}
          </div>

          {/* Right: Mock browser */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: smooth, delay: 0.3 }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#111a2e",
                border: `1px solid ${steps[activeStep].accent}20`,
                boxShadow: `0 24px 64px rgba(0,0,0,0.4), 0 0 48px ${steps[activeStep].accent}08`,
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  backgroundColor: "#0a0f1e",
                  borderBottom: `1px solid ${steps[activeStep].accent}15`,
                }}
              >
                <div className="flex gap-1.5">
                  {["rgba(239,68,68,0.7)", "rgba(234,179,8,0.7)", "rgba(34,197,94,0.7)"].map(
                    (c, i) => (
                      <div key={i} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />
                    )
                  )}
                </div>
                <div
                  className="flex-1 mx-3 h-6 rounded-lg flex items-center px-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
                >
                  <span className="text-[10px]" style={{ color: "rgba(148,163,184,0.4)" }}>
                    app.portofy.net/
                    {steps[activeStep].mockContent === "publish" ? "dashboard" : "onboarding"}
                  </span>
                </div>
                {/* Step indicator */}
                <div className="flex gap-1.5 shrink-0">
                  {steps.map((s, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === activeStep ? 18 : 6,
                        backgroundColor:
                          i === activeStep
                            ? s.accent
                            : i < activeStep
                              ? `${s.accent}80`
                              : "rgba(255,255,255,0.1)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="h-[5px] rounded-full"
                    />
                  ))}
                </div>
              </div>

              {/* Mock content */}
              <div style={{ minHeight: 380, backgroundColor: "#111a2e" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.35, ease: smooth }}
                    style={{ minHeight: 380 }}
                  >
                    <MockScreen content={steps[activeStep].mockContent} accent={steps[activeStep].accent} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Nav buttons */}
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
                disabled={activeStep === 0}
                className="px-5 py-2.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: activeStep === 0 ? "rgba(148,163,184,0.2)" : "rgba(148,163,184,0.7)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                ← Sebelumnya
              </button>

              {activeStep < steps.length - 1 ? (
                <button
                  onClick={() => setActiveStep((p) => p + 1)}
                  className="px-6 py-2.5 rounded-full text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
                  style={{
                    background: `linear-gradient(135deg, ${steps[activeStep].accent}, ${steps[activeStep + 1].accent})`,
                    boxShadow: `0 4px 20px ${steps[activeStep].accent}30`,
                  }}
                >
                  Selanjutnya <IconArrowRight size={14} />
                </button>
              ) : (
                <a
                  href="/auth/register"
                  className="px-6 py-2.5 rounded-full text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    boxShadow: "0 4px 20px rgba(6,182,212,0.3)",
                  }}
                >
                  Mulai Gratis <IconArrowRight size={14} />
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
