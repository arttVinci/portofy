import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  {
    num: "01",
    label: "Pilih Template",
    desc: "Pilih dari puluhan template profesional. Tinggal klik, langsung bisa preview hasilnya secara realtime.",
    mockContent: "template",
  },
  {
    num: "02",
    label: "Isi Profil & Karya",
    desc: "Form sederhana — nama, bio, skill, dan upload proyek. Tidak perlu coding, drag & drop saja.",
    mockContent: "form",
  },
  {
    num: "03",
    label: "Publish & Share",
    desc: "Satu klik publish. Dapat URL unik yang bisa langsung dibagikan ke recruiter atau LinkedIn.",
    mockContent: "publish",
  },
];

// ── Mock screen per step ──────────────────────────────────────────────────────
function MockScreen({ content }: { content: string }) {
  if (content === "template") {
    return (
      <div className="p-6 h-full flex flex-col">
        <p
          className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
          style={{ color: "rgba(56,189,248,0.5)" }}
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
            <div
              key={t.name}
              className="rounded-xl flex flex-col overflow-hidden transition-all duration-200"
              style={{
                backgroundColor: t.active
                  ? "rgba(56,189,248,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: t.active
                  ? "1.5px solid rgba(56,189,248,0.4)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: t.active
                  ? "0 4px 16px rgba(56,189,248,0.1)"
                  : "none",
              }}
            >
              <div
                className="flex-1 m-2 rounded-lg"
                style={{
                  backgroundColor: t.active
                    ? "rgba(56,189,248,0.06)"
                    : "rgba(255,255,255,0.02)",
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
                        backgroundColor: t.active
                          ? "rgba(56,189,248,0.25)"
                          : "rgba(255,255,255,0.06)",
                      }}
                    />
                  ))}
                </div>
              </div>
              <p
                className="text-center text-[10px] pb-2 font-medium"
                style={{
                  color: t.active
                    ? "rgba(56,189,248,0.9)"
                    : "rgba(148,163,184,0.4)",
                }}
              >
                {t.name}
              </p>
            </div>
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
          style={{ color: "rgba(56,189,248,0.5)" }}
        >
          Isi Profil
        </p>
        {[
          { label: "Nama Lengkap", value: "Budi Santoso" },
          { label: "Profesi", value: "UI/UX Designer" },
          {
            label: "Bio Singkat",
            value: "Saya seorang designer dengan 3 tahun pengalaman...",
          },
        ].map((f) => (
          <div key={f.label}>
            <p
              className="text-[10px] mb-1 font-medium"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              {f.label}
            </p>
            <div
              className="w-full px-3 py-2 rounded-lg text-[12px]"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(56,189,248,0.1)",
                color: "rgba(241,245,249,0.7)",
              }}
            >
              {f.value}
            </div>
          </div>
        ))}
        <div className="mt-1">
          <p
            className="text-[10px] mb-2 font-medium"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            Skill
          </p>
          <div className="flex flex-wrap gap-1.5">
            {["Figma", "React", "Tailwind", "After Effects"].map((s) => (
              <span
                key={s}
                className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                style={{
                  backgroundColor: "rgba(56,189,248,0.1)",
                  color: "rgba(56,189,248,0.8)",
                  border: "1px solid rgba(56,189,248,0.2)",
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
      <div
        className="size-16 rounded-2xl flex items-center justify-center text-2xl"
        style={{
          backgroundColor: "rgba(56,189,248,0.1)",
          border: "1px solid rgba(56,189,248,0.2)",
        }}
      >
        🚀
      </div>
      <div>
        <p
          className="text-[16px] font-semibold mb-2"
          style={{ color: "rgba(241,245,249,0.9)" }}
        >
          Portfolio kamu live!
        </p>
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px]"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
          <span style={{ color: "rgba(148,163,184,0.5)" }}>portofy.net/</span>
          <span
            className="font-semibold"
            style={{ color: "rgba(241,245,249,0.7)" }}
          >
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
              border: "1px solid rgba(56,189,248,0.1)",
            }}
          >
            <p
              className="text-[14px] font-bold"
              style={{ color: "rgba(241,245,249,0.8)" }}
            >
              {s.val}
            </p>
            <p
              className="text-[10px] mt-0.5"
              style={{ color: "rgba(148,163,184,0.4)" }}
            >
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section
      id="cara-kerja"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0e1526",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid lines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />
      {/* Blue glow top-right */}
      <div
        className="pointer-events-none absolute top-0 right-0"
        style={{
          width: 560,
          height: 400,
          background:
            "radial-gradient(ellipse at top right, rgba(59,130,246,0.1) 0%, transparent 65%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0"
        style={{
          width: 460,
          height: 360,
          background:
            "radial-gradient(ellipse at bottom left, rgba(6,182,212,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smooth }}
          className="text-center mb-14"
        >
          {/* Section tag with line */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to right, transparent, #38bdf8)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: "#38bdf8" }}
            >
              Cara Kerja
            </p>
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to left, transparent, #38bdf8)",
              }}
            />
          </div>
          <h2
            className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Dari nol ke live,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              dalam 3 langkah.
            </span>
          </h2>
        </motion.div>

        {/* ── Stepper ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smooth, delay: 0.1 }}
          className="relative flex items-start justify-between mb-10 gap-4"
        >
          {/* Base connector line */}
          <div
            className="absolute top-5 left-0 right-0 h-px"
            style={{ backgroundColor: "rgba(56,189,248,0.1)" }}
          />
          {/* Active progress */}
          <motion.div
            className="absolute top-5 left-0 h-px"
            style={{
              background: "linear-gradient(to right, #3b82f6, #06b6d4)",
            }}
            animate={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: smooth }}
          />

          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isDone = i < activeStep;
            return (
              <button
                key={step.num}
                onClick={() => setActiveStep(i)}
                className="relative flex flex-col items-center gap-3 flex-1 cursor-pointer focus:outline-none"
              >
                {/* Circle */}
                <motion.div
                  animate={{
                    backgroundColor:
                      isActive || isDone
                        ? "#3b82f6"
                        : "rgba(56,189,248,0.1)",
                    borderColor:
                      isActive || isDone
                        ? "#38bdf8"
                        : "rgba(56,189,248,0.15)",
                    boxShadow:
                      isActive
                        ? "0 0 20px rgba(56,189,248,0.3)"
                        : "none",
                  }}
                  transition={{ duration: 0.3 }}
                  className="size-10 rounded-full flex items-center justify-center z-10 border-2"
                >
                  {isDone ? (
                    <svg
                      className="size-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <span
                      className="text-[11px] font-bold"
                      style={{
                        color: isActive ? "#ffffff" : "rgba(148,163,184,0.5)",
                      }}
                    >
                      {step.num}
                    </span>
                  )}
                </motion.div>

                {/* Label + desc */}
                <div className="text-center">
                  <p
                    className="text-[13px] font-semibold transition-colors duration-200"
                    style={{
                      color: isActive ? "#f1f5f9" : "rgba(148,163,184,0.5)",
                    }}
                  >
                    {step.label}
                  </p>
                  <motion.p
                    animate={{
                      opacity: isActive ? 1 : 0,
                      maxHeight: isActive ? 60 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="text-[12px] mt-1 leading-relaxed max-w-[160px] mx-auto overflow-hidden"
                    style={{ color: "rgba(148,163,184,0.4)" }}
                  >
                    {step.desc}
                  </motion.p>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* ── Mock screen ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: smooth, delay: 0.2 }}
        >
          {/* Browser chrome */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#111a2e",
              border: "1px solid rgba(56,189,248,0.12)",
              boxShadow:
                "0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(56,189,248,0.05)",
            }}
          >
            {/* Browser bar */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                backgroundColor: "#0e1526",
                borderBottom: "1px solid rgba(56,189,248,0.08)",
              }}
            >
              <div className="flex gap-1.5">
                {["rgba(56,189,248,0.3)", "rgba(56,189,248,0.2)", "rgba(56,189,248,0.12)"].map((c, i) => (
                  <div
                    key={i}
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div
                className="flex-1 mx-2 h-5 rounded-md flex items-center px-3"
                style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
              >
                <span
                  className="text-[10px]"
                  style={{ color: "rgba(148,163,184,0.4)" }}
                >
                  app.portofy.net/
                  {steps[activeStep].mockContent === "publish"
                    ? "dashboard"
                    : "onboarding"}
                </span>
              </div>
              {/* Step pills */}
              <div className="flex gap-1.5 shrink-0">
                {steps.map((_, i) => (
                  <div
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === activeStep ? 16 : 6,
                      height: 6,
                      background:
                        i === activeStep
                          ? "linear-gradient(to right, #3b82f6, #06b6d4)"
                          : i < activeStep
                            ? "rgba(56,189,248,0.4)"
                            : "rgba(56,189,248,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Mock content */}
            <div style={{ minHeight: 360, backgroundColor: "#111a2e" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: smooth }}
                  style={{ minHeight: 360 }}
                >
                  <MockScreen content={steps[activeStep].mockContent} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Nav buttons */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => setActiveStep((p) => Math.max(0, p - 1))}
              disabled={activeStep === 0}
              className="px-4 py-2 rounded-full text-[12px] font-medium transition-all duration-200"
              style={{
                backgroundColor: "rgba(56,189,248,0.06)",
                color:
                  activeStep === 0
                    ? "rgba(148,163,184,0.2)"
                    : "rgba(148,163,184,0.7)",
                border: "1px solid rgba(56,189,248,0.1)",
                cursor: activeStep === 0 ? "not-allowed" : "pointer",
              }}
            >
              ← Sebelumnya
            </button>

            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => setActiveStep((p) => p + 1)}
                className="px-5 py-2 rounded-full text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  boxShadow: "0 4px 16px rgba(59,130,246,0.25)",
                }}
              >
                Selanjutnya →
              </button>
            ) : (
              <a
                href="/auth/register"
                className="px-5 py-2 rounded-full text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  boxShadow: "0 4px 16px rgba(59,130,246,0.25)",
                }}
              >
                Mulai Gratis →
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
