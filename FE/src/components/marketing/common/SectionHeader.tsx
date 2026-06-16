import { motion } from "motion/react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  label: string;
  titleGradient?: string;
  isCenterHeader?: boolean;
}

export default function SectionHeader({
  title,
  titleGradient,
  description,
  label,
  isCenterHeader = false,
}: SectionHeaderProps) {
  return (
    <>
      {isCenterHeader ? (
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
              {label}
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
            {title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {titleGradient}
            </span>
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 max-w-xl mx-auto"
            >
              {description}
            </motion.p>
          )}
        </div>
      ) : (
        <div className="mb-14 md:mb-20 bg-[#070e1b] w-screen ml-[calc(50%-50vw)] px-38 py-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[2px] w-8 bg-blue-600"></div>
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">
              {label}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-6 leading-[1.2] tracking-tight"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            {title} <br className="hidden md:block" />
            <span className="text-slate-500">{titleGradient}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-3xl"
          >
            {description}
          </motion.p>
        </div>
      )}
    </>
  );
}
