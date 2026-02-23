import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: smoothEase, delay },
});

const cards = [
  {
    name: "Ariana K.",
    role: "Product Designer",
    color: "#f0f4ff",
    accent: "#6366f1",
    rotate: -6,
    x: -180,
    y: 20,
    delay: 0.5,
    avatar: "AK",
    avatarBg: "#e0e7ff",
    tags: ["UI/UX", "Figma", "Research"],
    views: "2.4k",
  },
  {
    name: "Marcus T.",
    role: "Full Stack Dev",
    color: "#f0fdf4",
    accent: "#22c55e",
    rotate: 3,
    x: 0,
    y: -10,
    delay: 0.35,
    avatar: "MT",
    avatarBg: "#dcfce7",
    tags: ["React", "Node.js", "AWS"],
    views: "5.1k",
  },
  {
    name: "Yuki S.",
    role: "Motion Designer",
    color: "#fff7ed",
    accent: "#f97316",
    rotate: 7,
    x: 175,
    y: 30,
    delay: 0.55,
    avatar: "YS",
    avatarBg: "#ffedd5",
    tags: ["After Effects", "3D", "Branding"],
    views: "3.8k",
  },
];

const steps = [
  { num: "01", label: "Pilih template" },
  { num: "02", label: "Isi profil kamu" },
  { num: "03", label: "Publish & share" },
];

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen bg-[#fafaf9] overflow-hidden flex flex-col items-center"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 900,
          height: 500,
          background:
            "radial-gradient(ellipse at center, rgba(99,102,241,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center pt-32 px-6 max-w-4xl mx-auto">
        {/* Badge */}
        <motion.div {...fadeUp(0.1)}>
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[12px] font-semibold tracking-wide border"
            style={{
              backgroundColor: "#ede9fe",
              borderColor: "#c4b5fd",
              color: "#5b21b6",
            }}
          >
            <span className="size-1.5 rounded-full bg-violet-500 animate-pulse inline-block" />
            No-code · Instant · Gratis untuk mulai
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.2)}
          className="mt-6 text-[58px] leading-[1.08] font-normal tracking-[-0.03em] text-gray-900"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Portfolio kamu,{" "}
          <span
            className="italic"
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            tanpa satu baris kode.
          </span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.3)}
          className="mt-5 text-[17px] text-gray-500 leading-[1.65] max-w-xl"
        >
          Pilih template, isi profil kamu, dan portfolio siap ditampilkan ke
          dunia — dalam hitungan menit, bukan minggu.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="mt-8 flex items-center gap-3">
          <a
            href="#"
            className="px-6 py-3 rounded-xl text-[15px] font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-200 hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0"
            style={{ background: "linear-gradient(135deg, #6366f1, #7c3aed)" }}
          >
            Buat portfolio gratis →
          </a>
          <a
            href="#"
            className="px-6 py-3 rounded-xl text-[15px] font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-150"
          >
            Lihat contoh
          </a>
        </motion.div>

        <motion.div {...fadeUp(0.45)} className="mt-10 flex items-center gap-6">
          {steps.map((s, i) => (
            <div key={s.num} className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-indigo-400">
                  {s.num}
                </span>
                <span className="text-[13px] text-gray-500">{s.label}</span>
              </div>
              {i < steps.length - 1 && (
                <span className="text-gray-300 text-xs">──</span>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="relative z-10 mt-20 w-full max-w-5xl mx-auto px-6">
        <div
          className="relative flex justify-center items-end"
          style={{ height: 280 }}
        >
          {cards.map((card) => (
            <motion.div
              key={card.name}
              initial={{ opacity: 0, y: 60, rotate: card.rotate }}
              animate={{ opacity: 1, y: 0, rotate: card.rotate }}
              transition={{
                duration: 0.8,
                ease: smoothEase,
                delay: card.delay,
              }}
              whileHover={{
                y: -12,
                rotate: 0,
                scale: 1.03,
                zIndex: 20,
                transition: { duration: 0.35, ease: smoothEase },
              }}
              className="absolute cursor-pointer"
              style={{ x: card.x }}
            >
              <div
                className="w-56 rounded-2xl p-4 border border-white/80"
                style={{
                  backgroundColor: card.color,
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.8) inset",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="size-10 rounded-full flex items-center justify-center text-[13px] font-bold"
                    style={{
                      backgroundColor: card.avatarBg,
                      color: card.accent,
                    }}
                  >
                    {card.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-gray-800 leading-tight">
                      {card.name}
                    </p>
                    <p className="text-[11px] text-gray-500">{card.role}</p>
                  </div>
                </div>

                <div
                  className="w-full h-20 rounded-lg mb-3 overflow-hidden"
                  style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                >
                  <div className="flex gap-1 p-2">
                    {[40, 70, 55].map((w, i) => (
                      <div
                        key={i}
                        className="h-2 rounded-full"
                        style={{
                          width: `${w}%`,
                          backgroundColor: card.accent,
                          opacity: 0.3 + i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <div className="px-2 flex gap-1 mt-1">
                    {[3, 5, 4].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded"
                        style={{
                          height: h * 6,
                          backgroundColor: card.accent,
                          opacity: 0.12 + i * 0.06,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {card.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{
                        backgroundColor: `${card.accent}18`,
                        color: card.accent,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    {card.views} views
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                    <span className="text-[10px] text-gray-400">Live</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: smoothEase, delay: 0.8 }}
          className="mt-6 mx-auto h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
          style={{ maxWidth: 600 }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="relative z-10 mt-12 pb-24 flex flex-col items-center gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            {["#6366f1", "#f97316", "#22c55e", "#ec4899", "#eab308"].map(
              (c, i) => (
                <div
                  key={i}
                  className="size-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: c, zIndex: 5 - i }}
                />
              ),
            )}
          </div>
          <p className="text-[13px] text-gray-500">
            <span className="font-semibold text-gray-800">12,000+</span> kreator
            sudah punya portfolio mereka
          </p>
        </div>

        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className="size-4 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="ml-1.5 text-[13px] text-gray-500">
            4.9 dari 2,000+ review
          </span>
        </div>
      </motion.div>
    </section>
  );
}
