import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRightIcon } from "lucide-react";
import { Boxes } from "@/components/ui/background-boxes";

export default function CTASection() {
  return (
    <section className="min-h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      {/* Radial mask overlay */}
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Animated boxes background */}
      <Boxes />

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
        }}
        className="mt-8 bg-gradient-to-br from-white to-slate-400 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl z-30"
        style={{
          fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
        }}
      >
        Siap Dikenal di <br />{" "}
        <span className="text-slate-500">Dunia Digital?</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.4,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-4 text-center text-slate-400 max-w-xl mx-auto text-base md:text-lg z-30 px-4"
      >
        Bergabunglah dengan mahasiswa, freelancer, dan profesional yang telah
        melesatkan personal brand mereka. Hak untuk tampil luar biasa, sekarang
        sungguh bisa dijangkau.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.5,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-10 mb-10 flex flex-col sm:flex-row items-center gap-4 z-30"
      >
        <HoverBorderGradient
          containerClassName="rounded-full"
          as="button"
          className="bg-black text-white flex items-center space-x-2 hover:brightness-110 transition-all cursor-pointer"
        >
          <span>Mulai Gratis Sekarang</span>
          <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </HoverBorderGradient>
      </motion.div>
    </section>
  );
}
