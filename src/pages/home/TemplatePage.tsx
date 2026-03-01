import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight } from "lucide-react";
import HeroSection from "../../components/marketing/HeroSection";
import TemplateCard from "../../components/marketing/TemplateCard";
import type { TemplateItem } from "../../types/ui.types";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Template data ─────────────────────────────────────────────────────────────
const templates = [
  {
    id: "1",
    name: "Minimal",
    category: "Minimal",
    tags: ["Clean", "Developer", "Simple"],
    description: "Bersih dan fokus. Biarkan karya kamu yang bicara.",
    badge: "Paling Populer",
    views: "8.2k",
    isPro: false,
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
    isPro: false,
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
    isPro: false,
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
    isPro: false,
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
    isPro: true,
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
    isPro: true,
    lines: [
      { w: "85%", h: 12 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "7",
    name: "Slate",
    category: "Professional",
    tags: ["Modern", "Corporate"],
    description: "Modern dan profesional. Layout dua kolom yang terorganisir.",
    views: "3.9k",
    isPro: false,
    lines: [
      { w: "65%", h: 9 },
      { w: "45%", h: 6 },
      { w: "70%", h: 6 },
    ],
  },
  {
    id: "8",
    name: "Dusk",
    category: "Minimal",
    tags: ["Dark", "Elegant"],
    description: "Dark mode elegan dengan tipografi yang kuat dan premium.",
    badge: "Baru",
    views: "2.1k",
    isPro: true,
    lines: [
      { w: "80%", h: 11 },
      { w: "60%", h: 6 },
      { w: "50%", h: 6 },
    ],
  },
  {
    id: "9",
    name: "Bloom",
    category: "Creative",
    tags: ["Pastel", "Playful"],
    description:
      "Warna lembut dan playful. Untuk illustrator dan content creator.",
    views: "5.5k",
    isPro: false,
    lines: [
      { w: "72%", h: 9 },
      { w: "55%", h: 6 },
      { w: "62%", h: 6 },
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

// ── Preview Modal ─────────────────────────────────────────────────────────────
function PreviewModal({
  template,
  onClose,
}: {
  template: (typeof templates)[0];
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.3, ease: smooth }}
        className="w-full max-w-xl rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex items-center gap-2">
            <p
              className="text-[15px] font-semibold"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {template.name}
            </p>
            {template.isPro && (
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "rgba(167,139,250,0.15)",
                  color: "#c4b5fd",
                  border: "1px solid rgba(167,139,250,0.2)",
                }}
              >
                PRO
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="size-8 rounded-lg flex items-center justify-center transition-colors duration-150 cursor-pointer"
            style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.5)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.1)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.06)")
            }
          >
            <X size={14} />
          </button>
        </div>

        {/* Enlarged preview */}
        <div className="p-4">
          <MockPreview template={template} hovered={false} />
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div>
            <div className="flex gap-1.5 mb-1.5">
              {template.tags.map((t) => (
                <span
                  key={t}
                  className="text-[10px] px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {template.desc}
            </p>
          </div>
          <a
            href="/register"
            className="ml-4 shrink-0 flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#0a0a0f",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.9)")
            }
          >
            Pakai Template
            <ArrowRight size={13} />
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TemplatePage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(
    null,
  );
  const [showProOnly, setShowProOnly] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchCat =
        activeCategory === "Semua" || t.category === activeCategory;
      const matchSearch =
        search === "" ||
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
      const matchPro = !showProOnly || t.isPro;
      return matchCat && matchSearch && matchPro;
    });
  }, [activeCategory, search, showProOnly]);

  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* ── HERO ── */}
        <HeroSection
          tagline="Template"
          title="Pilih template"
          italicTitle="langsung jadi."
          description="template siap pakai, dirancang oleh designer profesional untuk berbagai industri."
          templatesCount={templates.length}
        />

        {/* ── FILTER BAR ── */}
        <div
          className="py-4"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 w-full sm:w-auto">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(255,255,255,0.3)" }}
              />
              <input
                type="text"
                placeholder="Cari template..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl text-[13px] outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.75)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor:
                      activeCategory === cat
                        ? "rgba(255,255,255,0.1)"
                        : "transparent",
                    color:
                      activeCategory === cat
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.35)",
                    border:
                      activeCategory === cat
                        ? "1px solid rgba(255,255,255,0.15)"
                        : "1px solid transparent",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Pro toggle */}
            <button
              onClick={() => setShowProOnly((v) => !v)}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer shrink-0"
              style={{
                backgroundColor: showProOnly
                  ? "rgba(167,139,250,0.12)"
                  : "transparent",
                color: showProOnly ? "#c4b5fd" : "rgba(255,255,255,0.35)",
                border: showProOnly
                  ? "1px solid rgba(167,139,250,0.25)"
                  : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              ✦ Pro only
            </button>
          </div>
        </div>

        {/* ── GRID ── */}
        <div className="max-w-6xl mx-auto px-6 py-12">
          {/* Result count */}
          <motion.p
            className="text-[12px] mb-6"
            style={{ color: "rgba(255,255,255,0.25)" }}
            animate={{ opacity: 1 }}
          >
            Menampilkan {filtered.length} template
            {activeCategory !== "Semua" && ` · ${activeCategory}`}
            {search && ` · "${search}"`}
          </motion.p>

          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory + search + showProOnly}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
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
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-[32px] mb-3">🔍</p>
                <p
                  className="text-[15px] font-medium mb-1"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  Tidak ada template ditemukan
                </p>
                <p
                  className="text-[13px]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Coba kata kunci lain atau reset filter
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("Semua");
                    setShowProOnly(false);
                  }}
                  className="mt-4 px-4 py-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all duration-150"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Reset filter
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── CTA ── */}
        <section className="py-16 max-w-5xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth }}
            className="rounded-2xl p-10 text-center relative overflow-hidden"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.15), transparent)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Belum yakin?
            </p>
            <h2
              className="text-[32px] font-normal tracking-[-0.025em] text-white mb-3"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Coba dulu,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                gratis selamanya.
              </span>
            </h2>
            <p
              className="text-[14px] mb-6"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Daftar gratis dan mulai pakai template mana saja.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold text-[#0a0a0f] transition-all duration-200 hover:-translate-y-0.5"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#fff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.9)")
              }
            >
              Mulai Gratis →
            </a>
          </motion.div>
        </section>
      </div>

      {/* ── Preview Modal ── */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModal
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
