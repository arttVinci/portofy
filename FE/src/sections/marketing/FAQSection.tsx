import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PlusIcon, MinusIcon } from "lucide-react";
import SectionHeader from "@/components/marketing/common/SectionHeader";

const FAQS = [
  {
    q: "Apakah Portofy benar-benar gratis?",
    a: "Ya! Semua fitur utama Portofy — termasuk template, AI description, dan subdomain — sepenuhnya gratis tanpa batas waktu. Tidak perlu kartu kredit, tidak ada trial period.",
  },
  {
    q: "Bagaimana cara kerja AI Description?",
    a: "AI Description menggunakan teknologi language model untuk menganalisis project dan skill-mu, lalu menghasilkan deskripsi profesional yang siap pakai. Kamu tinggal review dan edit sesuai kebutuhan.",
  },
  {
    q: "Apakah saya bisa menggunakan domain sendiri?",
    a: "Saat ini Portofy menyediakan subdomain gratis (username.portofy.id). Fitur custom domain sedang dalam pengembangan dan akan segera tersedia.",
  },
  {
    q: "Data saya aman gak di Portofy?",
    a: "Absolutely. Data kamu disimpan dengan enkripsi standar industri. Kami tidak pernah menjual atau membagikan data pribadi pengguna ke pihak ketiga.",
  },
  {
    q: "Bisa diakses dari mobile?",
    a: "Tentu! Semua template Portofy didesain responsive — portofolio kamu akan terlihat sempurna di desktop, tablet, maupun smartphone.",
  },
  {
    q: "Apa bedanya Portofy dengan Linktree atau website builder lainnya?",
    a: "Portofy dirancang khusus untuk portfolio profesional, bukan sekadar link page. Fitur AI description, portfolio analyzer, dan CV parser membuat Portofy jauh lebih powerful untuk personal branding.",
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-[#070e1b] py-24 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-3xl">
        {/* Section Header */}
        <SectionHeader
          title="Pertanyaan"
          titleGradient="Umum"
          label="FAQ"
          isCenterHeader={true}
        />

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((faq, i) => {
            const isOpen = openIdx === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-500/30 bg-blue-500/[0.04] shadow-[0_0_30px_rgba(59,130,246,0.08)]"
                    : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15]"
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="flex items-center justify-between w-full text-left p-5 md:p-6 cursor-pointer"
                >
                  <span
                    className={`text-sm md:text-base font-semibold transition-colors pr-4 ${
                      isOpen ? "text-blue-300" : "text-white"
                    }`}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex-shrink-0"
                  >
                    {isOpen ? (
                      <MinusIcon className="h-5 w-5 text-blue-400" />
                    ) : (
                      <PlusIcon className="h-5 w-5 text-slate-500" />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 md:px-6 md:pb-6 text-sm text-slate-400 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
