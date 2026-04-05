import { motion } from "motion/react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const CONTENT = [
  {
    title: "Template Premium",
    description: "Pilih dari 10+ template modern yang responsif dan profesional. Tinggal pilih, isi konten, dan portofolio kamu siap go live tanpa perlu repot mengatur layout sendiri.",
    content: "🎨",
  },
  {
    title: "AI-Powered",
    description: "Buntu saat menulis bio atau deskripsi project? Biarkan AI Portofy yang bekerja. Generate deskripsi profesional dan ringkasan karir secara otomatis, langsung sesuai dengan bahasamu.",
    content: "🤖",
  },
  {
    title: "Skor & Analisis",
    description: "Dapatkan feedback instan layaknya HR profesional. AI kami menganalisis kelengkapan portofoliomu dan memberikan rekomendasi perbaikan agar makin standout.",
    content: "📊",
  },
  {
    title: "CV Parser Otomatis",
    description: "Mager ngisi form portofolio dari nol? Upload CV-mu dan biarkan sistem memparsing datanya secara otomatis untuk langsung mengisi profilmu.",
    content: "📄",
  },
  {
    title: "Tanpa Coding",
    description: "Fokus pada apa yang penting: memamerkan karyamu. Tidak perlu menyentuh satu baris kode pun. Interface visual kami mempermudah semuanya untuk siapapun.",
    content: "⚡",
  },
  {
    title: "Instant Publish",
    description: "Selesai edit? Langsung publish ke web dengan subdomain gratis (username.portofy.id). Siap dibagikan ke LinkedIn, client, atau HR dalam satu klik.",
    content: "🚀",
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
            Bukan sekadar website builder biasa. Ini adalah mesin cerdas yang siap membantu karirmu meloncat lebih tinggi.
          </motion.p>
        </div>

        {/* Sticky Scroll Component */}
        <div className="rounded-3xl border border-white/[0.06] bg-white/[0.01] p-4 backdrop-blur-sm -mx-4 md:mx-0">
          <StickyScroll content={CONTENT} />
        </div>
      </div>
    </section>
  );
}
