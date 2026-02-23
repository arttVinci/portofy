import { motion } from "framer-motion";
import StepCard from "../../components/ui/StepCard";
import CardSwap, { Card } from "../../components/ui/CardSwap";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: smooth, delay },
});

export default function HowItWorksSection() {
  return (
    <section
      className="py-28 bg-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div {...fadeUp()} className="text-center mb-40">
          <span className="inline-block text-[12px] font-semibold uppercase tracking-[0.1em] text-indigo-500 mb-4">
            Cara kerja
          </span>
          <h2
            className="text-[42px] font-normal tracking-[-0.025em] text-gray-900 leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Dari nol ke online <span className="italic">dalam 3 langkah</span>
          </h2>
          <p className="mt-4 text-[15px] text-gray-500 max-w-lg mx-auto leading-relaxed">
            Gak perlu tau coding, design, atau hosting. Cukup ikutin langkahnya.
          </p>
        </motion.div>

        {/* CardSwap — 19:6 ratio */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center">
          <div
            style={{
              width: 760,
              height: 240,
              position: "relative",
              marginBottom: 120,
            }}
          >
            <CardSwap
              width={760}
              height={240}
              cardDistance={48}
              verticalDistance={55}
              delay={3000}
              pauseOnHover
              skewAmount={4}
              easing="elastic"
            >
              <Card>
                <StepCard
                  step="01"
                  title="Pilih template favoritmu"
                  desc="Puluhan template siap pakai — dari minimalis, kreatif, hingga profesional. Tinggal klik, langsung preview."
                  icon="🎨"
                  bg="linear-gradient(135deg, #f0f4ff 0%, #e8eeff 100%)"
                  accent="#6366f1"
                />
              </Card>
              <Card>
                <StepCard
                  step="02"
                  title="Isi profil & karya kamu"
                  desc="Form sederhana untuk nama, bio, skill, dan upload proyek. Drag & drop foto, isi deskripsi — selesai."
                  icon="✏️"
                  bg="linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)"
                  accent="#16a34a"
                />
              </Card>
              <Card>
                <StepCard
                  step="03"
                  title="Publish & share ke dunia"
                  desc="Satu klik publish. Dapat link unik portfoliomu — bagikan ke recruiter, klien, atau LinkedIn."
                  icon="🚀"
                  bg="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
                  accent="#ea580c"
                />
              </Card>
            </CardSwap>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
