import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconEye, IconArrowRight } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface Template {
  id: string;
  name: string;
  category: string;
  tags: string[];
  description: string;
  badge?: string;
  views: string;
  lines: { w: string; h: number }[];
}

const templates: Template[] = [
  {
    id: "1",
    name: "Minimal",
    category: "Minimal",
    tags: ["Clean", "Developer", "Simple"],
    description: "Bersih dan fokus. Biarkan karya kamu yang bicara.",
    badge: "Paling Populer",
    views: "8.2k",
    lines: [
      { w: "75%", h: 10 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "2",
    name: "Editorial",
    category: "Creative",
    tags: ["Bold", "Designer", "Typography"],
    description: "Layout magazine dengan tipografi kuat dan berani.",
    badge: "Trending",
    views: "6.1k",
    lines: [
      { w: "90%", h: 14 },
      { w: "65%", h: 6 },
      { w: "40%", h: 6 },
    ],
  },
  {
    id: "3",
    name: "Grid",
    category: "Creative",
    tags: ["Gallery", "Visual", "Photographer"],
    description: "Berbasis grid untuk menampilkan portofolio visual.",
    views: "4.5k",
    lines: [
      { w: "55%", h: 8 },
      { w: "70%", h: 6 },
      { w: "45%", h: 6 },
    ],
  },
  {
    id: "4",
    name: "Résumé",
    category: "Professional",
    tags: ["Corporate", "Business", "Formal"],
    description: "Profesional dan terstruktur. Cocok untuk fresh graduate.",
    badge: "Baru",
    views: "3.4k",
    lines: [
      { w: "60%", h: 8 },
      { w: "80%", h: 6 },
      { w: "55%", h: 6 },
    ],
  },
  {
    id: "5",
    name: "Mono",
    category: "Minimal",
    tags: ["Monochrome", "Writer", "Blogger"],
    description: "Monokrom dan tenang. Ideal untuk penulis & peneliti.",
    views: "2.9k",
    lines: [
      { w: "70%", h: 8 },
      { w: "55%", h: 6 },
      { w: "65%", h: 6 },
    ],
  },
  {
    id: "6",
    name: "Studio",
    category: "Professional",
    tags: ["Agency", "Bold", "Freelancer"],
    description: "Berkarakter kuat. Tampil beda dari ribuan pelamar.",
    views: "2.1k",
    lines: [
      { w: "85%", h: 12 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
];

const categories = ["Semua", "Minimal", "Creative", "Professional"];

// ── 3D Tilt Card ─────────────────────────────────────────────────────
function TemplateCard3D({ template, index }: { template: Template; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePos({ x, y });
  }, []);

  const rotateX = isHovered ? (mousePos.y - 0.5) * -12 : 0;
  const rotateY = isHovered ? (mousePos.x - 0.5) * 12 : 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.5, ease: smooth, delay: index * 0.06 }}
      style={{ perspective: "1000px" }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative rounded-2xl overflow-hidden cursor-pointer group"
        style={{
          backgroundColor: "#0e1526",
          border: `1px solid ${isHovered ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.05)"}`,
          boxShadow: isHovered
            ? "0 24px 48px rgba(0,0,0,0.5), 0 0 48px rgba(59,130,246,0.08)"
            : "0 4px 16px rgba(0,0,0,0.25)",
          transformStyle: "preserve-3d",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Spotlight effect */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(59,130,246,0.08), transparent 60%)`,
            }}
          />
        )}

        {/* Top glow line */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute top-0 left-0 right-0 h-px z-20"
          style={{
            background: "linear-gradient(to right, transparent, #3b82f6, transparent)",
          }}
        />

        {/* Preview mock */}
        <div className="p-4 pb-0">
          <div
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              backgroundColor: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.04)",
              minHeight: 100,
            }}
          >
            {/* Mock layout skeleton */}
            <div className="flex items-center gap-2 mb-3">
              <div
                className="size-6 rounded-full"
                style={{ backgroundColor: isHovered ? "rgba(59,130,246,0.2)" : "rgba(255,255,255,0.06)" }}
              />
              <div>
                <div
                  className="h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: isHovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.08)" }}
                />
                <div
                  className="h-1 w-10 rounded-full mt-1"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              {template.lines.map((line, i) => (
                <motion.div
                  key={i}
                  animate={{ width: isHovered ? line.w : `calc(${line.w} - 10%)` }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="rounded-full"
                  style={{
                    height: line.h,
                    backgroundColor: isHovered ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.04)",
                    transition: "background-color 0.3s",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-4 relative z-10">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <h3 className="text-[14px] font-semibold text-white/80">{template.name}</h3>
              {template.badge && (
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold tracking-wide"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                    color: "#818cf8",
                    border: "1px solid rgba(129,140,248,0.2)",
                  }}
                >
                  {template.badge}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1 text-[11px]" style={{ color: "rgba(255,255,255,0.2)" }}>
              <IconEye size={12} />
              {template.views}
            </div>
          </div>

          <p className="text-[12px] leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.3)" }}>
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full text-[10px]"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  color: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
            style={{
              backgroundColor: isHovered ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.05)",
              color: isHovered ? "#60a5fa" : "rgba(255,255,255,0.4)",
              border: `1px solid ${isHovered ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
            }}
          >
            Pakai Template
            <motion.span animate={{ x: isHovered ? 3 : 0 }}>
              <IconArrowRight size={13} />
            </motion.span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TemplateShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const filtered =
    activeCategory === "Semua"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      id="template-showcase"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#080d1a",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Dot grid background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Center glow */}
      <div
        className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 500,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth }}
          className="mb-14"
        >
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
            style={{
              backgroundColor: "rgba(139,92,246,0.1)",
              border: "1px solid rgba(139,92,246,0.2)",
              color: "#a78bfa",
            }}
          >
            🎨 Template
          </motion.span>

          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em]"
              style={{ color: "#f1f5f9" }}
            >
              Pilih template,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                langsung jadi.
              </span>
            </h2>
            <p
              className="text-[14px] leading-relaxed max-w-xs"
              style={{ color: "rgba(148,163,184,0.5)" }}
            >
              Dirancang agar rekruter berhenti scroll dan mulai baca profil kamu.
            </p>
          </div>
        </motion.div>

        {/* ── Filter pills ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-2 mb-10"
        >
          {categories.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="relative px-4 py-2 text-[12px] font-semibold rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  color: isActive ? "#ffffff" : "rgba(148,163,184,0.5)",
                  backgroundColor: isActive ? "rgba(59,130,246,0.15)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(59,130,246,0.3)" : "rgba(255,255,255,0.06)"}`,
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="filter-active"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.1))",
                      border: "1px solid rgba(59,130,246,0.25)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((template, i) => (
              <TemplateCard3D key={template.id} template={template} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-14 flex items-center justify-center gap-4"
        >
          <div
            className="h-px w-20"
            style={{
              background: "linear-gradient(to right, transparent, rgba(59,130,246,0.2))",
            }}
          />
          <a
            href="/template"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-blue-400/60 hover:text-blue-400 transition-colors duration-200"
          >
            Lihat semua template
            <IconArrowRight size={14} />
          </a>
          <div
            className="h-px w-20"
            style={{
              background: "linear-gradient(to left, transparent, rgba(59,130,246,0.2))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
