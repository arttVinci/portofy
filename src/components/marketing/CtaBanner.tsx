import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

export interface CtaBannerProps {
  tag?: string;
  title?: string;
  italicTitle?: string;
  description?: string;
  children?: React.ReactNode;
  classname: string;
  motionDivClassname: string;
}

export default function CtaBanner({
  tag,
  title,
  italicTitle,
  description,
  children,
  classname,
  motionDivClassname,
}: CtaBannerProps) {
  return (
    <section id="feature-cta-section" className={`${classname}`}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: smooth }}
        className={`${motionDivClassname}`}
        // className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
        style={{
          backgroundColor: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
        <p
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {tag}
        </p>
        <h2
          className="text-[40px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title}{" "}
          <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            {italicTitle}
          </span>
        </h2>
        <p
          className="text-[14px] max-w-sm mx-auto mb-8"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {description}
        </p>
        <div className="flex items-center justify-center gap-3">
          {children && children}
        </div>
      </motion.div>
    </section>
  );
}
