import { useRef } from "react";

export default function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const digits = value.padEnd(6, " ").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newArr = [...digits];

      if (newArr[i] !== " ") {
        newArr[i] = " ";
        onChange(newArr.join("").trim());
      } else if (i > 0) {
        newArr[i - 1] = " ";
        onChange(newArr.join("").trim());
        inputRefs.current[i - 1]?.focus();
      }
    }
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;

    const newArr = [...digits];
    newArr[i] = char;
    onChange(newArr.join("").replace(/ /g, ""));

    if (i < 5) {
      inputRefs.current[i + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData) {
      onChange(pastedData);
      const focusIndex = Math.min(pastedData.length, 5);
      inputRefs.current[focusIndex]?.focus();
    }
  };

  return (
    <div className="flex gap-2 justify-center" onPaste={handlePaste}>
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            inputRefs.current[i] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] === " " ? "" : digits[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          className="size-12 text-center text-[20px] font-bold rounded-xl transition-all duration-150"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: `1.5px solid ${
              digits[i] && digits[i] !== " "
                ? "rgba(255,255,255,0.3)"
                : "rgba(255,255,255,0.1)"
            }`,
            color: "rgba(255,255,255,0.9)",
            outline: "none",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      ))}
    </div>
  );
}
