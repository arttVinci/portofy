import HeroSection from "../../components/marketing/HeroSection";
import type { TemplateItem } from "../../types/ui.types";
import CtaBanner from "../../components/marketing/CtaBanner";
import CtaButton from "../../components/ui/CtaButton";
import TemplateShowcaseSection from "../../sections/marketing/template/TemplateShowcaseSection";

// Template Data
const templates: TemplateItem[] = [
  {
    id: "1",
    name: "Minimal",
    category: "Minimal",
    tags: ["Clean", "Developer", "Simple"],
    description: "Bersih dan fokus. Biarkan karya kamu yang bicara.",
    badge: "Paling Populer",
    views: "8.2k",
    isPro: false,
    lines: [
      { w: "75%", h: 10 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "2",
    name: "Editorial",
    category: "Creative",
    tags: ["Bold", "Designer", "Typography"],
    description: "Layout magazine dengan tipografi kuat dan berani.",
    badge: "Trending",
    views: "6.1k",
    isPro: false,
    lines: [
      { w: "90%", h: 14 },
      { w: "65%", h: 6 },
      { w: "40%", h: 6 },
    ],
  },
  {
    id: "3",
    name: "Grid",
    category: "Creative",
    tags: ["Gallery", "Visual", "Photographer"],
    description: "Berbasis grid untuk menampilkan portofolio visual.",
    views: "4.5k",
    isPro: false,
    lines: [
      { w: "55%", h: 8 },
      { w: "70%", h: 6 },
      { w: "45%", h: 6 },
    ],
  },
  {
    id: "4",
    name: "Résumé",
    category: "Professional",
    tags: ["Corporate", "Business", "Formal"],
    description: "Profesional dan terstruktur. Cocok untuk fresh graduate.",
    badge: "Baru",
    views: "3.4k",
    isPro: false,
    lines: [
      { w: "60%", h: 8 },
      { w: "80%", h: 6 },
      { w: "55%", h: 6 },
    ],
  },
  {
    id: "5",
    name: "Mono",
    category: "Minimal",
    tags: ["Monochrome", "Writer", "Blogger"],
    description: "Monokrom dan tenang. Ideal untuk penulis & peneliti.",
    views: "2.9k",
    isPro: true,
    lines: [
      { w: "70%", h: 8 },
      { w: "55%", h: 6 },
      { w: "65%", h: 6 },
    ],
  },
  {
    id: "6",
    name: "Studio",
    category: "Professional",
    tags: ["Agency", "Bold", "Freelancer"],
    description: "Berkarakter kuat. Tampil beda dari ribuan pelamar.",
    views: "2.1k",
    isPro: true,
    lines: [
      { w: "85%", h: 12 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "7",
    name: "Slate",
    category: "Professional",
    tags: ["Modern", "Corporate"],
    description: "Modern dan profesional. Layout dua kolom yang terorganisir.",
    views: "3.9k",
    isPro: false,
    lines: [
      { w: "65%", h: 9 },
      { w: "45%", h: 6 },
      { w: "70%", h: 6 },
    ],
  },
  {
    id: "8",
    name: "Dusk",
    category: "Minimal",
    tags: ["Dark", "Elegant"],
    description: "Dark mode elegan dengan tipografi yang kuat dan premium.",
    badge: "Baru",
    views: "2.1k",
    isPro: true,
    lines: [
      { w: "80%", h: 11 },
      { w: "60%", h: 6 },
      { w: "50%", h: 6 },
    ],
  },
  {
    id: "9",
    name: "Bloom",
    category: "Creative",
    tags: ["Pastel", "Playful"],
    description:
      "Warna lembut dan playful. Untuk illustrator dan content creator.",
    views: "5.5k",
    isPro: false,
    lines: [
      { w: "72%", h: 9 },
      { w: "55%", h: 6 },
      { w: "62%", h: 6 },
    ],
  },
];

// Categories Template
const categories = ["Semua", "Minimal", "Creative", "Professional"];

export default function TemplatePage() {
  return (
    <div
      id="template-page"
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
          tagline="Template"
          title="Pilih template"
          italicTitle="langsung jadi."
          description="template siap pakai, dirancang oleh designer profesional untuk berbagai industri."
          templatesCount={templates.length}
        />

        <TemplateShowcaseSection
          templates={templates}
          categories={categories}
        />

        {/* Cta Banner */}
        <CtaBanner
          tag="Belum yakin?"
          title="Coba dulu,"
          italicTitle=" gratis selamanya."
          description="Daftar gratis dan mulai pakai template mana saja."
          classname="py-16 max-w-5xl mx-auto px-6"
          motionDivClassname="rounded-2xl p-10 text-center relative overflow-hidden"
        >
          <CtaButton
            title="Mulai Gratis →"
            route="/register"
            backgroundColor="rgba(255,255,255,0.9)"
            textColor="text-[#0a0a0f]"
          />
        </CtaBanner>
      </div>
    </div>
  );
}
