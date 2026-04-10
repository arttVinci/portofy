import { useState, useEffect } from "react";

type ToastVariant = "error" | "warning" | "success" | "info";

interface ToastItem {
  id: number;
  variant: ToastVariant;
  title: string;
  message: string;
}

const colorMap: Record<ToastVariant, string> = {
  error: "#f87171",
  warning: "#fbbf24",
  success: "#4ade80",
  info: "#60a5fa",
};

export default function Toast({
  item,
  onDone,
}: {
  item: ToastItem;
  onDone: () => void;
}) {
  const [out, setOut] = useState(false);
  const color = colorMap[item.variant];

  useEffect(() => {
    const t = setTimeout(() => setOut(true), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes toastIn  { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes toastOut { from { opacity:1; transform:translateY(0); }   to { opacity:0; transform:translateY(-6px); } }
      `}</style>
      <div
        onAnimationEnd={() => {
          if (out) onDone();
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 9,
          padding: "10px 14px",
          borderRadius: 10,
          background: "#18181f",
          border: "0.5px solid rgba(255,255,255,0.09)",
          fontSize: 12,
          fontFamily: "'Inter', sans-serif",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          animation: out
            ? "toastOut 0.35s ease forwards"
            : "toastIn 0.3s ease forwards",
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: color,
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: 500, color, marginRight: 3 }}>
          {item.title}
        </span>
        <span style={{ color: "rgba(255,255,255,0.35)" }}>{item.message}</span>
      </div>
    </>
  );
}
