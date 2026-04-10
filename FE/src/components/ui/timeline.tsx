"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export function Timeline({ data }: { data: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"],
  });

  const heightProgress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative w-full max-w-7xl mx-auto">
      {/* Beam line */}
      <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-white/[0.06]">
        <motion.div
          className="w-full bg-gradient-to-b from-blue-500 via-blue-400 to-cyan-400"
          style={{ height: heightProgress }}
        />
      </div>

      {data.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex gap-6 md:gap-10 pb-16 last:pb-0"
        >
          {/* Dot */}
          <div className="relative z-10 flex-shrink-0">
            <div className="flex h-8 w-8 md:h-16 md:w-16 items-center justify-center rounded-full border border-white/10 bg-[#0a0f1e]">
              <div className="h-3 w-3 md:h-4 md:w-4 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 pt-1 md:pt-4">
            <h3 className="mb-4 text-xl md:text-2xl font-bold text-white">
              {item.title}
            </h3>
            <div>{item.content}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
