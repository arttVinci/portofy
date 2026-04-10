export function VisualAnalyzer({ color }: { color: string }) {
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
