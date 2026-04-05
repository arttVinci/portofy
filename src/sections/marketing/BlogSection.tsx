import { useState } from "react";
import { motion } from "motion/react";
import { IconClock, IconUser } from "@tabler/icons-react";

const BLOG_POSTS = [
  {
    title: "5 Tips Bikin Portfolio yang Menarik HR",
    excerpt:
      "Pelajari cara menyusun portofolio yang langsung menarik perhatian HR dan recruiter di perusahaan impianmu.",
    author: "Sarah Putri",
    readTime: "5 min",
    gradient: "from-blue-500/20 to-violet-500/20",
    borderColor: "border-blue-500/20",
    tag: "Tips",
  },
  {
    title: "Cara Menulis Deskripsi Project yang Kuat",
    excerpt:
      "Deskripsi project yang baik bisa jadi pembeda utama. Simak framework yang bisa langsung kamu pakai.",
    author: "Adi Nugroho",
    readTime: "4 min",
    gradient: "from-emerald-500/20 to-cyan-500/20",
    borderColor: "border-emerald-500/20",
    tag: "Writing",
  },
  {
    title: "Skill yang Harus Ada di Portfolio Desainer",
    excerpt:
      "Dari Figma sampai motion design — inilah skill yang paling dicari klien dan perusahaan di 2025.",
    author: "Maya Rizky",
    readTime: "6 min",
    gradient: "from-amber-500/20 to-rose-500/20",
    borderColor: "border-amber-500/20",
    tag: "Career",
  },
  {
    title: "Dari Nol ke Portfolio Profesional dalam 1 Jam",
    excerpt:
      "Step-by-step panduan menggunakan Portofy untuk membangun portfolio yang memukau dari awal.",
    author: "Reza Fahlevi",
    readTime: "8 min",
    gradient: "from-violet-500/20 to-pink-500/20",
    borderColor: "border-violet-500/20",
    tag: "Tutorial",
  },
  {
    title: "Bagaimana AI Mengubah Cara Kita Menulis Bio",
    excerpt:
      "Eksplorasi bagaimana AI description generator membantu kreator menulis bio yang engaging.",
    author: "Dinda Amelia",
    readTime: "3 min",
    gradient: "from-rose-500/20 to-orange-500/20",
    borderColor: "border-rose-500/20",
    tag: "AI",
  },
  {
    title: "Portfolio vs CV: Mana yang Lebih Penting?",
    excerpt:
      "Kapan kamu butuh portfolio dan kapan CV sudah cukup? Panduan untuk fresh graduate.",
    author: "Budi Hartono",
    readTime: "5 min",
    gradient: "from-cyan-500/20 to-blue-500/20",
    borderColor: "border-cyan-500/20",
    tag: "Career",
  },
];

export default function BlogSection() {
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null);

  return (
    <section className="relative bg-[#070e1b] py-24 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="text-violet-300 text-xs font-semibold tracking-widest uppercase">
              Blog & Community
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)" }}
          >
            Belajar dari{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-300">
              Komunitas
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-400 max-w-xl mx-auto"
          >
            Tips, pengalaman, dan langkah terbaik dari sesama kreator Indonesia.
          </motion.p>
        </div>

        {/* Cards Grid — Focus Card style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {BLOG_POSTS.map((post, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onMouseEnter={() => setFocusedIdx(i)}
              onMouseLeave={() => setFocusedIdx(null)}
              className={`group relative rounded-2xl border ${post.borderColor} bg-white/[0.02] p-4 backdrop-blur-sm transition-all duration-500 cursor-pointer ${
                focusedIdx !== null && focusedIdx !== i
                  ? "opacity-50 scale-[0.97] blur-[1px]"
                  : "opacity-100 scale-100"
              } hover:bg-white/[0.05] hover:shadow-xl`}
            >
              {/* Gradient banner */}
              <div
                className={`h-24 rounded-xl bg-gradient-to-br ${post.gradient} mb-4 flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-[size:24px_24px] [background-image:linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
                <span className="relative z-10 rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm border border-white/10">
                  {post.tag}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-sm font-bold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2 min-h-[40px]">
                {post.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-[10px] text-slate-500">
                <div className="flex items-center gap-1.5 truncate">
                  <IconUser className="h-3 w-3 shrink-0" />
                  <span className="truncate">{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <IconClock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
