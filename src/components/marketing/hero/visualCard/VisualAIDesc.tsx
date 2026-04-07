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
