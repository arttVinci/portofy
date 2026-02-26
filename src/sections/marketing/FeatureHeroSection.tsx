import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

export default function FeatureHeroSection() {
  return (
    <section className="relative pt-40 pb-20 text-center overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse at center top, rgba(99,102,241,0.12) 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.div {...fadeUp(0)}>
          <span
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-semibold tracking-wide border mb-6"
            style={{
              backgroundColor: "rgba(109,40,217,0.2)",
              borderColor: "rgba(167,139,250,0.3)",
              color: "#c4b5fd",
            }}
          >
            <span className="size-1.5 rounded-full bg-violet-400 animate-pulse inline-block" />
            Semua Fitur
          </span>
        </motion.div>
        <motion.h1
          {...fadeUp(0.08)}
          className="text-[52px] font-normal leading-[1.08] tracking-[-0.03em] text-white mb-5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Semua yang kamu butuhkan,{" "}
          <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            sudah ada di sini.
          </span>
        </motion.h1>
        <motion.p
          {...fadeUp(0.14)}
          className="text-[15px] leading-relaxed max-w-md mx-auto"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Dari no-code editor sampai analytics lengkap — satu platform untuk
          bikin portfolio yang benar-benar profesional.
        </motion.p>
      </div>
    </section>
  );
}
