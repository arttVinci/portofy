import { motion } from "motion/react";
import { Timeline } from "@/components/ui/timeline";
import {
  IconUserPlus,
  IconLayout,
  IconPencilStar,
  IconRocket,
  IconPlayerPlay,
} from "@tabler/icons-react";

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

function VideoPlayer({
  videoSrc,
  label,
  stepIndex,
}: {
  videoSrc: string;
  label: string;
  stepIndex: number;
}) {
  const accentColors = [
    "border-blue-500/30",
    "border-emerald-500/30",
    "border-violet-500/30",
    "border-amber-500/30",
  ];
  const glowColors = [
    "shadow-blue-500/10",
    "shadow-emerald-500/10",
    "shadow-violet-500/10",
    "shadow-amber-500/10",
  ];
  const dotColors = [
    "bg-blue-400",
    "bg-emerald-400",
    "bg-violet-400",
    "bg-amber-400",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`rounded-2xl border ${accentColors[stepIndex]} bg-white/[0.02] overflow-hidden backdrop-blur-sm shadow-xl ${glowColors[stepIndex]}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <div className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-4">
          <div className="h-5 rounded-md bg-white/[0.04] border border-white/[0.06] flex items-center justify-center">
            <span className="text-[10px] text-slate-600">{label}</span>
          </div>
        </div>
      </div>

      {/* Video area */}
      <div className="relative aspect-video bg-gradient-to-br from-slate-900 to-slate-950">
        {videoSrc ? (
          <video
            className="w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : (
          /* Placeholder — animated visual */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            {/* Animated bg pattern */}
            <div className="absolute inset-0 bg-[size:24px_24px] [background-image:radial-gradient(circle,rgba(59,130,246,0.06)_1px,transparent_1px)]" />

            {/* Animated circles */}
            <div className="relative">
              <motion.div
                className={`absolute -inset-4 rounded-full ${dotColors[stepIndex]} opacity-20 blur-xl`}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className={`relative flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm cursor-pointer`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <IconPlayerPlay
                  className="h-7 w-7 text-white ml-0.5"
                  fill="currentColor"
                />
              </motion.div>
            </div>

            <span className="text-xs text-slate-600 mt-1">
              Video segera hadir
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  const timelineData = STEPS.map((step, idx) => ({
    title: step.title,
    content: (
      <div className="grid md:grid-cols-2 gap-6 items-start">
        <div>
          <p className="text-slate-400 text-sm md:text-base leading-relaxed">
            {step.description}
          </p>
        </div>
        <VideoPlayer
          videoSrc={step.videoSrc}
          label={step.videoLabel}
          stepIndex={idx}
        />
      </div>
    ),
  }));

  return (
    <section
      id="how-it-works"
      className="relative bg-[#070e1b] py-28 overflow-hidden"
    >
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
              Cara Kerja
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Alur Mudah{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Membangun Portofolio
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Hanya butuh beberapa menit dan 4 tahapan simpel untuk menghasilkan dan memplubikasikan profil digital profesional kamu.
          </motion.p>
        </div>

        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
