import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

interface SectionHeaderProps {
  tag: string;
  title: string;
  italicTitle?: string;
}

export default function SectionHeader({
  tag,
  title,
  italicTitle,
}: SectionHeaderProps) {
  return (
    <motion.div {...fadeUp(0)} className="text-center mb-12">
      <p
        className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
        style={{ color: "rgba(255,255,255,0.25)" }}
      >
        {tag}
      </p>
      <h2
        className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        {title}{" "}
        <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
          {italicTitle}
        </span>
      </h2>
    </motion.div>
  );
}
