"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  index = 0,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group/bento row-span-1 flex flex-col justify-between space-y-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 shadow-xl transition-all duration-300 hover:border-white/[0.15] hover:bg-white/[0.04] hover:shadow-2xl",
        "backdrop-blur-sm",
        className,
      )}
    >
      {header && <div className="overflow-hidden rounded-xl">{header}</div>}
      <div>
        <div className="mb-2 flex items-center gap-2">
          {icon}
          <div className="text-lg font-bold text-white transition-colors group-hover/bento:text-blue-300">
            {title}
          </div>
        </div>
        <div className="text-sm leading-relaxed text-slate-400">
          {description}
        </div>
      </div>
    </motion.div>
  );
}
