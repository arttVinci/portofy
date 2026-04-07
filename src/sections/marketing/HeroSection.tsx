import { motion } from "motion/react";
import { useRef, useEffect, useState, useCallback } from "react";
import { IconArrowRight, IconPlayerPlay } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";

import FeatureCard from "@/components/marketing/hero/FeatureCard";
import ConnectorLines from "@/components/marketing/hero/ConnectorLines";
import Background from "@/components/marketing/hero/background";

import { CARDS } from "@/contants/home/visual-card";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rects, setRects] = useState<Record<string, DOMRect>>({});
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null);
  const [linesReady, setLinesReady] = useState(false);

  useEffect(() => {
    const update = () => {
      if (containerRef.current)
        setContainerRect(containerRef.current.getBoundingClientRect());
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const handleRect = useCallback(
    (id: string, rect: DOMRect) => {
      setRects((prev) => {
        const next = { ...prev, [id]: rect };
        if (Object.keys(next).length === CARDS.length && containerRect)
          setLinesReady(true);
        return next;
      });
    },
    [containerRect],
  );

  return (
    <section className="relative mx-auto p-14 min-h-screen flex items-center bg-[#070e1b] overflow-hidden">
      {/* Grid Background */}
      <Background />

      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
        {/* LEFT */}
        <div className="flex flex-col items-start justify-center text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)] animate-pulse" />
            <span
              className="text-blue-200 text-xs font-semibold tracking-widest uppercase"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Platform Portfolio Builder untuk Kreator Indonesia
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl font-bold text-white leading-[1.1] tracking-tight mb-6"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            <LayoutTextFlip
              text="Buat Portfolio Kamu, Tunjukan "
              words={["Pada Mereka", "Karya Terbaikmu", "Potensi Dirimu"]}
              className="text-white mr-2"
              wordClassName="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-300"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-base md:text-[1.05rem] max-w-200 mb-8 leading-[1.75]"
            style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
          >
            Portofy membantu mahasiswa, freelancer, dan kreator Indonesia tampil
            profesional di dunia digital — dengan AI yang nulis, menganalisis,
            dan memberi saran langsung untuk portofoliomu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-black text-white flex items-center space-x-2 cursor-pointer"
            >
              <span>Mulai Gratis</span>
              <IconArrowRight size={18} stroke={2} />
            </HoverBorderGradient>
            <button
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold text-sm hover:bg-slate-800/50 transition-all duration-300"
              style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
            >
              <IconPlayerPlay size={18} stroke={1.5} />
              Lihat Cara Kerjanya
            </button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6 text-[12px] text-slate-600 tracking-wide"
            style={{ fontFamily: "var(--font-dm, 'DM Sans', sans-serif)" }}
          >
            Gratis selamanya · Tidak perlu baris code · Instant publish
          </motion.p>
        </div>

        {/* RIGHT — cards + lines */}
        <div ref={containerRef} className="relative hidden lg:flex h-150">
          <ConnectorLines
            rects={rects}
            containerRect={containerRect}
            visible={linesReady}
          />
          {CARDS.map((card, i) => (
            <FeatureCard
              key={card.id}
              card={card}
              onRect={handleRect}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
