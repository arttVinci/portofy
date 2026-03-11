import { motion } from "framer-motion";
import MockPreview from "./MockPreview";
import type { TemplateItem } from "../../types/ui.types";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface TemplateCardProps {
  template: TemplateItem;
  i: number;
  hoveredId: string | null;
  noPreview?: boolean;
  setHoveredId: (id: string | null) => void;
  setPreviewTemplate?: (template: TemplateItem | null) => void;
  setForm?: (field: string, value: string | string[]) => void;
}

export default function TemplateCard({
  template,
  i,
  hoveredId,
  noPreview,
  setHoveredId,
  setPreviewTemplate,
  setForm,
}: TemplateCardProps) {
  return (
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
        ease: smooth,
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
          border: `1px solid ${hoveredId === template.id ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.05)"}`,
          transform:
            hoveredId === template.id ? "translateY(-4px)" : "translateY(0)",
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
              {template.isPro && (
                <span
                  className="px-2 py-0.5 rounded-full text-[9px] font-bold"
                  style={{
                    backgroundColor: "rgba(109,40,217,0.2)",
                    color: "#c4b5fd",
                    border: "1px solid rgba(167,139,250,0.2)",
                  }}
                >
                  PRO
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
                {tag}x
              </span>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              className="flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer"
              onClick={() => setForm?.("theme", template.id)}
              style={{
                backgroundColor: "rgba(255,255,255,0.88)",
                color: "#0a0a0f",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "#ffffff")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.backgroundColor =
                  "rgba(255,255,255,0.88)")
              }
            >
              Pakai Template
            </button>
            {!noPreview && (
              <button
                onClick={() => setPreviewTemplate?.(template)}
                className="px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  color: "rgba(255,255,255,0.35)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.65)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.35)";
                }}
              >
                Preview
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
