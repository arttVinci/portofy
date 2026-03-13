import { motion } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import type { TemplateItem } from "../../@types/ui.types";
import MockPreview from "./MockPreview";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface PreviewModalTemplateProps {
  template: TemplateItem;
  onClose: () => void;
}

export default function PreviewModalTemplate({
  template,
  onClose,
}: PreviewModalTemplateProps) {
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
              {template.description}
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
