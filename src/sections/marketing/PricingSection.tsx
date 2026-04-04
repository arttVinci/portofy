import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import { IconCheck, IconMinus, IconArrowRight } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

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

// ── Pricing Card with Spotlight ──────────────────────────────────────
function PricingCard({
  plan,
  yearly,
  index,
}: {
  plan: (typeof plans)[0];
  yearly: boolean;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const inViewRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(inViewRef, { once: true, margin: "-40px" });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  return (
    <motion.div
      ref={inViewRef}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: smooth, delay: index * 0.1 }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative rounded-2xl overflow-hidden h-full transition-all duration-300"
        style={{
          backgroundColor: plan.highlighted ? "#0e1a30" : "#0a1020",
          border: plan.highlighted ? "1px solid rgba(59,130,246,0.25)" : "1px solid rgba(255,255,255,0.05)",
          boxShadow: plan.highlighted
            ? "0 0 48px rgba(59,130,246,0.08), 0 32px 64px rgba(0,0,0,0.4)"
            : isHovered
              ? "0 20px 48px rgba(0,0,0,0.4)"
              : "none",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        {/* Spotlight gradient */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${plan.highlighted ? "rgba(59,130,246,0.08)" : "rgba(255,255,255,0.04)"}, transparent 60%)`,
            }}
          />
        )}

        {/* Top glow line for highlighted */}
        {plan.highlighted && (
          <div
            className="absolute top-0 left-0 right-0 h-px z-20"
            style={{ background: "linear-gradient(to right, transparent, #3b82f6, transparent)" }}
          />
        )}

        <div className="p-6 relative z-10">
          {/* Header */}
          <div className="flex items-center gap-2 mb-1">
            <p className="text-[15px] font-semibold" style={{ color: "rgba(241,245,249,0.85)" }}>
              {plan.name}
            </p>
            {plan.badge && (
              <span
                className="px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide"
                style={{
                  background: "linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))",
                  color: "#818cf8",
                  border: "1px solid rgba(129,140,248,0.2)",
                }}
              >
                {plan.badge}
              </span>
            )}
          </div>
          <p className="text-[12px] mb-5" style={{ color: "rgba(148,163,184,0.5)" }}>{plan.desc}</p>

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
                <div className="flex items-end gap-1.5">
                  <p className="text-[36px] font-bold tracking-[-0.03em] leading-none" style={{ color: "rgba(241,245,249,0.9)" }}>
                    {formatPrice(yearly ? plan.yearlyPrice : plan.monthlyPrice)}
                  </p>
                  {plan.monthlyPrice > 0 && (
                    <p className="text-[12px] mb-1" style={{ color: "rgba(148,163,184,0.5)" }}>/bulan</p>
                  )}
                </div>
                {yearly && plan.monthlyPrice > 0 && (
                  <p className="text-[11px] mt-1" style={{ color: "rgba(148,163,184,0.35)" }}>
                    Ditagih tahunan · <span style={{ textDecoration: "line-through" }}>{formatPrice(plan.monthlyPrice)}</span>/bln
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* CTA */}
          <motion.a
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            href={plan.id === "team" ? "/contact" : "/auth/register"}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-200 mb-6"
            style={
              plan.ctaStyle === "solid"
                ? {
                    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
                    color: "#ffffff",
                    boxShadow: "0 4px 20px rgba(59,130,246,0.35)",
                  }
                : {
                    backgroundColor: "rgba(255,255,255,0.04)",
                    color: "rgba(6,182,212,0.8)",
                    border: "1px solid rgba(6,182,212,0.15)",
                  }
            }
          >
            {plan.cta}
            <IconArrowRight size={14} />
          </motion.a>

          {/* Divider */}
          <div className="mb-5 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.1), transparent)" }} />

          {/* Feature list */}
          <ul className="space-y-3">
            {plan.features.map((f, i) => (
              <motion.li
                key={f.text}
                initial={{ opacity: 0, x: -8 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                className="flex items-center gap-3"
              >
                <span
                  className="shrink-0 flex items-center justify-center size-4.5 rounded-full"
                  style={{
                    backgroundColor: f.included ? "rgba(59,130,246,0.12)" : "transparent",
                  }}
                >
                  {f.included ? (
                    <IconCheck size={11} strokeWidth={2.5} style={{ color: "#60a5fa" }} />
                  ) : (
                    <IconMinus size={11} strokeWidth={2} style={{ color: "rgba(148,163,184,0.2)" }} />
                  )}
                </span>
                <span
                  className="text-[12px]"
                  style={{ color: f.included ? "rgba(148,163,184,0.7)" : "rgba(148,163,184,0.25)" }}
                >
                  {f.text}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  const [yearly, setYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#060b18", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 500,
          background: "radial-gradient(ellipse, rgba(59,130,246,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
            style={{
              backgroundColor: "rgba(52,211,153,0.1)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "#34d399",
            }}
          >
            💰 Harga Transparan
          </motion.span>

          <h2
            className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Mulai gratis,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #34d399, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              upgrade kalau siap.
            </span>
          </h2>
          <p className="mt-4 text-[14px] max-w-sm mx-auto" style={{ color: "rgba(148,163,184,0.5)" }}>
            Tidak ada biaya tersembunyi. Batalkan kapan saja.
          </p>

          {/* Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 p-1 rounded-full" style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
            <button
              onClick={() => setYearly(false)}
              className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: !yearly ? "rgba(59,130,246,0.15)" : "transparent",
                color: !yearly ? "#60a5fa" : "rgba(148,163,184,0.4)",
                border: !yearly ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
              }}
            >
              Bulanan
            </button>
            <button
              onClick={() => setYearly(true)}
              className="px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer flex items-center gap-2"
              style={{
                backgroundColor: yearly ? "rgba(59,130,246,0.15)" : "transparent",
                color: yearly ? "#60a5fa" : "rgba(148,163,184,0.4)",
                border: yearly ? "1px solid rgba(59,130,246,0.2)" : "1px solid transparent",
              }}
            >
              Tahunan
              <span
                className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{
                  backgroundColor: "rgba(52,211,153,0.12)",
                  color: "rgba(52,211,153,0.8)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                -20%
              </span>
            </button>
          </div>
        </motion.div>

        {/* ── Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} yearly={yearly} index={i} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 text-center text-[12px]"
          style={{ color: "rgba(148,163,184,0.3)" }}
        >
          Semua harga dalam Rupiah · Bisa bayar via transfer bank, QRIS, atau kartu kredit
        </motion.p>
      </div>
    </section>
  );
}
