import { motion } from "framer-motion";
import CtaButton from "../../components/ui/CtaButton";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const stats = [
  { value: "12.000+", label: "Portfolio aktif" },
  { value: "3 menit", label: "Rata-rata waktu setup" },
  { value: "4.9 / 5", label: "Rating dari pengguna" },
];

export default function CtaBannerSection() {
  return (
    <section
      id="cta-banner"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6">
        {/* ── Main banner ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: smoothEase }}
          className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
          style={{
            backgroundColor: "#0e0e14",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          {/* Top line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
            }}
          />

          {/* Radial glow inside card */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 600,
              height: 300,
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
            }}
          />

          {/* Corner dots */}
          {[
            "top-4 left-4",
            "top-4 right-4",
            "bottom-4 left-4",
            "bottom-4 right-4",
          ].map((pos) => (
            <div
              key={pos}
              className={`absolute ${pos} size-1 rounded-full`}
              style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
            />
          ))}

          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-5"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Mulai Sekarang
          </p>

          <h2
            className="text-[48px] font-normal leading-[1.08] tracking-[-0.03em] text-white mb-5 max-w-xl mx-auto"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Portfolio kamu sudah{" "}
            <span
              className="italic"
              style={{ color: "rgba(255,255,255,0.45)" }}
            >
              lama tertunda.
            </span>
          </h2>

          <p
            className="text-[15px] leading-relaxed max-w-sm mx-auto mb-10"
            style={{ color: "rgba(255,255,255,0.35)" }}
          >
            Ribuan kreator sudah online. Kamu tinggal isi form dan selesai —
            dalam waktu kurang dari 5 menit.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3">
            <CtaButton
              title="Buat Portfolio Gratis →"
              font="font-semibold"
              backgroundColor="rgba(255,255,255,0.9)"
              textColor="text-[#0a0a0f]"
            />
            <CtaButton
              title="Lihat Template"
              font="font-medium"
              backgroundColor="transparent"
              textColor="rgba(255,255,255,0.5)"
              borderColor="rgba(255,255,255,0.1)"
              onMouseEnterColor="rgba(255,255,255,0.85)"
              onMouseEnterBorderColor="rgba(255,255,255,0.2)"
            />
          </div>

          {/* Trust note */}
          <p
            className="mt-5 text-[11px]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Gratis selamanya · Tanpa kartu kredit · Batalkan kapan saja
          </p>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase, delay: 0.15 }}
          className="mt-10 grid grid-cols-3 gap-px overflow-hidden rounded-2xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 text-center"
              style={{ backgroundColor: "#0e0e14" }}
            >
              <p
                className="text-[22px] font-bold tracking-[-0.02em]"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {s.value}
              </p>
              <p
                className="text-[11px] mt-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
