import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const templates = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
    name: "Grid",
    category: "Creative",
    tags: ["Gallery", "Visual", "Photographer"],
    description: "Berbasis grid untuk menampilkan portofolio visual.",
    badge: null,
    views: "4.5k",
    lines: [
      { w: "55%", h: 8 },
      { w: "70%", h: 6 },
      { w: "45%", h: 6 },
    ],
  },
  {
    id: 4,
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
    id: 5,
    name: "Mono",
    category: "Minimal",
    tags: ["Monochrome", "Writer", "Blogger"],
    description: "Monokrom dan tenang. Ideal untuk penulis & peneliti.",
    badge: null,
    views: "2.9k",
    lines: [
      { w: "70%", h: 8 },
      { w: "55%", h: 6 },
      { w: "65%", h: 6 },
    ],
  },
  {
    id: 6,
    name: "Studio",
    category: "Professional",
    tags: ["Agency", "Bold", "Freelancer"],
    description: "Berkarakter kuat. Tampil beda dari ribuan pelamar.",
    badge: null,
    views: "2.1k",
    lines: [
      { w: "85%", h: 12 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
];

const categories = ["Semua", "Minimal", "Creative", "Professional"];

function MockPreview({
  template,
  hovered,
}: {
  template: (typeof templates)[0];
  hovered: boolean;
}) {
  return (
    <div
      className="w-full rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#111116",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      {/* Browser bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
        <div
          className="flex-1 h-4 rounded-md mx-2"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-5" style={{ minHeight: 170 }}>
        {/* Nav */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="h-2 w-10 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          />
          <div className="flex gap-2">
            {[16, 20, 14].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: w, backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            ))}
          </div>
        </div>

        {/* Lines */}
        <div className="space-y-2.5 mb-5">
          {template.lines.map((line, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: line.w,
                height: line.h,
                backgroundColor:
                  i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg"
              style={{
                height: 32,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TemplateShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const filtered =
    activeCategory === "Semua"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section
      id="template"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mb-14"
        >
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Template
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h2
              className="text-[44px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Pilih template,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                langsung jadi.
              </span>
            </h2>
            <p
              className="text-[14px] leading-relaxed max-w-[260px]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Dirancang agar rekruter berhenti scroll dan mulai baca profil
              kamu.
            </p>
          </div>
        </motion.div>

        {/* ── Filter ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-1.5 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor:
                  activeCategory === cat
                    ? "rgba(255,255,255,0.09)"
                    : "transparent",
                color:
                  activeCategory === cat
                    ? "rgba(255,255,255,0.85)"
                    : "rgba(255,255,255,0.3)",
                border:
                  activeCategory === cat
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((template, i) => (
              <motion.div
                key={template.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  scale: 0.97,
                  transition: { duration: 0.15 },
                }}
                transition={{
                  duration: 0.4,
                  ease: smoothEase,
                  delay: i * 0.05,
                }}
                onHoverStart={() => setHoveredId(template.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="cursor-pointer"
              >
                <div
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    backgroundColor: "#0e0e14",
                    border: `1px solid ${
                      hoveredId === template.id
                        ? "rgba(255,255,255,0.1)"
                        : "rgba(255,255,255,0.05)"
                    }`,
                    transform:
                      hoveredId === template.id
                        ? "translateY(-4px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredId === template.id
                        ? "0 20px 48px rgba(0,0,0,0.5)"
                        : "0 4px 16px rgba(0,0,0,0.25)",
                  }}
                >
                  {/* Preview */}
                  <div className="p-3 pb-0">
                    <MockPreview
                      template={template}
                      hovered={hoveredId === template.id}
                    />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className="text-[14px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.8)" }}
                        >
                          {template.name}
                        </h3>
                        {template.badge && (
                          <span
                            className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.07)",
                              color: "rgba(255,255,255,0.45)",
                              border: "1px solid rgba(255,255,255,0.1)",
                            }}
                          >
                            {template.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className="text-[11px]"
                        style={{ color: "rgba(255,255,255,0.18)" }}
                      >
                        {template.views} views
                      </span>
                    </div>

                    <p
                      className="text-[12px] leading-relaxed mb-3"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {template.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {template.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px]"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.04)",
                            color: "rgba(255,255,255,0.25)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        className="flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.88)",
                          color: "#0a0a0f",
                        }}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#ffffff")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.88)")
                        }
                      >
                        Pakai Template
                      </button>
                      <button
                        className="px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.35)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.65)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.35)";
                        }}
                      >
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Bottom CTA ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 flex items-center justify-center gap-4"
        >
          <div
            className="h-px w-24"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.08))",
            }}
          />
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[13px] font-medium transition-all duration-200"
            style={{ color: "rgba(255,255,255,0.35)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.7)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.35)")
            }
          >
            Lihat semua template
            <svg
              className="size-3.5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </a>
          <div
            className="h-px w-24"
            style={{
              background:
                "linear-gradient(to left, transparent, rgba(255,255,255,0.08))",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
