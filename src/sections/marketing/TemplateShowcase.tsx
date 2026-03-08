import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TemplateItem } from "../../types/ui.types";
import TemplateCard from "../../components/marketing/TemplateCard";
import PreviewModalTemplate from "../../components/marketing/PreviewModalTemplate";
import CategoryFilters from "../../components/marketing/CategoryFilters";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const templates = [
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

export default function TemplateShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(
    null,
  );

  const filtered =
    activeCategory === "Semua"
      ? templates
      : templates.filter((t) => t.category === activeCategory);

  return (
    <section
      id="template-showcase"
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
              className="text-[14px] leading-relaxed max-w-65"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Dirancang agar rekruter berhenti scroll dan mulai baca profil
              kamu.
            </p>
          </div>
        </motion.div>

        {/* ── Filter ── */}
        <CategoryFilters
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        {/* ── Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((template, i) => (
              <TemplateCard
                key={template.id}
                template={template}
                i={i}
                hoveredId={hoveredId}
                setHoveredId={setHoveredId}
                setPreviewTemplate={setPreviewTemplate}
              />
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
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModalTemplate
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
