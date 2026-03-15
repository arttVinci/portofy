import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

function iStyle(focused: boolean): React.CSSProperties {
  return {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.04)",
    border: `1px solid ${focused ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)"}`,
    borderRadius: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    outline: "none",
    transition: "border-color 0.15s",
    fontFamily: "'Inter', sans-serif",
  };
}

function Lbl({ text }: { text: string }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-[0.08em] mb-1.5"
      style={{ color: "rgba(255,255,255,0.3)" }}
    >
      {text}
    </p>
  );
}

export default function LoginPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const GoogleIcon = (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
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
    </svg>
  );

  const GithubIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="rgba(255,255,255,0.65)"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );

  const ssoBtn = (label: string, icon: React.ReactNode) => (
    <button
      key={label}
      type="button"
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
      {icon} Masuk dengan {label}
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
        className="hidden lg:flex flex-col justify-between w-90 shrink-0 relative overflow-hidden px-10 py-10"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: 400,
            background:
              "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Brand */}
        <a href="/" className="relative inline-block">
          <span
            className="text-[17px] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>por</span>
            <span style={{ color: "rgba(255,255,255,0.32)" }}>tof</span>
          </span>
        </a>

        {/* Center */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: smooth }}
          >
            <div
              className="h-px w-8 mb-6"
              style={{ backgroundColor: "rgba(255,255,255,0.12)" }}
            />
            <h2
              className="text-white mb-3"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 32,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              Selamat datang{" "}
              <em style={{ color: "rgba(255,255,255,0.35)" }}>kembali.</em>
            </h2>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Portfolio kamu menunggu. Masuk dan lanjutkan dari mana kamu
              berhenti.
            </p>
          </motion.div>
        </div>

        {/* Testimonial */}
        <div className="relative">
          <div
            className="h-px mb-4"
            style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
          />
          <p
            className="text-[13px] leading-relaxed mb-2"
            style={{ color: "rgba(255,255,255,0.3)", fontStyle: "italic" }}
          >
            "Portfolio portof jadi yang pertama dilihat HRD setiap kali gue
            apply."
          </p>
          <p
            className="text-[11px]"
            style={{ color: "rgba(255,255,255,0.18)" }}
          >
            — Sinta M., Fresh Graduate
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Mobile brand */}
        <div className="lg:hidden mb-10">
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

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: smooth }}
          className="w-full max-w-240"
        >
          {/* Card */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            {/* Top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.1), transparent)",
              }}
            />

            {/* Header */}
            <div
              className="px-6 pt-6 pb-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <p
                className="text-[11px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                Login
              </p>
              <p
                className="text-[15px] font-semibold"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Masuk ke akun kamu
              </p>
            </div>

            {/* Body: two columns */}
            <div
              className="grid grid-cols-2 divide-x"
              style={{ borderColor: "rgba(255,255,255,0.06)" }}
            >
              {/* Left: email form */}
              <div className="p-6 space-y-4">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Email atau Username
                </p>

                <div>
                  <Lbl text="Email / Username" />
                  <input
                    type="text"
                    placeholder="email@kamu.com atau AkuAdmin"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    onFocus={() => setFocused("id")}
                    onBlur={() => setFocused(null)}
                    style={iStyle(focused === "id")}
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <Lbl text="Password" />
                    <a
                      href="/forgot-password"
                      className="text-[10px] font-medium transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.65)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.3)")
                      }
                    >
                      Lupa password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocused("pw")}
                      onBlur={() => setFocused(null)}
                      style={{ ...iStyle(focused === "pw"), paddingRight: 40 }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
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
                  Masuk <ArrowRight size={14} />
                </button>
              </div>

              {/* Right: SSO */}
              <div className="p-6 flex flex-col justify-center space-y-3">
                <p
                  className="text-[11px] font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "rgba(255,255,255,0.25)" }}
                >
                  Atau masuk dengan
                </p>

                {ssoBtn("Google", GoogleIcon)}
                {ssoBtn("GitHub", GithubIcon)}

                <div className="pt-2">
                  <div
                    className="h-px mb-4"
                    style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
                  />
                  <p
                    className="text-[11px] leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.2)" }}
                  >
                    SSO akan langsung mengarahkan kamu ke dashboard setelah
                    login berhasil.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Register link */}
          <p
            className="text-center mt-5 text-[13px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Belum punya akun?{" "}
            <a
              href="/register"
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
              Daftar gratis
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
