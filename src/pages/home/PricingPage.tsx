import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import HeroSection from "../../components/marketing/HeroSection";
import ChecklistIcon from "../../components/marketing/ChecklistIcon";
import ComparisonTable from "../../components/marketing/ComparisonTable";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

// ── Plans ─────────────────────────────────────────────────────────────────────
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

// ── Full feature comparison ───────────────────────────────────────────────────
const comparisonGroups = [
  {
    group: "Portfolio",
    rows: [
      {
        label: "Jumlah portfolio",
        feature1: "1",
        feature2: "Tidak terbatas",
        feature3: "Tidak terbatas",
      },
      {
        label: "Template tersedia",
        feature1: "3 template",
        feature2: "Semua template",
        feature3: "Semua template",
      },
      {
        label: "URL portofolio.id/username",
        feature1: true,
        feature2: true,
        feature3: true,
      },
      {
        label: "Custom domain",
        feature1: false,
        feature2: true,
        feature3: true,
      },
      {
        label: "Hapus watermark",
        feature1: false,
        feature2: true,
        feature3: true,
      },
    ],
  },
  {
    group: "Analytics & SEO",
    rows: [
      {
        label: "Statistik views dasar",
        feature1: true,
        feature2: true,
        feature3: true,
      },
      {
        label: "Analytics lengkap",
        feature1: false,
        feature2: true,
        feature3: true,
      },
      {
        label: "Sumber traffic",
        feature1: false,
        feature2: true,
        feature3: true,
      },
      { label: "SEO otomatis", feature1: true, feature2: true, feature3: true },
    ],
  },
  {
    group: "Fitur Lanjutan",
    rows: [
      {
        label: "AI Bio Generator",
        feature1: false,
        feature2: true,
        feature3: true,
      },
      { label: "Export PDF", feature1: false, feature2: true, feature3: true },
      {
        label: "Password protect",
        feature1: false,
        feature2: true,
        feature3: true,
      },
    ],
  },
  {
    group: "Team & Admin",
    rows: [
      {
        label: "Dashboard admin",
        feature1: false,
        feature2: false,
        feature3: true,
      },
      {
        label: "Hingga 50 anggota",
        feature1: false,
        feature2: false,
        feature3: true,
      },
      {
        label: "Bulk onboarding",
        feature1: false,
        feature2: false,
        feature3: true,
      },
      {
        label: "Laporan tim",
        feature1: false,
        feature2: false,
        feature3: true,
      },
    ],
  },
  {
    group: "Support",
    rows: [
      {
        label: "Panduan & dokumentasi",
        feature1: true,
        feature2: true,
        feature3: true,
      },
      {
        label: "Email support",
        feature1: false,
        feature2: true,
        feature3: true,
      },
      {
        label: "Priority support",
        feature1: false,
        feature2: false,
        feature3: true,
      },
      {
        label: "Onboarding khusus",
        feature1: false,
        feature2: false,
        feature3: true,
      },
    ],
  },
];

// ── FAQ ───────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: "Apakah plan Gratis benar-benar gratis selamanya?",
    a: "Ya, plan Gratis tidak pernah kadaluarsa. Kamu bisa pakai fitur dasar tanpa batas waktu dan tanpa perlu kartu kredit.",
  },
  {
    q: "Bagaimana cara upgrade ke Pro?",
    a: "Setelah daftar dan masuk ke dashboard, klik menu 'Upgrade' lalu pilih metode pembayaran. Proses upgrade instan — fitur Pro langsung aktif setelah pembayaran dikonfirmasi.",
  },
  {
    q: "Metode pembayaran apa yang tersedia?",
    a: "Kami menerima transfer bank (BCA, Mandiri, BRI, BNI), QRIS, GoPay, OVO, Dana, dan kartu kredit/debit Visa/Mastercard.",
  },
  {
    q: "Apakah saya bisa batalkan langganan kapan saja?",
    a: "Ya. Kamu bisa batalkan kapan saja dari halaman pengaturan. Setelah dibatalkan, akses Pro tetap aktif sampai akhir periode billing berjalan.",
  },
  {
    q: "Apa yang terjadi dengan portfolio saya jika downgrade?",
    a: "Portfolio kamu tetap online. Fitur Pro seperti custom domain dan analytics lengkap nonaktif, tapi konten dan URL tidak akan hilang.",
  },
  {
    q: "Apakah plan Team cocok untuk komunitas kecil?",
    a: "Ya. Plan Team mulai dari 5 anggota hingga 50 anggota. Cocok untuk kelas, bootcamp, atau komunitas kreator yang ingin onboarding anggota secara massal.",
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

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div
      id="pricing"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <HeroSection
          tagline="Price"
          title="Start free"
          italicTitle="upgrade when ready."
          description="No hidden fees. Cancel anytime."
        >
          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3"
          >
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
          </motion.div>
        </HeroSection>

        {/* ── PRICING CARDS ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  ease: smooth,
                  delay: 0.1 + i * 0.08,
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
                  {/* Name + badge */}
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
                        <div className="flex items-end gap-1.5">
                          <p
                            className="text-[34px] font-bold tracking-[-0.03em] leading-none"
                            style={{ color: "rgba(255,255,255,0.9)" }}
                          >
                            {formatPrice(
                              yearly ? plan.yearlyPrice : plan.monthlyPrice,
                            )}
                          </p>
                          {plan.monthlyPrice > 0 && (
                            <p
                              className="text-[12px] mb-1"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              /bulan
                            </p>
                          )}
                        </div>
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
                        {plan.monthlyPrice === 0 && (
                          <p className="text-[11px] mt-1 invisible">
                            placeholder
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
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  />

                  {/* Features */}
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

          <motion.p
            {...fadeUp(0.3)}
            className="mt-6 text-center text-[12px]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Semua harga dalam Rupiah · Bayar via transfer bank, QRIS, atau kartu
            kredit
          </motion.p>
        </section>

        {/* ── FULL COMPARISON TABLE ── */}
        <section className="max-w-4xl mx-auto px-6 pb-24">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Perbandingan Lengkap
            </p>
            <h2
              className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Semua yang kamu{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                dapatkan.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth }}
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-4 px-6 py-4"
              style={{
                backgroundColor: "#111118",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[12px] font-semibold"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Fitur
              </p>
              {["Gratis", "Pro", "Team"].map((col, i) => (
                <p
                  key={col}
                  className="text-[12px] font-semibold text-center"
                  style={{
                    color:
                      i === 1
                        ? "rgba(255,255,255,0.85)"
                        : "rgba(255,255,255,0.35)",
                  }}
                >
                  {col}
                </p>
              ))}
            </div>

            {/* Groups */}
            {comparisonGroups.map((group, gi) => (
              <div key={group.group}>
                {/* Group header */}
                <div
                  className="px-6 py-2.5"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.02)",
                    borderTop:
                      gi > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <p
                    className="text-[10px] font-bold uppercase tracking-wides"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {group.group}
                  </p>
                </div>

                {/* Rows */}
                {group.rows.map((item, i) => (
                  <ComparisonTable
                    key={item.label}
                    item={item}
                    i={i}
                    itemLength={group.rows.length}
                  />
                ))}
              </div>
            ))}

            {/* CTA row */}
            <div
              className="grid grid-cols-4 px-6 py-5"
              style={{
                backgroundColor: "#111118",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div />
              {plans.map((plan) => (
                <div key={plan.id} className="flex justify-center">
                  <a
                    href={plan.id === "team" ? "/contact" : "/register"}
                    className="px-4 py-2 rounded-xl text-[12px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                    style={
                      plan.ctaStyle === "solid"
                        ? {
                            backgroundColor: "rgba(255,255,255,0.9)",
                            color: "#0a0a0f",
                          }
                        : {
                            backgroundColor: "rgba(255,255,255,0.05)",
                            color: "rgba(255,255,255,0.5)",
                            border: "1px solid rgba(255,255,255,0.1)",
                          }
                    }
                    onMouseEnter={(e) => {
                      if (plan.ctaStyle === "solid") {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#fff";
                      } else {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.09)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (plan.ctaStyle === "solid") {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.9)";
                      } else {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.05)";
                      }
                    }}
                  >
                    {plan.cta}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── FAQ ── */}
        <section className="max-w-3xl mx-auto px-6 pb-24">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              FAQ
            </p>
            <h2
              className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Pertanyaan soal{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                harga & billing.
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth }}
          >
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border-b"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer focus:outline-none"
                  >
                    <span
                      className="text-[14px] font-medium"
                      style={{
                        color: isOpen
                          ? "rgba(255,255,255,0.9)"
                          : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22, ease: smooth }}
                      className="shrink-0 size-6 rounded-full flex items-center justify-center"
                      style={{
                        backgroundColor: isOpen
                          ? "rgba(255,255,255,0.1)"
                          : "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: isOpen
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <Plus size={12} strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: smooth }}
                        style={{ overflow: "hidden" }}
                      >
                        <p
                          className="pb-5 text-[13px] leading-relaxed pr-10"
                          style={{ color: "rgba(255,255,255,0.4)" }}
                        >
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-4xl mx-auto px-6 pb-20">
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
              Coba gratis,{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                upgrade nanti.
              </span>
            </h2>
            <p
              className="text-[14px] max-w-sm mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tidak perlu kartu kredit. Daftar sekarang, portfolio online dalam
              3 menit.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="/register"
                className="px-7 py-3 rounded-xl text-[14px] font-semibold text-[#0a0a0f] transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Buat Portfolio Gratis →
              </a>
              <a
                href="/contact"
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
                Hubungi Tim Kami
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
