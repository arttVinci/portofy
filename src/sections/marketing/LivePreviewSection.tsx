import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

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
  "Figma", "React", "After Effects", "Notion", "Tailwind", "Illustrator",
  "Vue", "TypeScript", "Framer", "Webflow", "Python", "Blender",
];

type Field = { name: string; role: string; bio: string; skills: string[] };

export default function LivePreviewSection() {
  const [field, setField] = useState<Field>({ name: "", role: "", bio: "", skills: [] });
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const displayName = field.name.trim() || "Nama Kamu";
  const displayRole = field.role || "Profesi Kamu";
  const displayBio = field.bio.trim() || "Deskripsi singkat tentang dirimu akan muncul di sini...";
  const displaySkills = field.skills.length > 0 ? field.skills : ["Skill", "Kamu", "Di Sini"];
  const completeness = (field.name ? 25 : 0) + (field.role ? 25 : 0) + (field.bio ? 25 : 0) + (field.skills.length > 0 ? 25 : 0);

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

  return (
    <section
      ref={sectionRef}
      id="preview"
      className="relative py-28 overflow-hidden"
      style={{ backgroundColor: "#060b18", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(6,182,212,0.06) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {/* Center glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(6,182,212,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: smooth }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-wide mb-6"
            style={{
              backgroundColor: "rgba(6,182,212,0.1)",
              border: "1px solid rgba(6,182,212,0.2)",
              color: "#22d3ee",
            }}
          >
            ✨ Live Preview
          </motion.span>
          <h2
            className="text-[44px] font-extrabold leading-[1.1] tracking-[-0.03em]"
            style={{ color: "#f1f5f9" }}
          >
            Isi form,{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              lihat hasilnya langsung.
            </span>
          </h2>
          <p className="mt-4 text-[14px] max-w-sm mx-auto" style={{ color: "rgba(148,163,184,0.5)" }}>
            Tidak perlu daftar dulu. Coba isi di bawah dan lihat portfolio kamu terbentuk secara realtime.
          </p>
        </motion.div>

        {/* ── Split layout ── */}
        <div className="grid lg:grid-cols-2 gap-6 items-start">
          {/* LEFT: Form panel */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: smooth }}
            className="rounded-2xl p-6 space-y-5"
            style={{
              backgroundColor: "rgba(12,18,34,0.9)",
              border: "1px solid rgba(6,182,212,0.1)",
              backdropFilter: "blur(16px)",
              boxShadow: "0 0 48px rgba(6,182,212,0.04)",
            }}
          >
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase" style={{ color: "rgba(6,182,212,0.5)" }}>
              Informasi Dasar
            </p>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                  Nama lengkap
                </label>
                <input
                  type="text"
                  placeholder="contoh: Budi Santoso"
                  value={field.name}
                  onChange={(e) => setField((p) => ({ ...p, name: e.target.value }))}
                  maxLength={40}
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-300"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(6,182,212,0.08)",
                    color: "rgba(241,245,249,0.85)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                  Profesi
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ROLES.map((role) => (
                    <motion.button
                      key={role}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setField((p) => ({ ...p, role: p.role === role ? "" : role }))}
                      className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer"
                      style={{
                        backgroundColor: field.role === role ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.03)",
                        color: field.role === role ? "#22d3ee" : "rgba(148,163,184,0.5)",
                        border: field.role === role ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(255,255,255,0.05)",
                        boxShadow: field.role === role ? "0 0 16px rgba(6,182,212,0.1)" : "none",
                      }}
                    >
                      {role}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                  Bio singkat
                </label>
                <textarea
                  placeholder="Ceritakan sedikit tentang dirimu..."
                  value={field.bio}
                  onChange={(e) => setField((p) => ({ ...p, bio: e.target.value }))}
                  maxLength={120}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-300 resize-none"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(6,182,212,0.08)",
                    color: "rgba(241,245,249,0.85)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.35)";
                    e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(6,182,212,0.08)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <p className="mt-1 text-right text-[10px]" style={{ color: "rgba(148,163,184,0.3)" }}>
                  {field.bio.length}/120
                </p>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-[12px] font-medium mb-1.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                  Skill <span style={{ color: "rgba(148,163,184,0.3)" }}>(maks 5)</span>
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {SKILLS_POOL.map((skill) => {
                    const selected = field.skills.includes(skill);
                    const maxed = field.skills.length >= 5 && !selected;
                    return (
                      <motion.button
                        key={skill}
                        whileHover={!maxed ? { scale: 1.05 } : {}}
                        whileTap={!maxed ? { scale: 0.95 } : {}}
                        onClick={() => !maxed && toggleSkill(skill)}
                        className="px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200"
                        style={{
                          cursor: maxed ? "not-allowed" : "pointer",
                          backgroundColor: selected ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.03)",
                          color: maxed ? "rgba(148,163,184,0.2)" : selected ? "#22d3ee" : "rgba(148,163,184,0.5)",
                          border: selected ? "1px solid rgba(6,182,212,0.3)" : "1px solid rgba(255,255,255,0.05)",
                          opacity: maxed ? 0.5 : 1,
                        }}
                      >
                        {skill}
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3 border-t" style={{ borderColor: "rgba(6,182,212,0.06)" }}>
              <a
                href="/auth/register"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full text-[13px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                  boxShadow: "0 4px 24px rgba(6,182,212,0.3)",
                }}
              >
                Buat Portfolio Gratis →
              </a>
              <p className="mt-2 text-center text-[11px]" style={{ color: "rgba(148,163,184,0.3)" }}>
                Tidak perlu kartu kredit
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Live mock browser */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: smooth, delay: 0.15 }}
            className="lg:sticky lg:top-24"
          >
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#0e1526",
                border: "1px solid rgba(6,182,212,0.1)",
                boxShadow: "0 32px 64px rgba(0,0,0,0.5), 0 0 64px rgba(6,182,212,0.04)",
              }}
            >
              {/* Browser bar */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{ backgroundColor: "#080d1a", borderBottom: "1px solid rgba(6,182,212,0.06)" }}
              >
                <div className="flex gap-1.5">
                  {["rgba(239,68,68,0.7)", "rgba(234,179,8,0.7)", "rgba(34,197,94,0.7)"].map((c, i) => (
                    <div key={i} className="size-2.5 rounded-full" style={{ backgroundColor: c }} />
                  ))}
                </div>
                <div className="flex-1 mx-3 h-6 rounded-lg flex items-center px-3" style={{ backgroundColor: "rgba(255,255,255,0.03)" }}>
                  <span className="text-[10px] truncate" style={{ color: "rgba(148,163,184,0.4)" }}>
                    portofy.net/
                    <span style={{ color: "rgba(6,182,212,0.6)" }}>
                      {field.name ? field.name.toLowerCase().replace(/\s+/g, "") : "username"}
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                  <span className="text-[10px] font-medium" style={{ color: "rgba(52,211,153,0.6)" }}>Live</span>
                </div>
              </div>

              {/* Portfolio preview */}
              <div className="p-6 min-h-[480px]">
                {/* Hero card */}
                <div
                  className="rounded-xl p-5 mb-4"
                  style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(6,182,212,0.06)" }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={{ backgroundColor: field.name ? "rgba(6,182,212,0.15)" : "rgba(255,255,255,0.05)" }}
                      className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0"
                      style={{ color: "rgba(6,182,212,0.7)" }}
                    >
                      {field.name ? field.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2) : "?"}
                    </motion.div>
                    <div>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={displayName}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2 }}
                          className="text-[15px] font-semibold"
                          style={{ color: field.name ? "rgba(241,245,249,0.85)" : "rgba(148,163,184,0.25)" }}
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
                          style={{ color: field.role ? "rgba(6,182,212,0.65)" : "rgba(148,163,184,0.2)" }}
                        >
                          {displayRole}
                        </motion.p>
                      </AnimatePresence>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.p
                      key={displayBio.slice(0, 30)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-[12px] leading-relaxed"
                      style={{
                        color: field.bio ? "rgba(148,163,184,0.6)" : "rgba(148,163,184,0.2)",
                        fontStyle: field.bio ? "normal" : "italic",
                      }}
                    >
                      {displayBio}
                    </motion.p>
                  </AnimatePresence>

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
                            backgroundColor: field.skills.length > 0 ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.03)",
                            color: field.skills.length > 0 ? "rgba(6,182,212,0.7)" : "rgba(148,163,184,0.2)",
                            border: "1px solid rgba(6,182,212,0.1)",
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Projects mock */}
                <div>
                  <p className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-3" style={{ color: "rgba(6,182,212,0.3)" }}>
                    Proyek
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[0, 1].map((i) => (
                      <div
                        key={i}
                        className="rounded-xl p-3"
                        style={{ backgroundColor: "rgba(255,255,255,0.02)", border: "1px solid rgba(6,182,212,0.06)" }}
                      >
                        <div className="w-full h-16 rounded-lg mb-2" style={{ backgroundColor: "rgba(6,182,212,0.04)" }} />
                        <div className="h-2 w-3/4 rounded-full mb-1.5" style={{ backgroundColor: "rgba(241,245,249,0.08)" }} />
                        <div className="h-1.5 w-1/2 rounded-full" style={{ backgroundColor: "rgba(148,163,184,0.06)" }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px]" style={{ color: "rgba(148,163,184,0.3)" }}>Kelengkapan profil</span>
                    <span className="text-[10px] font-semibold" style={{ color: "rgba(6,182,212,0.6)" }}>
                      {completeness}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(6,182,212,0.06)" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(to right, #06b6d4, #3b82f6)" }}
                      animate={{ width: `${completeness}%` }}
                      transition={{ duration: 0.5, ease: smooth }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <p className="mt-3 text-center text-[11px]" style={{ color: "rgba(148,163,184,0.2)" }}>
              Preview otomatis update setiap kamu mengetik
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
