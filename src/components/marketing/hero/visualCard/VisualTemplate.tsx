export function VisualTemplate({ color }: { color: string }) {
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
