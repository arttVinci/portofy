import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";
import { IconArrowRight } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: "12.000+", label: "Portfolio aktif" },
  { value: "3 menit", label: "Rata-rata waktu setup" },
  { value: "4.9 / 5", label: "Rating dari pengguna" },
];

export default function CtaBannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  return (
    <section
      ref={sectionRef}
      id="cta-banner"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#060b18", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Animated beams */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              width: `${200 + i * 100}px`,
              top: `${15 + i * 18}%`,
              left: "-200px",
              background: `linear-gradient(to right, transparent, rgba(59,130,246,${0.06 + i * 0.02}), transparent)`,
            }}
            animate={{
              x: [0, 2000],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-6">
        {/* ── Main banner ── */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          initial={{ opacity: 0, y: 32 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: smooth }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
          style={{
            background: "linear-gradient(135deg, #0a1020 0%, #0e1a30 50%, #080d1a 100%)",
            border: "1px solid rgba(59,130,246,0.12)",
          }}
        >
          {/* Spotlight effect */}
          <div
            className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
            style={{
              background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.06), transparent 60%)`,
            }}
          />

          {/* Top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{ background: "linear-gradient(to right, transparent, #3b82f6, transparent)" }}
          />

          {/* Corner dots */}
          {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} size-1 rounded-full`}
              style={{ backgroundColor: "rgba(59,130,246,0.4)" }}
            />
          ))}

          {/* Content */}
          <div className="relative z-10">
            {/* Badge */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
              style={{
                backgroundColor: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.2)",
                color: "#60a5fa",
              }}
            >
              🚀 Mulai Sekarang
            </motion.span>

            <h2
              className="text-[48px] font-extrabold leading-[1.08] tracking-[-0.03em] mb-5 max-w-xl mx-auto"
              style={{ color: "#f1f5f9" }}
            >
              Portfolio kamu sudah{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                lama tertunda.
              </span>
            </h2>

            <p className="text-[15px] leading-relaxed max-w-sm mx-auto mb-10" style={{ color: "rgba(148,163,184,0.5)" }}>
              Ribuan kreator sudah online. Kamu tinggal isi form dan selesai — dalam waktu kurang dari 5 menit.
            </p>

            {/* CTA buttons */}
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <motion.a
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                href="/auth/register"
                className="px-7 py-3.5 rounded-full text-[14px] font-semibold text-white inline-flex items-center gap-2"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                  boxShadow: "0 8px 32px rgba(59,130,246,0.35), 0 0 48px rgba(59,130,246,0.1)",
                }}
              >
                Buat Portfolio Gratis
                <IconArrowRight size={16} />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href="/template"
                className="px-7 py-3.5 rounded-full text-[14px] font-medium inline-flex items-center gap-2 transition-colors duration-200"
                style={{
                  color: "rgba(59,130,246,0.7)",
                  border: "1px solid rgba(59,130,246,0.2)",
                  backgroundColor: "rgba(59,130,246,0.04)",
                }}
              >
                Lihat Template
              </motion.a>
            </div>

            {/* Trust note */}
            <p className="mt-5 text-[11px]" style={{ color: "rgba(148,163,184,0.3)" }}>
              Gratis selamanya · Tanpa kartu kredit · Batalkan kapan saja
            </p>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: smooth, delay: 0.2 }}
          className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
          style={{
            backgroundColor: "rgba(59,130,246,0.06)",
            border: "1px solid rgba(59,130,246,0.06)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 text-center"
              style={{ backgroundColor: "#0a1020" }}
            >
              <p className="text-[22px] font-bold tracking-[-0.02em]" style={{ color: "rgba(241,245,249,0.85)" }}>
                {s.value}
              </p>
              <p className="text-[11px] mt-1" style={{ color: "rgba(148,163,184,0.4)" }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
