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
        backgroundColor: "#0c1222",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
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
            background: "linear-gradient(135deg, #111a2e 0%, #162035 50%, #0e1526 100%)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          {/* Top glow line */}
          <div
            className="absolute top-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(to right, transparent, #38bdf8, transparent)",
            }}
          />

          {/* Radial glow inside card */}
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 600,
              height: 300,
              background:
                "radial-gradient(ellipse at center top, rgba(56,189,248,0.08) 0%, transparent 70%)",
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
              style={{ backgroundColor: "rgba(56,189,248,0.3)" }}
            />
          ))}

          {/* Section tag */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to right, transparent, #38bdf8)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.15em] uppercase"
              style={{ color: "#38bdf8" }}
            >
              Mulai Sekarang
            </p>
            <div
              className="h-px w-8"
              style={{
                background: "linear-gradient(to left, transparent, #38bdf8)",
              }}
            />
          </div>

          <h2
            className="text-[48px] font-extrabold leading-[1.08] tracking-[-0.03em] mb-5 max-w-xl mx-auto"
            style={{ color: "#f1f5f9" }}
          >
            Portfolio kamu sudah{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              lama tertunda.
            </span>
          </h2>

          <p
            className="text-[15px] leading-relaxed max-w-sm mx-auto mb-10"
            style={{ color: "rgba(148,163,184,0.5)" }}
          >
            Ribuan kreator sudah online. Kamu tinggal isi form dan selesai —
            dalam waktu kurang dari 5 menit.
          </p>

          {/* CTA buttons */}
          <div className="flex items-center justify-center gap-3">
            <CtaButton
              title="Buat Portfolio Gratis →"
              route="/auth/register"
              font="font-semibold"
              backgroundColor="linear-gradient(135deg, #3b82f6, #06b6d4)"
              textColor="text-white"
            />
            <CtaButton
              title="Lihat Template"
              route="/template"
              font="font-medium"
              backgroundColor="transparent"
              textColor="rgba(56,189,248,0.7)"
              borderColor="rgba(56,189,248,0.2)"
              onMouseEnterColor="#38bdf8"
              onMouseEnterBorderColor="rgba(56,189,248,0.4)"
            />
          </div>

          {/* Trust note */}
          <p
            className="mt-5 text-[11px]"
            style={{ color: "rgba(148,163,184,0.3)" }}
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
            backgroundColor: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.08)",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center py-6 text-center"
              style={{ backgroundColor: "#111a2e" }}
            >
              <p
                className="text-[22px] font-bold tracking-[-0.02em]"
                style={{ color: "rgba(241,245,249,0.85)" }}
              >
                {s.value}
              </p>
              <p
                className="text-[11px] mt-1"
                style={{ color: "rgba(148,163,184,0.4)" }}
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
