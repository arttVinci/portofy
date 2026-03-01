import { useState, useMemo } from "react";
import type { TemplateItem } from "../../types/ui.types";
import { AnimatePresence, motion } from "framer-motion";
import TemplateCard from "../../components/marketing/TemplateCard";
import PreviewModalTemplate from "../../components/marketing/PreviewModalTemplate";
import CategoryFilters from "../../components/marketing/CategoryFilters";
import EmptySearch from "../../components/ui/EmptySearch";
import SearchInput from "../../components/ui/SearchInput";

interface TemplateShowcaseSectionProps {
  templates: TemplateItem[];
  categories: string[];
}

export default function TemplateShowcaseSection({
  templates,
  categories,
}: TemplateShowcaseSectionProps) {
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
    <>
      {/* Flter Bar */}
      <div
        className="py-4"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center gap-3">
          {/* Search */}
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Cari Template..."
            className="flex-1 w-full sm:w-auto"
          />

          {/* Category Filter */}
          <CategoryFilters
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />

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

      {/* Card Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Result Count */}
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
              {/* Template Card */}
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
            // Empty State
            <EmptySearch
              title="Template tidak ditemukan"
              description="Coba cari dengan kata kunci lain."
              actionText="Reset Pencarian"
              onAction={() => {
                setSearch("");
                setActiveCategory("Semua");
                setShowProOnly(false);
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewTemplate && (
          <PreviewModalTemplate
            template={previewTemplate}
            onClose={() => setPreviewTemplate(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
