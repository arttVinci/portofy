import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import SectionHeader from "@/components/marketing/common/SectionHeader";

const content = [
  {
    eyebrow: "NO-CODE",
    title: "Template Builder",
    description:
      "Beragam pilihan template modern dan responsif dengan antarmuka editor drag-and-drop yang intuitif. Bebas melakukan kustomisasi terhadap skema warna, font, dan tipe layout tanpa coding.",
    shortDescription:
      "Pilih dari puluhan template gratis dan edit antarmukanya seketika dengan utilitas drag-and-drop.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-slate-900 border border-slate-800">
        <img
          src="/linear.webp"
          className="h-full w-full object-cover opacity-80"
          alt="Template Builder UI"
        />
      </div>
    ),
  },
  {
    eyebrow: "GENERATOR",
    title: "AI-Powered Description",
    description:
      "Pengguna cukup memasukkan informasi dasar tentang proyek atau pengalaman mereka, dan AI akan menghasilkan deskripsi yang profesional, menarik, dan sesuai konteks. Fitur ini membantu pengguna yang kesulitan mengartikulasikan pencapaian mereka dalam kata-kata yang tepat.",
    shortDescription:
      "Cukup masukkan informasi dasar, dan AI akan merangkai deskripsi profesional yang menarik dan kaya konteks.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-400),var(--blue-600))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        AI Description Generator
      </div>
    ),
  },
  {
    eyebrow: "AUTOMATION",
    title: "CV / Resume Parser",
    description:
      "Pengguna dapat mengunggah CV atau resume mereka, dan sistem AI akan secara otomatis mengekstrak informasi penting seperti pengalaman, pendidikan, skill, lalu mengisi profil secara otonom.",
    shortDescription:
      "Upload dokumen lamamu dan biarkan AI mengekstrak metadatanya sekaligus mendeteksi otomatis gap pada profilmu.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--rose-400),var(--red-500))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        CV / Resume Parser
      </div>
    ),
  },
  {
    eyebrow: "ANALYTICS",
    title: "Portfolio Analyzer",
    description:
      "Setelah portofolio selesai dibuat, AI akan melakukan analisis mendalam dan memberikan skor kelayakan portofolio (Portfolio Score), analisis kesesuaian industri, serta flag item yang perlu diperbaiki.",
    shortDescription:
      "Dapatkan skor kelayakan dan analisis mendalam AI demi memperkuat nilai saing portofoliomu.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--amber-400),var(--orange-500))] text-white text-3xl font-bold p-8 text-center drop-shadow-lg">
        Portfolio Analyzer
      </div>
    ),
  },
];

export default function WhySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative bg-[#070e1b] py-20 lg:py-28 overflow-hidden">
      {/* Background glow lines */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <div className="absolute -top-[20%] left-0 h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[50%] right-0 h-[50%] w-[50%] rounded-full bg-violet-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-7xl">
        {/* Section Header */}
        <SectionHeader
          title="Kenapa Memilih"
          titleGradient="PortofId"
          description="Memungkinkan siapa pun membangun portofolio profesional secara online tanpa perlu keahlian coding sama sekali. Pendekatan intuitif yang dioptimalkan untuk pengguna Indonesia."
          label="Kenapa Memilih"
          isCenterHeader={false}
        />

        {/* Custom Tabs Layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 px-4">
          {/* Left Side: Tab List */}
          <div className="flex flex-col gap-3 w-full lg:w-5/12 shrink-0">
            {content.map((item, index) => {
              const isActive = activeTab === index;
              return (
                <div
                  key={index}
                  onMouseEnter={() => setActiveTab(index)}
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    "cursor-pointer p-6 rounded-2xl border transition-all duration-300 relative",
                    isActive
                      ? "bg-slate-800/80 border-slate-700 shadow-lg"
                      : "bg-transparent border-transparent hover:bg-slate-800/40 opacity-70 hover:opacity-100",
                  )}
                >
                  {/* Left blue active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute left-0 top-6 bottom-6 w-1 bg-blue-500 rounded-r-md"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <h3 className="text-xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Side: Tab Content Viewer */}
          <div className="w-full lg:w-7/12 flex flex-col lg:sticky lg:top-32 self-start">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col bg-slate-900 border border-slate-800/50 p-8 rounded-[2rem] shadow-2xl"
              >
                {/* Content Header */}
                <div className="mb-6">
                  <span className="text-blue-500 text-[10px] font-bold tracking-widest uppercase mb-2 block">
                    {content[activeTab].eyebrow}
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {content[activeTab].title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {content[activeTab].shortDescription}
                  </p>
                </div>

                {/* Content Visual */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-slate-700/50 bg-[#0c1322] shadow-inner mt-4">
                  {content[activeTab].content}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
