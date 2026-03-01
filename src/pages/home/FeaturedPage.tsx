import FeatureHeroSection from "../../sections/marketing/feature/FeatureHeroSection";
import FeatureGridSection from "../../sections/marketing/feature/FeatureGridSection";
import FeatureSpotlightSection from "../../sections/marketing/feature/FeatureSpotlightSection";
import FeatureComparisonTableSection from "../../sections/marketing/feature/FeatureComparisonTableSection";
import FeatureCtaSection from "../../sections/marketing/feature/FeatureCtaSection";
import HeroSection from "../../components/marketing/HeroSection";

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

export default function FiturPage() {
  return (
    <div
      id="feature-page"
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
        <HeroSection
          tagline="Features"
          title="Everything you need"
          italicTitle="is already here."
          description="From a no-code editor to comprehensive analytics — one platform for building a truly professional portfolio."
        />
        {/* ── FEATURE GRID ── */}
        <FeatureGridSection />

        {/* ── SPOTLIGHT SECTIONS ── */}
        {spotlights.map((s, idx) => (
          <FeatureSpotlightSection key={idx} spotlight={s} />
        ))}

        {/* ── COMPARISON TABLE ── */}
        <FeatureComparisonTableSection />

        {/* ── CTA ── */}
        <FeatureCtaSection />
      </div>
    </div>
  );
}
