import { motion } from "framer-motion";
import { Trash2, PencilLine } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface BaseCardData {
  id: string;
  title: string;
  description?: string;
  image_url?: string;
}

interface CardProps<T extends BaseCardData> {
  data: T;
  i: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  onViewDetail: (data: T) => void;
  onEdit: (data: T) => void;
  onDelete: (id: string) => void;
}

export default function ShowcaseCard<T extends BaseCardData>({
  data,
  i,
  hoveredId,
  setHoveredId,
  onViewDetail,
  onEdit,
  onDelete,
}: CardProps<T>) {
  const isHovered = hoveredId === data.id;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, ease: smooth, delay: i * 0.05 }}
      onHoverStart={() => setHoveredId(data.id)}
      onHoverEnd={() => setHoveredId(null)}
      className="cursor-pointer"
    >
      <div
        className={`rounded-2xl overflow-hidden transition-all duration-300 border
          bg-white border-slate-200 shadow-sm
          dark:bg-blue-card dark:border-white/5 dark:shadow-2xl
          ${
            isHovered
              ? "-translate-y-1 border-slate-300 dark:border-white/10 shadow-xl dark:shadow-black"
              : "translate-y-0"
          }`}
      >
        {/* Preview */}
        <div className="p-3 pb-0">
          <div className="rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-white/5">
            {data.image_url ? (
              <img
                src={data.image_url}
                alt={data.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-slate-400 dark:text-white/20 text-sm">
                No image
              </div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-[14px] font-semibold text-slate-800 dark:text-white/80 mb-1">
            {data.title}
          </h3>

          <p className="text-[12px] leading-relaxed mb-3 line-clamp-3 text-slate-500 dark:text-white/30">
            {data.description}
          </p>

          {/* Actions */}
          <div className="flex gap-2">
            {/* View Details Button */}
            <button
              onClick={() => onViewDetail(data)}
              className="flex-1 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 cursor-pointer
                         bg-slate-900 text-white hover:bg-black
                         dark:bg-white/90 dark:text-[#0a0a0f] dark:hover:bg-white"
            >
              See Details →
            </button>

            {/* Edit Button */}
            <button
              onClick={() => onEdit(data)}
              className="px-4 py-2 flex items-center gap-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all duration-200
                         bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200
                         dark:bg-white/5 dark:text-white/30 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-white/60"
            >
              Edit <PencilLine className="w-3 h-3" />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => onDelete(data.id)}
              className="px-2 py-2 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-200
                         bg-red-50 text-red-500 border border-red-100 hover:bg-red-100
                         dark:bg-white/5 dark:text-white/30 dark:border-white/10 dark:hover:bg-red-500/10 dark:hover:text-red-400 dark:hover:border-red-500/20"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
