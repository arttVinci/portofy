import { motion } from "framer-motion";
import { Check, ExternalLink, LayoutDashboard } from "lucide-react";

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
      className="rounded-2xl overflow-hidden relative"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 400,
          height: 200,
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />
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
          className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Check
            size={28}
            strokeWidth={2}
            style={{ color: "rgba(255,255,255,0.85)" }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: smooth }}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Portfolio Berhasil Dibuat
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45, ease: smooth }}
          className="text-white mb-2"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Selamat datang,{" "}
          <em style={{ color: "rgba(255,255,255,0.5)" }}>{displayName}!</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.46 }}
          className="text-[13px] mb-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Portfolio kamu sudah live di
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          href={`https://portof.id/${username}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          portof.id/{username || "username"} <ExternalLink size={12} />
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: smooth }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href={`https://portof.id/${username}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#0a0a0f",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.9)")
            }
          >
            <ExternalLink size={15} /> Lihat Portfolioku
          </a>
          <a
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.85)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
          >
            <LayoutDashboard size={15} /> Ke Dashboard
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-5 text-[11px]"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Kamu bisa edit portfolio kapan saja dari dashboard.
        </motion.p>
      </div>
    </motion.div>
  );
}
