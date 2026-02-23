import { motion } from "framer-motion";
import StepCard from "../../components/ui/StepCard";
import CardSwap, { Card } from "../../components/ui/CardSwap";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: smooth, delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 32 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease: smooth, delay },
});

const steps = [
  {
    num: "01",
    label: "Pilih template",
    desc: "Klik template yang kamu suka, langsung preview hasilnya.",
  },
  {
    num: "02",
    label: "Isi profil & karya",
    desc: "Form simpel — nama, bio, skill, upload foto proyek. Drag & drop.",
  },
  {
    num: "03",
    label: "Publish & share",
    desc: "Satu klik publish. Dapat link unik, langsung bisa dibagikan.",
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="py-28 bg-white overflow-hidden"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 xl:gap-24">
          <div className="w-full lg:w-105 shrink-0 flex flex-col">
            <motion.span
              {...fadeLeft(0)}
              className="inline-block text-[12px] font-semibold uppercase tracking-widest text-indigo-500 mb-4"
            >
              Cara kerja
            </motion.span>

            <motion.h2
              {...fadeLeft(0.08)}
              className="text-[40px] font-normal tracking-[-0.025em] text-gray-900 leading-[1.15] mb-5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Dari nol ke portfolio online,{" "}
              <span className="italic">dalam hitungan menit.</span>
            </motion.h2>

            <motion.p
              {...fadeLeft(0.14)}
              className="text-[15px] text-gray-500 leading-[1.7] mb-10"
            >
              Gak perlu tau coding, design, atau urusan hosting. Platform kami
              yang handle semua yang teknis — kamu cukup fokus nunjukkin karya
              terbaik ke dunia. Daftar, pilih template, isi profil, dan
              portfolio kamu udah siap online.
            </motion.p>

            <div className="relative flex flex-col gap-6">
              <div className="absolute left-4.25 top-9 bottom-9 w-px bg-indigo-100" />

              {steps.map((s, i) => (
                <motion.div
                  key={s.num}
                  {...fadeLeft(0.2 + i * 0.09)}
                  className="flex items-start gap-4 relative"
                >
                  <div className="relative shrink-0 size-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center z-10">
                    <span className="text-[11px] font-bold text-indigo-500">
                      {s.num}
                    </span>
                  </div>
                  <div className="pt-1">
                    <p className="text-[14px] font-semibold text-gray-800 leading-tight">
                      {s.label}
                    </p>
                    <p className="text-[13px] text-gray-400 mt-1 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div {...fadeLeft(0.48)} className="mt-10">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[14px] font-semibold text-white shadow-md shadow-indigo-100 hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200"
                style={{
                  background: "linear-gradient(135deg, #6366f1, #7c3aed)",
                }}
              >
                Coba sekarang — gratis
                <svg
                  className="size-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            {...fadeRight(0.22)}
            className="flex-1 flex items-center justify-center w-full"
          >
            <div
              style={{
                width: 480,
                height: 380,
                position: "relative",
              }}
            >
              <CardSwap
                width={620}
                height={295}
                cardDistance={44}
                verticalDistance={50}
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
      </div>
    </section>
  );
}
