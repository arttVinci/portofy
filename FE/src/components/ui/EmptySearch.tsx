import { motion } from "framer-motion";

// 1. Props-nya jauh lebih bersih!
interface EmptyStateProps {
  title: string;
  description: string;
  actionText: string;
  onAction: () => void; // 🔥 Bapaknya yang bakal ngatur logic-nya!
}

export default function EmptyState({
  title,
  description,
  actionText,
  onAction,
}: EmptyStateProps) {
  return (
    <motion.div
      key="empty"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-20"
    >
      <p className="text-[32px] mb-3">🔍</p>
      <p
        className="text-[15px] font-medium mb-1"
        style={{ color: "rgba(255,255,255,0.5)" }}
      >
        {title}
      </p>
      <p className="text-[13px]" style={{ color: "rgba(255,255,255,0.25)" }}>
        {description}
      </p>

      <button
        onClick={onAction} // 🔥 UI cuma tau "Kalo diklik, panggil fungsi ini"
        className="mt-4 px-4 py-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all duration-150"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          color: "rgba(255,255,255,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {actionText}
      </button>
    </motion.div>
  );
}
