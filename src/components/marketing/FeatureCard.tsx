import { motion } from "framer-motion";
import type { ReactNode } from "react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  desc: string;
  index?: number;
}

export default function FeatureCard({
  icon,
  title,
  desc,
  index = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: smooth, delay: index * 0.04 }}
      className="group rounded-2xl p-5 transition-all duration-300"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.12)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#111118";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.06)";
        (e.currentTarget as HTMLElement).style.backgroundColor = "#0e0e14";
      }}
    >
      <div
        className="size-9 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.6)",
        }}
      >
        {icon}
      </div>
      <p
        className="text-[14px] font-semibold mb-2"
        style={{ color: "rgba(255,255,255,0.85)" }}
      >
        {title}
      </p>
      <p
        className="text-[12px] leading-relaxed"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {desc}
      </p>
    </motion.div>
  );
}
