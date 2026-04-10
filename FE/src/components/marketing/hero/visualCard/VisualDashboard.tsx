export function VisualDashboard({ color }: { color: string }) {
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
