export default function StepCard({
  step,
  title,
  desc,
  icon,
  bg,
  accent,
}: {
  step: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
  bg: string;
  accent: string;
}) {
  return (
    <div
      className="w-full h-full rounded-2xl flex items-center gap-10 px-12 py-8 select-none"
      style={{ background: bg }}
    >
      {/* Left: icon area */}
      <div
        className="shrink-0 size-24 rounded-2xl flex items-center justify-center text-4xl shadow-lg"
        style={{
          backgroundColor: accent + "22",
          border: `1.5px solid ${accent}33`,
        }}
      >
        {icon}
      </div>

      {/* Center: text */}
      <div className="grow min-w-0">
        <div
          className="inline-block text-[11px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full mb-3"
          style={{ backgroundColor: accent + "18", color: accent }}
        >
          Langkah {step}
        </div>
        <h3
          className="text-[26px] font-normal leading-tight tracking-[-0.02em] text-gray-900 mb-2"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title}
        </h3>
        <p className="text-[14px] text-gray-500 leading-relaxed max-w-md">
          {desc}
        </p>
      </div>

      {/* Right: step number */}
      <div
        className="shrink-0 text-[80px] font-bold leading-none tracking-tighter select-none"
        style={{
          color: accent + "18",
          fontFamily: "'Instrument Serif', serif",
        }}
      >
        {step}
      </div>
    </div>
  );
}
