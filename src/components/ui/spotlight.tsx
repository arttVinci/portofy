"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

type SpotlightProps = {
  className?: string;
  fill?: string;
};

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className={cn(
        "pointer-events-none absolute -top-40 left-0 z-[1] h-[60vh] w-full",
        className,
      )}
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1480 800"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="spotlight-grad" cx="50%" cy="0%" r="70%">
            <stop offset="0%" stopColor={fill} stopOpacity="0.15" />
            <stop offset="50%" stopColor={fill} stopOpacity="0.05" />
            <stop offset="100%" stopColor={fill} stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse
          cx="740"
          cy="0"
          rx="600"
          ry="400"
          fill="url(#spotlight-grad)"
        />
      </svg>
    </motion.div>
  );
}
