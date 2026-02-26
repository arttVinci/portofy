import { motion } from "framer-motion";
import FeatureHeroSection from "../../sections/marketing/FeatureHeroSection";
import FeatureGridSection from "../../sections/marketing/FeatureGridSection";
import FeatureSpotlightSection from "../../sections/marketing/FeatureSpotlightSection";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

// ── Spotlight features ────────────────────────────────────────────────────────
const spotlights = [
  {
    tag: "Andalan",
    title: "Dari form ke portfolio dalam 3 menit",
    desc: "Tidak ada setup yang rumit. Daftar, isi nama dan profesi, pilih template — portfolio kamu sudah online dan bisa dibagikan. Kami yang urus hosting, SSL, dan semua urusan teknis.",
    points: [
      "Tidak perlu akun hosting",
      "SSL certificate otomatis",
      "URL langsung aktif setelah publish",
      "Support via chat jika ada kendala",
    ],
    mockContent: "speed",
    reverse: false,
  },
  {
    tag: "Populer",
    title: "Analytics yang kasih insight nyata",
    desc: "Tahu persis berapa orang yang buka portfolio kamu hari ini, minggu ini, dan dari mana mereka datang — LinkedIn, WhatsApp, atau pencarian Google.",
    points: [
      "Grafik views harian & mingguan",
      "Sumber traffic (referrer)",
      "Perangkat pengunjung",
      "Konten yang paling banyak dilihat",
    ],
    mockContent: "analytics",
    reverse: true,
  },
];

// ── Comparison table ──────────────────────────────────────────────────────────
const comparisonItems = [
  { label: "Tidak perlu coding", us: true, diy: false, notion: false },
  { label: "Template profesional", us: true, diy: false, notion: false },
  { label: "URL bersih", us: true, diy: true, notion: false },
  { label: "Custom domain", us: true, diy: true, notion: false },
  { label: "Analytics bawaan", us: true, diy: false, notion: false },
  { label: "SEO otomatis", us: true, diy: false, notion: false },
  { label: "AI Bio Generator", us: true, diy: false, notion: false },
  { label: "Siap dalam 3 menit", us: true, diy: false, notion: false },
];

function CheckIcon({ val }: { val: boolean }) {
  return val ? (
    <div className="flex items-center justify-center">
      <div
        className="size-5 rounded-full flex items-center justify-center"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <svg
          className="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(255,255,255,0.7)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 6L9 17l-5-5" />
        </svg>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center">
      <div
        className="size-1.5 rounded-full"
        style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
      />
    </div>
  );
}

// ── Mock visuals ──────────────────────────────────────────────────────────────

export default function FiturPage() {
  return (
    <div
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg global */}
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
        {/* ── HERO ── */}
        <FeatureHeroSection />
        {/* ── FEATURE GRID ── */}
        <FeatureGridSection />

        {/* ── SPOTLIGHT SECTIONS ── */}
        {spotlights.map((s, idx) => (
          <FeatureSpotlightSection spotlight={{ s }} key={idx} />
        ))}

        {/* ── COMPARISON TABLE ── */}
        <section className="py-20 max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="text-center mb-12">
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Perbandingan
            </p>
            <h2
              className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Kenapa pilih{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                platform kami?
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
              className="grid grid-cols-4 px-5 py-3"
              style={{
                backgroundColor: "#111118",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[11px] font-semibold"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Fitur
              </p>
              {[
                { label: "PortofId", highlight: true },
                { label: "Bikin Sendiri", highlight: false },
                { label: "Notion/Linktree", highlight: false },
              ].map((col) => (
                <p
                  key={col.label}
                  className="text-[11px] font-semibold text-center"
                  style={{
                    color: col.highlight
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {col.label}
                </p>
              ))}
            </div>

            {/* Rows */}
            {comparisonItems.map((item, i) => (
              <div
                key={item.label}
                className="grid grid-cols-4 px-5 py-3.5"
                style={{
                  backgroundColor: i % 2 === 0 ? "#0e0e14" : "#0a0a0f",
                  borderBottom:
                    i < comparisonItems.length - 1
                      ? "1px solid rgba(255,255,255,0.04)"
                      : "none",
                }}
              >
                <p
                  className="text-[12px]"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {item.label}
                </p>
                <CheckIcon val={item.us} />
                <CheckIcon val={item.diy} />
                <CheckIcon val={item.notion} />
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── CTA ── */}
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
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                gratis untuk dicoba.
              </span>
            </h2>
            <p
              className="text-[14px] max-w-sm mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tidak perlu kartu kredit. Daftar sekarang dan portfolio kamu
              online dalam 3 menit.
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
      </div>
    </div>
  );
}
