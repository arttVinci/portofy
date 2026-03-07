import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Eye, EyeOff, ArrowRight, ArrowLeft } from "lucide-react";

import SuccessScreen from "../../components/auth/SuccessScreen";
import InputLabel from "../../components/auth/InputLabel";
import CvUpload from "../../components/auth/CvUploud";
import AvatarUpload from "../../components/auth/AvatarUploud";
import TagInput from "../../components/auth/TagInput";
import OtpInput from "../../components/auth/OtpInput";
import TemplateCard from "../../components/marketing/TemplateCard";

import IStyle from "../../components/utils/IStyle";

import type { TemplateItem } from "../../types/ui.types";

import CreateAccountSection from "../../sections/auth/Register/StepperForm/CreateAccountSection";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  { num: 1, title: "Buat Akun", desc: "Username, email & password" },
  { num: 2, title: "Verifikasi Email", desc: "Masukkan kode OTP" },
  { num: 3, title: "Profil Kamu", desc: "Avatar, bio & detail" },
  { num: 4, title: "Setup Portfolio", desc: "Profesi & skill" },
  { num: 5, title: "Pilih Template", desc: "Tampilan awal" },
];

const templates: TemplateItem[] = [
  {
    id: "1",
    name: "Minimal",
    category: "Minimal",
    tags: ["Clean", "Developer", "Simple"],
    description: "Bersih dan fokus. Biarkan karya kamu yang bicara.",
    badge: "Paling Populer",
    views: "8.2k",
    isPro: false,
    lines: [
      { w: "75%", h: 10 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "2",
    name: "Editorial",
    category: "Creative",
    tags: ["Bold", "Designer", "Typography"],
    description: "Layout magazine dengan tipografi kuat dan berani.",
    badge: "Trending",
    views: "6.1k",
    isPro: false,
    lines: [
      { w: "90%", h: 14 },
      { w: "65%", h: 6 },
      { w: "40%", h: 6 },
    ],
  },
  {
    id: "3",
    name: "Grid",
    category: "Creative",
    tags: ["Gallery", "Visual", "Photographer"],
    description: "Berbasis grid untuk menampilkan portofolio visual.",
    views: "4.5k",
    isPro: false,
    lines: [
      { w: "55%", h: 8 },
      { w: "70%", h: 6 },
      { w: "45%", h: 6 },
    ],
  },
  {
    id: "4",
    name: "Résumé",
    category: "Professional",
    tags: ["Corporate", "Business", "Formal"],
    description: "Profesional dan terstruktur. Cocok untuk fresh graduate.",
    badge: "Baru",
    views: "3.4k",
    isPro: false,
    lines: [
      { w: "60%", h: 8 },
      { w: "80%", h: 6 },
      { w: "55%", h: 6 },
    ],
  },
  {
    id: "5",
    name: "Mono",
    category: "Minimal",
    tags: ["Monochrome", "Writer", "Blogger"],
    description: "Monokrom dan tenang. Ideal untuk penulis & peneliti.",
    views: "2.9k",
    isPro: true,
    lines: [
      { w: "70%", h: 8 },
      { w: "55%", h: 6 },
      { w: "65%", h: 6 },
    ],
  },
  {
    id: "6",
    name: "Studio",
    category: "Professional",
    tags: ["Agency", "Bold", "Freelancer"],
    description: "Berkarakter kuat. Tampil beda dari ribuan pelamar.",
    views: "2.1k",
    isPro: true,
    lines: [
      { w: "85%", h: 12 },
      { w: "50%", h: 6 },
      { w: "60%", h: 6 },
    ],
  },
  {
    id: "7",
    name: "Slate",
    category: "Professional",
    tags: ["Modern", "Corporate"],
    description: "Modern dan profesional. Layout dua kolom yang terorganisir.",
    views: "3.9k",
    isPro: false,
    lines: [
      { w: "65%", h: 9 },
      { w: "45%", h: 6 },
      { w: "70%", h: 6 },
    ],
  },
  {
    id: "8",
    name: "Dusk",
    category: "Minimal",
    tags: ["Dark", "Elegant"],
    description: "Dark mode elegan dengan tipografi yang kuat dan premium.",
    badge: "Baru",
    views: "2.1k",
    isPro: true,
    lines: [
      { w: "80%", h: 11 },
      { w: "60%", h: 6 },
      { w: "50%", h: 6 },
    ],
  },
  {
    id: "9",
    name: "Bloom",
    category: "Creative",
    tags: ["Pastel", "Playful"],
    description:
      "Warna lembut dan playful. Untuk illustrator dan content creator.",
    views: "5.5k",
    isPro: false,
    lines: [
      { w: "72%", h: 9 },
      { w: "55%", h: 6 },
      { w: "62%", h: 6 },
    ],
  },
];

const professions = [
  "UI/UX Designer",
  "Frontend Developer",
  "Backend Developer",
  "Fullstack Developer",
  "Product Manager",
  "Motion Designer",
  "Graphic Designer",
  "Content Creator",
  "Copywriter",
  "Data Analyst",
  "Lainnya",
];

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPw: "",
    fullName: "",
    bio: "",
    about: "",
    address: "",
    birthdate: "",
    website: "",
    profession: "",
    skills: "",
    experience: "",
    template: "minimal",
  });

  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const pwMatch = form.password === form.confirmPw;
  const pwStrong = form.password.length >= 6;

  const canNext = () => {
    if (step === 1)
      return form.username.length >= 3 && form.email && pwStrong && pwMatch;
    if (step === 2) return otp.length === 6;
    if (step === 3) return form.fullName.length > 0;
    if (step === 4) return form.profession.length > 0;
    return true;
  };

  const goNext = () => {
    if (step === 1 && !otpSent) {
      setOtpSent(true);
    }
    setDir(1);
    setStep((s) => Math.min(s + 1, 5));
  };
  const goPrev = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const slide = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 24 : -24 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -24 : 24 }),
  };

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#0a0a0f", fontFamily: "'Inter', sans-serif" }}
    >
      {/* BG grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── LEFT BRANDING ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-90 shrink-0 relative overflow-hidden px-10 py-10"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: 360,
            background:
              "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        <a href="/" className="relative inline-block">
          <span
            className="text-[17px] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>por</span>
            <span style={{ color: "rgba(255,255,255,0.32)" }}>tof</span>
          </span>
        </a>

        <div className="relative">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: smooth }}
          >
            <div className="flex items-center gap-1.5 mb-5">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className="h-0.5 flex-1 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor:
                      step > s.num
                        ? "rgba(255,255,255,0.55)"
                        : step === s.num
                          ? "rgba(255,255,255,0.28)"
                          : "rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Langkah {step} dari {steps.length}
            </p>
            <h2
              className="text-white mb-2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 30,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {step === 1 && (
                <>
                  Buat akun{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>portof.</em>
                </>
              )}
              {step === 2 && (
                <>
                  Verifikasi{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>emailmu.</em>
                </>
              )}
              {step === 3 && (
                <>
                  Lengkapi{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>profilmu.</em>
                </>
              )}
              {step === 4 && (
                <>
                  Tentukan{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>
                    keahlianmu.
                  </em>
                </>
              )}
              {step === 5 && (
                <>
                  Pilih{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>
                    tampilanmu.
                  </em>
                </>
              )}
            </h2>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {step === 1 &&
                "Daftar dengan email atau langsung pakai akun Google / GitHub."}
              {step === 2 &&
                `Kode 6 digit dikirim ke ${form.email || "emailmu"}.`}
              {step === 3 &&
                "Upload CV dan biarkan AI mengisi form otomatis — atau isi sendiri."}
              {step === 4 &&
                "Pilih profesi dan skill agar portfoliomu lebih relevan."}
              {step === 5 && "Template bisa diganti kapan saja dari dashboard."}
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div
            className="h-px mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          />
          <p
            className="text-[13px] leading-relaxed mb-2"
            style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
          >
            "Setup 10 menit, besoknya langsung ada yang reach out."
          </p>
          <p
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            — Rizky A., UI/UX Designer
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <div className="lg:hidden mb-8">
          <a href="/">
            <span
              className="text-[17px] font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>por</span>
              <span style={{ color: "rgba(255,255,255,0.32)" }}>tof</span>
            </span>
          </a>
        </div>

        <div className="w-full max-w-195">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: smooth }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#0e0e14",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Stepper header */}
                  <div
                    className="px-6 pt-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    <div className="flex items-center mb-3">
                      {steps.map((s, i) => {
                        const isDone = step > s.num;
                        const isActive = step === s.num;
                        return (
                          <div
                            key={s.num}
                            className="flex items-center flex-1 last:flex-none"
                          >
                            <div
                              className="size-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 text-[11px] font-bold"
                              style={{
                                backgroundColor: isDone
                                  ? "rgba(255,255,255,0.9)"
                                  : isActive
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(255,255,255,0.04)",
                                border: `1.5px solid ${isDone ? "transparent" : isActive ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                                color: isDone
                                  ? "#0a0a0f"
                                  : isActive
                                    ? "rgba(255,255,255,0.85)"
                                    : "rgba(255,255,255,0.2)",
                              }}
                            >
                              {isDone ? (
                                <Check size={12} strokeWidth={2.5} />
                              ) : (
                                s.num
                              )}
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className="flex-1 h-px mx-1.5 transition-all duration-500"
                                style={{
                                  backgroundColor: isDone
                                    ? "rgba(255,255,255,0.3)"
                                    : "rgba(255,255,255,0.07)",
                                }}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <p
                      className="text-[14px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {steps[step - 1].title}
                    </p>
                    <p
                      className="text-[12px]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Langkah {step} dari {steps.length} —{" "}
                      {steps[step - 1].desc}
                    </p>
                  </div>

                  {/* Content */}
                  <div className="relative overflow-hidden">
                    <AnimatePresence custom={dir} mode="wait">
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: smooth }}
                      >
                        {/* Step 1 Create Account */}
                        {step === 1 && (
                          <CreateAccountSection
                            username={form.username}
                            email={form.email}
                            password={form.password}
                            confirmPw={form.confirmPw}
                            showPw={showPw}
                            showCpw={showCpw}
                            pwMatch={pwMatch}
                            focused={focused}
                            set={set}
                            setFocused={setFocused}
                            setShowPw={setShowPw}
                            setShowCpw={setShowCpw}
                          />
                        )}

                        {/* ── STEP 2: OTP ── */}
                        {step === 2 && (
                          <div className="p-10 flex flex-col items-center text-center space-y-6">
                            <div>
                              <p
                                className="text-[13px] mb-1"
                                style={{ color: "rgba(255,255,255,0.5)" }}
                              >
                                Kode 6 digit dikirim ke
                              </p>
                              <p
                                className="text-[14px] font-semibold"
                                style={{ color: "rgba(255,255,255,0.85)" }}
                              >
                                {form.email}
                              </p>
                            </div>

                            <OtpInput value={otp} onChange={setOtp} />

                            <div className="flex flex-col items-center gap-2">
                              <p
                                className="text-[11px]"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                Tidak menerima kode?
                              </p>
                              <button
                                type="button"
                                className="text-[12px] font-semibold cursor-pointer transition-colors duration-150"
                                style={{ color: "rgba(255,255,255,0.45)" }}
                                onMouseEnter={(e) =>
                                  ((
                                    e.currentTarget as HTMLElement
                                  ).style.color = "rgba(255,255,255,0.8)")
                                }
                                onMouseLeave={(e) =>
                                  ((
                                    e.currentTarget as HTMLElement
                                  ).style.color = "rgba(255,255,255,0.45)")
                                }
                              >
                                Kirim ulang kode
                              </button>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 3: kiri form, kanan CV upload ── */}
                        {step === 3 && (
                          <div
                            className="grid grid-cols-2 divide-x"
                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                          >
                            {/* Left: profile form */}
                            <div
                              className="p-5 space-y-3 overflow-y-auto"
                              style={{ maxHeight: 480 }}
                            >
                              <p
                                className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                Isi manual
                              </p>

                              {/* Avatar + Nama */}
                              <div className="flex items-start gap-4">
                                <AvatarUpload
                                  preview={avatarPreview}
                                  onChange={setAvatarPreview}
                                />
                                <div className="flex-1">
                                  <InputLabel text="Nama Lengkap" />
                                  <input
                                    type="text"
                                    placeholder="Nama di portfolio"
                                    value={form.fullName}
                                    onChange={(e) =>
                                      set("fullName", e.target.value)
                                    }
                                    onFocus={() => setFocused("fullName")}
                                    onBlur={() => setFocused(null)}
                                    style={IStyle(focused === "fullName")}
                                  />
                                </div>
                              </div>

                              <div>
                                <InputLabel
                                  text="Bio Singkat"
                                  hint="1 kalimat"
                                />
                                <input
                                  type="text"
                                  placeholder="Seorang designer yang suka clean UI"
                                  value={form.bio}
                                  onChange={(e) => set("bio", e.target.value)}
                                  onFocus={() => setFocused("bio")}
                                  onBlur={() => setFocused(null)}
                                  style={IStyle(focused === "bio")}
                                />
                              </div>

                              <div>
                                <InputLabel text="About" hint="opsional" />
                                <textarea
                                  rows={3}
                                  placeholder="Ceritakan lebih detail tentang dirimu..."
                                  value={form.about}
                                  onChange={(e) => set("about", e.target.value)}
                                  onFocus={() => setFocused("about")}
                                  onBlur={() => setFocused(null)}
                                  style={
                                    {
                                      ...IStyle(focused === "about"),
                                      resize: "none",
                                    } as React.CSSProperties
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                  <InputLabel
                                    text="Tanggal Lahir"
                                    hint="opsional"
                                  />
                                  <input
                                    type="date"
                                    value={form.birthdate}
                                    onChange={(e) =>
                                      set("birthdate", e.target.value)
                                    }
                                    onFocus={() => setFocused("birthdate")}
                                    onBlur={() => setFocused(null)}
                                    style={{
                                      ...IStyle(focused === "birthdate"),
                                      colorScheme: "dark",
                                    }}
                                  />
                                </div>
                                <div>
                                  <InputLabel
                                    text="Alamat / Kota"
                                    hint="opsional"
                                  />
                                  <input
                                    type="text"
                                    placeholder="Jakarta, ID"
                                    value={form.address}
                                    onChange={(e) =>
                                      set("address", e.target.value)
                                    }
                                    onFocus={() => setFocused("address")}
                                    onBlur={() => setFocused(null)}
                                    style={IStyle(focused === "address")}
                                  />
                                </div>
                              </div>

                              <div>
                                <InputLabel
                                  text="Website / Sosmed"
                                  hint="opsional"
                                />
                                <input
                                  type="text"
                                  placeholder="https://linkedin.com/in/username"
                                  value={form.website}
                                  onChange={(e) =>
                                    set("website", e.target.value)
                                  }
                                  onFocus={() => setFocused("website")}
                                  onBlur={() => setFocused(null)}
                                  style={IStyle(focused === "website")}
                                />
                              </div>

                              <div>
                                <InputLabel
                                  text="Tags"
                                  hint={`${tags.length}/10`}
                                />
                                <TagInput tags={tags} onChange={setTags} />
                              </div>
                            </div>

                            {/* Right: CV upload */}
                            <div className="p-5 flex flex-col">
                              <p
                                className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-3"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                Atau upload CV
                              </p>
                              <div className="flex-1">
                                <CvUpload
                                  file={cvFile}
                                  onFile={setCvFile}
                                  onClear={() => setCvFile(null)}
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 4: profesi & skill ── */}
                        {step === 4 && (
                          <div className="p-6 space-y-5">
                            <div>
                              <InputLabel text="Profesi" />
                              <div className="flex flex-wrap gap-1.5 mt-1">
                                {professions.map((p) => (
                                  <button
                                    key={p}
                                    type="button"
                                    onClick={() => set("profession", p)}
                                    className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 cursor-pointer"
                                    style={{
                                      backgroundColor:
                                        form.profession === p
                                          ? "rgba(255,255,255,0.12)"
                                          : "rgba(255,255,255,0.04)",
                                      border: `1px solid ${form.profession === p ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.07)"}`,
                                      color:
                                        form.profession === p
                                          ? "rgba(255,255,255,0.9)"
                                          : "rgba(255,255,255,0.4)",
                                    }}
                                  >
                                    {p}
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <InputLabel
                                  text="Skill Utama"
                                  hint="pisahkan koma"
                                />
                                <input
                                  type="text"
                                  placeholder="Figma, React, Branding..."
                                  value={form.skills}
                                  onChange={(e) =>
                                    set("skills", e.target.value)
                                  }
                                  onFocus={() => setFocused("skills")}
                                  onBlur={() => setFocused(null)}
                                  style={IStyle(focused === "skills")}
                                />
                              </div>
                              <div>
                                <InputLabel text="Pengalaman" />
                                <div className="flex gap-2">
                                  {["< 1 thn", "1–3 thn", "3+ thn"].map(
                                    (exp) => (
                                      <button
                                        key={exp}
                                        type="button"
                                        onClick={() => set("experience", exp)}
                                        className="flex-1 py-2 rounded-xl text-[11px] font-medium transition-all duration-150 cursor-pointer"
                                        style={{
                                          backgroundColor:
                                            form.experience === exp
                                              ? "rgba(255,255,255,0.1)"
                                              : "rgba(255,255,255,0.04)",
                                          border: `1px solid ${form.experience === exp ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.07)"}`,
                                          color:
                                            form.experience === exp
                                              ? "rgba(255,255,255,0.85)"
                                              : "rgba(255,255,255,0.35)",
                                        }}
                                      >
                                        {exp}
                                      </button>
                                    ),
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ── STEP 5: template ── */}
                        {step === 5 && (
                          <div className="p-6">
                            <p
                              className="text-[12px] mb-4"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              Pilih tampilan awal — bisa diganti kapan saja dari
                              dashboard.
                            </p>
                            <div className="grid grid-cols-4 gap-3">
                              {templates.map((template, i) => (
                                <TemplateCard
                                  key={template.id}
                                  template={template}
                                  i={i}
                                  hoveredId={hoveredId}
                                  setHoveredId={setHoveredId}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer nav */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {step > 1 ? (
                      <button
                        onClick={goPrev}
                        className="flex items-center gap-1.5 text-[13px] font-medium cursor-pointer transition-colors duration-150"
                        style={{ color: "rgba(255,255,255,0.35)" }}
                        onMouseEnter={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.7)")
                        }
                        onMouseLeave={(e) =>
                          ((e.currentTarget as HTMLElement).style.color =
                            "rgba(255,255,255,0.35)")
                        }
                      >
                        <ArrowLeft size={14} /> Kembali
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 5 ? (
                      <button
                        onClick={goNext}
                        disabled={!canNext()}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: "#0a0a0f",
                        }}
                        onMouseEnter={(e) => {
                          if (canNext())
                            (
                              e.currentTarget as HTMLElement
                            ).style.backgroundColor = "#fff";
                        }}
                        onMouseLeave={(e) => {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.9)";
                        }}
                      >
                        {step === 1 ? "Kirim Kode" : "Lanjut"}{" "}
                        <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button
                        onClick={() => setDone(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.9)",
                          color: "#0a0a0f",
                        }}
                        onMouseEnter={(e) =>
                          ((
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#fff")
                        }
                        onMouseLeave={(e) =>
                          ((
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "rgba(255,255,255,0.9)")
                        }
                      >
                        Buat Portfolio <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <p
                  className="text-center mt-5 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Sudah punya akun?{" "}
                  <a
                    href="/login"
                    className="font-semibold transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.9)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.6)")
                    }
                  >
                    Masuk
                  </a>
                </p>
              </motion.div>
            ) : (
              <SuccessScreen name={form.fullName} username={form.username} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
