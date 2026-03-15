import { useRef } from "react";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Star,
  Github,
  Linkedin,
  Instagram,
  Mail,
} from "lucide-react";
import {
  SiTypescript,
  SiGo,
  SiPhp,
  SiLaravel,
  SiReact,
  SiDocker,
  SiGithub,
  SiMysql,
  SiTailwindcss,
  SiPostman,
} from "@icons-pack/react-simple-icons";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.65, ease: smooth, delay },
});

// ── Values ────────────────────────────────────────────────────────────────────
const values = [
  {
    num: "01",
    title: "Untuk semua, bukan hanya yang bisa coding",
    desc: "Portfolio profesional bukan hak eksklusif developer. Platform ini dibangun agar siapapun bisa tampil setara — tanpa nulis satu baris kode pun.",
  },
  {
    num: "02",
    title: "Kompleks di dalam, sederhana di luar",
    desc: "Di balik antarmuka yang simpel, ada sistem SaaS Multi-Tenant yang dibangun dengan serius — scalable, maintainable, dan bersih secara arsitektur.",
  },
  {
    num: "03",
    title: "End-to-end, dari database sampai UI",
    desc: "Dibangun seorang diri — mulai dari merancang schema database, membangun backend, hingga memoles setiap interaksi di frontend.",
  },
  {
    num: "04",
    title: "Bukan To-Do List App",
    desc: "Ini adalah implementasi nyata dari semua konsep Software Engineering — sistem SaaS yang kompleks, bukan sekadar proyek latihan.",
  },
];

// ── Testimonials ──────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Rizky Aditya",
    role: "UI/UX Designer · Bandung",
    text: "Dalam 3 hari portfolio gue udah live dan langsung gue share ke HRD. Minggu depannya ada 2 perusahaan yang reach out. Literally game changer.",
    rating: 5,
  },
  {
    name: "Sinta Maharani",
    role: "Fresh Graduate · Surabaya",
    text: "Dulu punya Notion page yang berantakan buat 'portfolio'. Setelah pakai ini, rekruter pertama yang lihat langsung bilang: 'Portfolionya bagus banget.'",
    rating: 5,
  },
  {
    name: "Dimas Prasetyo",
    role: "Fullstack Developer · Jakarta",
    text: "Gue developer dan tetap pilih pakai platform ini daripada bikin sendiri. Lebih cepat, tampilannya lebih bagus dari yang bisa gue buat dalam waktu singkat.",
    rating: 5,
  },
  {
    name: "Aulia Putri",
    role: "Motion Designer · Yogyakarta",
    text: "Akhirnya punya portfolio yang beneran mencerminkan skill gue. Template-nya clean, mudah dikustomisasi, dan loading-nya cepet banget.",
    rating: 5,
  },
  {
    name: "Fajar Nugroho",
    role: "Backend Engineer · Medan",
    text: "Setup-nya literally 10 menit. Gue pikir bakal ribet tapi ternyata gampang banget. Sekarang link portfolio ini ada di semua lamaran kerja gue.",
    rating: 5,
  },
  {
    name: "Nadya Kusuma",
    role: "Brand Designer · Bali",
    text: "Custom domain-nya mudah banget di-setup. Sekarang portfolio gue ada di namaku.com dan klien langsung notice bedanya.",
    rating: 5,
  },
  {
    name: "Hendra Wijaya",
    role: "Product Manager · Jakarta",
    text: "Tidak menyangka platform gratisnya sekomplet ini. Analytics-nya bantu gue tahu dari mana traffic datang dan konten mana yang paling dilihat rekruter.",
    rating: 5,
  },
  {
    name: "Tiara Amelia",
    role: "Content Creator · Surabaya",
    text: "Gue udah coba beberapa platform portfolio lain dan ini yang paling enak dipakai. Tidak ada yang ribet, tidak ada yang mubazir.",
    rating: 5,
  },
];

// ── Tech Stack ────────────────────────────────────────────────────────────────
const techStack = [
  {
    label: "TypeScript",
    icon: SiTypescript,
    color: "#3178C6",
    category: "Language",
  },
  { label: "PHP", icon: SiPhp, color: "#8892BF", category: "Language" },
  { label: "Go", icon: SiGo, color: "#00ACD7", category: "Language" },
  { label: "Laravel", icon: SiLaravel, color: "#FF2D20", category: "Backend" },
  { label: "MySQL", icon: SiMysql, color: "#4479A1", category: "Database" },
  { label: "React", icon: SiReact, color: "#61DAFB", category: "Frontend" },
  {
    label: "Tailwind",
    icon: SiTailwindcss,
    color: "#06B6D4",
    category: "Frontend",
  },
  { label: "Docker", icon: SiDocker, color: "#2496ED", category: "DevOps" },
  { label: "GitHub", icon: SiGithub, color: "#ffffff", category: "Tooling" },
  { label: "Postman", icon: SiPostman, color: "#FF6C37", category: "Tooling" },
];

// ── Social Links ──────────────────────────────────────────────────────────────
const socials = [
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/putra-rizky-nugraha",
  },
  {
    label: "GitHub",
    icon: Github,
    href: "https://github.com/arttVinci",
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/artt__r",
  },
  {
    label: "Email",
    icon: Mail,
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=traarzkyy97@gmail.com",
  },
];

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  };

  return (
    <div
      id="about"
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

      <div className="relative z-10">
        {/* ── HERO ── */}
        <section className="relative pt-40 pb-24 overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 900,
              height: 500,
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, transparent 60%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smooth }}
              className="flex items-center gap-3 mb-8"
            >
              <div
                className="h-px w-8"
                style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
              />
              <span
                className="text-[11px] font-semibold tracking-[0.15em] uppercase"
                style={{ color: "rgba(255,255,255,0.25)" }}
              >
                Tentang Kami
              </span>
            </motion.div>

            <div className="grid lg:grid-cols-[3fr_2fr] gap-16 items-end">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: smooth, delay: 0.06 }}
                className="text-white"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(40px, 5.5vw, 64px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.03em",
                }}
              >
                Portfolio profesional,{" "}
                <em style={{ color: "rgba(255,255,255,0.35)" }}>
                  tanpa harus coding.
                </em>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smooth, delay: 0.2 }}
                className="pb-2"
              >
                <p
                  className="text-[15px] leading-[1.8] mb-5"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  portof.id adalah inisiatif saya untuk memecahkan masalah umum:
                  Ingin punya portofolio website keren, tanpa harus mengoding /
                  menyewa jasa. Membangun platform SaaS Multi-Tenant yang
                  memungkinkan kalangan umum untuk membuat portofolio
                  profesional dengan berbagai tema secara dinamis. Proyek ini
                  dibangun dengan fokus pada Scalability, Maintainability, dan
                  Clean Code principles.
                </p>
                <div
                  className="flex items-center gap-1.5 text-[12px] mt-4"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  <MapPin size={11} />
                  Indonesia · Nov 2025 – Sekarang
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── DEVELOPER PROFILE ── */}
        <section
          className="py-24 max-w-5xl mx-auto px-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-14">
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
              }}
            >
              Tentang Developer
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
            {/* Left: Identity card */}
            <motion.div
              {...fadeUp(0.08)}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                backgroundColor: "#0e0e14",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
                }}
              />

              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-2xl mb-5"
                style={{
                  width: 52,
                  height: 52,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.6)",
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                }}
              >
                PR
              </div>

              <h3
                style={{
                  color: "rgba(255,255,255,0.88)",
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  marginBottom: 4,
                }}
              >
                Putra Rizky Nugraha
              </h3>
              <p
                className="text-[13px] mb-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Fullstack Developer · Software Engineering Student
              </p>
              <div
                className="flex items-center gap-1.5 text-[12px] mb-6"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                <MapPin size={10} />
                Universitas Terbuka · Sistem Informasi
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-2">
                {socials.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] transition-all duration-150"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        color: "rgba(255,255,255,0.38)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.08)";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.75)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.14)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.04)";
                        (e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.38)";
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.07)";
                      }}
                    >
                      <Icon size={12} />
                      {s.label}
                    </a>
                  );
                })}
              </div>

              {/* GDG badge */}
              <div
                className="mt-5 pt-5 flex items-center gap-2"
                style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
              >
                <span
                  className="text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.3)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  GDG Member
                </span>
                <span
                  className="text-[11px]"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  Google Developers Group
                </span>
              </div>
            </motion.div>

            {/* Right: Bio + Tech Stack */}
            <div className="flex flex-col gap-5">
              {/* Bio */}
              <motion.div
                {...fadeUp(0.14)}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  Tentang
                </p>
                <p
                  className="text-[14px] leading-[1.85]"
                  style={{ color: "rgba(255,255,255,0.45)" }}
                >
                  Seorang mahasiswa Sistem Informasi yang sedang dalam transisi
                  karir menjadi{" "}
                  <span style={{ color: "rgba(255,255,255,0.7)" }}>
                    Software Engineer profesional
                  </span>
                  . Passion-nya ada di Web Development — bukan sekadar menulis
                  syntax, tapi merancang arsitektur software yang robust,
                  scalable, dan user-centric.
                </p>
                <p
                  className="text-[14px] leading-[1.85] mt-3"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  Percaya pada prinsip{" "}
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    Clean Code
                  </span>{" "}
                  — kode bukan hanya perintah untuk mesin, tapi komunikasi antar
                  engineer. Aktif di komunitas{" "}
                  <span style={{ color: "rgba(255,255,255,0.6)" }}>
                    Google Developers Group (GDG)
                  </span>{" "}
                  untuk terus belajar, berbagi, dan berkolaborasi.
                </p>
              </motion.div>

              {/* Tech Stack */}
              <motion.div
                {...fadeUp(0.2)}
                className="rounded-2xl p-6"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <p
                  className="text-[11px] font-bold tracking-[0.1em] uppercase mb-4"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => {
                    const Icon = tech.icon;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.28,
                          ease: smooth,
                          delay: 0.22 + i * 0.04,
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 cursor-default"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.04)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          color: "rgba(255,255,255,0.5)",
                        }}
                        onMouseEnter={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.07)";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.13)";
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.85)";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.04)";
                          (e.currentTarget as HTMLElement).style.borderColor =
                            "rgba(255,255,255,0.07)";
                          (e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.5)";
                        }}
                      >
                        <Icon
                          size={13}
                          style={{ color: tech.color, flexShrink: 0 }}
                        />
                        {tech.label}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── VALUES ── */}
        <section className="py-24 max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-14">
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
              }}
            >
              Kenapa dibangun
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, ease: smooth, delay: i * 0.07 }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="pointer-events-none absolute bottom-0 right-3 leading-none select-none"
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 80,
                    color: "rgba(255,255,255,0.03)",
                    lineHeight: 0.85,
                    letterSpacing: "-0.04em",
                  }}
                >
                  {v.num}
                </div>
                <p
                  className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3 relative"
                  style={{ color: "rgba(255,255,255,0.15)" }}
                >
                  {v.num}
                </p>
                <p
                  className="text-[15px] font-semibold mb-2 relative"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {v.title}
                </p>
                <p
                  className="text-[13px] leading-relaxed relative"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section className="py-20 max-w-5xl mx-auto px-6">
          <motion.div {...fadeUp(0)} className="flex items-center gap-5 mb-14">
            <h2
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(28px, 3.5vw, 40px)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
                color: "rgba(255,255,255,0.85)",
                whiteSpace: "nowrap",
              }}
            >
              Milestone
            </h2>
            <div
              className="flex-1 h-px"
              style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-[200px_1fr] gap-12 items-start">
            <motion.p
              {...fadeUp(0.1)}
              className="hidden lg:block lg:sticky lg:top-32 text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.28)" }}
            >
              Dari ide di November 2025 hingga platform yang terus berkembang —
              setiap langkah dibangun dengan teliti dan serius.
            </motion.p>

            <div className="relative">
              <div
                className="absolute left-[5px] top-2 bottom-0 w-px"
                style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
              />

              {[
                {
                  year: "Nov 2025",
                  title: "Inisiatif lahir",
                  desc: "Satu masalah nyata: ingin punya portfolio keren tanpa harus coding atau menyewa jasa. Ide platform SaaS Multi-Tenant mulai terbentuk.",
                },
                {
                  year: "Des 2025",
                  title: "Rancang arsitektur",
                  desc: "Mulai merancang sistem — database schema, repository pattern, dan struktur keseluruhan platform yang scalable dan maintainable.",
                },
                {
                  year: "Jan 2026",
                  title: "Core engine berjalan",
                  desc: "Backend mulai hidup. Multi-tenant isolation, sistem user management, dan engine template dasar sudah berjalan.",
                },
                {
                  year: "Feb 2026",
                  title: "Frontend & multi-theme",
                  desc: "Arsitektur Headless UI yang memungkinkan ribuan user memiliki template berbeda-beda secara dinamis.",
                },
                {
                  year: "Sekarang",
                  title: "Terus berkembang",
                  desc: "Platform masih dalam pengembangan aktif. Tantangan utama: membangun sistem yang fleksibel untuk menangani skala yang terus tumbuh.",
                  now: true,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease: smooth, delay: i * 0.08 }}
                  className="relative pl-8 pb-8 last:pb-0"
                >
                  <div
                    className="absolute left-0 top-[7px] z-10"
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: "50%",
                      backgroundColor: (item as any).now
                        ? "rgba(255,255,255,0.7)"
                        : "#0a0a0f",
                      border: `1.5px solid ${
                        (item as any).now
                          ? "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.2)"
                      }`,
                    }}
                  />
                  <div
                    className="rounded-xl p-5"
                    style={{
                      backgroundColor: "#0e0e14",
                      border: `1px solid ${
                        (item as any).now
                          ? "rgba(255,255,255,0.12)"
                          : "rgba(255,255,255,0.05)"
                      }`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      <span
                        className="text-[10px] font-bold tracking-[0.08em] uppercase px-2.5 py-0.5 rounded-full"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.3)",
                          border: "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {item.year}
                      </span>
                      {(item as any).now && (
                        <span
                          className="flex items-center gap-1.5 text-[9px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            backgroundColor: "rgba(255,255,255,0.07)",
                            color: "rgba(255,255,255,0.5)",
                          }}
                        >
                          <span className="size-1.5 rounded-full bg-white opacity-70 animate-pulse inline-block" />
                          Live now
                        </span>
                      )}
                    </div>
                    <p
                      className="text-[14px] font-semibold mb-1.5"
                      style={{ color: "rgba(255,255,255,0.78)" }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="text-[12px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section
          className="py-24"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="max-w-5xl mx-auto px-6">
            <motion.div
              {...fadeUp(0)}
              className="flex items-center justify-between mb-10"
            >
              <div className="flex items-center gap-5">
                <h2
                  style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: "clamp(28px, 3.5vw, 40px)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.025em",
                    color: "rgba(255,255,255,0.85)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Kata mereka
                </h2>
                <div
                  className="hidden sm:block flex-1 h-px w-24"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                />
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={scrollLeft}
                  className="size-9 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)";
                  }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={scrollRight}
                  className="size-9 rounded-xl flex items-center justify-center transition-all duration-150 cursor-pointer"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.4)";
                  }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4"
              style={
                {
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                } as React.CSSProperties
              }
            >
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="shrink-0 rounded-2xl p-5 flex flex-col justify-between"
                  style={{
                    width: 300,
                    backgroundColor: "#0e0e14",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div>
                    <div className="flex gap-0.5 mb-3">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star
                          key={s}
                          size={11}
                          fill="rgba(255,255,255,0.5)"
                          stroke="none"
                        />
                      ))}
                    </div>
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "rgba(255,255,255,0.55)" }}
                    >
                      "{t.text}"
                    </p>
                  </div>
                  <div
                    className="mt-4 pt-4"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <p
                      className="text-[13px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.75)" }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-[11px] mt-0.5"
                      style={{ color: "rgba(255,255,255,0.28)" }}
                    >
                      {t.role}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 max-w-5xl mx-auto px-6 pb-20">
          <motion.div
            {...fadeUp(0)}
            className="relative rounded-3xl overflow-hidden text-center px-8 py-20"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.2), transparent)",
              }}
            />
            <div
              className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
              style={{
                width: 600,
                height: 300,
                background:
                  "radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)",
              }}
            />
            <p
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Mulai Sekarang
            </p>
            <h2
              className="text-[40px] font-normal leading-[1.1] tracking-[-0.03em] text-white mb-4"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Siap punya portfolio{" "}
              <span
                className="italic"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                yang layak?
              </span>
            </h2>
            <p
              className="text-[14px] max-w-sm mx-auto mb-8"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Gratis, tidak perlu kartu kredit, siap dalam 3 menit.
            </p>
            <div className="flex items-center justify-center gap-3">
              <a
                href="/register"
                className="px-7 py-3 rounded-xl text-[14px] font-semibold text-[#0a0a0f] transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#fff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Buat Portfolio Gratis →
              </a>
              <a
                href="/template"
                className="px-7 py-3 rounded-xl text-[14px] font-medium transition-all duration-200"
                style={{
                  color: "rgba(255,255,255,0.45)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.8)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(255,255,255,0.45)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.1)";
                }}
              >
                Lihat Template
              </a>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
