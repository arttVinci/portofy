"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const content = [
  {
    eyebrow: "MANAGEMENT",
    title: "Dashboard Builder",
    description:
      "Atur semua konten portofoliomu dari satu tempat yang terpusat. Dengan Dashboard Builder, kamu bisa mengelola proyek, pengalaman, skill, dan informasi pribadimu secara mudah dan efisien. Tidak perlu coding — cukup isi, atur, dan publikasikan.",
    shortDescription:
      "Kelola proyek, skill, dan pengalamanmu langsung dari satu kendali khusus tanpa perlu coding.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--blue-400),var(--blue-600))] text-white text-3xl font-bold">
        Dashboard Builder
      </div>
    ),
  },
  {
    eyebrow: "DESIGN",
    title: "Pilih Template",
    description:
      "Tampilkan dirimu dengan gaya terbaik menggunakan 10+ template modern dan responsif yang siap pakai. Setiap template dirancang khusus untuk membantu portofoliomu tampil profesional di semua perangkat.",
    shortDescription:
      "Akses belasan template premium siap pakai yang diracik khusus agar portofoliomu menawan di semua layar.",
    content: (
      <div className="flex h-full w-full items-center justify-center text-white bg-slate-900">
        <img
          src="/linear.webp"
          className="h-full w-full object-cover opacity-90"
          alt="linear board demo"
        />
      </div>
    ),
  },
  {
    eyebrow: "INTELLIGENCE",
    title: "AI Description",
    description:
      "Biarkan AI menuliskan deskripsi profesional untukmu secara otomatis. Cukup masukkan informasi dasar tentang pengalamanmu, dan AI kami akan menghasilkan teks yang menarik, relevan, dan siap digunakan.",
    shortDescription:
      "Buntu menulis bio? Informasikan dasarnya, dan AI merangkai kata-katanya hingga siap terbit seketika.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--violet-400),var(--purple-600))] text-white text-3xl font-bold">
        AI Description
      </div>
    ),
  },
  {
    eyebrow: "ANALYTICS",
    title: "Portfolio Analyzer",
    description:
      "Dapatkan skor kelayakan portofoliomu beserta rekomendasi cerdas dari AI. Platform kami menganalisis struktur, konten, dan kelengkapan profilmu, lalu memberikan saran konkret agar portofoliomu semakin menarik.",
    shortDescription:
      "Dapatkan feedback instan, nilai kelayakan, dan rekomendasi langsung dari AI agar portofoliomu memikat HR.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--amber-400),var(--yellow-500))] text-white text-3xl font-bold">
        Portfolio Analyzer
      </div>
    ),
  },
  {
    eyebrow: "AUTOMATION",
    title: "CV / Resume Parser",
    description:
      "Upload CV atau resume-mu, dan biarkan sistem kami mengisi profilmu secara otomatis. Tidak perlu mengisi ulang data dari nol — parser AI kami membaca dokumenmu dan langsung memetakan informasi.",
    shortDescription:
      "Upload CV-mu dan biarkan sistem mem-parsing datanya ke dalam portofolio baru kamu dalam hitungan detik.",
    content: (
      <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--red-400),var(--rose-500))] text-white text-3xl font-bold">
        CV / Resume Parser
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
        {/* Header */}
        <div className="mb-14 md:mb-20 px-4 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-[2px] w-8 bg-blue-600"></div>
            <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">
              Kenapa Memilih Kami?
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
            Kami Bekerja Layaknya <br className="hidden md:block" />
            <span className="text-slate-500">Personal Asisten Masa Depan.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 text-sm md:text-base leading-relaxed max-w-lg"
          >
            Bukan sekadar website builder biasa. Ini adalah mesin cerdas yang
            siap membantu karirmu meloncat lebih tinggi secara otomatis.
          </motion.p>
        </div>

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
                      : "bg-transparent border-transparent hover:bg-slate-800/40 opacity-70 hover:opacity-100"
                  )}
                >
                  {/* Left blue active indicator line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tab-indicator"
                      className="absolute left-0 top-6 bottom-6 w-1 bg-blue-500 rounded-r-md"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
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
