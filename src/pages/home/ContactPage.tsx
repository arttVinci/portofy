import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Twitter,
  Instagram,
  Github,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@portof.id",
    desc: "Respons dalam 1–2 hari kerja",
    href: "mailto:hello@portof.id",
  },
  {
    icon: MessageCircle,
    label: "Live Chat",
    value: "Buka dashboard",
    desc: "Tersedia di dalam aplikasi",
    href: "/login",
  },
  {
    icon: Twitter,
    label: "Twitter / X",
    value: "@portofid",
    desc: "Update terbaru dan diskusi",
    href: "https://twitter.com/portofid",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@portof.id",
    desc: "Behind the scenes & showcase",
    href: "https://instagram.com/portof.id",
  },
];

const topics = [
  "Pertanyaan umum",
  "Bug atau masalah teknis",
  "Fitur yang ingin diusulkan",
  "Kerjasama / Partnership",
  "Liputan / Press",
  "Lainnya",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
  };

  const inputStyle = (field: string) => ({
    backgroundColor: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused === field ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
    color: "rgba(255,255,255,0.8)",
    outline: "none",
    transition: "border-color 0.15s",
  });

  return (
    <div
      id="contact"
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
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div
            className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 700,
              height: 360,
              background:
                "radial-gradient(ellipse at center top, rgba(255,255,255,0.05) 0%, transparent 65%)",
            }}
          />
          <div className="relative max-w-5xl mx-auto px-6">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: smooth }}
              className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              Kontak
            </motion.p>
            <div className="flex items-end justify-between gap-12 flex-wrap">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: smooth, delay: 0.06 }}
                className="text-white"
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: "clamp(40px, 5.5vw, 60px)",
                  lineHeight: 1.06,
                  letterSpacing: "-0.03em",
                }}
              >
                Ada yang bisa{" "}
                <span
                  className="italic"
                  style={{ color: "rgba(255,255,255,0.35)" }}
                >
                  kami bantu?
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-[15px] leading-relaxed max-w-xs mb-1"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                Kirim pesan, atau pilih kanal yang paling nyaman untukmu.
              </motion.p>
            </div>
          </div>
        </section>

        {/* ── MAIN ── */}
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10 items-start">
            {/* ── FORM ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: smooth, delay: 0.1 }}
              className="rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "#0e0e14",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <div
                className="px-6 pt-6 pb-5"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p
                  className="text-[15px] font-semibold"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Kirim pesan
                </p>
                <p
                  className="text-[12px] mt-0.5"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Kami akan membalas dalam 1–2 hari kerja.
                </p>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: smooth }}
                  className="px-6 py-16 text-center"
                >
                  <div
                    className="size-12 rounded-full flex items-center justify-center mx-auto mb-4 text-[22px]"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    ✦
                  </div>
                  <p
                    className="text-[18px] font-semibold mb-2"
                    style={{
                      fontFamily: "'Instrument Serif', serif",
                      color: "rgba(255,255,255,0.85)",
                    }}
                  >
                    Pesan terkirim!
                  </p>
                  <p
                    className="text-[13px]"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    Terima kasih, {form.name.split(" ")[0]}. Kami akan
                    menghubungi kamu segera.
                  </p>
                  <button
                    onClick={() => {
                      setForm({ name: "", email: "", topic: "", message: "" });
                      setSubmitted(false);
                    }}
                    className="mt-6 text-[12px] font-medium cursor-pointer transition-colors duration-150"
                    style={{ color: "rgba(255,255,255,0.3)" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.7)")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color =
                        "rgba(255,255,255,0.3)")
                    }
                  >
                    Kirim pesan lain →
                  </button>
                </motion.div>
              ) : (
                <div className="p-6 space-y-4">
                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-[11px] font-semibold mb-1.5 uppercase tracking-[0.08em]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        placeholder="Nama kamu"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused(null)}
                        className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                        style={inputStyle("name")}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-[11px] font-semibold mb-1.5 uppercase tracking-[0.08em]"
                        style={{ color: "rgba(255,255,255,0.3)" }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        placeholder="email@kamu.com"
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        className="w-full px-4 py-2.5 rounded-xl text-[13px]"
                        style={inputStyle("email")}
                      />
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label
                      className="block text-[11px] font-semibold mb-1.5 uppercase tracking-[0.08em]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Topik
                    </label>
                    <select
                      value={form.topic}
                      onChange={(e) =>
                        setForm({ ...form, topic: e.target.value })
                      }
                      onFocus={() => setFocused("topic")}
                      onBlur={() => setFocused(null)}
                      className="w-full px-4 py-2.5 rounded-xl text-[13px] cursor-pointer"
                      style={{
                        ...inputStyle("topic"),
                        color: form.topic
                          ? "rgba(255,255,255,0.8)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <option
                        value=""
                        disabled
                        style={{ backgroundColor: "#0e0e14" }}
                      >
                        Pilih topik...
                      </option>
                      {topics.map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{
                            backgroundColor: "#0e0e14",
                            color: "rgba(255,255,255,0.8)",
                          }}
                        >
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      className="block text-[11px] font-semibold mb-1.5 uppercase tracking-[0.08em]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Pesan
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Ceritakan lebih detail..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused(null)}
                      className="w-full px-4 py-3 rounded-xl text-[13px] resize-none"
                      style={inputStyle("message")}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    onClick={handleSubmit}
                    disabled={!form.name || !form.email || !form.message}
                    className="w-full py-3 rounded-xl text-[14px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.9)",
                      color: "#0a0a0f",
                    }}
                    onMouseEnter={(e) => {
                      if (!(!form.name || !form.email || !form.message))
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#fff";
                    }}
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.backgroundColor =
                        "rgba(255,255,255,0.9)")
                    }
                  >
                    Kirim Pesan
                  </button>
                </div>
              )}
            </motion.div>

            {/* ── RIGHT SIDEBAR ── */}
            <div className="space-y-4">
              {/* Channels */}
              <motion.div {...fadeUp(0.15)}>
                <p
                  className="text-[10px] font-bold tracking-[0.12em] uppercase mb-3 px-1"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                >
                  Kanal lain
                </p>
                <div className="space-y-2">
                  {channels.map((ch, i) => (
                    <a
                      key={i}
                      href={ch.href}
                      target={ch.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center gap-3.5 px-4 py-3.5 rounded-xl group transition-all duration-150"
                      style={{
                        backgroundColor: "#0e0e14",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#111118";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.borderColor =
                          "rgba(255,255,255,0.06)";
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "#0e0e14";
                      }}
                    >
                      <div
                        className="size-8 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: "rgba(255,255,255,0.06)",
                          border: "1px solid rgba(255,255,255,0.08)",
                        }}
                      >
                        <ch.icon
                          size={14}
                          style={{ color: "rgba(255,255,255,0.5)" }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-[13px] font-semibold"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          {ch.value}
                        </p>
                        <p
                          className="text-[11px]"
                          style={{ color: "rgba(255,255,255,0.28)" }}
                        >
                          {ch.desc}
                        </p>
                      </div>
                      <ArrowRight
                        size={13}
                        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ color: "rgba(255,255,255,0.4)" }}
                      />
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* FAQ teaser */}
              <motion.div
                {...fadeUp(0.25)}
                className="rounded-xl p-5"
                style={{
                  backgroundColor: "#0e0e14",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <p
                  className="text-[13px] font-semibold mb-1"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  Mungkin sudah terjawab
                </p>
                <p
                  className="text-[12px] leading-relaxed mb-3"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Cek halaman FAQ kami — pertanyaan umum sudah ada jawabannya di
                  sana.
                </p>
                <a
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold transition-all duration-150 hover:gap-2.5"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.85)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.5)")
                  }
                >
                  Buka FAQ <ArrowRight size={12} />
                </a>
              </motion.div>

              {/* Response time note */}
              <motion.div
                {...fadeUp(0.3)}
                className="rounded-xl px-4 py-3.5 flex items-center gap-3"
                style={{
                  backgroundColor: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <span className="text-[18px]">🕐</span>
                <p
                  className="text-[12px] leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Waktu respons rata-rata{" "}
                  <span
                    style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600 }}
                  >
                    kurang dari 24 jam
                  </span>{" "}
                  pada hari kerja.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
