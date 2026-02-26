import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const ROLES = [
  "UI/UX Designer",
  "Frontend Developer",
  "Graphic Designer",
  "Motion Designer",
  "Full Stack Dev",
  "Data Analyst",
  "Product Manager",
  "Copywriter",
];

const SKILLS_POOL = [
  "Figma",
  "React",
  "After Effects",
  "Notion",
  "Tailwind",
  "Illustrator",
  "Vue",
  "TypeScript",
  "Framer",
  "Webflow",
  "Python",
  "Blender",
];

type Field = {
  name: string;
  role: string;
  bio: string;
  skills: string[];
};

export default function LivePreviewSection() {
  const [field, setField] = useState<Field>({
    name: "",
    role: "",
    bio: "",
    skills: [],
  });

  const displayName = field.name.trim() || "Nama Kamu";
  const displayRole = field.role || "Profesi Kamu";
  const displayBio =
    field.bio.trim() ||
    "Deskripsi singkat tentang dirimu akan muncul di sini...";
  const displaySkills =
    field.skills.length > 0 ? field.skills : ["Skill", "Kamu", "Di Sini"];

  const toggleSkill = (skill: string) => {
    setField((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : prev.skills.length < 5
          ? [...prev.skills, skill]
          : prev.skills,
    }));
  };

  const hasAnyInput =
    field.name.trim() ||
    field.role ||
    field.bio.trim() ||
    field.skills.length > 0;

  return (
    <section
      id="preview"
      className="relative py-28 overflow-hidden"
      style={{
        backgroundColor: "#0a0a0f",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Grid bg */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 600,
          height: 400,
          background:
            "radial-gradient(ellipse, rgba(255,255,255,0.025) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: smoothEase }}
          className="mb-16 text-center"
        >
          <p
            className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Coba Sekarang
          </p>
          <h2
            className="text-[44px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Isi form,{" "}
            <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
              lihat hasilnya langsung.
            </span>
          </h2>
          <p
            className="mt-4 text-[14px] max-w-sm mx-auto"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Tidak perlu daftar dulu. Coba isi di bawah dan lihat portfolio kamu
            terbentuk secara realtime.
          </p>
        </motion.div>

        {/* ── Split layout ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* ── LEFT: Form panel ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="rounded-2xl p-6 space-y-5"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div>
              <p
                className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Informasi Dasar
              </p>

              {/* Name */}
              <div className="space-y-4">
                <div>
                  <label
                    className="block text-[12px] font-medium mb-1.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Nama lengkap
                  </label>
                  <input
                    type="text"
                    placeholder="contoh: Budi Santoso"
                    value={field.name}
                    onChange={(e) =>
                      setField((p) => ({ ...p, name: e.target.value }))
                    }
                    maxLength={40}
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)")
                    }
                  />
                </div>

                {/* Role */}
                <div>
                  <label
                    className="block text-[12px] font-medium mb-1.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Profesi
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {ROLES.map((role) => (
                      <button
                        key={role}
                        onClick={() =>
                          setField((p) => ({
                            ...p,
                            role: p.role === role ? "" : role,
                          }))
                        }
                        className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-150 cursor-pointer"
                        style={{
                          backgroundColor:
                            field.role === role
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(255,255,255,0.04)",
                          color:
                            field.role === role
                              ? "rgba(255,255,255,0.9)"
                              : "rgba(255,255,255,0.35)",
                          border:
                            field.role === role
                              ? "1px solid rgba(255,255,255,0.2)"
                              : "1px solid rgba(255,255,255,0.07)",
                        }}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label
                    className="block text-[12px] font-medium mb-1.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Bio singkat
                  </label>
                  <textarea
                    placeholder="Ceritakan sedikit tentang dirimu..."
                    value={field.bio}
                    onChange={(e) =>
                      setField((p) => ({ ...p, bio: e.target.value }))
                    }
                    maxLength={120}
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200 resize-none"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.85)",
                    }}
                    onFocus={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.2)")
                    }
                    onBlur={(e) =>
                      (e.currentTarget.style.borderColor =
                        "rgba(255,255,255,0.08)")
                    }
                  />
                  <p
                    className="mt-1 text-right text-[10px]"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    {field.bio.length}/120
                  </p>
                </div>

                {/* Skills */}
                <div>
                  <label
                    className="block text-[12px] font-medium mb-1.5"
                    style={{ color: "rgba(255,255,255,0.4)" }}
                  >
                    Skill{" "}
                    <span style={{ color: "rgba(255,255,255,0.2)" }}>
                      (maks 5)
                    </span>
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILLS_POOL.map((skill) => {
                      const selected = field.skills.includes(skill);
                      const maxed = field.skills.length >= 5 && !selected;
                      return (
                        <button
                          key={skill}
                          onClick={() => !maxed && toggleSkill(skill)}
                          className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-150"
                          style={{
                            cursor: maxed ? "not-allowed" : "pointer",
                            backgroundColor: selected
                              ? "rgba(255,255,255,0.12)"
                              : "rgba(255,255,255,0.04)",
                            color: maxed
                              ? "rgba(255,255,255,0.15)"
                              : selected
                                ? "rgba(255,255,255,0.9)"
                                : "rgba(255,255,255,0.35)",
                            border: selected
                              ? "1px solid rgba(255,255,255,0.2)"
                              : "1px solid rgba(255,255,255,0.07)",
                            opacity: maxed ? 0.5 : 1,
                          }}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div
              className="pt-2 border-t"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              <a
                href="/register"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "rgba(255,255,255,0.9)",
                  color: "#0a0a0f",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "#ffffff")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.backgroundColor =
                    "rgba(255,255,255,0.9)")
                }
              >
                Buat Portfolio Gratis →
              </a>
              <p
                className="mt-2 text-center text-[11px]"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Tidak perlu kartu kredit
              </p>
            </div>
          </motion.div>

          {/* ── RIGHT: Live mock browser ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: smoothEase, delay: 0.1 }}
            className="lg:sticky lg:top-24"
          >
            {/* Browser chrome */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#0e0e14",
                border: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.5)",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  backgroundColor: "#111118",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex gap-1.5">
                  {[
                    "rgba(255,255,255,0.15)",
                    "rgba(255,255,255,0.1)",
                    "rgba(255,255,255,0.07)",
                  ].map((c, i) => (
                    <div
                      key={i}
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
                <div
                  className="flex-1 mx-2 h-5 rounded-md flex items-center px-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                >
                  <span
                    className="text-[10px] truncate"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    portofolio.id/
                    <span style={{ color: "rgba(255,255,255,0.45)" }}>
                      {field.name
                        ? field.name.toLowerCase().replace(/\s+/g, "")
                        : "username"}
                    </span>
                  </span>
                </div>
                {/* Live indicator */}
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                  <span
                    className="text-[10px] font-medium"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                  >
                    Live
                  </span>
                </div>
              </div>

              {/* Portfolio preview content */}
              <div className="p-6 min-h-[480px]">
                {/* Header / hero */}
                <div
                  className="rounded-xl p-5 mb-4"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Avatar + name */}
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.6)",
                      }}
                    >
                      {field.name
                        ? field.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 2)
                        : "?"}
                    </div>
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={displayName}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-[15px] font-semibold"
                          style={{
                            color: field.name
                              ? "rgba(255,255,255,0.85)"
                              : "rgba(255,255,255,0.2)",
                          }}
                        >
                          {displayName}
                        </motion.p>
                      </AnimatePresence>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={displayRole}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, delay: 0.05 }}
                          className="text-[12px]"
                          style={{
                            color: field.role
                              ? "rgba(255,255,255,0.45)"
                              : "rgba(255,255,255,0.15)",
                          }}
                        >
                          {displayRole}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Bio */}
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={displayBio.slice(0, 30)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[12px] leading-relaxed"
                      style={{
                        color: field.bio
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(255,255,255,0.15)",
                        fontStyle: field.bio ? "normal" : "italic",
                      }}
                    >
                      {displayBio}
                    </motion.p>
                  </AnimatePresence>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    <AnimatePresence>
                      {displaySkills.map((skill) => (
                        <motion.span
                          key={skill}
                          initial={{ opacity: 0, scale: 0.85 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.85 }}
                          transition={{ duration: 0.2 }}
                          className="px-2.5 py-1 rounded-full text-[10px] font-medium"
                          style={{
                            backgroundColor:
                              field.skills.length > 0
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(255,255,255,0.04)",
                            color:
                              field.skills.length > 0
                                ? "rgba(255,255,255,0.55)"
                                : "rgba(255,255,255,0.2)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Projects section mock */}
                <div>
                  <p
                    className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-3"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    Proyek
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[0, 1].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl p-3"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.05)",
                        }}
                      >
                        <div
                          className="w-full h-16 rounded-lg mb-2"
                          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        />
                        <div
                          className="h-2 w-3/4 rounded-full mb-1.5"
                          style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                        />
                        <div
                          className="h-1.5 w-1/2 rounded-full"
                          style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress indicator */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[10px]"
                      style={{ color: "rgba(255,255,255,0.2)" }}
                    >
                      Kelengkapan profil
                    </span>
                    <span
                      className="text-[10px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {Math.round(
                        (field.name ? 25 : 0) +
                          (field.role ? 25 : 0) +
                          (field.bio ? 25 : 0) +
                          (field.skills.length > 0 ? 25 : 0),
                      )}
                      %
                    </span>
                  </div>
                  <div
                    className="w-full h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: "rgba(255,255,255,0.35)" }}
                      animate={{
                        width: `${
                          (field.name ? 25 : 0) +
                          (field.role ? 25 : 0) +
                          (field.bio ? 25 : 0) +
                          (field.skills.length > 0 ? 25 : 0)
                        }%`,
                      }}
                      transition={{ duration: 0.5, ease: smoothEase }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Below browser note */}
            <p
              className="mt-3 text-center text-[11px]"
              style={{ color: "rgba(255,255,255,0.18)" }}
            >
              Preview otomatis update setiap kamu mengetik
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
