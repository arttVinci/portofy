import { Timeline } from "@/components/ui/timeline";
import {
  IconUserPlus,
  IconLayout,
  IconPencilStar,
  IconRocket,
} from "@tabler/icons-react";
import SectionHeader from "@/components/marketing/common/SectionHeader";

const STEPS = [
  {
    title: "1. Registrasi & Onboarding",
    icon: <IconUserPlus className="h-6 w-6 text-blue-400" />,
    description:
      "Daftar cepat via platform. Opsional: unggah dokumen lamamu untuk memanfaatkan AI CV Parser dan meng-auto-fill profil portofoliomu secara instan.",
    videoSrc: "",
    videoPoster: "",
    videoLabel: "Demo: Registrasi & Auto-fill Profil",
  },
  {
    title: "2. Pilih Template & Kustomisasi",
    icon: <IconLayout className="h-6 w-6 text-emerald-400" />,
    description:
      "Pilah dari galeri template modern. Kustomisasi menyeluruh orientasi layout, paduan warna, hingga tipografi secara presisi—sepenuhnya tanpa coding.",
    videoSrc: "",
    videoPoster: "",
    videoLabel: "Demo: Kustomisasi Drag & Drop",
  },
  {
    title: "3. Konten & Eksekusi Kecerdasan Buatan",
    icon: <IconPencilStar className="h-6 w-6 text-violet-400" />,
    description:
      "Lengkapi riwayat karirmu. Gunakan AI Description Generator untuk menyulap draf sederhana jadi teks profesional, serta berdialoglah dengan AI Consultation untuk saran strategis.",
    videoSrc: "",
    videoPoster: "",
    videoLabel: "Demo: AI Generative Tools",
  },
  {
    title: "4. Analisa & Publikasi Final",
    icon: <IconRocket className="h-6 w-6 text-amber-400" />,
    description:
      "Jalankan instruksi AI Portfolio Analyzer demi meraih Skor Kelayakan. Saat matang, luncurkan portofoliomu ke publik menggunakan subdomain istimewa yang kami sediakan.",
    videoSrc: "",
    videoPoster: "",
    videoLabel: "Demo: Analyzer & Publish Live",
  },
];

export default function HowItWorksSection() {
  const timelineData = STEPS.map((step) => ({
    title: step.title,
    content: (
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {step.description}
          </p>
        </div>
        <div className="w-full h-64 bg-slate-800 rounded-lg"></div>
      </div>
    ),
  }));

  return (
    <section
      id="how-it-works"
      className="relative bg-[#070e1b] py-28 overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <SectionHeader
          title="Alur Mudah"
          titleGradient="Membangun Portofolio"
          description="Hanya butuh beberapa menit dan 4 tahapan simpel untuk menghasilkan dan memplubikasikan profil digital profesional kamu."
          label="Cara Kerja"
          isCenterHeader={true}
        />

        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
