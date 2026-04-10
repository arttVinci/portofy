import { IconCheck, IconEye, IconEyeOff, IconBrandGoogle } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface CreateAccountStepperProps {
  username: string;
  email: string;
  password: string;
  confirmPw: string;
  showPw: boolean;
  showCpw: boolean;
  pwMatch: boolean;
  focused: string | null;
  set: (field: string, value: string) => void;
  setFocused: (field: string | null) => void;
  setShowPw: (v: boolean) => void;
  setShowCpw: (v: boolean) => void;
}

const inputCn = (isFocused: boolean) =>
  cn(
    "w-full bg-white/[0.03] border rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all duration-200",
    isFocused
      ? "border-blue-500/40 bg-white/[0.05] shadow-[0_0_15px_rgba(59,130,246,0.08)]"
      : "border-white/[0.08] hover:border-white/[0.12]",
  );

export default function CreateAccountStepper({
  username,
  email,
  password,
  confirmPw,
  showPw,
  showCpw,
  pwMatch,
  focused,
  set,
  setFocused,
  setShowPw,
  setShowCpw,
}: CreateAccountStepperProps) {
  return (
    <div className="p-6 space-y-5">
      {/* Google SSO */}
      <div className="space-y-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-600">
          Daftar cepat
        </span>
        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-3 rounded-xl text-sm font-medium border border-white/[0.08] bg-white/[0.03] text-slate-300 hover:bg-white/[0.06] hover:border-white/[0.15] hover:text-white transition-all duration-200 cursor-pointer"
        >
          <IconBrandGoogle size={18} stroke={1.5} />
          Lanjut dengan Google
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-4">
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[11px] text-slate-600 font-medium uppercase tracking-widest">
          atau
        </span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>

      {/* Username */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
          Username
        </label>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[12px] pointer-events-none select-none text-slate-600">
            portof.id/
          </span>
          <input
            type="text"
            placeholder="Pilih username"
            value={username}
            onChange={(e) =>
              set("username", e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))
            }
            onFocus={() => setFocused("username")}
            onBlur={() => setFocused(null)}
            className={inputCn(focused === "username")}
            style={{ paddingLeft: 82 }}
          />
        </div>
        {username.length > 0 && (
          <p className="text-[10px] mt-1.5 text-slate-600">
            portof.id/
            <span className="text-slate-400">{username}</span>
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
          Email
        </label>
        <input
          type="email"
          placeholder="Masukkan email"
          value={email}
          onChange={(e) => set("email", e.target.value)}
          onFocus={() => setFocused("email")}
          onBlur={() => setFocused(null)}
          className={inputCn(focused === "email")}
        />
      </div>

      {/* Password */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
            Password
          </label>
          <span className="text-[10px] text-slate-600">min. 8 karakter</span>
        </div>
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            placeholder="Buat password"
            value={password}
            onChange={(e) => set("password", e.target.value)}
            onFocus={() => setFocused("password")}
            onBlur={() => setFocused(null)}
            className={cn(inputCn(focused === "password"), "pr-11")}
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
          >
            {showPw ? (
              <IconEyeOff size={16} stroke={1.5} />
            ) : (
              <IconEye size={16} stroke={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 mb-2">
          Konfirmasi Password
        </label>
        <div className="relative">
          <input
            type={showCpw ? "text" : "password"}
            placeholder="Konfirmasi password"
            value={confirmPw}
            onChange={(e) => set("confirmPw", e.target.value)}
            onFocus={() => setFocused("confirmPw")}
            onBlur={() => setFocused(null)}
            className={cn(
              inputCn(focused === "confirmPw"),
              "pr-11",
              confirmPw && !pwMatch && "border-red-500/40",
            )}
          />
          <button
            type="button"
            onClick={() => setShowCpw(!showCpw)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
          >
            {showCpw ? (
              <IconEyeOff size={16} stroke={1.5} />
            ) : (
              <IconEye size={16} stroke={1.5} />
            )}
          </button>
        </div>
        {confirmPw && !pwMatch && (
          <p className="text-[10px] mt-1.5 text-red-400/80">
            Password tidak sama
          </p>
        )}
        {confirmPw && pwMatch && (
          <p className="text-[10px] mt-1.5 flex items-center gap-1 text-emerald-400/70">
            <IconCheck size={10} /> Password cocok
          </p>
        )}
      </div>

      {/* Terms */}
      <p className="text-[10px] text-slate-600 leading-relaxed">
        Dengan mendaftar kamu menyetujui{" "}
        <a href="/terms" className="text-slate-400 underline underline-offset-2 hover:text-slate-300 transition-colors">
          Syarat &amp; Ketentuan
        </a>
        .
      </p>
    </div>
  );
}
