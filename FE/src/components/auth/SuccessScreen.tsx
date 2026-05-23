import { motion } from "motion/react";
import {
  CheckIcon,
  ExternalLinkIcon,
  LayoutDashboardIcon,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface SuccessScreenProps {
  name: string;
  username: string;
}
export default function SuccessScreen({ name, username }: SuccessScreenProps) {
  const displayName = name.split(" ")[0] || username;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smooth }}
      className="rounded-2xl overflow-hidden relative bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm"
    >
      {/* Top accent */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-blue-500/5 blur-[80px] rounded-full" />

      <div className="relative px-8 py-14 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-blue-500/10 border border-blue-500/20"
        >
          <CheckIcon
            size={28}
            strokeWidth={2}
            className="text-blue-400"
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: smooth }}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3 text-slate-600"
        >
          Portfolio Berhasil Dibuat
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45, ease: smooth }}
          className="text-[28px] font-bold text-white mb-2 leading-[1.15] tracking-tight"
          style={{
            fontFamily:
              "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          Selamat datang,{" "}
          <span className="text-slate-500">{displayName}!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.46 }}
          className="text-sm text-slate-500 mb-1"
        >
          Portfolio kamu sudah live di
        </motion.p>

        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          href={`https://portof.id/${username}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          portof.id/{username || "username"}{" "}
          <ExternalLinkIcon size={14} />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: smooth }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href={`https://portof.id/${username}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-white text-[#070e1b] hover:bg-blue-50 transition-all duration-200 hover:-translate-y-0.5"
          >
            <ExternalLinkIcon size={15} /> Lihat Portfolioku
          </a>
          <a
            href="/app"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white transition-all duration-200 hover:-translate-y-0.5"
          >
            <LayoutDashboardIcon size={15} /> Ke Dashboard
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-5 text-[11px] text-slate-600"
        >
          Kamu bisa edit portfolio kapan saja dari dashboard.
        </motion.p>
      </div>
    </motion.div>
  );
}
