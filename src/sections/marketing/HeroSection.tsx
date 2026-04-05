import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

// ─── Mini Visual Components (SVG per card) ────────────────────────────────────

/** Card 1: Dashboard Builder — styled card with sidebar + content blocks */
function VisualDashboard({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="w-full" style={{ display: "block" }}>
      {/* Header Section: Icon + Title */}
      <g>
        {/* Icon Background */}
        <rect x="20" y="20" width="46" height="46" rx="14" fill={color} />
        {/* Grid/Dashboard Icon */}
        <rect
          x="31"
          y="31"
          width="10"
          height="10"
          rx="2"
          fill="#FFFFFF"
          opacity="0.9"
        />
        <rect
          x="44"
          y="31"
          width="10"
          height="10"
          rx="2"
          fill="#FFFFFF"
          opacity="0.7"
        />
        <rect
          x="31"
          y="44"
          width="10"
          height="10"
          rx="2"
          fill="#FFFFFF"
          opacity="0.7"
        />
        <rect
          x="44"
          y="44"
          width="10"
          height="10"
          rx="2"
          fill="#FFFFFF"
          opacity="0.5"
        />

        {/* Title */}
        <text
          x="80"
          y="38"
          fontSize="18"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          Dashboard Builder
        </text>
        {/* Subtitle */}
        <text
          x="80"
          y="58"
          fontSize="12"
          fill="#94A3B8"
          fontFamily="sans-serif"
        >
          Atur semua konten portofoliomu
        </text>
      </g>

      {/* Browser Window Visual */}
      <g>
        <rect
          x="20"
          y="80"
          width="280"
          height="95"
          rx="8"
          fill="#0B1628"
          stroke={`${color}30`}
          strokeWidth="0.8"
        />
        {/* Top bar */}
        <rect x="20" y="80" width="280" height="18" rx="8" fill="#131F37" />
        <rect x="20" y="90" width="280" height="8" fill="#131F37" />
        <circle cx="34" cy="89" r="3" fill="#f87171" opacity="0.7" />
        <circle cx="44" cy="89" r="3" fill="#fbbf24" opacity="0.7" />
        <circle cx="54" cy="89" r="3" fill="#34d399" opacity="0.7" />
        {/* URL Bar */}
        <rect
          x="66"
          y="85"
          width="120"
          height="8"
          rx="4"
          fill="rgba(30,41,59,0.8)"
        />
        <text
          x="80"
          y="91.5"
          fontSize="5"
          fill="#64748B"
          fontFamily="sans-serif"
        >
          portof.id/dashboard
        </text>

        {/* Sidebar */}
        <rect x="20" y="98" width="56" height="77" fill="rgba(19,31,55,0.9)" />
        {/* Sidebar navigation items */}
        {[106, 118, 130, 142, 154].map((y, i) => (
          <g key={i}>
            <rect
              x="28"
              y={y}
              width="8"
              height="7"
              rx="2"
              fill={i === 0 ? color : "rgba(148,163,184,0.2)"}
            />
            <rect
              x="40"
              y={y + 1}
              width="28"
              height="5"
              rx="1.5"
              fill={i === 0 ? `${color}50` : "rgba(148,163,184,0.12)"}
            />
          </g>
        ))}

        {/* Main content — Stat cards */}
        {[
          { x: 84, w: 56 },
          { x: 146, w: 56 },
          { x: 208, w: 56 },
        ].map((s, i) => (
          <g key={i}>
            <rect
              x={s.x}
              y="104"
              width={s.w}
              height="28"
              rx="5"
              fill={i === 1 ? `${color}15` : "rgba(30,41,59,0.7)"}
              stroke={i === 1 ? `${color}40` : "rgba(51,65,85,0.4)"}
              strokeWidth="0.5"
            />
            <rect
              x={s.x + 6}
              y="110"
              width="24"
              height="4"
              rx="1.5"
              fill={i === 1 ? `${color}70` : "rgba(148,163,184,0.3)"}
            />
            <rect
              x={s.x + 6}
              y="118"
              width="16"
              height="8"
              rx="1.5"
              fill={i === 1 ? `${color}40` : "rgba(148,163,184,0.15)"}
            />
          </g>
        ))}

        {/* Content block */}
        <rect
          x="84"
          y="138"
          width="90"
          height="32"
          rx="5"
          fill="rgba(30,41,59,0.6)"
        />
        <rect
          x="90"
          y="144"
          width="50"
          height="4"
          rx="1.5"
          fill={`${color}50`}
        />
        <rect
          x="90"
          y="151"
          width="76"
          height="3"
          rx="1"
          fill="rgba(148,163,184,0.2)"
        />
        <rect
          x="90"
          y="157"
          width="60"
          height="3"
          rx="1"
          fill="rgba(148,163,184,0.15)"
        />
        <rect
          x="90"
          y="163"
          width="68"
          height="3"
          rx="1"
          fill="rgba(148,163,184,0.12)"
        />

        {/* Chart block */}
        <rect
          x="180"
          y="138"
          width="84"
          height="32"
          rx="5"
          fill="rgba(30,41,59,0.6)"
        />
        {/* Mini bar chart */}
        {[190, 202, 214, 226, 238].map((bx, i) => {
          const h = [16, 12, 22, 10, 18][i];
          return (
            <rect
              key={i}
              x={bx}
              y={170 - h}
              width="8"
              height={h}
              rx="2"
              fill={color}
              opacity={0.3 + i * 0.12}
            />
          );
        })}
      </g>

      {/* Animated pulse dot on active sidebar item */}
      <circle cx="32" cy="109.5" r="1.5" fill={color}>
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/** Card 2: Pilih Template — styled card with 3 thumbnail templates */
function VisualTemplate({ color }: { color: string }) {
  const templates = [
    { x: 20, selected: false },
    { x: 118, selected: true },
    { x: 216, selected: false },
  ];
  return (
    <svg viewBox="0 0 320 190" className="w-full" style={{ display: "block" }}>
      {/* Header Section: Icon + Title */}
      <g>
        {/* Icon Background */}
        <rect x="20" y="20" width="46" height="46" rx="14" fill={color} />
        {/* Layout/Template Icon */}
        <rect
          x="31"
          y="32"
          width="24"
          height="22"
          rx="3"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
        />
        <line
          x1="31"
          y1="42"
          x2="55"
          y2="42"
          stroke="#FFFFFF"
          strokeWidth="2"
        />
        <line
          x1="43"
          y1="42"
          x2="43"
          y2="54"
          stroke="#FFFFFF"
          strokeWidth="2"
        />

        {/* Title */}
        <text
          x="80"
          y="38"
          fontSize="18"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          Pilih Template
        </text>
        {/* Subtitle */}
        <text
          x="80"
          y="58"
          fontSize="12"
          fill="#94A3B8"
          fontFamily="sans-serif"
        >
          10+ template modern & responsif
        </text>
      </g>

      {/* Template Cards Row */}
      <g>
        {templates.map((t, i) => (
          <g key={i}>
            {/* Card container */}
            <rect
              x={t.x}
              y="80"
              width="82"
              height="100"
              rx="8"
              fill="#0B1628"
              stroke={t.selected ? color : "rgba(51,65,85,0.5)"}
              strokeWidth={t.selected ? "1.5" : "0.6"}
            />
            {/* Header band */}
            <rect
              x={t.x}
              y="80"
              width="82"
              height="20"
              rx="8"
              fill={t.selected ? `${color}25` : "#131F37"}
            />
            <rect
              x={t.x}
              y="92"
              width="82"
              height="8"
              fill={t.selected ? `${color}25` : "#131F37"}
            />
            {/* Avatar */}
            <circle
              cx={t.x + 41}
              cy="118"
              r="12"
              fill={t.selected ? `${color}25` : "rgba(51,65,85,0.5)"}
              stroke={t.selected ? `${color}60` : "rgba(71,85,105,0.4)"}
              strokeWidth="1"
            />
            {/* Person icon in avatar */}
            <circle
              cx={t.x + 41}
              cy="115"
              r="4"
              fill={t.selected ? `${color}80` : "rgba(148,163,184,0.3)"}
            />
            <path
              d={`M${t.x + 33} 126 Q${t.x + 41} 122 ${t.x + 49} 126`}
              fill={t.selected ? `${color}50` : "rgba(148,163,184,0.2)"}
            />
            {/* Name line */}
            <rect
              x={t.x + 16}
              y="137"
              width="50"
              height="4"
              rx="2"
              fill={t.selected ? `${color}60` : "rgba(100,116,139,0.3)"}
            />
            {/* Sub line */}
            <rect
              x={t.x + 22}
              y="145"
              width="38"
              height="3"
              rx="1.5"
              fill="rgba(100,116,139,0.2)"
            />
            {/* Tags */}
            <rect
              x={t.x + 10}
              y="153"
              width="26"
              height="6"
              rx="3"
              fill={t.selected ? `${color}25` : "rgba(51,65,85,0.4)"}
            />
            <rect
              x={t.x + 40}
              y="153"
              width="26"
              height="6"
              rx="3"
              fill={t.selected ? `${color}18` : "rgba(51,65,85,0.3)"}
            />
            {/* Checkmark for selected */}
            {t.selected && (
              <>
                <circle cx={t.x + 66} cy="91" r="8" fill={color} />
                <path
                  d={`M${t.x + 62} 91 L${t.x + 65} 94 L${t.x + 70} 88`}
                  stroke="white"
                  strokeWidth="1.8"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Glow ring around selected */}
                <rect
                  x={t.x - 1}
                  y="79"
                  width="84"
                  height="102"
                  rx="9"
                  fill="none"
                  stroke={color}
                  strokeWidth="0.5"
                  opacity="0.4"
                >
                  <animate
                    attributeName="opacity"
                    values="0.4;0.15;0.4"
                    dur="2.5s"
                    repeatCount="indefinite"
                  />
                </rect>
              </>
            )}
          </g>
        ))}
      </g>
    </svg>
  );
}

/** Card 3: AI Description — Hardcoded Text */
export function VisualAIDesc({ color = "#3B82F6" }: { color?: string }) {
  return (
    <svg viewBox="0 0 320 190" className="w-full" style={{ display: "block" }}>
      {/* Top Section: AI Icon & Status */}
      <g>
        {/* Robot Icon Background */}
        <rect x="20" y="20" width="46" height="46" rx="14" fill={color} />

        {/* Robot Head & Details */}
        <circle cx="43" cy="32" r="1.5" fill="#FFFFFF" />
        <rect x="42" y="34" width="2" height="4" fill="#FFFFFF" />
        <rect
          x="31"
          y="38"
          width="24"
          height="16"
          rx="4"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          fill="none"
        />
        {/* Ears */}
        <rect x="28" y="43" width="3" height="6" rx="1.5" fill="#FFFFFF" />
        <rect x="55" y="43" width="3" height="6" rx="1.5" fill="#FFFFFF" />
        {/* Eyes & Mouth */}
        <circle cx="37" cy="45" r="1.5" fill="#FFFFFF" />
        <circle cx="49" cy="45" r="1.5" fill="#FFFFFF" />
        <rect x="40" y="49" width="6" height="1.5" rx="0.5" fill="#FFFFFF" />

        {/* Hardcoded Text: Title & Subtitle */}
        <text
          x="80"
          y="38"
          fontSize="18"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          AI Description
        </text>
        <text
          x="80"
          y="58"
          fontSize="12"
          fill="#94A3B8"
          fontFamily="sans-serif"
        >
          Teks profesional otomatis dari AI
        </text>
      </g>

      {/* Chat Bubble Component */}
      <g>
        {/* Dark Box for Prompt */}
        <rect x="20" y="85" width="280" height="56" rx="10" fill="#131F37" />

        {/* Prompt Text */}
        <text
          x="35"
          y="108"
          fontSize="14"
          fill="#E2E8F0"
          fontFamily="sans-serif"
        >
          "Rangkum deskripsi ini
        </text>
      </g>

      {/* Bottom Section: Processing & Progress Bar */}
      <g>
        {/* Sparkle Icon */}
        <path
          d="M 28 152 Q 28 158 22 158 Q 28 158 28 164 Q 28 158 34 158 Q 28 158 28 152"
          fill="#60A5FA"
        >
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="1.5s"
            repeatCount="indefinite"
          />
        </path>
        <path
          d="M 36 150 Q 36 153 33 153 Q 36 153 36 156 Q 36 153 39 153 Q 36 153 36 150"
          fill="#60A5FA"
          opacity="0.8"
        />

        {/* "Memproses..." Text */}
        <text
          x="45"
          y="162"
          fontSize="14"
          fill="#60A5FA"
          fontFamily="sans-serif"
          fontWeight="500"
        >
          Memproses...
        </text>

        {/* Progress Bar Background */}
        <rect x="22" y="174" width="278" height="6" rx="3" fill="#1E293B" />

        {/* Animated Progress Bar Fill */}
        <rect x="22" y="174" width="80" height="6" rx="3" fill={color}>
          <animate
            attributeName="width"
            values="20; 150; 270"
            keyTimes="0; 0.6; 1"
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  );
}

/** Card 4: Portfolio Analyzer — styled card with bar chart + score badge */
function VisualAnalyzer({ color }: { color: string }) {
  const bars = [
    { h: 55, label: "Desain", pct: 88 },
    { h: 40, label: "Konten", pct: 65 },
    { h: 62, label: "Lengkap", pct: 92 },
    { h: 32, label: "SEO", pct: 54 },
    { h: 48, label: "Skill", pct: 78 },
  ];
  const baseY = 168;
  return (
    <svg viewBox="0 0 320 190" className="w-full" style={{ display: "block" }}>
      {/* Header Section: Icon + Title */}
      <g>
        {/* Icon Background */}
        <rect x="20" y="20" width="46" height="46" rx="14" fill={color} />
        {/* Chart/Analyzer Icon */}
        <rect
          x="31"
          y="52"
          width="6"
          height="12"
          rx="2"
          fill="#FFFFFF"
          opacity="0.7"
          transform="rotate(180 34 52)"
        />
        <rect
          x="39"
          y="52"
          width="6"
          height="18"
          rx="2"
          fill="#FFFFFF"
          opacity="0.85"
          transform="rotate(180 42 52)"
        />
        <rect
          x="47"
          y="52"
          width="6"
          height="8"
          rx="2"
          fill="#FFFFFF"
          opacity="0.6"
          transform="rotate(180 50 52)"
        />
        {/* Magnifier circle */}
        <circle
          cx="50"
          cy="34"
          r="5"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          fill="none"
          opacity="0.7"
        />
        <line
          x1="54"
          y1="38"
          x2="57"
          y2="41"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          opacity="0.7"
          strokeLinecap="round"
        />

        {/* Title */}
        <text
          x="80"
          y="38"
          fontSize="18"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          Portfolio Analyzer
        </text>
        {/* Subtitle */}
        <text
          x="80"
          y="58"
          fontSize="12"
          fill="#94A3B8"
          fontFamily="sans-serif"
        >
          Skor kelayakan & rekomendasi AI
        </text>
      </g>

      {/* Score Badge - top right */}
      <g>
        <circle
          cx="270"
          cy="40"
          r="24"
          fill={`${color}15`}
          stroke={`${color}40`}
          strokeWidth="1.5"
        />
        <circle
          cx="270"
          cy="40"
          r="18"
          fill={`${color}10`}
          stroke={`${color}30`}
          strokeWidth="1"
        />
        <text
          x="270"
          y="36"
          textAnchor="middle"
          fontSize="16"
          fontWeight="bold"
          fill={color}
          fontFamily="sans-serif"
        >
          92
        </text>
        <text
          x="270"
          y="50"
          textAnchor="middle"
          fontSize="9"
          fill={`${color}90`}
          fontFamily="sans-serif"
        >
          Score
        </text>
        {/* Animated ring */}
        <circle
          cx="270"
          cy="40"
          r="24"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.3"
        >
          <animate
            attributeName="r"
            values="24;28;24"
            dur="3s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="opacity"
            values="0.3;0.08;0.3"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </g>

      {/* Chart Area */}
      <g>
        <rect
          x="20"
          y="80"
          width="280"
          height="100"
          rx="8"
          fill="#0B1628"
          stroke={`${color}20`}
          strokeWidth="0.6"
        />

        {/* Bars */}
        {bars.map((b, i) => {
          const x = 36 + i * 52;
          const opacity = 0.4 + (b.pct / 100) * 0.6;
          return (
            <g key={i}>
              {/* Track */}
              <rect
                x={x}
                y={baseY - 70}
                width="28"
                height="70"
                rx="5"
                fill="rgba(30,41,59,0.6)"
              />
              {/* Fill */}
              <rect
                x={x}
                y={baseY - b.h}
                width="28"
                height={b.h}
                rx="5"
                fill={color}
                opacity={opacity}
              />
              {/* Pct label */}
              <text
                x={x + 14}
                y={baseY - b.h - 5}
                textAnchor="middle"
                fontSize="9"
                fill={color}
                opacity="0.9"
                fontFamily="sans-serif"
                fontWeight="500"
              >
                {b.pct}%
              </text>
              {/* Category label */}
              <text
                x={x + 14}
                y={baseY + 12}
                textAnchor="middle"
                fontSize="8"
                fill="rgba(148,163,184,0.6)"
                fontFamily="sans-serif"
              >
                {b.label}
              </text>
            </g>
          );
        })}
        {/* Baseline */}
        <line
          x1="28"
          y1={baseY + 1}
          x2="292"
          y2={baseY + 1}
          stroke="rgba(100,116,139,0.25)"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

/** Card 5: CV Parser — styled card with document extraction visual */
function VisualCVParser({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 320 190" className="w-full" style={{ display: "block" }}>
      {/* Header Section: Icon + Title */}
      <g>
        {/* Icon Background */}
        <rect x="20" y="20" width="46" height="46" rx="14" fill={color} />
        {/* Document/Upload Icon */}
        <rect
          x="32"
          y="31"
          width="18"
          height="24"
          rx="3"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          fill="none"
        />
        <path
          d="M37 31 L37 36 L32 36"
          stroke="#FFFFFF"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        {/* Lines inside doc */}
        <rect
          x="36"
          y="39"
          width="10"
          height="2"
          rx="1"
          fill="#FFFFFF"
          opacity="0.6"
        />
        <rect
          x="36"
          y="43"
          width="8"
          height="2"
          rx="1"
          fill="#FFFFFF"
          opacity="0.4"
        />
        <rect
          x="36"
          y="47"
          width="12"
          height="2"
          rx="1"
          fill="#FFFFFF"
          opacity="0.3"
        />
        {/* Upload arrow */}
        <path
          d="M53 50 L53 38 L49 42 M53 38 L57 42"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />

        {/* Title */}
        <text
          x="80"
          y="38"
          fontSize="18"
          fill="#FFFFFF"
          fontFamily="sans-serif"
          fontWeight="bold"
        >
          CV / Resume Parser
        </text>
        {/* Subtitle */}
        <text
          x="80"
          y="58"
          fontSize="12"
          fill="#94A3B8"
          fontFamily="sans-serif"
        >
          Upload CV → profil terisi otomatis
        </text>
      </g>

      {/* Main Content: Document → Profile */}
      <g>
        {/* Document side */}
        <rect
          x="20"
          y="82"
          width="120"
          height="98"
          rx="8"
          fill="#0B1628"
          stroke="rgba(100,116,139,0.25)"
          strokeWidth="0.8"
        />
        {/* Doc title */}
        <rect
          x="30"
          y="92"
          width="64"
          height="6"
          rx="3"
          fill="rgba(226,232,240,0.4)"
        />
        {/* Doc body lines */}
        <rect
          x="30"
          y="104"
          width="100"
          height="4"
          rx="1.5"
          fill="rgba(148,163,184,0.2)"
        />
        <rect
          x="30"
          y="112"
          width="90"
          height="4"
          rx="1.5"
          fill="rgba(148,163,184,0.15)"
        />
        {/* Highlighted extracted rows */}
        <rect
          x="26"
          y="122"
          width="108"
          height="10"
          rx="4"
          fill={`${color}12`}
          stroke={`${color}35`}
          strokeWidth="0.6"
        />
        <rect
          x="30"
          y="125"
          width="70"
          height="4"
          rx="1.5"
          fill={`${color}60`}
        />
        <rect
          x="26"
          y="136"
          width="108"
          height="10"
          rx="4"
          fill={`${color}08`}
          stroke={`${color}25`}
          strokeWidth="0.6"
        />
        <rect
          x="30"
          y="139"
          width="58"
          height="4"
          rx="1.5"
          fill={`${color}45`}
        />
        <rect
          x="26"
          y="150"
          width="108"
          height="10"
          rx="4"
          fill={`${color}06`}
          stroke={`${color}20`}
          strokeWidth="0.6"
        />
        <rect
          x="30"
          y="153"
          width="80"
          height="4"
          rx="1.5"
          fill={`${color}35`}
        />

        {/* Dashed arrows */}
        <defs>
          <marker
            id="cvArr"
            viewBox="0 0 8 8"
            refX="7"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto"
          >
            <path
              d="M0 1.5 L7 4 L0 6.5"
              fill="none"
              stroke={color}
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </marker>
        </defs>
        <path
          d="M148 127 L170 127"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#cvArr)"
          opacity="0.7"
        />
        <path
          d="M148 141 L170 141"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#cvArr)"
          opacity="0.5"
        />
        <path
          d="M148 155 L170 155"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="4 3"
          markerEnd="url(#cvArr)"
          opacity="0.35"
        />

        {/* Output profile card */}
        <rect
          x="178"
          y="82"
          width="122"
          height="98"
          rx="8"
          fill="#0B1628"
          stroke={`${color}30`}
          strokeWidth="0.8"
        />
        {/* Avatar */}
        <circle
          cx="239"
          cy="108"
          r="16"
          fill={`${color}18`}
          stroke={`${color}45`}
          strokeWidth="1"
        />
        <circle cx="239" cy="104" r="5.5" fill={color} opacity="0.65" />
        <path d="M228 118 Q239 112 250 118" fill={color} opacity="0.3" />
        {/* Name */}
        <rect
          x="206"
          y="130"
          width="66"
          height="5"
          rx="2"
          fill={`${color}55`}
        />
        {/* Role */}
        <rect
          x="214"
          y="140"
          width="50"
          height="3.5"
          rx="1.5"
          fill="rgba(148,163,184,0.3)"
        />
        {/* Skill tags */}
        <rect
          x="192"
          y="150"
          width="28"
          height="7"
          rx="3.5"
          fill={`${color}22`}
        />
        <rect
          x="224"
          y="150"
          width="28"
          height="7"
          rx="3.5"
          fill={`${color}15`}
        />
        <rect
          x="256"
          y="150"
          width="22"
          height="7"
          rx="3.5"
          fill={`${color}10`}
        />
        {/* Status indicator */}
        <rect x="192" y="164" width="94" height="8" rx="4" fill="#131F37" />
        <rect
          x="192"
          y="164"
          width="60"
          height="8"
          rx="4"
          fill={color}
          opacity="0.6"
        >
          <animate
            attributeName="width"
            values="20;70;94"
            dur="3.5s"
            repeatCount="indefinite"
          />
        </rect>
      </g>

      {/* Sparkle near arrow */}
      <path
        d="M 162 120 Q 162 125 157 125 Q 162 125 162 130 Q 162 125 167 125 Q 162 125 162 120"
        fill={color}
        opacity="0.6"
      >
        <animate
          attributeName="opacity"
          values="0.6;1;0.6"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </path>
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

function FeatureCard({
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
