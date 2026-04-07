export function VisualCVParser({ color }: { color: string }) {
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
