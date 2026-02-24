import { motion } from "framer-motion";
import RotatingText from "../../components/ui/RotatingText";
import Particles from "../../components/ui/Particles";
import IconBlocksSection from "../../components/marketing/IconBlockSection";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: smoothEase, delay },
});

const steps = [
  { num: "01", label: "Pilih template" },
  { num: "02", label: "Isi profil kamu" },
  { num: "03", label: "Publish & share" },
];

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative min-h-screen overflow-hidden flex flex-col items-center"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#0a0a0f",
      }}
    >
      {/* ── Particles Background ── */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#ffffff"]}
          particleCount={700}
          particleSpread={10}
          speed={0.4}
          particleBaseSize={100}
          moveParticlesOnHover
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      {/* ── Subtle grid background ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Soft radial glow center ── */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[1]"
        style={{
          width: 900,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.18) 0%, transparent 70%)",
        }}
      />

      {/* ── HERO CONTENT ── */}
      <div className="relative z-10 flex flex-col items-center text-center pt-32 px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide border"
            style={{
              backgroundColor: "rgba(109,40,217,0.25)",
              borderColor: "rgba(167,139,250,0.4)",
              color: "#c4b5fd",
            }}
          >
            <span className="size-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
            No-code · Instant · Gratis untuk mulai
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          {...fadeUp(0.2)}
          className="mt-6 text-[58px] leading-[1.08] font-normal tracking-[-0.03em] text-white flex flex-wrap items-baseline justify-center gap-x-3"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          <span>Portfolio kamu,</span>
          <RotatingText
            texts={[
              "Siap dalam 3 langkah.",
              "Tampil profesional.",
              "HR & Recruiter terkesan.",
              "Cukup isi form.",
            ]}
            mainClassName="italic text-indigo-400 overflow-hidden justify-start"
            staggerFrom="last"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-1"
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            rotationInterval={2500}
          />
        </motion.h1>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.3)}
          className="mt-5 text-[17px] leading-[1.65] max-w-xl"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          Pilih template, isi profil kamu, dan portfolio siap ditampilkan ke
          dunia — dalam hitungan menit, bukan minggu.
        </motion.p>

        {/* CTA buttons */}
        <motion.div {...fadeUp(0.4)} className="mt-8 flex items-center gap-3">
          <a
            href="#"
            className="px-6 py-3 rounded-xl text-[15px] font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: "0 8px 32px rgba(99,102,241,0.35)",
            }}
          >
            Buat portfolio gratis →
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl text-[15px] font-medium transition-colors duration-150"
            style={{
              color: "rgba(255,255,255,0.7)",
              backgroundColor: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(255,255,255,0.12)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                "rgba(255,255,255,0.07)")
            }
          >
            Lihat contoh
          </a>
        </motion.div>

        {/* Steps */}
        <motion.div {...fadeUp(0.45)} className="mt-10 flex items-center gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-bold"
                  style={{ color: "#818cf8" }}
                >
                  {s.num}
                </span>
                <span
                  className="text-[13px]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <span
                  className="text-xs"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  ──
                </span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── FLOATING PORTFOLIO CARDS ── */}
      <IconBlocksSection />
    </section>
  );
}
