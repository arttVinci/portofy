import { motion } from "motion/react";
import { IconCircleCheck, IconSparkles } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const PREMIUM_FEATURES = [
  "Akses Penuh Seluruh Template Eksklusif",
  "Akses Penuh AI Consultation & Description Generator",
  "Analisis Kelayakan Detail via Portfolio Analyzer",
  "Penyimpanan File & Aset Media Tak Terbatas",
  "Bebas Indikasi Watermark 'Made with Portofy'",
];

export default function PremiumSection() {
  return (
    <section
      id="langganan"
      className="relative bg-[#050a15] pb-24 pt-10 overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 max-w-6xl">
        {/* The Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[2.5rem] border border-amber-500/20 bg-[#0a1122]/80 p-8 md:p-12 lg:p-16 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col md:flex-row gap-10 lg:gap-20 items-center ring-1 ring-white/10"
        >
          {/* Card subtle flare */}
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent,rgba(245,158,11,0.08)_50%,transparent)] pointer-events-none" />

          {/* Left Side: Pricing & CTA */}
          <div className="flex-1 w-full text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 mb-6">
              <IconSparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">
                Portofy Premium
              </span>
            </div>

            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-6 leading-[1.15]"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Tanpa Batas. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
                Kendali Total.
              </span>
            </h2>

            <p className="text-slate-400 text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto md:mx-0">
              Tingkatkan standar personal branding-mu. Bebaskan kreativitas dan
              dapatkan akses tak terbatas ke seluruh fitur alat bertenaga AI
              kami.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2"
              >
                <span className="font-semibold text-sm">Upgrade Sekarang</span>
              </HoverBorderGradient>
            </div>
          </div>

          {/* Right Side: Features */}
          <div className="w-full md:w-[50%] lg:w-[45%] shrink-0 relative z-10">
            <div className="rounded-3xl bg-white/[0.02] border border-white/[0.06] p-6 lg:p-8 backdrop-blur-md">
              <h3 className="text-white font-semibold mb-6 flex items-center gap-2 text-lg">
                Hak Eksklusif Premium:
              </h3>
              <ul className="space-y-4 md:space-y-5">
                {PREMIUM_FEATURES.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-start gap-3.5"
                  >
                    <IconCircleCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
                    <span className="text-slate-300 text-sm md:text-base leading-snug">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
