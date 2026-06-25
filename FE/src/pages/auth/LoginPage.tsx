import { useState } from "react";
import { motion } from "motion/react";
import { EyeIcon, EyeOffIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LoginUserRequest } from "@/@types/entities/auth.types";
import { ApiError } from "@/api/apiError";

import { useLogin } from "@/hooks/mutations/auth/useLogin";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/ui/useToast";
import { useFormData } from "@/hooks/ui/useFormData";

export default function LoginPage() {
  const [focused, setFocused] = useState<string | null>(null);
  const [showPw, setShowPw] = useState(false);
  const navigate = useNavigate();
  const { toast, renderToasts } = useToast();

  const form = useFormData<LoginUserRequest>({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      loginMutation.mutate(values);
    },
  });

  const loginMutation = useLogin({
    onSuccess: (data) => {
      toast("success", "Berhasil", `Selamat datang ${data.user.username}`);
      navigate("/app");
    },
    onError: (error: ApiError) => {
      toast("error", "Error", error.message);
    },
  });

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8080/api/auth/google/login";
  };

  return (
    <div className="relative flex min-h-screen bg-[#070e1b] font-sans overflow-hidden">
      {/* ── Background grid ── */}
      <div
        className={cn(
          "absolute inset-0 z-0 bg-size-[50px_50px]",
          "[background-image:linear-gradient(to_right,#1e3a8a_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a_1px,transparent_1px)]",
          "opacity-[0.12]",
        )}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] bg-violet-600/6 blur-[120px] rounded-full pointer-events-none z-0" />

      {renderToasts()}

      {/* ── LEFT BRANDING ── */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 relative overflow-hidden px-12 py-12 border-r border-white/[0.06]">
        {/* Gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-blue-600/5 to-transparent pointer-events-none" />

        {/* Brand */}
        <a href="/" className="relative z-10 flex items-center gap-2.5">
          <img
            src="/images/portofLogo.png"
            alt="Portofy logo"
            className="w-8 h-8 object-contain rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="text-[18px] font-bold tracking-tight text-white">
            Portofy
          </span>
        </a>

        {/* Center content */}
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-[2px] w-8 bg-blue-500 mb-6" />
            <h2
              className="text-[34px] font-bold text-white mb-3 leading-[1.15] tracking-tight"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              Selamat Datang <span className="text-slate-500">Kembali.</span>
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed max-w-[280px]">
              Portofoliomu menunggu. Masuk dan lanjutkan perjalanan personal
              branding-mu.
            </p>
          </motion.div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="h-px bg-white/[0.06] mb-5" />
          <p className="text-[13px] text-slate-500 italic leading-relaxed mb-2">
            "Portfolio saya jadi hal pertama yang dilihat HR setiap kali saya
            melamar kerja."
          </p>
          <p className="text-[11px] text-slate-600">
            — Sinta M., Fresh Graduate
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        {/* Mobile brand */}
        <div className="lg:hidden mb-10">
          <a href="/" className="flex items-center gap-2.5">
            <img
              src="/images/portofLogo.png"
              alt="Portofy logo"
              className="w-8 h-8 object-contain rounded-full"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="text-[18px] font-bold tracking-tight text-white">
              Portofy
            </span>
          </a>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          {/* Card */}
          <div className="rounded-2xl overflow-hidden bg-white/[0.02] border border-white/[0.08] backdrop-blur-sm">
            {/* Top accent line */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

            {/* Header */}
            <div className="px-7 pt-7 pb-5 border-b border-white/[0.06]">
              <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-1 mb-4">
                <span className="text-blue-300 text-[10px] font-semibold tracking-widest uppercase">
                  Login
                </span>
              </div>
              <h3
                className="text-xl font-bold text-white mb-1"
                style={{
                  fontFamily:
                    "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                }}
              >
                Masuk ke Dashboard
              </h3>
              <p className="text-sm text-slate-500">
                Kelola portofolio dan personal brand kamu.
              </p>
            </div>

            {/* Body */}
            <div className="p-7 space-y-5">
              {/* Google SSO */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white transition-all duration-200 cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={18}
                  height={18}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8" />
                </svg>
                Masuk dengan Google
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[11px] text-slate-600 font-medium uppercase tracking-widest">
                  atau
                </span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              {/* Form */}
              <form onSubmit={form.handleSubmit} className="space-y-4">
                {/* Username */}
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Masukkan username"
                    value={form.values.username}
                    onChange={(e) =>
                      form.handleChange("username", e.target.value)
                    }
                    onFocus={() => setFocused("id")}
                    onBlur={() => setFocused(null)}
                    className={cn(
                      "w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200",
                      focused === "id"
                        ? "border-blue-500/40 bg-white/[0.05] shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                        : "border-white/[0.08] hover:border-white/[0.12]",
                    )}
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-[11px] font-medium text-slate-600 hover:text-blue-400 transition-colors"
                    >
                      Lupa password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPw ? "text" : "password"}
                      placeholder="Masukkan password"
                      value={form.values.password}
                      onChange={(e) =>
                        form.handleChange("password", e.target.value)
                      }
                      onFocus={() => setFocused("pw")}
                      onBlur={() => setFocused(null)}
                      className={cn(
                        "w-full bg-white/[0.03] border rounded-xl px-4 py-3 pr-11 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200",
                        focused === "pw"
                          ? "border-blue-500/40 bg-white/[0.05] shadow-[0_0_15px_rgba(59,130,246,0.08)]"
                          : "border-white/[0.08] hover:border-white/[0.12]",
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
                    >
                      {showPw ? (
                        <EyeOffIcon size={16} strokeWidth={1.5} />
                      ) : (
                        <EyeIcon size={16} strokeWidth={1.5} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loginMutation.isPending}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold bg-white text-[#070e1b] hover:bg-blue-50 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                >
                  {loginMutation.isPending ? (
                    "Memproses..."
                  ) : (
                    <>
                      Masuk <ArrowRightIcon size={16} strokeWidth={2} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Register link */}
          <p className="text-center mt-6 text-sm text-slate-500">
            Belum punya akun?{" "}
            <a
              href="/auth/register"
              className="font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Daftar gratis
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
