import { motion } from "motion/react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

// Visual Component Helpers
const FeatureImage = ({ src, color }: { src: string; color: string }) => (
  <div className={`h-full w-full bg-gradient-to-br ${color} flex items-center justify-center`}>
    <div className="absolute inset-0 bg-[size:24px_24px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="relative z-10 p-8 rounded-2xl bg-[#091122] shadow-2xl border border-white/10"
    >
      <div className="text-8xl">{src}</div>
    </motion.div>
  </div>
);

const AnimatedChart = () => (
  <div className="h-full w-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center p-12">
    <div className="w-full h-full flex items-end justify-center gap-4 border-b-2 border-l-2 border-white/20 pb-4 pl-4 pt-10">
      {[40, 70, 45, 90, 60].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          animate={{ height: `${h}%` }}
          transition={{ duration: 0.8, delay: i * 0.1, type: "spring" }}
          className="w-12 bg-white/80 rounded-t-lg shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        />
      ))}
    </div>
  </div>
);

const AnimatedRobot = () => (
  <div className="h-full w-full bg-gradient-to-br from-blue-500 to-cyan-500 flex flex-col items-center justify-center gap-6">
    <div className="absolute inset-0 bg-[size:24px_24px] [background-image:radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)]" />
    <motion.div
      animate={{ y: [-10, 10, -10] }}
      transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      className="text-8xl relative z-10"
    >
      🤖
    </motion.div>
    <motion.div
        initial={{ width: 0 }}
        animate={{ width: "80%" }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="h-2 bg-white/50 rounded-full"
    />
    <motion.div
        initial={{ width: 0 }}
        animate={{ width: "60%" }}
        transition={{ duration: 1.2, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
        className="h-2 bg-white/30 rounded-full"
    />
  </div>
);

const WindowMockup = ({ icon, color }: { icon: string; color: string }) => (
    <div className={`h-full w-full bg-gradient-to-br ${color} p-8 flex items-center justify-center`}>
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full max-h-64 bg-slate-900 rounded-lg shadow-2xl overflow-hidden border border-white/10 flex flex-col"
        >
            <div className="bg-slate-800 h-8 flex items-center px-3 gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
            </div>
            <div className="flex-1 flex items-center justify-center relative">
               <div className="absolute inset-0 bg-slate-900/50 flex flex-col justify-center items-center gap-4">
                  <span className="text-6xl drop-shadow-lg">{icon}</span>
                  <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                      <motion.div 
                          className="h-full bg-blue-500"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                      />
                  </div>
               </div>
            </div>
        </motion.div>
    </div>
);


const CONTENT = [
  {
    title: "Template Premium",
    description: "Pilih dari 10+ template modern yang responsif dan profesional. Tinggal pilih, isi konten, dan portofolio kamu siap go live tanpa perlu repot mengatur layout sendiri.",
    content: <WindowMockup icon="🎨" color="from-rose-500 to-orange-500" />,
  },
  {
    title: "AI-Powered",
    description: "Buntu saat menulis bio atau deskripsi project? Biarkan AI Portofy yang bekerja. Generate deskripsi profesional dan ringkasan karir secara otomatis, langsung sesuai dengan bahasamu.",
    content: <AnimatedRobot />,
  },
  {
    title: "Skor & Analisis",
    description: "Dapatkan feedback instan layaknya HR profesional. AI kami menganalisis kelengkapan portofoliomu dan memberikan rekomendasi perbaikan agar makin standout.",
    content: <AnimatedChart />,
  },
  {
    title: "CV Parser Otomatis",
    description: "Mager ngisi form portofolio dari nol? Upload CV-mu dan biarkan sistem memparsing datanya secara otomatis untuk langsung mengisi profilmu.",
    content: <FeatureImage src="📄" color="from-emerald-500 to-teal-500" />,
  },
  {
    title: "Tanpa Coding",
    description: "Fokus pada apa yang penting: memamerkan karyamu. Tidak perlu menyentuh satu baris kode pun. Interface visual kami mempermudah semuanya untuk siapapun.",
    content: <WindowMockup icon="✍️" color="from-fuchsia-500 to-pink-500" />,
  },
  {
    title: "Instant Publish",
    description: "Selesai edit? Langsung publish ke web dengan subdomain gratis (username.portofy.id). Siap dibagikan ke LinkedIn, client, atau HR dalam satu klik.",
    content: <FeatureImage src="🚀" color="from-blue-500 to-indigo-500" />,
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
