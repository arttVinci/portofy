import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Blog posts data ───────────────────────────────────────────────────────────
const posts = [
  {
    id: 1,
    slug: "cara-bikin-portfolio-yang-dilirik-rekruter",
    title: "Cara Bikin Portfolio yang Dilirik Rekruter dalam 3 Detik Pertama",
    excerpt:
      "Rekruter rata-rata menghabiskan kurang dari 10 detik untuk memutuskan apakah sebuah portfolio layak dibaca lebih lanjut. Ini cara kamu memenangkan 3 detik pertama itu.",
    category: "Tips",
    readTime: "5 menit",
    date: "24 Feb 2025",
    featured: true,
    accentColor: "#6366f1",
    tags: ["Portfolio", "Rekruter", "Tips"],
  },
  {
    id: 2,
    slug: "kesalahan-umum-portfolio-designer",
    title: "7 Kesalahan Portfolio yang Bikin Designer Muda Ditolak",
    excerpt:
      "Dari terlalu banyak proyek sampai tidak ada CTA — ini kesalahan yang paling sering kami lihat dari ribuan portfolio yang masuk.",
    category: "Tips",
    readTime: "7 menit",
    date: "18 Feb 2025",
    featured: false,
    accentColor: "#f59e0b",
    tags: ["Designer", "Kesalahan", "Portfolio"],
  },
  {
    id: 3,
    slug: "personal-branding-untuk-developer",
    title: "Personal Branding untuk Developer: Lebih dari Sekadar GitHub",
    excerpt:
      "GitHub bagus, tapi tidak cukup. Developer yang menonjol punya narasi yang jelas tentang siapa mereka dan masalah apa yang mereka selesaikan.",
    category: "Karir",
    readTime: "6 menit",
    date: "12 Feb 2025",
    featured: false,
    accentColor: "#10b981",
    tags: ["Developer", "Personal Branding"],
  },
  {
    id: 4,
    slug: "template-portfolio-terbaik-2025",
    title: "Template Portfolio Terbaik 2025: Mana yang Cocok untuk Kamu?",
    excerpt:
      "Bukan semua template cocok untuk semua profesi. Panduan memilih template berdasarkan industri, pengalaman, dan tujuan kamu.",
    category: "Template",
    readTime: "4 menit",
    date: "5 Feb 2025",
    featured: false,
    accentColor: "#ec4899",
    tags: ["Template", "2025", "Panduan"],
  },
  {
    id: 5,
    slug: "custom-domain-portfolio-panduan",
    title: "Panduan Custom Domain untuk Portfolio: Step by Step",
    excerpt:
      "namakamu.com terdenuh jauh lebih profesional dari portofolio.id/namakamu. Ini cara set up custom domain dalam 10 menit.",
    category: "Tutorial",
    readTime: "8 menit",
    date: "28 Jan 2025",
    featured: false,
    accentColor: "#06b6d4",
    tags: ["Domain", "Tutorial", "Setup"],
  },
  {
    id: 6,
    slug: "portfolio-untuk-freelancer",
    title: "Portfolio Freelancer yang Bikin Klien Langsung Mau Bayar",
    excerpt:
      "Freelancer dan job seeker butuh portfolio yang berbeda. Klien ingin tahu satu hal: bisakah kamu menyelesaikan masalah mereka?",
    category: "Karir",
    readTime: "5 menit",
    date: "20 Jan 2025",
    featured: false,
    accentColor: "#f97316",
    tags: ["Freelancer", "Klien", "Tips"],
  },
  {
    id: 7,
    slug: "seo-portfolio-agar-ditemukan-google",
    title: "SEO untuk Portfolio: Biar Rekruter Nemuin Kamu di Google",
    excerpt:
      "Portfolio yang SEO-friendly bisa jadi sumber traffic pasif yang terus mengirim peluang — bahkan saat kamu tidur.",
    category: "Tutorial",
    readTime: "6 menit",
    date: "14 Jan 2025",
    featured: false,
    accentColor: "#8b5cf6",
    tags: ["SEO", "Google", "Traffic"],
  },
  {
    id: 8,
    slug: "studi-kasus-dapat-kerja-lewat-portfolio",
    title: "Studi Kasus: Bagaimana Rizky Dapat 3 Interview dari 1 Portfolio",
    excerpt:
      "Dalam 10 hari setelah live, Rizky Aditya mendapat 3 undangan interview dari perusahaan berbeda. Ini yang dia lakukan berbeda dari kandidat lain.",
    category: "Studi Kasus",
    readTime: "9 menit",
    date: "7 Jan 2025",
    featured: false,
    accentColor: "#14b8a6",
    tags: ["Studi Kasus", "Interview", "Sukses"],
  },
];

const categories = [
  "Semua",
  "Tips",
  "Karir",
  "Tutorial",
  "Template",
  "Studi Kasus",
];

// ── Color block per category ──────────────────────────────────────────────────
function PostColorBlock({
  color,
  size = "sm",
}: {
  color: string;
  size?: "sm" | "lg";
}) {
  const h = size === "lg" ? 220 : 140;
  return (
    <div
      className="w-full relative overflow-hidden"
      style={{ height: h, backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      {/* Gradient swatch */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${color}22 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color}44, transparent)`,
        }}
      />
      {/* Abstract lines */}
      <div className="absolute inset-0 flex flex-col justify-center px-5 gap-2.5 opacity-30">
        {[80, 55, 65].map((w, i) => (
          <div
            key={i}
            className="rounded-full"
            style={{
              width: `${w}%`,
              height: i === 0 ? 8 : 4,
              backgroundColor: color,
              opacity: 1 - i * 0.25,
            }}
          />
        ))}
      </div>
      {/* Category dot */}
      <div
        className="absolute top-4 right-4 size-2 rounded-full"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// ── Featured post ─────────────────────────────────────────────────────────────
function FeaturedPost({ post }: { post: (typeof posts)[0] }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: smooth }}
      className="block rounded-2xl overflow-hidden group cursor-pointer"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      whileHover={{ y: -3 }}
    >
      <div className="grid lg:grid-cols-2">
        {/* Visual side */}
        <div
          className="relative overflow-hidden min-h-[260px]"
          style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${post.accentColor}20 0%, transparent 65%)`,
            }}
          />
          {/* Large decorative lines */}
          <div className="absolute inset-0 flex flex-col justify-center px-10 gap-4">
            {[75, 50, 62, 40].map((w, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500 group-hover:opacity-100"
                style={{
                  width: `${w}%`,
                  height: i === 0 ? 12 : 6,
                  backgroundColor: post.accentColor,
                  opacity: 0.15 + i * 0.04,
                }}
              />
            ))}
          </div>
          {/* Featured label */}
          <div className="absolute top-5 left-5">
            <span
              className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide"
              style={{
                backgroundColor: `${post.accentColor}20`,
                color: post.accentColor,
                border: `1px solid ${post.accentColor}40`,
              }}
            >
              ✦ Featured
            </span>
          </div>
        </div>

        {/* Content side */}
        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                className="px-2.5 py-1 rounded-full text-[10px] font-semibold"
                style={{
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {post.category}
              </span>
              <span
                className="flex items-center gap-1 text-[11px]"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                <Clock size={10} /> {post.readTime}
              </span>
            </div>

            <h2
              className="text-[26px] font-normal leading-[1.25] tracking-[-0.02em] text-white mb-4 group-hover:opacity-80 transition-opacity"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {post.title}
            </h2>

            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between mt-6">
            <div
              className="flex items-center gap-1.5 text-[11px]"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              <Calendar size={10} />
              {post.date}
            </div>
            <span
              className="flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-200 group-hover:gap-2.5"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              Baca artikel <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

// ── Post card ─────────────────────────────────────────────────────────────────
function PostCard({ post, index }: { post: (typeof posts)[0]; index: number }) {
  return (
    <motion.a
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: smooth, delay: index * 0.05 }}
      className="block rounded-2xl overflow-hidden group cursor-pointer h-full"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.12)" } as any}
    >
      {/* Color block */}
      <PostColorBlock color={post.accentColor} size="sm" />

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.4)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {post.category}
          </span>
          <span
            className="flex items-center gap-1 text-[10px]"
            style={{ color: "rgba(255,255,255,0.22)" }}
          >
            <Clock size={9} /> {post.readTime}
          </span>
        </div>

        <h3
          className="text-[15px] font-normal leading-[1.35] tracking-[-0.01em] mb-2.5 group-hover:opacity-75 transition-opacity"
          style={{
            color: "rgba(255,255,255,0.85)",
            fontFamily: "'Instrument Serif', serif",
          }}
        >
          {post.title}
        </h3>

        <p
          className="text-[12px] leading-relaxed mb-4"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          {post.excerpt.length > 100
            ? post.excerpt.slice(0, 100) + "..."
            : post.excerpt}
        </p>

        <div className="flex items-center justify-between">
          <span
            className="text-[10px]"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            {post.date}
          </span>
          <span
            className="flex items-center gap-1 text-[11px] font-medium transition-all duration-200 group-hover:gap-2"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Baca <ArrowRight size={11} />
          </span>
        </div>
      </div>
    </motion.a>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const featuredPost = posts.find((p) => p.featured)!;
  const regularPosts = posts.filter((p) => !p.featured);

  const filteredPosts = useMemo(() => {
    if (activeCategory === "Semua") return regularPosts;
    return regularPosts.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <div
      id="blog"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* ── HERO ── */}
        <div className="pt-40 pb-14">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: smooth }}
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Blog
          </motion.p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: smooth, delay: 0.06 }}
              className="text-[52px] font-normal leading-[1.08] tracking-[-0.03em] text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Insight untuk{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                karir yang lebih baik.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-[14px] leading-relaxed max-w-[220px] mb-1"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Tips portfolio, personal branding, dan karir kreatif.
            </motion.p>
          </div>
        </div>

        {/* ── FEATURED POST ── */}
        <div className="mb-12">
          <FeaturedPost post={featuredPost} />
        </div>

        {/* ── DIVIDER + CATEGORY FILTER ── */}
        <div
          className="flex items-center justify-between gap-4 mb-8 pb-6"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-[12px] font-semibold"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Artikel terbaru
          </p>
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-150 cursor-pointer"
                style={{
                  backgroundColor:
                    activeCategory === cat
                      ? "rgba(255,255,255,0.09)"
                      : "transparent",
                  color:
                    activeCategory === cat
                      ? "rgba(255,255,255,0.85)"
                      : "rgba(255,255,255,0.3)",
                  border:
                    activeCategory === cat
                      ? "1px solid rgba(255,255,255,0.14)"
                      : "1px solid transparent",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── POSTS GRID ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
                {filteredPosts.map((post, i) => (
                  <PostCard key={post.id} post={post} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <p className="text-[32px] mb-3">📭</p>
                <p
                  className="text-[15px] font-medium mb-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  Belum ada artikel di kategori ini
                </p>
                <button
                  onClick={() => setActiveCategory("Semua")}
                  className="mt-4 px-4 py-2 rounded-xl text-[12px] font-medium cursor-pointer transition-all duration-150"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.06)",
                    color: "rgba(255,255,255,0.5)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Lihat semua artikel
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── NEWSLETTER CTA ── */}
        <div className="pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: smooth }}
            className="relative rounded-2xl overflow-hidden px-8 py-12 flex flex-col sm:flex-row items-center justify-between gap-6"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-0"
              style={{
                width: 400,
                height: 200,
                background:
                  "radial-gradient(ellipse at top left, rgba(99,102,241,0.08) 0%, transparent 65%)",
              }}
            />
            <div className="relative">
              <p
                className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-2"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Newsletter
              </p>
              <h3
                className="text-[24px] font-normal leading-[1.2] tracking-[-0.02em] text-white mb-1"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Tips karir langsung ke inbox.
              </h3>
              <p
                className="text-[13px]"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Artikel terbaru, tips portfolio, dan insight industri — setiap
                minggu.
              </p>
            </div>
            <div className="relative flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <input
                type="email"
                placeholder="email@kamu.com"
                className="flex-1 sm:w-52 px-4 py-2.5 rounded-xl text-[13px] outline-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(255,255,255,0.75)",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")
                }
              />
              <button
                className="shrink-0 px-4 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#0a0a0f",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
