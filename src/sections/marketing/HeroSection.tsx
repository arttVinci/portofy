import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

const CARDS = [
  {
    id: "dashboard",
    label: "Dashboard Builder",
    sub: "Atur semua konten portofoliomu",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.07)",
    border: "rgba(96,165,250,0.22)",
    glow: "rgba(96,165,250,0.15)",
    top: "1%",
    left: "4%",
    delay: 0.35,
    floatDuration: 6,
    floatY: 8,
    Visual: VisualDashboard,
  },
  {
    id: "template",
    label: "Pilih Template",
    sub: "10+ template modern & responsif",
    color: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.22)",
    glow: "rgba(52,211,153,0.15)",
    top: "5%",
    left: "48%",
    delay: 0.48,
    floatDuration: 7,
    floatY: 10,
    Visual: VisualTemplate,
  },
  {
    id: "ai-desc",
    label: "AI Description",
    sub: "Teks profesional otomatis dari AI",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.22)",
    glow: "rgba(167,139,250,0.15)",
    top: "34%",
    left: "10%",
    delay: 0.61,
    floatDuration: 8,
    floatY: 7,
    Visual: VisualAIDesc,
  },
  {
    id: "analyzer",
    label: "Portfolio Analyzer",
    sub: "Skor kelayakan & rekomendasi AI",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.07)",
    border: "rgba(251,191,36,0.22)",
    glow: "rgba(251,191,36,0.15)",
    top: "40%",
    left: "52%",
    delay: 0.74,
    floatDuration: 6.5,
    floatY: 9,
    Visual: VisualAnalyzer,
  },
  {
    id: "cv-parser",
    label: "CV / Resume Parser",
    sub: "Upload CV → profil terisi otomatis",
    color: "#f87171",
    bg: "rgba(248,113,113,0.07)",
    border: "rgba(248,113,113,0.22)",
    glow: "rgba(248,113,113,0.15)",
    top: "73%",
    left: "20%",
    delay: 0.87,
    floatDuration: 7.5,
    floatY: 8,
    Visual: VisualCVParser,
  },
];

const CONNECTIONS: [string, string][] = [
  ["dashboard", "template"],
  ["dashboard", "ai-desc"],
  ["template", "analyzer"],
  ["ai-desc", "cv-parser"],
  ["analyzer", "cv-parser"],
];

const CARD_W = 245;

// ─── Connector Lines ──────────────────────────────────────────────────────────

/** Compute closest edge point between two rects */
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

function ConnectorLines({
  rects,
  containerRect,
  visible,
}: {
  rects: Record<string, DOMRect>;
  containerRect: DOMRect | null;
  visible: boolean;
}) {
  if (!containerRect) return null;

  const lines = CONNECTIONS.map(([a, b]) => {
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

// ─── Feature Card ─────────────────────────────────────────────────────────────

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Record<string, DOMRect>>({});
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [linesReady, setLinesReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current)
        setContainerRect(containerRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRect = useCallback(
    (id: string, rect: DOMRect) => {
      setRects((prev) => {
        const next = { ...prev, [id]: rect };
        if (Object.keys(next).length === CARDS.length && containerRect)
          setLinesReady(true);
        return next;
      });
    },
    [containerRect],
  );

  return (
    <section className="relative mx-auto p-14 min-h-screen flex items-center bg-[#070e1b] overflow-hidden">
      {/* Grid */}
      <div
        className={cn(
          "absolute inset-0 z-0 bg-size-[50px_50px]",
          "[background-image:linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)]",
          "opacity-[0.12]",
        )}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#070e1b] [mask-image:radial-gradient(ellipse_at_center,transparent_50%,black_50%)]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-130 h-130 bg-blue-600/10 blur-[130px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 right-1/5 -translate-y-1/2 w-90 h-90 bg-violet-600/6 blur-[100px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
            <span
              className="text-blue-200 text-xs font-semibold tracking-widest uppercase"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Platform Portfolio Builder untuk Kreator Indonesia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            <LayoutTextFlip
              text="Buat Portfolio Kamu, Tunjukan "
              words={["Pada Mereka", "Karya Terbaikmu", "Potensi Dirimu"]}
              className="text-white mr-2"
              wordClassName="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-[1.05rem] max-w-200 mb-8 leading-[1.75]"
            style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
          >
            Portofy membantu mahasiswa, freelancer, dan kreator Indonesia tampil
            profesional di dunia digital — dengan AI yang nulis, menganalisis,
            dan memberi saran langsung untuk portofoliomu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 cursor-pointer"
            >
              <span>Mulai Gratis</span>
              <IconArrowRight size={18} stroke={2} />
            </HoverBorderGradient>
            <button
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm hover:bg-slate-800/50 transition-all duration-300"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              <IconPlayerPlay size={18} stroke={1.5} />
              Lihat Cara Kerjanya
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-[12px] text-slate-600 tracking-wide"
            style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
          >
            Gratis selamanya · Tidak perlu baris code · Instant publish
          </motion.p>
        </div>

        {/* RIGHT — cards + lines */}
        <div ref={containerRef} className="relative hidden lg:flex h-150">
          <ConnectorLines
            rects={rects}
            containerRect={containerRect}
            visible={linesReady}
          />
          {CARDS.map((card, i) => (
            <FeatureCard
              key={card.id}
              card={card}
              onRect={handleRect}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
