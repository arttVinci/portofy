import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconArrowRight } from "@tabler/icons-react";

export default function CTASection() {
  return (
    <section className="relative bg-[#050a15] overflow-hidden">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          style={{
            fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
          }}
        >
          Siap Dikenal di <br /> Dunia Digital?
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-4 text-center text-slate-400 max-w-xl mx-auto text-base md:text-lg"
        >
          Bergabunglah dengan mahasiswa, freelancer, dan profesional yang telah
          melesatkan personal brand mereka. Hak untuk tampil luar biasa, 
          sekarang sungguh bisa dijangkau.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-black text-white flex items-center space-x-2"
          >
            <span>Mulai Gratis Sekarang</span>
            <IconArrowRight size={18} stroke={2} />
          </HoverBorderGradient>
        </motion.div>
      </LampContainer>
    </section>
  );
}
