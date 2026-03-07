import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = value.slice(0, -1);
      onChange(next);
      if (i > 0) refs[i - 1].current?.focus();
    }
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const arr = digits.map((d, idx) => (idx === i ? char : d));
    const joined = arr.join("").replace(/ /g, "");
    onChange(joined);
    if (i < 5) refs[i + 1].current?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d === " " ? "" : d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          className="size-12 text-center text-[20px] font-bold rounded-xl transition-all duration-150"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: `1.5px solid ${d && d !== " " ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
            color: "rgba(255,255,255,0.9)",
            outline: "none",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      ))}
    </div>
  );
}
