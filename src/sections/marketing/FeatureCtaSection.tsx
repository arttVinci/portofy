import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FeatureCtaSection() {
  return (
    <section className="py-20 max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: smooth }}
        className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
        style={{
          backgroundColor: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
          }}
        />
        <div
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
          style={{
            width: 600,
            height: 300,
            background:
              "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
          }}
        />
        <p
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Mulai Sekarang
        </p>
        <h2
          className="text-[40px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Semua fitur ini,{" "}
          <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            gratis untuk dicoba.
          </span>
        </h2>
        <p
          className="text-[14px] max-w-sm mx-auto mb-8"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          Tidak perlu kartu kredit. Daftar sekarang dan portfolio kamu online
          dalam 3 menit.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/register"
            className="px-7 py-3 rounded-xl text-[14px] font-semibold text-[#0a0a0f] transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.9)")
            }
          >
            Buat Portfolio Gratis →
          </a>
          <a
            href="#harga"
            className="px-7 py-3 rounded-xl text-[14px] font-medium transition-all duration-200"
            style={{
              color: "rgba(255,255,255,0.45)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.8)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.45)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
          >
            Lihat Harga
          </a>
        </div>
      </motion.div>
    </section>
  );
}
