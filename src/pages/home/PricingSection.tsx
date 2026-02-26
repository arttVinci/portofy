import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Pricing data ─────────────────────────────────────────────────────────────
const plans = [
  {
    id: "free",
    name: "Gratis",
    desc: "Untuk kamu yang baru mulai.",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Mulai Gratis",
    ctaStyle: "outline" as const,
    highlighted: false,
    features: [
      { text: "1 portfolio aktif", included: true },
      { text: "3 template pilihan", included: true },
      { text: "URL portofolio.id/username", included: true },
      { text: "Statistik views dasar", included: true },
      { text: "Custom domain", included: false },
      { text: "Template premium", included: false },
      { text: "Hapus watermark", included: false },
      { text: "Analytics lengkap", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Untuk yang serius cari kerja.",
    monthlyPrice: 49000,
    yearlyPrice: 39000,
    cta: "Mulai Pro",
    ctaStyle: "solid" as const,
    highlighted: true,
    badge: "Paling Populer",
    features: [
      { text: "Portfolio tidak terbatas", included: true },
      { text: "Semua template", included: true },
      { text: "URL portofolio.id/username", included: true },
      { text: "Analytics lengkap", included: true },
      { text: "Custom domain", included: true },
      { text: "Hapus watermark", included: true },
      { text: "AI Bio Generator", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    id: "team",
    name: "Team",
    desc: "Untuk kampus, bootcamp, atau komunitas.",
    monthlyPrice: 299000,
    yearlyPrice: 239000,
    cta: "Hubungi Kami",
    ctaStyle: "outline" as const,
    highlighted: false,
    features: [
      { text: "Semua fitur Pro", included: true },
      { text: "Hingga 50 anggota", included: true },
      { text: "Dashboard admin", included: true },
      { text: "Bulk onboarding", included: true },
      { text: "Custom domain", included: true },
      { text: "Hapus watermark", included: true },
      { text: "AI Bio Generator", included: true },
      { text: "Priority support", included: true },
    ],
  },
];

function formatPrice(price: number) {
  if (price === 0) return "Gratis";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);

  return (
    <section
      id="pricing"
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
      {/* Glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 700,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="text-center mb-12"
        >
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Harga
          </p>
          <h2
            className="text-[44px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Mulai gratis,{" "}
            <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
              upgrade kalau siap.
            </span>
          </h2>
          <p
            className="mt-4 text-[14px] max-w-sm mx-auto"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Tidak ada biaya tersembunyi. Batalkan kapan saja.
          </p>

          {/* ── Toggle bulanan / tahunan ── */}
          <div className="mt-8 inline-flex items-center gap-3">
            <span
              className="text-[13px] font-medium"
              style={{
                color: !yearly
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.3)",
              }}
            >
              Bulanan
            </span>
            <button
              onClick={() => setYearly((v) => !v)}
              className="relative w-10 h-5 rounded-full transition-colors duration-300 cursor-pointer focus:outline-none"
              style={{
                backgroundColor: yearly
                  ? "rgba(255,255,255,0.25)"
                  : "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              <motion.span
                animate={{ x: yearly ? 20 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
                className="absolute top-0.5 size-4 rounded-full block"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
              />
            </button>
            <span
              className="text-[13px] font-medium flex items-center gap-1.5"
              style={{
                color: yearly
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.3)",
              }}
            >
              Tahunan
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.5)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  opacity: yearly ? 1 : 0.5,
                }}
              >
                Hemat 20%
              </span>
            </span>
          </div>
        </motion.div>

        {/* ── Pricing cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.55,
                ease: smoothEase,
                delay: i * 0.08,
              }}
              className="relative rounded-2xl overflow-hidden h-full"
              style={{
                backgroundColor: plan.highlighted ? "#141420" : "#0e0e14",
                border: plan.highlighted
                  ? "1px solid rgba(255,255,255,0.15)"
                  : "1px solid rgba(255,255,255,0.06)",
                boxShadow: plan.highlighted
                  ? "0 0 0 1px rgba(255,255,255,0.05), 0 32px 64px rgba(0,0,0,0.4)"
                  : "none",
              }}
            >
              {/* Highlighted top line */}
              {plan.highlighted && (
                <div
                  className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background:
                      "linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)",
                  }}
                />
              )}

              <div className="p-6">
                {/* Plan name + desc */}
                <div className="flex items-center gap-2 mb-1">
                  <p
                    className="text-[15px] font-semibold"
                    style={{ color: "rgba(255,255,255,0.85)" }}
                  >
                    {plan.name}
                  </p>
                  {plan.badge && (
                    <span
                      className="px-2 py-0.5 rounded-full text-[9px] font-semibold tracking-wide"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.5)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p
                  className="text-[12px] mb-5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  {plan.desc}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={yearly ? "yearly" : "monthly"}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2 }}
                    >
                      {plan.monthlyPrice === 0 ? (
                        <div>
                          <div className="flex items-end gap-1.5">
                            <p
                              className="text-[36px] font-bold tracking-[-0.03em] leading-none"
                              style={{ color: "rgba(255,255,255,0.9)" }}
                            >
                              Gratis
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-end gap-1.5">
                          <p
                            className="text-[36px] font-bold tracking-[-0.03em] leading-none"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                          >
                            {formatPrice(
                              yearly ? plan.yearlyPrice : plan.monthlyPrice,
                            )}
                          </p>
                          <p
                            className="text-[12px] mb-1"
                            style={{ color: "rgba(255,255,255,0.3)" }}
                          >
                            /bulan
                          </p>
                        </div>
                      )}
                      {yearly && plan.monthlyPrice > 0 && (
                        <p
                          className="text-[11px] mt-1"
                          style={{ color: "rgba(255,255,255,0.25)" }}
                        >
                          Ditagih tahunan ·{" "}
                          <span style={{ textDecoration: "line-through" }}>
                            {formatPrice(plan.monthlyPrice)}
                          </span>
                          /bln
                        </p>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* CTA */}
                <a
                  href={plan.id === "team" ? "/contact" : "/register"}
                  className="w-full flex items-center justify-center py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 mb-6 hover:-translate-y-0.5"
                  style={
                    plan.ctaStyle === "solid"
                      ? {
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: "#0a0a0f",
                        }
                      : {
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.6)",
                          border: "1px solid rgba(255,255,255,0.1)",
                        }
                  }
                  onMouseEnter={(e) => {
                    if (plan.ctaStyle === "solid") {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "#ffffff";
                    } else {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.09)";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.85)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (plan.ctaStyle === "solid") {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.9)";
                    } else {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.6)";
                    }
                  }}
                >
                  {plan.cta}
                </a>

                {/* Divider */}
                <div
                  className="mb-5 h-px"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                  }}
                />

                {/* Feature list */}
                <ul className="space-y-3">
                  {plan.features.map((f) => (
                    <li key={f.text} className="flex items-center gap-3">
                      <span
                        className="shrink-0 flex items-center justify-center size-4 rounded-full"
                        style={{
                          backgroundColor: f.included
                            ? "rgba(255,255,255,0.08)"
                            : "transparent",
                        }}
                      >
                        {f.included ? (
                          <Check
                            size={10}
                            strokeWidth={2.5}
                            style={{ color: "rgba(255,255,255,0.6)" }}
                          />
                        ) : (
                          <Minus
                            size={10}
                            strokeWidth={2}
                            style={{ color: "rgba(255,255,255,0.15)" }}
                          />
                        )}
                      </span>
                      <span
                        className="text-[12px]"
                        style={{
                          color: f.included
                            ? "rgba(255,255,255,0.55)"
                            : "rgba(255,255,255,0.2)",
                        }}
                      >
                        {f.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center text-[12px]"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          Semua harga dalam Rupiah · Bisa bayar via transfer bank, QRIS, atau
          kartu kredit
        </motion.p>
      </div>
    </section>
  );
}
