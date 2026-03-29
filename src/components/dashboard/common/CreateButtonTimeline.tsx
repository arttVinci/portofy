import { motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface CreateButtonTimelineProps {
  title: string;
  sortedLength: number;
  onAdd: () => void;
  size: number;
}

export default function CreateButtonTimeline({
  title,
  sortedLength,
  onAdd,
  size,
}: CreateButtonTimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        ease: smooth,
        delay: sortedLength * 0.06,
      }}
      className="relative flex gap-4 pt-2"
    >
      <button
        onClick={onAdd}
        className="flex items-center gap-0 group cursor-pointer"
      >
        <div
          className={`size-${size} rounded-full border-2 border-dashed border-border bg-background flex items-center justify-center shrink-0 z-10 transition-all duration-200 group-hover:border-border/80 group-hover:bg-muted/30`}
        >
          <PlusIcon className="size-3.5 text-muted-foreground transition-all duration-200 group-hover:rotate-90" />
        </div>

        <div className="w-4 border-t-2 border-dashed border-border shrink-0 -mx-px transition-colors duration-200 group-hover:border-border/80" />

        <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-full border-2 border-dashed border-border bg-background text-sm text-muted-foreground transition-all duration-200 group-hover:border-border/80 group-hover:bg-muted/30">
          {title}
        </div>
      </button>
    </motion.div>
  );
}
