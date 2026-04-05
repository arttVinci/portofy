import { motion } from "motion/react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Dashboard Builder",
    description:
      "Atur semua konten portofoliomu dari satu tempat yang terpusat. Dengan Dashboard Builder, kamu bisa mengelola proyek, pengalaman, skill, dan informasi pribadimu secara mudah dan efisien. Tidak perlu coding — cukup isi, atur, dan publikasikan.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-400),var(--blue-600))] text-white">
        Dashboard Builder
      </div>
    ),
  },
  {
    title: "Pilih Template",
    description:
      "Tampilkan dirimu dengan gaya terbaik menggunakan 10+ template modern dan responsif yang siap pakai. Setiap template dirancang khusus untuk membantu portofoliomu tampil profesional di semua perangkat, dari desktop hingga smartphone.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white">
        <img
          src="/linear.webp"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    title: "AI Description",
    description:
      "Biarkan AI menuliskan deskripsi profesional untukmu secara otomatis. Cukup masukkan informasi dasar tentang pengalamanmu, dan AI kami akan menghasilkan teks yang menarik, relevan, dan siap digunakan — menghemat waktu dan membuatmu tampil lebih percaya diri.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--violet-400),var(--purple-600))] text-white">
        AI Description
      </div>
    ),
  },
  {
    title: "Portfolio Analyzer",
    description:
      "Dapatkan skor kelayakan portofoliomu beserta rekomendasi cerdas dari AI. Platform kami menganalisis struktur, konten, dan kelengkapan profilmu, lalu memberikan saran konkret agar portofoliomu semakin menarik di mata recruiter dan klien.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--amber-400),var(--yellow-500))] text-white">
        Portfolio Analyzer
      </div>
    ),
  },
  {
    title: "CV / Resume Parser",
    description:
      "Upload CV atau resume-mu, dan biarkan sistem kami mengisi profilmu secara otomatis. Tidak perlu mengisi ulang data dari nol — parser AI kami membaca dokumenmu dan langsung memetakan informasi ke portofoliomu dalam hitungan detik.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--red-400),var(--rose-500))] text-white">
        CV / Resume Parser
      </div>
    ),
  },
];

export default function WhySection() {
  return (
    <section className="relative bg-[#070e1b] py-28 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[20%] left-0 h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[50%] right-0 h-[50%] w-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
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
              Kenapa Memilih Kami?
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-5 leading-tight"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Kami Bekerja Layaknya{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              Personal Asisten Masa Depan
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto text-base md:text-lg leading-relaxed"
          >
            Bukan sekadar website builder biasa. Ini adalah mesin cerdas yang
            siap membantu karirmu meloncat lebih tinggi.
          </motion.p>
        </div>

        {/* Sticky Scroll Component */}
        <div className="w-full py-4">
          <StickyScroll content={content} />
        </div>
      </div>
    </section>
  );
}
