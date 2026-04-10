import { motion } from "framer-motion";
import { useState } from "react";

export default function CvUpload({
  file,
  onFile,
  onClear,
}: {
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const [drag, setDrag] = useState(false);

  if (file) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="size-12 rounded-xl flex items-center justify-center mb-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 2a1 1 0 0 1 1-1h6l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2z"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M9 1v4h4"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M5 9h6M5 11.5h4"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p
          className="text-[12px] font-semibold mb-1 max-w-35 truncate"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          {file.name}
        </p>
        <div className="flex items-center gap-1 mb-4">
          <span className="size-1.5 rounded-full bg-white opacity-50 animate-pulse inline-block" />
          <span
            className="text-[10px] font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Siap diproses AI
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-medium cursor-pointer transition-colors duration-150"
          style={{ color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.25)")
          }
        >
          Change file
        </button>
      </motion.div>
    );
  }

  return (
    <label
      className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl cursor-pointer transition-all duration-200"
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) onFile(f);
      }}
      style={{
        backgroundColor: drag
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        border: `1.5px dashed ${drag ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 12,
        transition: "all 0.2s",
        minHeight: 220,
      }}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <div
        className="size-10 rounded-xl flex items-center justify-center mb-3"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 11V3M8 3L5 6M8 3l3 3"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p
        className="text-[13px] font-semibold mb-1"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        Upload CV
      </p>
      <p
        className="text-[11px] leading-relaxed mb-3"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        AI automatically fills in the form from your CV
      </p>
      <div
        className="px-3 py-1.5 rounded-full mb-2"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span
          className="text-[10px] font-medium"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Click or drag here
        </span>
      </div>
      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
        PDF, DOC, DOCX · maks. 5MB
      </p>
    </label>
  );
}
