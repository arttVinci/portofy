import FeatureGridSection from "../../sections/marketing/feature/FeatureGridSection";
import FeatureSpotlightSection from "../../sections/marketing/feature/FeatureSpotlightSection";
import FeatureComparisonTableSection from "../../sections/marketing/feature/FeatureComparisonTableSection";
import HeroSection from "../../components/marketing/HeroSection";
import CtaBanner from "../../components/marketing/CtaBanner";
import CtaButton from "../../components/ui/CtaButton";

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

        {/* Cta Banner */}
        <CtaBanner
          tag="Mulai Sekarang"
          title="Semua fitur ini,"
          italicTitle="gratis untuk dicoba."
          description="Tidak perlu kartu kredit. Daftar sekarang dan portfolio kamu online dalam 3 menit."
          classname="py-20 max-w-4xl mx-auto px-6"
          motionDivClassname="relative rounded-3xl overflow-hidden text-center px-8 py-20"
        >
          <CtaButton
            title="Buat Portfolio Gratis →"
            route="/register"
            font="font-semibold"
            backgroundColor="rgba(255,255,255,0.9)"
            textColor="text-[#0a0a0f]"
          />
          <CtaButton
            title="Lihat Harga"
            route="/pricing"
            font="font-medium"
            backgroundColor="transparent"
            textColor="rgba(255,255,255,0.5)"
            borderColor="rgba(255,255,255,0.1)"
            onMouseEnterColor="rgba(255,255,255,0.85)"
            onMouseEnterBorderColor="rgba(255,255,255,0.2)"
          />
        </CtaBanner>
      </div>
    </div>
  );
}
