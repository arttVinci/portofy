import { motion } from "motion/react";
import { CONNECTIONS_CARD } from "@/contants/home/visual-card";

function edgePoint(rect: DOMRect, target: DOMRect, offset: DOMRect) {
  const cx = rect.left + rect.width / 2 - offset.left;
  const cy = rect.top + rect.height / 2 - offset.top;
  const tx = target.left + target.width / 2 - offset.left;
  const ty = target.top + target.height / 2 - offset.top;
  const hw = rect.width / 2;
  const hh = rect.height / 2;
  const dx = tx - cx;
  const dy = ty - cy;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  // Scale to hit the edge of the card rectangle
  if (absDx * hh > absDy * hw && absDx > 0) {
    const s = hw / absDx;
    return { x: cx + dx * s, y: cy + dy * s };
  } else if (absDy > 0) {
    const s = hh / absDy;
    return { x: cx + dx * s, y: cy + dy * s };
  }
  return { x: cx, y: cy };
}

export default function ConnectorLines({
  rects,
  containerRect,
  visible,
}: {
  rects: Record<string, DOMRect>;
  containerRect: DOMRect | null;
  visible: boolean;
}) {
  if (!containerRect) return null;

  const lines = CONNECTIONS_CARD.map(([a, b]) => {
    const ra = rects[a];
    const rb = rects[b];
    if (!ra || !rb) return null;
    const from = edgePoint(ra, rb, containerRect);
    const to = edgePoint(rb, ra, containerRect);
    // Smooth cubic bezier — perpendicular offset for nice curve
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    // Perpendicular offset for smooth curve (15% of length)
    const nx = len > 0 ? (-dy / len) * len * 0.15 : 0;
    const ny = len > 0 ? (dx / len) * len * 0.15 : 0;
    const c1x = from.x + dx * 0.3 + nx;
    const c1y = from.y + dy * 0.3 + ny;
    const c2x = from.x + dx * 0.7 + nx;
    const c2y = from.y + dy * 0.7 + ny;
    return {
      id: `${a}-${b}`,
      d: `M ${from.x} ${from.y} C ${c1x} ${c1y} ${c2x} ${c2y} ${to.x} ${to.y}`,
    };
  }).filter(Boolean) as { id: string; d: string }[];

  return (
    <>
      <style>{`
        @keyframes travelDot {
          0%   { offset-distance: 0%; }
          100% { offset-distance: 100%; }
        }
      `}</style>
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#a78bfa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0.6" />
          </linearGradient>
          <filter id="gl2">
            <feGaussianBlur stdDeviation="2" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {lines.map((l, i) => (
          <motion.path
            key={l.id}
            d={l.d}
            fill="none"
            stroke="url(#lg2)"
            strokeWidth="1"
            strokeDasharray="5 7"
            filter="url(#gl2)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={visible ? { pathLength: 1, opacity: 0.45 } : {}}
            transition={{
              pathLength: {
                duration: 1,
                delay: 0.9 + i * 0.09,
                ease: "easeInOut",
              },
              opacity: { duration: 0.4, delay: 0.9 + i * 0.09 },
            }}
          />
        ))}
        {visible &&
          lines.map((l, i) => (
            <circle
              key={`dot-${l.id}`}
              r="2"
              fill="#93c5fd"
              opacity="0.85"
              style={
                {
                  offsetPath: `path("${l.d}")`,
                  offsetDistance: "0%",
                  animation: `travelDot 3s ${1.3 + i * 0.3}s linear infinite`,
                } as React.CSSProperties
              }
            />
          ))}
      </svg>
    </>
  );
}
