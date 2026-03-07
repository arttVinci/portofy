interface InputLabelProps {
  text: string;
  hint?: string;
}
export default function InputLabel({ text, hint }: InputLabelProps) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {text}
      </span>
      {hint && (
        <span
          className="text-[10px]"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}
