import { motion } from "motion/react";
import {
  IconArrowRight,
  IconSparkles,
  IconBrain,
  IconFileSearch,
  IconChartBar,
  IconMessageChatbot,
  IconTemplate,
  IconWorld,
  IconSchool,
  IconBriefcase,
  IconPalette,
  IconUserSearch,
  IconBuildingStore,
  IconCertificate,
  IconHeartHandshake,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import FooterSection from "@/sections/marketing/FooterSection";

/* ───────────────────────────────── DATA ───────────────────────────────── */

const PROBLEMS = [
  {
    title: "Keterbatasan Teknis",
    desc: "Sebagian besar kalangan umum tidak memiliki kemampuan coding namun tetap ingin memiliki portofolio yang profesional dan personal.",
  },
  {
    title: "Biaya Jasa Tinggi",
    desc: "Menyewa jasa developer atau desainer web membutuhkan investasi yang tidak sedikit dan tidak efisien untuk kebutuhan personal.",
  },
  {
    title: "Minimnya Platform Lokal",
    desc: "Platform portfolio builder yang ada bersifat generik dan tidak dirancang untuk konteks, kebutuhan, serta bahasa pengguna Indonesia.",
  },
  {
    title: "Kurangnya Panduan",
    desc: "Pengguna sering bingung menyusun konten portofolio yang efektif — apa yang harus ditulis dan bagaimana menarik perhatian rekruter.",
  },
  {
    title: "Tidak Ada Validasi",
    desc: "Tidak ada mekanisme untuk mengetahui apakah portofolio sudah layak dan kompetitif atau masih memerlukan perbaikan.",
  },
];

const FEATURES = [
  {
    icon: IconBrain,
    title: "AI Description Generator",
    desc: "Masukkan informasi dasar tentang proyek, dan AI menghasilkan deskripsi profesional yang siap pakai.",
    gradient: "from-blue-500 to-cyan-400",
    iconColor: "text-blue-400",
  },
  {
    icon: IconMessageChatbot,
    title: "AI Consultation",
    desc: "Berdialog dengan AI untuk mendapatkan saran strategi portofolio, konten, dan tips meningkatkan daya tarik profil.",
    gradient: "from-violet-500 to-purple-400",
    iconColor: "text-violet-400",
  },
  {
    icon: IconFileSearch,
    title: "CV Parser & Detector",
    desc: "Unggah CV-mu dan sistem AI akan mengekstrak informasi penting lalu mengisi template portofolio secara otomatis.",
    gradient: "from-emerald-500 to-teal-400",
    iconColor: "text-emerald-400",
  },
  {
    icon: IconChartBar,
    title: "Portfolio Analyzer",
    desc: "Dapatkan skor kelayakan portofolio, rekomendasi perbaikan spesifik, dan analisis kesesuaian dengan standar industri.",
    gradient: "from-amber-500 to-orange-400",
    iconColor: "text-amber-400",
  },
  {
    icon: IconTemplate,
    title: "Template Builder No-Code",
    desc: "Pilih dari galeri template modern dan responsif. Kustomisasi warna, font, dan layout tanpa coding — preview real-time.",
    gradient: "from-rose-500 to-pink-400",
    iconColor: "text-rose-400",
  },
  {
    icon: IconWorld,
    title: "Custom Domain & Hosting",
    desc: "Sub-domain gratis (username.portofy.id) dan integrasi custom domain untuk pengguna premium. Hosting dikelola platform.",
    gradient: "from-cyan-500 to-sky-400",
    iconColor: "text-cyan-400",
  },
];

const TARGET_USERS = [
  {
    icon: IconSchool,
    segment: "Mahasiswa",
    need: "Membangun portofolio akademik dan project kampus untuk magang atau kerja pertama.",
  },
  {
    icon: IconCertificate,
    segment: "Fresh Graduate",
    need: "Menampilkan pengalaman dan skill untuk menarik perhatian rekruter.",
  },
  {
    icon: IconBriefcase,
    segment: "Pekerja Profesional",
    need: "Memperbarui personal branding dan mempersiapkan career pivot.",
  },
  {
    icon: IconPalette,
    segment: "Freelancer & Kreator",
    need: "Menampilkan karya dan proyek kepada klien potensial.",
  },
  {
    icon: IconUserSearch,
    segment: "HR & Rekruter",
    need: "Memiliki profil profesional untuk memperkuat personal brand di industri.",
  },
  {
    icon: IconBuildingStore,
    segment: "Pengusaha & UMKM",
    need: "Menampilkan portofolio bisnis dan produk secara digital.",
  },
];

/* ─────────────────────────────── COMPONENT ─────────────────────────────── */

export default function AboutPage() {
  return (
    <>
      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-[#070e1b] overflow-hidden">
        {/* Dot grid */}
        <div className="absolute inset-0 bg-[size:32px_32px] [background-image:radial-gradient(circle,rgba(59,130,246,0.06)_1px,transparent_1px)] pointer-events-none" />

        {/* Glow orbs */}
        <motion.div
          className="absolute top-[15%] left-[10%] w-[500px] h-[500px] bg-blue-600/8 blur-[180px] rounded-full pointer-events-none"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-violet-600/8 blur-[160px] rounded-full pointer-events-none"
          animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-5 py-2 mb-8"
          >
            <IconHeartHandshake className="w-4 h-4 text-blue-400" />
            <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
              Tentang Portofy
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] tracking-tight"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Platform Portfolio Builder{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              untuk Kreator Indonesia
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            Portofy adalah platform SaaS yang memungkinkan siapa pun membangun
            portofolio profesional secara online —{" "}
            <span className="text-slate-200 font-medium">
              tanpa coding, didukung AI, dioptimalkan untuk Indonesia.
            </span>
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-14 flex flex-col items-center gap-2"
          >
            <span className="text-[11px] text-slate-600 uppercase tracking-widest">
              Kenali lebih dekat
            </span>
            <motion.div
              className="w-5 h-8 rounded-full border border-white/10 flex justify-center pt-1.5"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div className="w-1 h-2 rounded-full bg-blue-400/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ LATAR BELAKANG & MASALAH ═══════════════════ */}
      <section className="relative bg-[#050a15] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          {/* Latar Belakang */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mb-20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-blue-600" />
              <span className="text-blue-500 text-xs font-bold tracking-[0.2em] uppercase">
                Latar Belakang
              </span>
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-[44px] font-bold text-white mb-6 leading-[1.2] tracking-tight"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Kenapa Portofy{" "}
              <span className="text-slate-500">Harus Ada?</span>
            </h2>

            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl">
              Di era digital, kemampuan menampilkan diri secara profesional
              online bukan lagi nilai tambah — melainkan kebutuhan nyata. Namun
              membangun portofolio secara mandiri punya hambatan besar: tidak
              semua orang bisa coding, dan menyewa developer seringkali tidak
              efisien. Di Indonesia, platform yang khusus menyasar kreator lokal
              dengan pendekatan mudah, cerdas, dan terjangkau hampir tidak ada.
            </p>
          </motion.div>

          {/* Problem Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PROBLEMS.map((problem, i) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-5 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.04]"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <h3 className="text-sm font-bold text-white">
                    {problem.title}
                  </h3>
                </div>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {problem.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUSI — VISI & MISI ═══════════════════ */}
      <section className="relative bg-[#070e1b] py-24 lg:py-32 overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Solusi Kami
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Inilah{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Portofy
              </span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Platform berbasis web (SaaS) yang menyediakan layanan pembuatan
              portofolio digital secara mandiri. Pilih template, isi konten, dan
              publikasikan dalam hitungan menit — tanpa menulis satu baris kode
              pun.
            </p>
          </motion.div>

          {/* Visi & Misi Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Visi */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group relative rounded-3xl border border-blue-500/20 bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-[250px] h-[250px] bg-blue-500/8 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-[1px] mb-6">
                <div className="flex items-center justify-center w-full h-full rounded-[15px] bg-[#070e1b]">
                  <IconSparkles className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <h3
                className="relative z-10 text-xl md:text-2xl font-bold text-white mb-4"
                style={{
                  fontFamily:
                    "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Visi
              </h3>
              <p className="relative z-10 text-slate-400 text-sm md:text-base leading-relaxed">
                Memberdayakan setiap individu di Indonesia untuk{" "}
                <span className="text-slate-200 font-medium">
                  tampil profesional di dunia digital
                </span>{" "}
                — tanpa batas kemampuan teknis maupun finansial.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </motion.div>

            {/* Misi */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group relative rounded-3xl border border-violet-500/20 bg-white/[0.02] p-8 md:p-10 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.04] hover:shadow-2xl overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-[250px] h-[250px] bg-violet-500/8 blur-[100px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-400 p-[1px] mb-6">
                <div className="flex items-center justify-center w-full h-full rounded-[15px] bg-[#070e1b]">
                  <IconHeartHandshake className="w-6 h-6 text-violet-400" />
                </div>
              </div>
              <h3
                className="relative z-10 text-xl md:text-2xl font-bold text-white mb-4"
                style={{
                  fontFamily:
                    "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Misi
              </h3>
              <p className="relative z-10 text-slate-400 text-sm md:text-base leading-relaxed">
                Menyediakan platform portfolio builder yang{" "}
                <span className="text-slate-200 font-medium">
                  mudah, cerdas, dan terjangkau
                </span>{" "}
                bagi kalangan umum Indonesia — dengan pendekatan intuitif yang
                didukung kecerdasan buatan.
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-purple-400 opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FITUR UNGGULAN ═══════════════════ */}
      <section className="relative bg-[#050a15] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-[20%] left-0 w-[500px] h-[400px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[10%] right-0 w-[500px] h-[400px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Fitur Unggulan
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Diperkuat{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Kecerdasan Buatan
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Setiap fitur dirancang untuk memberi dampak nyata — dari menulis
              deskripsi, menganalisis portofolio, hingga konsultasi karir.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {FEATURES.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-7 backdrop-blur-sm transition-all duration-500 hover:bg-white/[0.05] hover:shadow-xl hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute -top-16 -right-16 w-[200px] h-[200px] bg-white/[0.02] blur-[80px] rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div
                  className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feat.gradient} p-[1px] mb-5`}
                >
                  <div className="flex items-center justify-center w-full h-full rounded-[11px] bg-[#050a15]">
                    <feat.icon className={`w-5 h-5 ${feat.iconColor}`} />
                  </div>
                </div>

                <h3
                  className="relative z-10 text-lg font-bold text-white mb-3 group-hover:text-blue-200 transition-colors duration-300"
                  style={{
                    fontFamily:
                      "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  }}
                >
                  {feat.title}
                </h3>

                <p className="relative z-10 text-slate-400 text-sm leading-relaxed">
                  {feat.desc}
                </p>

                <div
                  className={`absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r ${feat.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ TARGET PENGGUNA ═══════════════════ */}
      <section className="relative bg-[#070e1b] py-24 lg:py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/4 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Untuk Siapa
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Dirancang Untuk{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Semua Kalangan
              </span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              Dari mahasiswa hingga pengusaha — Portofy melayani siapapun yang
              ingin tampil profesional di dunia digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
            {TARGET_USERS.map((user, i) => (
              <motion.div
                key={user.segment}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="group flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-300 hover:border-blue-500/20 hover:bg-blue-500/[0.03]"
              >
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:bg-blue-500/15 transition-colors">
                  <user.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-blue-200 transition-colors">
                    {user.segment}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed">
                    {user.need}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ PEMBUAT ═══════════════════ */}
      <section className="relative bg-[#050a15] py-24 lg:py-32 overflow-hidden">
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[300px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="text-blue-300 text-xs font-semibold tracking-widest uppercase">
                Pembuat
              </span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Di Balik{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                Portofy
              </span>
            </h2>
          </motion.div>

          {/* Creator Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-12 backdrop-blur-sm overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-blue-500/6 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Avatar */}
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 p-[2px] shadow-xl flex-shrink-0">
                <div className="flex items-center justify-center w-full h-full rounded-full bg-[#0a1122]">
                  <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-cyan-300">
                    PR
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="text-center md:text-left flex-1">
                <h3
                  className="text-2xl md:text-3xl font-bold text-white mb-2"
                  style={{
                    fontFamily:
                      "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                  }}
                >
                  Putra Rizky
                </h3>
                <span className="inline-block text-sm font-semibold tracking-wide uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
                  Founder & Creator
                </span>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6 max-w-lg">
                  Visioner di balik Portofy. Percaya bahwa setiap orang berhak
                  tampil profesional di dunia digital — dan teknologi harus jadi
                  jembatan, bukan penghalang. Membangun Portofy dari nol dengan
                  misi memberdayakan kreator Indonesia.
                </p>

                {/* Socials */}
                <div className="flex justify-center md:justify-start gap-3">
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-500 hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 transition-all duration-300"
                  >
                    <IconBrandLinkedin size={18} stroke={1.5} />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-300"
                  >
                    <IconBrandGithub size={18} stroke={1.5} />
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-500 hover:text-pink-400 hover:border-pink-500/40 hover:bg-pink-500/10 transition-all duration-300"
                  >
                    <IconBrandInstagram size={18} stroke={1.5} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 opacity-20" />
          </motion.div>

          {/* Project Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              "© 2026 Portofy",
              "Versi 1.0",
              "April 2026",
              "Made in Indonesia 🇮🇩",
            ].map((tag) => (
              <span
                key={tag}
                className="text-xs text-slate-600 bg-white/[0.02] border border-white/[0.06] rounded-full px-4 py-1.5"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section className="relative bg-[#070e1b] py-24 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-[size:40px_40px] [background-image:radial-gradient(circle,rgba(59,130,246,0.04)_1px,transparent_1px)] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/6 blur-[180px] rounded-full pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.15]"
            style={{
              fontFamily:
                "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
            }}
          >
            Siap Tampil{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
              Profesional?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Portofy bukan sekadar platform portofolio — ini adalah hak untuk
            tampil luar biasa di dunia digital. Mulai gratis, tanpa kartu
            kredit, tanpa batas waktu.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a href="/auth/register">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="bg-black text-white flex items-center space-x-2 hover:brightness-110 transition-all cursor-pointer"
              >
                <span className="font-semibold">Mulai Gratis Sekarang</span>
                <IconArrowRight size={18} stroke={2} />
              </HoverBorderGradient>
            </a>

            <a
              href="/templates"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/[0.1] text-sm font-semibold text-slate-300 hover:text-white hover:border-white/[0.2] bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300"
            >
              Lihat Template
              <IconArrowRight
                size={16}
                stroke={2}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-8 text-xs text-slate-600"
          >
            Gratis selamanya • Tanpa kartu kredit • Setup dalam 5 menit
          </motion.p>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <FooterSection />
    </>
  );
}
