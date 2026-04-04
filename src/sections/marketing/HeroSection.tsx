"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";

// ─── Mini Visual Components (SVG per card) ────────────────────────────────────

/** Card 1: Dashboard Builder — sidebar + content blocks */
function VisualDashboard({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 72" className="w-full" style={{ display: "block" }}>
      {/* Browser chrome */}
      <rect
        x="0"
        y="0"
        width="160"
        height="72"
        rx="6"
        fill="rgba(15,23,42,0.6)"
      />
      {/* Top bar */}
      <rect
        x="0"
        y="0"
        width="160"
        height="12"
        rx="6"
        fill="rgba(30,41,59,0.8)"
      />
      <rect x="0" y="6" width="160" height="6" fill="rgba(30,41,59,0.8)" />
      <circle cx="8" cy="6" r="2.2" fill="#f87171" opacity="0.7" />
      <circle cx="15" cy="6" r="2.2" fill="#fbbf24" opacity="0.7" />
      <circle cx="22" cy="6" r="2.2" fill="#34d399" opacity="0.7" />
      {/* Sidebar */}
      <rect x="0" y="12" width="36" height="60" fill="rgba(30,41,59,0.7)" />
      {/* Sidebar items */}
      {[20, 30, 40, 50].map((y, i) => (
        <g key={i}>
          <rect
            x="5"
            y={y}
            width="6"
            height="5"
            rx="1.5"
            fill={i === 0 ? color : "rgba(148,163,184,0.25)"}
          />
          <rect
            x="14"
            y={y + 0.5}
            width="16"
            height="3.5"
            rx="1"
            fill={i === 0 ? `${color}60` : "rgba(148,163,184,0.15)"}
          />
        </g>
      ))}
      {/* Main content area */}
      {/* Stat cards row */}
      {[40, 72, 104].map((x, i) => (
        <rect
          key={i}
          x={x}
          y="16"
          width="26"
          height="16"
          rx="3"
          fill={i === 1 ? `${color}25` : "rgba(51,65,85,0.6)"}
          stroke={i === 1 ? `${color}50` : "transparent"}
          strokeWidth="0.5"
        />
      ))}
      {/* Content blocks */}
      <rect
        x="40"
        y="37"
        width="55"
        height="20"
        rx="3"
        fill="rgba(51,65,85,0.5)"
      />
      <rect x="40" y="39" width="30" height="2.5" rx="1" fill={`${color}50`} />
      <rect
        x="40"
        y="44"
        width="50"
        height="2"
        rx="1"
        fill="rgba(148,163,184,0.2)"
      />
      <rect
        x="40"
        y="48"
        width="40"
        height="2"
        rx="1"
        fill="rgba(148,163,184,0.15)"
      />
      <rect
        x="40"
        y="52"
        width="45"
        height="2"
        rx="1"
        fill="rgba(148,163,184,0.15)"
      />
      {/* Right panel */}
      <rect
        x="100"
        y="37"
        width="56"
        height="20"
        rx="3"
        fill="rgba(51,65,85,0.5)"
      />
      <rect x="104" y="41" width="8" height="12" rx="1.5" fill={`${color}60`} />
      <rect x="115" y="44" width="8" height="9" rx="1.5" fill={`${color}40`} />
      <rect x="126" y="46" width="8" height="7" rx="1.5" fill={`${color}30`} />
      <rect x="137" y="43" width="8" height="10" rx="1.5" fill={`${color}50`} />
    </svg>
  );
}

/** Card 2: Pilih Template — 3 thumbnail cards */
function VisualTemplate({ color }: { color: string }) {
  const templates = [
    { x: 4, selected: false },
    { x: 56, selected: true },
    { x: 108, selected: false },
  ];
  return (
    <svg viewBox="0 0 160 72" className="w-full" style={{ display: "block" }}>
      {templates.map((t, i) => (
        <g key={i}>
          <rect
            x={t.x}
            y="4"
            width="48"
            height="64"
            rx="5"
            fill="rgba(15,23,42,0.7)"
            stroke={t.selected ? color : "rgba(51,65,85,0.6)"}
            strokeWidth={t.selected ? "1.2" : "0.5"}
          />
          {/* Header bar */}
          <rect
            x={t.x}
            y="4"
            width="48"
            height="13"
            rx="5"
            fill={t.selected ? `${color}25` : "rgba(30,41,59,0.8)"}
          />
          <rect
            x={t.x}
            y="11"
            width="48"
            height="6"
            fill={t.selected ? `${color}25` : "rgba(30,41,59,0.8)"}
          />
          {/* Avatar circle */}
          <circle
            cx={t.x + 24}
            cy="28"
            r="8"
            fill={t.selected ? `${color}30` : "rgba(51,65,85,0.6)"}
            stroke={t.selected ? `${color}60` : "rgba(71,85,105,0.5)"}
            strokeWidth="0.8"
          />
          {/* Name line */}
          <rect
            x={t.x + 10}
            y="40"
            width="28"
            height="3"
            rx="1.5"
            fill={t.selected ? `${color}60` : "rgba(100,116,139,0.4)"}
          />
          {/* Sub lines */}
          <rect
            x={t.x + 14}
            y="46"
            width="20"
            height="2"
            rx="1"
            fill="rgba(100,116,139,0.25)"
          />
          {/* Tags */}
          <rect
            x={t.x + 6}
            y="52"
            width="14"
            height="4"
            rx="2"
            fill={t.selected ? `${color}30` : "rgba(51,65,85,0.5)"}
          />
          <rect
            x={t.x + 23}
            y="52"
            width="14"
            height="4"
            rx="2"
            fill={t.selected ? `${color}20` : "rgba(51,65,85,0.4)"}
          />
          {/* Checkmark for selected */}
          {t.selected && (
            <>
              <circle cx={t.x + 38} cy="13" r="5" fill={color} />
              <path
                d={`M${t.x + 35} 13 L${t.x + 37.5} 15.5 L${t.x + 41} 10.5`}
                stroke="white"
                strokeWidth="1.2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}

/** Card 3: AI Description — streaming text lines with cursor */
function VisualAIDesc({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 72" className="w-full" style={{ display: "block" }}>
      {/* Bubble bg */}
      <rect
        x="4"
        y="4"
        width="152"
        height="64"
        rx="8"
        fill="rgba(15,23,42,0.65)"
      />
      {/* AI label */}
      <rect x="10" y="10" width="22" height="8" rx="4" fill={`${color}30`} />
      <text
        x="21"
        y="16.5"
        textAnchor="middle"
        fontSize="4.5"
        fill={color}
        fontFamily="monospace"
        fontWeight="bold"
      >
        AI
      </text>
      {/* Text lines — simulating streamed output */}
      <rect
        x="10"
        y="23"
        width="110"
        height="3"
        rx="1.5"
        fill="rgba(226,232,240,0.55)"
      />
      <rect
        x="10"
        y="29"
        width="130"
        height="3"
        rx="1.5"
        fill="rgba(226,232,240,0.45)"
      />
      <rect
        x="10"
        y="35"
        width="95"
        height="3"
        rx="1.5"
        fill="rgba(226,232,240,0.4)"
      />
      <rect
        x="10"
        y="41"
        width="118"
        height="3"
        rx="1.5"
        fill="rgba(226,232,240,0.35)"
      />
      <rect
        x="10"
        y="47"
        width="72"
        height="3"
        rx="1.5"
        fill="rgba(226,232,240,0.3)"
      />
      {/* Blinking cursor */}
      <rect
        x="85"
        y="47"
        width="1.5"
        height="6"
        rx="0.5"
        fill={color}
        opacity="0.9"
      >
        <animate
          attributeName="opacity"
          values="0.9;0;0.9"
          dur="1.1s"
          repeatCount="indefinite"
        />
      </rect>
      {/* Sparkle dots */}
      <circle cx="148" cy="12" r="2.5" fill={color} opacity="0.8">
        <animate
          attributeName="opacity"
          values="0.8;0.3;0.8"
          dur="1.8s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="142" cy="18" r="1.5" fill={color} opacity="0.5">
        <animate
          attributeName="opacity"
          values="0.5;0.1;0.5"
          dur="2.2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="152" cy="20" r="1" fill={color} opacity="0.4">
        <animate
          attributeName="opacity"
          values="0.4;0.1;0.4"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>
      {/* Bottom send bar */}
      <rect
        x="10"
        y="56"
        width="140"
        height="8"
        rx="4"
        fill="rgba(30,41,59,0.7)"
        stroke={`${color}30`}
        strokeWidth="0.5"
      />
      <rect
        x="14"
        y="59"
        width="60"
        height="2.5"
        rx="1"
        fill="rgba(148,163,184,0.2)"
      />
      <rect
        x="138"
        y="57.5"
        width="9"
        height="5"
        rx="2.5"
        fill={`${color}50`}
      />
    </svg>
  );
}

/** Card 4: Portfolio Analyzer — bar chart + score badge */
function VisualAnalyzer({ color }: { color: string }) {
  const bars = [
    { h: 28, label: "Desain", pct: 88 },
    { h: 20, label: "Konten", pct: 65 },
    { h: 34, label: "Kelengkpn", pct: 92 },
    { h: 16, label: "SEO", pct: 54 },
    { h: 24, label: "Skill", pct: 78 },
  ];
  const baseY = 56;
  return (
    <svg viewBox="0 0 160 72" className="w-full" style={{ display: "block" }}>
      <rect
        x="0"
        y="0"
        width="160"
        height="72"
        rx="6"
        fill="rgba(15,23,42,0.55)"
      />
      {/* Score badge */}
      <circle
        cx="134"
        cy="16"
        r="13"
        fill={`${color}20`}
        stroke={`${color}50`}
        strokeWidth="1"
      />
      <text
        x="134"
        y="14"
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill={color}
        fontFamily="sans-serif"
      >
        92
      </text>
      <text
        x="134"
        y="21"
        textAnchor="middle"
        fontSize="4"
        fill={`${color}90`}
        fontFamily="sans-serif"
      >
        Score
      </text>
      {/* Bars */}
      {bars.map((b, i) => {
        const x = 8 + i * 23;
        const opacity = 0.4 + (b.pct / 100) * 0.6;
        return (
          <g key={i}>
            {/* Track */}
            <rect
              x={x}
              y={baseY - 36}
              width="16"
              height="36"
              rx="3"
              fill="rgba(30,41,59,0.6)"
            />
            {/* Fill */}
            <rect
              x={x}
              y={baseY - b.h}
              width="16"
              height={b.h}
              rx="3"
              fill={color}
              opacity={opacity}
            />
            {/* Pct label */}
            <text
              x={x + 8}
              y={baseY - b.h - 3}
              textAnchor="middle"
              fontSize="4"
              fill={color}
              opacity="0.85"
              fontFamily="sans-serif"
            >
              {b.pct}
            </text>
          </g>
        );
      })}
      {/* Baseline */}
      <line
        x1="6"
        y1={baseY + 1}
        x2="118"
        y2={baseY + 1}
        stroke="rgba(100,116,139,0.3)"
        strokeWidth="0.5"
      />
      {/* Labels */}
      {bars.map((b, i) => (
        <text
          key={i}
          x={8 + i * 23 + 8}
          y={baseY + 6}
          textAnchor="middle"
          fontSize="3.5"
          fill="rgba(148,163,184,0.6)"
          fontFamily="sans-serif"
        >
          {b.label.slice(0, 5)}
        </text>
      ))}
    </svg>
  );
}

/** Card 5: CV Parser — document with highlighted extracted fields */
function VisualCVParser({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 160 72" className="w-full" style={{ display: "block" }}>
      {/* Doc background */}
      <rect
        x="6"
        y="2"
        width="80"
        height="68"
        rx="4"
        fill="rgba(248,250,252,0.06)"
        stroke="rgba(100,116,139,0.25)"
        strokeWidth="0.5"
      />
      {/* Doc lines */}
      <rect
        x="12"
        y="10"
        width="40"
        height="4"
        rx="2"
        fill="rgba(226,232,240,0.5)"
      />
      <rect
        x="12"
        y="17"
        width="60"
        height="2.5"
        rx="1"
        fill="rgba(148,163,184,0.25)"
      />
      <rect
        x="12"
        y="22"
        width="55"
        height="2.5"
        rx="1"
        fill="rgba(148,163,184,0.2)"
      />
      <rect
        x="12"
        y="27"
        width="50"
        height="2.5"
        rx="1"
        fill="rgba(148,163,184,0.2)"
      />
      {/* Highlighted rows = extracted data */}
      <rect
        x="10"
        y="34"
        width="70"
        height="6"
        rx="2"
        fill={`${color}18`}
        stroke={`${color}40`}
        strokeWidth="0.5"
      />
      <rect x="12" y="36" width="42" height="2" rx="1" fill={`${color}70`} />
      <rect
        x="10"
        y="43"
        width="70"
        height="6"
        rx="2"
        fill={`${color}12`}
        stroke={`${color}30`}
        strokeWidth="0.5"
      />
      <rect x="12" y="45" width="35" height="2" rx="1" fill={`${color}55`} />
      <rect
        x="10"
        y="52"
        width="70"
        height="6"
        rx="2"
        fill={`${color}10`}
        stroke={`${color}25`}
        strokeWidth="0.5"
      />
      <rect x="12" y="54" width="50" height="2" rx="1" fill={`${color}45`} />
      {/* Arrow */}
      <path
        d="M92 36 L104 36"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="2 2"
        markerEnd="url(#arr)"
        opacity="0.7"
      />
      <path
        d="M92 46 L104 46"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="2 2"
        markerEnd="url(#arr)"
        opacity="0.55"
      />
      <path
        d="M92 55 L104 55"
        stroke={color}
        strokeWidth="1.2"
        strokeDasharray="2 2"
        markerEnd="url(#arr)"
        opacity="0.4"
      />
      <defs>
        <marker
          id="arr"
          viewBox="0 0 6 6"
          refX="5"
          refY="3"
          markerWidth="4"
          markerHeight="4"
          orient="auto"
        >
          <path
            d="M0 1 L5 3 L0 5"
            fill="none"
            stroke={color}
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </marker>
      </defs>
      {/* Output mini profile card */}
      <rect
        x="104"
        y="26"
        width="50"
        height="44"
        rx="4"
        fill="rgba(15,23,42,0.8)"
        stroke={`${color}35`}
        strokeWidth="0.6"
      />
      <circle
        cx="129"
        cy="38"
        r="7"
        fill={`${color}25`}
        stroke={`${color}50`}
        strokeWidth="0.8"
      />
      {/* Person silhouette */}
      <circle cx="129" cy="36" r="2.5" fill={color} opacity="0.7" />
      <path d="M123 43 Q129 40 135 43" fill={color} opacity="0.4" />
      <rect x="111" y="48" width="36" height="2" rx="1" fill={`${color}50`} />
      <rect
        x="115"
        y="53"
        width="28"
        height="1.5"
        rx="1"
        fill="rgba(148,163,184,0.3)"
      />
      {/* Tags */}
      <rect x="109" y="58" width="14" height="4" rx="2" fill={`${color}25`} />
      <rect x="125" y="58" width="14" height="4" rx="2" fill={`${color}18`} />
      <rect x="141" y="58" width="10" height="4" rx="2" fill={`${color}12`} />
    </svg>
  );
}

// ─── Card config ──────────────────────────────────────────────────────────────

const CARDS = [
  {
    id: "dashboard",
    label: "Dashboard Builder",
    sub: "Atur semua konten portofoliomu",
    color: "#60a5fa",
    bg: "rgba(59,130,246,0.07)",
    border: "rgba(96,165,250,0.22)",
    top: "2%",
    left: "3%",
    delay: 0.35,
    Visual: VisualDashboard,
  },
  {
    id: "template",
    label: "Pilih Template",
    sub: "30+ template modern & responsif",
    color: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.22)",
    top: "4%",
    left: "53%",
    delay: 0.48,
    Visual: VisualTemplate,
  },
  {
    id: "ai-desc",
    label: "AI Description",
    sub: "Teks profesional otomatis dari AI",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.22)",
    top: "42%",
    left: "0%",
    delay: 0.61,
    Visual: VisualAIDesc,
  },
  {
    id: "analyzer",
    label: "Portfolio Analyzer",
    sub: "Skor kelayakan & rekomendasi AI",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.07)",
    border: "rgba(251,191,36,0.22)",
    top: "43%",
    left: "53%",
    delay: 0.74,
    Visual: VisualAnalyzer,
  },
  {
    id: "cv-parser",
    label: "CV / Resume Parser",
    sub: "Upload CV → profil terisi otomatis",
    color: "#f87171",
    bg: "rgba(248,113,113,0.07)",
    border: "rgba(248,113,113,0.22)",
    top: "78%",
    left: "22%",
    delay: 0.87,
    Visual: VisualCVParser,
  },
];

const CONNECTIONS: [string, string][] = [
  ["dashboard", "template"],
  ["dashboard", "ai-desc"],
  ["template", "analyzer"],
  ["ai-desc", "cv-parser"],
  ["analyzer", "cv-parser"],
  ["dashboard", "cv-parser"],
];

const CARD_W = 210;

// ─── Connector Lines ──────────────────────────────────────────────────────────

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
    const ax = ra.left + ra.width / 2 - containerRect.left;
    const ay = ra.top + ra.height / 2 - containerRect.top;
    const bx = rb.left + rb.width / 2 - containerRect.left;
    const by = rb.top + rb.height / 2 - containerRect.top;
    const mx = (ax + bx) / 2;
    const my = (ay + by) / 2 - 24;
    return { id: `${a}-${b}`, d: `M ${ax} ${ay} Q ${mx} ${my} ${bx} ${by}` };
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

function FeatureCard({
  card,
  onRect,
}: {
  card: (typeof CARDS)[0];
  onRect: (id: string, rect: DOMRect) => void;
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

  return (
    <motion.div
      ref={ref}
      className="absolute"
      style={{ top: card.top, left: card.left, width: CARD_W }}
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: card.delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.04, y: -3, transition: { duration: 0.18 } }}
    >
      <div
        className="relative rounded-2xl overflow-hidden cursor-default select-none"
        style={{
          background: card.bg,
          border: `1px solid ${card.border}`,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow: `0 4px 28px ${card.color}18, inset 0 1px 0 rgba(255,255,255,0.055)`,
        }}
      >
        {/* Corner glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(100px circle at 10% 10%, ${card.color}12, transparent)`,
          }}
        />

        {/* Mini visual */}
        <div className="relative px-3 pt-3 pb-1">
          <Visual color={card.color} />
        </div>

        {/* Bottom label row */}
        <div
          className="relative flex items-center justify-between px-3.5 py-2.5 border-t"
          style={{ borderColor: `${card.border}` }}
        >
          <div>
            <p
              className="text-[12.5px] font-semibold leading-tight text-slate-100"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              {card.label}
            </p>
            <p
              className="text-[10.5px] leading-snug mt-0.5 text-slate-500"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              {card.sub}
            </p>
          </div>
          {/* Status dot */}
          <span
            className="shrink-0 w-2 h-2 rounded-full animate-pulse ml-2"
            style={{
              background: card.color,
              boxShadow: `0 0 8px ${card.color}`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

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

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
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
            Buat Portfolio Kamu,
            <br className="hidden md:block" />
            Tunjukan{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300">
              Karya Terbaikmu
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-[1.05rem] max-w-125 mb-8 leading-[1.75]"
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
            <a
              href="/auth/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Mulai Gratis <IconArrowRight size={18} stroke={2} />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm hover:bg-slate-800/50 transition-all duration-300"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              <IconPlayerPlay size={18} stroke={1.5} /> Cara Kerja
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-[12px] text-slate-600 tracking-wide"
            style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
          >
            Gratis selamanya · Tidak perlu kartu kredit · Subdomain instan
          </motion.p>
        </div>

        {/* RIGHT — cards + lines */}
        <div ref={containerRef} className="relative hidden lg:flex h-140">
          <ConnectorLines
            rects={rects}
            containerRect={containerRect}
            visible={linesReady}
          />
          {CARDS.map((card) => (
            <FeatureCard key={card.id} card={card} onRect={handleRect} />
          ))}
        </div>
      </div>
    </section>
  );
}
