import { motion } from "motion/react";
import { useEffect, useRef } from "react";

export default function FeatureCard({
  card,
  onRect,
  index,
}: {
  card: (typeof CARDS)[0];
  onRect: (id: string, rect: DOMRect) => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { Visual } = card;

  useEffect(() => {
    const update = () => {
      if (ref.current) onRect(card.id, ref.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [card.id, onRect]);

  // Unique float animation name per card for staggered feel
  const floatName = `heroFloat${index}`;

  return (
    <>
      <style>{`
        @keyframes ${floatName} {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-${card.floatY}px); }
        }
      `}</style>
      <motion.div
        ref={ref}
        className="absolute"
        style={{ top: card.top, left: card.left, width: CARD_W }}
        initial={{ opacity: 0, y: 24, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: card.delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        whileHover={{ scale: 1.04, transition: { duration: 0.18 } }}
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: card.bg,
            border: `1px solid ${card.border}`,
            boxShadow: `0 4px 24px ${card.glow}, 0 0 0 1px ${card.border}`,
            backdropFilter: "blur(12px)",
            animation: `${floatName} ${card.floatDuration}s ease-in-out infinite`,
            willChange: "transform",
          }}
        >
          <Visual color={card.color} />
        </div>
      </motion.div>
    </>
  );
}
