import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  LayoutDashboard,
  Camera,
  X,
  Plus,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

// ── Steps ─────────────────────────────────────────────────────────────────────
const steps = [
  { num: 1, title: "Buat Akun", desc: "Username, email & password" },
  { num: 2, title: "Verifikasi Email", desc: "Masukkan kode OTP" },
  { num: 3, title: "Profil Kamu", desc: "Avatar, bio & detail" },
  { num: 4, title: "Setup Portfolio", desc: "Profesi & skill" },
  { num: 5, title: "Pilih Template", desc: "Tampilan awal" },
];

const templates = [
  { id: "minimal", name: "Minimal", desc: "Bersih, fokus konten" },
  { id: "editorial", name: "Editorial", desc: "Tipografi bold" },
  { id: "grid", name: "Grid", desc: "Galeri berbasis grid" },
  { id: "resume", name: "Résumé", desc: "Format CV modern" },
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

// ── Helpers ───────────────────────────────────────────────────────────────────
function iStyle(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    padding: "9px 12px",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "'Inter', sans-serif",
  };
}

function Lbl({ text, hint }: { text: string; hint?: string }) {
  return (
    <div className="flex items-center justify-between mb-1.5">
      <span
        className="text-[10px] font-semibold uppercase tracking-[0.08em]"
        style={{ color: "rgba(255,255,255,0.3)" }}
      >
        {text}
      </span>
      {hint && (
        <span
          className="text-[10px]"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          {hint}
        </span>
      )}
    </div>
  );
}

// ── Template Card ─────────────────────────────────────────────────────────────
function TemplateCard({
  t,
  selected,
  onClick,
}: {
  t: (typeof templates)[0];
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl overflow-hidden text-left w-full cursor-pointer transition-all duration-200"
      style={{
        backgroundColor: "#0e0e14",
        border: `1.5px solid ${selected ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.07)"}`,
        transform: selected ? "translateY(-2px)" : "none",
      }}
    >
      <div
        className="h-24 relative overflow-hidden"
        style={{
          backgroundColor: "#111118",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-1 p-2">
          {[0.3, 0.2, 0.12].map((o, i) => (
            <div
              key={i}
              className="size-1.5 rounded-full"
              style={{ backgroundColor: `rgba(255,255,255,${o})` }}
            />
          ))}
        </div>
        <div className="px-2.5 pb-2 space-y-1.5">
          {t.id === "minimal" && (
            <>
              <div
                className="h-2.5 rounded-full w-3/4"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              />
              <div className="flex gap-1 mt-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 flex-1 rounded-md"
                    style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                  />
                ))}
              </div>
            </>
          )}
          {t.id === "editorial" && (
            <>
              <div
                className="h-4 rounded-sm w-4/5"
                style={{ backgroundColor: "rgba(255,255,255,0.18)" }}
              />
              <div
                className="h-px w-full mt-2"
                style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
              />
            </>
          )}
          {t.id === "grid" && (
            <div className="grid grid-cols-3 gap-1 mt-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-5 rounded"
                  style={{
                    backgroundColor: `rgba(255,255,255,${0.05 + i * 0.02})`,
                  }}
                />
              ))}
            </div>
          )}
          {t.id === "resume" && (
            <div className="flex gap-1.5">
              <div className="w-1/3 space-y-1">
                <div
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                />
                <div
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                />
              </div>
              <div className="flex-1 space-y-1">
                <div
                  className="h-1.5 rounded-full"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                />
                <div
                  className="h-1.5 rounded-full w-4/5"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                />
              </div>
            </div>
          )}
        </div>
        {selected && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div
              className="size-5 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "rgba(255,255,255,0.9)" }}
            >
              <Check size={10} strokeWidth={3} color="#0a0a0f" />
            </div>
          </div>
        )}
      </div>
      <div className="px-2.5 py-2">
        <p
          className="text-[12px] font-semibold"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          {t.name}
        </p>
        <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.3)" }}>
          {t.desc}
        </p>
      </div>
    </button>
  );
}

// ── CV Upload ─────────────────────────────────────────────────────────────────
function CvUpload({
  file,
  onFile,
  onClear,
}: {
  file: File | null;
  onFile: (f: File) => void;
  onClear: () => void;
}) {
  const [drag, setDrag] = useState(false);

  if (file) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div
          className="size-12 rounded-xl flex items-center justify-center mb-3"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M3 2a1 1 0 0 1 1-1h6l4 4v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2z"
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M9 1v4h4"
              stroke="rgba(255,255,255,0.35)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M5 9h6M5 11.5h4"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <p
          className="text-[12px] font-semibold mb-1 max-w-[140px] truncate"
          style={{ color: "rgba(255,255,255,0.8)" }}
        >
          {file.name}
        </p>
        <div className="flex items-center gap-1 mb-4">
          <span className="size-1.5 rounded-full bg-white opacity-50 animate-pulse inline-block" />
          <span
            className="text-[10px] font-semibold"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            Siap diproses AI
          </span>
        </div>
        <button
          onClick={onClear}
          className="text-[11px] font-medium cursor-pointer transition-colors duration-150"
          style={{ color: "rgba(255,255,255,0.25)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.6)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.25)")
          }
        >
          Ganti file
        </button>
      </motion.div>
    );
  }

  return (
    <label
      className="h-full flex flex-col items-center justify-center text-center p-6 rounded-xl cursor-pointer transition-all duration-200"
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        const f = e.dataTransfer.files[0];
        if (f) onFile(f);
      }}
      style={{
        backgroundColor: drag
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.02)",
        border: `1.5px dashed ${drag ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.09)"}`,
        borderRadius: 12,
        transition: "all 0.2s",
        minHeight: 220,
      }}
    >
      <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="sr-only"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onFile(f);
        }}
      />
      <div
        className="size-10 rounded-xl flex items-center justify-center mb-3"
        style={{
          backgroundColor: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M8 11V3M8 3L5 6M8 3l3 3"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 12v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1"
            stroke="rgba(255,255,255,0.2)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <p
        className="text-[13px] font-semibold mb-1"
        style={{ color: "rgba(255,255,255,0.65)" }}
      >
        Upload CV
      </p>
      <p
        className="text-[11px] leading-relaxed mb-3"
        style={{ color: "rgba(255,255,255,0.28)" }}
      >
        AI otomatis isi form dari CV-mu
      </p>
      <div
        className="px-3 py-1.5 rounded-full mb-2"
        style={{
          backgroundColor: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.07)",
        }}
      >
        <span
          className="text-[10px] font-medium"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Klik atau drag ke sini
        </span>
      </div>
      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.15)" }}>
        PDF, DOC, DOCX · maks. 5MB
      </p>
    </label>
  );
}

// ── Avatar Upload ─────────────────────────────────────────────────────────────
function AvatarUpload({
  preview,
  onChange,
}: {
  preview: string | null;
  onChange: (url: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    onChange(url);
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="relative size-20 rounded-2xl overflow-hidden cursor-pointer group transition-all duration-200"
        style={{
          backgroundColor: "rgba(255,255,255,0.05)",
          border: "1.5px dashed rgba(255,255,255,0.12)",
        }}
      >
        {preview ? (
          <img
            src={preview}
            alt="avatar"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
            <Camera size={18} style={{ color: "rgba(255,255,255,0.3)" }} />
          </div>
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <Camera size={16} style={{ color: "rgba(255,255,255,0.8)" }} />
        </div>
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleFile}
      />
      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.2)" }}>
        Foto profil
      </p>
    </div>
  );
}

// ── Tag input ─────────────────────────────────────────────────────────────────
function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (t: string[]) => void;
}) {
  const [val, setVal] = useState("");
  const add = () => {
    const trimmed = val.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < 10) {
      onChange([...tags, trimmed]);
      setVal("");
    }
  };
  const remove = (t: string) => onChange(tags.filter((x) => x !== t));
  return (
    <div>
      <div className="flex flex-wrap gap-1.5 mb-2 min-h-[28px]">
        {tags.map((t) => (
          <span
            key={t}
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium"
            style={{
              backgroundColor: "rgba(255,255,255,0.08)",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {t}
            <button
              type="button"
              onClick={() => remove(t)}
              className="cursor-pointer hover:opacity-70"
            >
              <X size={9} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Tambah tag..."
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              add();
            }
          }}
          style={{ ...iStyle(false), flex: 1, paddingTop: 7, paddingBottom: 7 }}
        />
        <button
          type="button"
          onClick={add}
          className="size-8 rounded-lg flex items-center justify-center cursor-pointer transition-all duration-150"
          style={{
            backgroundColor: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255,255,255,0.12)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.85)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "rgba(255,255,255,0.07)";
            (e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.5)";
          }}
        >
          <Plus size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Success Screen ────────────────────────────────────────────────────────────
function SuccessScreen({ name, username }: { name: string; username: string }) {
  const displayName = name.split(" ")[0] || username;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, ease: smooth }}
      className="rounded-2xl overflow-hidden relative"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.25), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: 400,
          height: 200,
          background:
            "radial-gradient(ellipse at center top, rgba(255,255,255,0.06) 0%, transparent 70%)",
        }}
      />
      <div className="relative px-8 py-14 text-center">
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            delay: 0.15,
            duration: 0.5,
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          className="size-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <Check
            size={28}
            strokeWidth={2}
            style={{ color: "rgba(255,255,255,0.85)" }}
          />
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: smooth }}
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Portfolio Berhasil Dibuat
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.45, ease: smooth }}
          className="text-white mb-2"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 28,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Selamat datang,{" "}
          <em style={{ color: "rgba(255,255,255,0.5)" }}>{displayName}!</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.46 }}
          className="text-[13px] mb-1"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Portfolio kamu sudah live di
        </motion.p>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.52 }}
          href={`https://portof.id/${username}`}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          portof.id/{username || "username"} <ExternalLink size={12} />
        </motion.a>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4, ease: smooth }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <a
            href={`https://portof.id/${username}`}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.9)",
              color: "#0a0a0f",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.backgroundColor =
                "rgba(255,255,255,0.9)")
            }
          >
            <ExternalLink size={15} /> Lihat Portfolioku
          </a>
          <a
            href="/dashboard"
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.85)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "rgba(255,255,255,0.6)";
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.1)";
            }}
          >
            <LayoutDashboard size={15} /> Ke Dashboard
          </a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mt-5 text-[11px]"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          Kamu bisa edit portfolio kapan saja dari dashboard.
        </motion.p>
      </div>
    </motion.div>
  );
}

// ── OTP Input ─────────────────────────────────────────────────────────────────
function OtpInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const refs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));
  const digits = value.padEnd(6, "").split("").slice(0, 6);

  const handleKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const next = value.slice(0, -1);
      onChange(next);
      if (i > 0) refs[i - 1].current?.focus();
    }
  };

  const handleChange = (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    if (!char) return;
    const arr = digits.map((d, idx) => (idx === i ? char : d));
    const joined = arr.join("").replace(/ /g, "");
    onChange(joined);
    if (i < 5) refs[i + 1].current?.focus();
  };

  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={refs[i]}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={d === " " ? "" : d}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKey(i, e)}
          className="size-12 text-center text-[20px] font-bold rounded-xl transition-all duration-150"
          style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            border: `1.5px solid ${d && d !== " " ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.1)"}`,
            color: "rgba(255,255,255,0.9)",
            outline: "none",
            fontFamily: "'Inter', sans-serif",
          }}
        />
      ))}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
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

  const ssoBtn = (label: string, icon: React.ReactNode) => (
    <button
      type="button"
      key={label}
      className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 cursor-pointer hover:-translate-y-0.5"
      style={{
        backgroundColor: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.09)",
        color: "rgba(255,255,255,0.65)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.09)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.16)";
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.92)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.05)";
        (e.currentTarget as HTMLElement).style.borderColor =
          "rgba(255,255,255,0.09)";
        (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
      }}
    >
      {icon} Lanjut dengan {label}
    </button>
  );

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
        className="hidden lg:flex flex-col justify-between w-[360px] shrink-0 relative overflow-hidden px-10 py-10"
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
              className="text-[10px] font-semibold tracking-[0.1em] uppercase mb-2"
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

        <div className="w-full max-w-[780px]">
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
                        {/* ── STEP 1: kiri email, kanan SSO ── */}
                        {step === 1 && (
                          <div
                            className="grid grid-cols-2 divide-x"
                            style={{ borderColor: "rgba(255,255,255,0.06)" }}
                          >
                            {/* Left */}
                            <div className="p-6 space-y-3.5">
                              <p
                                className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                Daftar dengan email
                              </p>

                              <div>
                                <Lbl
                                  text="Username"
                                  hint="huruf, angka, _ , -"
                                />
                                <div className="relative">
                                  <span
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] pointer-events-none select-none"
                                    style={{ color: "rgba(255,255,255,0.22)" }}
                                  >
                                    portof.id/
                                  </span>
                                  <input
                                    type="text"
                                    placeholder="AkuAdmin"
                                    value={form.username}
                                    onChange={(e) =>
                                      set(
                                        "username",
                                        e.target.value.replace(
                                          /[^a-zA-Z0-9_-]/g,
                                          "",
                                        ),
                                      )
                                    }
                                    onFocus={() => setFocused("username")}
                                    onBlur={() => setFocused(null)}
                                    style={{
                                      ...iStyle(focused === "username"),
                                      paddingLeft: 82,
                                    }}
                                  />
                                </div>
                                {form.username.length > 0 && (
                                  <p
                                    className="text-[10px] mt-1"
                                    style={{ color: "rgba(255,255,255,0.25)" }}
                                  >
                                    portof.id/
                                    <span
                                      style={{ color: "rgba(255,255,255,0.6)" }}
                                    >
                                      {form.username}
                                    </span>
                                  </p>
                                )}
                              </div>

                              <div>
                                <Lbl text="Email" />
                                <input
                                  type="email"
                                  placeholder="email@kamu.com"
                                  value={form.email}
                                  onChange={(e) => set("email", e.target.value)}
                                  onFocus={() => setFocused("email")}
                                  onBlur={() => setFocused(null)}
                                  style={iStyle(focused === "email")}
                                />
                              </div>

                              <div>
                                <Lbl text="Password" hint="min. 6 karakter" />
                                <div className="relative">
                                  <input
                                    type={showPw ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) =>
                                      set("password", e.target.value)
                                    }
                                    onFocus={() => setFocused("password")}
                                    onBlur={() => setFocused(null)}
                                    style={{
                                      ...iStyle(focused === "password"),
                                      paddingRight: 40,
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPw((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                  >
                                    {showPw ? (
                                      <EyeOff size={14} />
                                    ) : (
                                      <Eye size={14} />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <Lbl text="Konfirmasi Password" />
                                <div className="relative">
                                  <input
                                    type={showCpw ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={form.confirmPw}
                                    onChange={(e) =>
                                      set("confirmPw", e.target.value)
                                    }
                                    onFocus={() => setFocused("confirmPw")}
                                    onBlur={() => setFocused(null)}
                                    style={{
                                      ...iStyle(focused === "confirmPw"),
                                      paddingRight: 40,
                                      borderColor:
                                        form.confirmPw && !pwMatch
                                          ? "rgba(255,100,100,0.4)"
                                          : focused === "confirmPw"
                                            ? "rgba(255,255,255,0.2)"
                                            : "rgba(255,255,255,0.08)",
                                    }}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowCpw((v) => !v)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                                    style={{ color: "rgba(255,255,255,0.3)" }}
                                  >
                                    {showCpw ? (
                                      <EyeOff size={14} />
                                    ) : (
                                      <Eye size={14} />
                                    )}
                                  </button>
                                </div>
                                {form.confirmPw && !pwMatch && (
                                  <p
                                    className="text-[10px] mt-1"
                                    style={{ color: "rgba(255,120,120,0.7)" }}
                                  >
                                    Password tidak sama
                                  </p>
                                )}
                                {form.confirmPw && pwMatch && (
                                  <p
                                    className="text-[10px] mt-1 flex items-center gap-1"
                                    style={{ color: "rgba(150,255,150,0.6)" }}
                                  >
                                    <Check size={10} /> Password cocok
                                  </p>
                                )}
                              </div>

                              <p
                                className="text-[10px] leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.2)" }}
                              >
                                Dengan mendaftar kamu menyetujui{" "}
                                <a
                                  href="/terms"
                                  style={{
                                    color: "rgba(255,255,255,0.4)",
                                    textDecoration: "underline",
                                  }}
                                >
                                  Syarat &amp; Ketentuan
                                </a>
                                .
                              </p>
                            </div>

                            {/* Right SSO */}
                            <div className="p-6 flex flex-col justify-center space-y-3">
                              <p
                                className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                                style={{ color: "rgba(255,255,255,0.25)" }}
                              >
                                Atau lanjut dengan
                              </p>

                              {ssoBtn(
                                "Google",
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 18 18"
                                  fill="none"
                                >
                                  <path
                                    d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.148 17.64 11.84 17.64 9.2z"
                                    fill="rgba(255,255,255,0.8)"
                                  />
                                  <path
                                    d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                                    fill="rgba(255,255,255,0.6)"
                                  />
                                  <path
                                    d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
                                    fill="rgba(255,255,255,0.45)"
                                  />
                                  <path
                                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"
                                    fill="rgba(255,255,255,0.35)"
                                  />
                                </svg>,
                              )}
                              {ssoBtn(
                                "GitHub",
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="rgba(255,255,255,0.65)"
                                >
                                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                                </svg>,
                              )}

                              <p
                                className="text-[10px] pt-2 leading-relaxed"
                                style={{ color: "rgba(255,255,255,0.18)" }}
                              >
                                SSO otomatis melanjutkan ke step berikutnya.
                              </p>
                            </div>
                          </div>
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
                                  <Lbl text="Nama Lengkap" />
                                  <input
                                    type="text"
                                    placeholder="Nama di portfolio"
                                    value={form.fullName}
                                    onChange={(e) =>
                                      set("fullName", e.target.value)
                                    }
                                    onFocus={() => setFocused("fullName")}
                                    onBlur={() => setFocused(null)}
                                    style={iStyle(focused === "fullName")}
                                  />
                                </div>
                              </div>

                              <div>
                                <Lbl text="Bio Singkat" hint="1 kalimat" />
                                <input
                                  type="text"
                                  placeholder="Seorang designer yang suka clean UI"
                                  value={form.bio}
                                  onChange={(e) => set("bio", e.target.value)}
                                  onFocus={() => setFocused("bio")}
                                  onBlur={() => setFocused(null)}
                                  style={iStyle(focused === "bio")}
                                />
                              </div>

                              <div>
                                <Lbl text="About" hint="opsional" />
                                <textarea
                                  rows={3}
                                  placeholder="Ceritakan lebih detail tentang dirimu..."
                                  value={form.about}
                                  onChange={(e) => set("about", e.target.value)}
                                  onFocus={() => setFocused("about")}
                                  onBlur={() => setFocused(null)}
                                  style={
                                    {
                                      ...iStyle(focused === "about"),
                                      resize: "none",
                                    } as React.CSSProperties
                                  }
                                />
                              </div>

                              <div className="grid grid-cols-2 gap-2.5">
                                <div>
                                  <Lbl text="Tanggal Lahir" hint="opsional" />
                                  <input
                                    type="date"
                                    value={form.birthdate}
                                    onChange={(e) =>
                                      set("birthdate", e.target.value)
                                    }
                                    onFocus={() => setFocused("birthdate")}
                                    onBlur={() => setFocused(null)}
                                    style={{
                                      ...iStyle(focused === "birthdate"),
                                      colorScheme: "dark",
                                    }}
                                  />
                                </div>
                                <div>
                                  <Lbl text="Alamat / Kota" hint="opsional" />
                                  <input
                                    type="text"
                                    placeholder="Jakarta, ID"
                                    value={form.address}
                                    onChange={(e) =>
                                      set("address", e.target.value)
                                    }
                                    onFocus={() => setFocused("address")}
                                    onBlur={() => setFocused(null)}
                                    style={iStyle(focused === "address")}
                                  />
                                </div>
                              </div>

                              <div>
                                <Lbl text="Website / Sosmed" hint="opsional" />
                                <input
                                  type="text"
                                  placeholder="https://linkedin.com/in/username"
                                  value={form.website}
                                  onChange={(e) =>
                                    set("website", e.target.value)
                                  }
                                  onFocus={() => setFocused("website")}
                                  onBlur={() => setFocused(null)}
                                  style={iStyle(focused === "website")}
                                />
                              </div>

                              <div>
                                <Lbl text="Tags" hint={`${tags.length}/10`} />
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
                              <Lbl text="Profesi" />
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
                                <Lbl text="Skill Utama" hint="pisahkan koma" />
                                <input
                                  type="text"
                                  placeholder="Figma, React, Branding..."
                                  value={form.skills}
                                  onChange={(e) =>
                                    set("skills", e.target.value)
                                  }
                                  onFocus={() => setFocused("skills")}
                                  onBlur={() => setFocused(null)}
                                  style={iStyle(focused === "skills")}
                                />
                              </div>
                              <div>
                                <Lbl text="Pengalaman" />
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
                              {templates.map((t) => (
                                <TemplateCard
                                  key={t.id}
                                  t={t}
                                  selected={form.template === t.id}
                                  onClick={() => set("template", t.id)}
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
