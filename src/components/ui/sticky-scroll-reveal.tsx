"use client";
import React, { useRef } from "react";
import { useScroll, motion, useMotionValueEvent } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string | React.ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "var(--slate-900)",
    "var(--black)",
    "var(--neutral-900)",
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, var(--cyan-500), var(--emerald-500))",
    "linear-gradient(to bottom right, var(--pink-500), var(--indigo-500))",
    "linear-gradient(to bottom right, var(--orange-500), var(--yellow-500))",
    "linear-gradient(to bottom right, var(--blue-500), var(--violet-500))",
  ];

  return (
    <motion.div
      className="h-[30rem] overflow-y-auto flex justify-center relative space-x-10 rounded-md p-10 scrollbar-hide"
      ref={ref}
      style={{
        // We use a subtle transparent background and handle overall section color in the parent
        backgroundColor: "transparent",
      }}
    >
      {/* Scroll indicator instructions (optional) */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center gap-2 text-slate-500 text-xs animate-bounce z-50">
        <span>Scroll di area ini</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>
      </div>

      <div className="div relative flex items-start px-4 mt-8">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-20">
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  scale: activeCard === index ? 1 : 0.95,
                  x: activeCard === index ? 0 : -10,
                }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                transition={{ duration: 0.3 }}
                className="text-kg text-slate-300 max-w-sm mt-10"
              >
                {item.description}
              </motion.div>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <motion.div
        animate={{
          background: linearGradients[activeCard % linearGradients.length],
        }}
        transition={{ duration: 0.5 }}
        className={cn(
          "hidden lg:flex h-80 w-96 rounded-2xl bg-white sticky top-16 overflow-hidden flex-col shadow-2xl",
          contentClassName
        )}
      >
        <div className="h-full w-full rotate-3 scale-110 opacity-90 relative">
             {/* Sub visual pattern */}
            <div className="absolute inset-0 bg-[size:20px_20px] [background-image:radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)]" />
            <div className="absolute inset-0 flex items-center justify-center text-white/90 text-8xl drop-shadow-lg">
                {content[activeCard]?.content ?? null}
            </div>
        </div>
      </motion.div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
};
