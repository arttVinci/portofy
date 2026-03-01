import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface HeroSectionProps {
  tagline?: string;
  title: string;
  italicTitle: string;
  description: string;
  templatesCount?: number;
  children?: React.ReactNode;
}

export default function HeroSection({
  tagline,
  title,
  italicTitle,
  description,
  templatesCount,
  children,
}: HeroSectionProps) {
  return (
    <section className="relative pt-40 pb-16 text-center overflow-hidden">
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 800,
          height: 400,
          background:
            "radial-gradient(ellipse at center top, rgba(99,102,241,0.1) 0%, transparent 65%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smooth }}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {tagline}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: smooth, delay: 0.06 }}
          className="text-[52px] font-normal leading-[1.08] tracking-[-0.03em] text-white mb-5"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title},{" "}
          <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            {italicTitle}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: smooth, delay: 0.12 }}
          className="text-[15px] leading-relaxed max-w-sm mx-auto"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {templatesCount} {description}
        </motion.p>

        {children && children}
      </div>
    </section>
  );
}
