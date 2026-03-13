// hooks/useToast.tsx
import { useState, useCallback } from "react";
import Toast from "../../components/auth/Toast";

type ToastVariant = "error" | "warning" | "success" | "info";

interface ToastItem {
  id: number;
  variant: ToastVariant;
  title: string;
  message: string;
}

let uid = 0;

function ToastContainer({
  toasts,
  onRemove,
}: {
  toasts: ToastItem[];
  onRemove: (id: number) => void;
}) {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <Toast key={t.id} item={t} onDone={() => onRemove(t.id)} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback(
    (variant: ToastVariant, title: string, message: string) => {
      const id = uid++;
      setToasts((prev) => [...prev, { id, variant, title, message }]);
    },
    [],
  );

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ✅ Render function — bukan komponen baru, tapi JSX biasa
  const renderToasts = () => (
    <ToastContainer toasts={toasts} onRemove={remove} />
  );

  return { show, renderToasts };
}
