import { Check, Eye, EyeOff } from "lucide-react";
import InputLabel from "../../../../components/auth/InputLabel";
import IStyle from "../../../../components/utils/IStyle";
import SsoButton from "../../../../components/auth/SsoButton";

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
export default function CreateAccountSteppera({
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
          <InputLabel text="Username" />
          <div className="relative">
            <span
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[12px] pointer-events-none select-none"
              style={{ color: "rgba(255,255,255,0.22)" }}
            >
              portof.id/
            </span>
            <input
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) =>
                set("username", e.target.value.replace(/[^a-zA-Z0-9_-]/g, ""))
              }
              onFocus={() => setFocused("username")}
              onBlur={() => setFocused(null)}
              style={{
                ...IStyle(focused === "username"),
                paddingLeft: 82,
              }}
            />
          </div>
          {username.length > 0 && (
            <p
              className="text-[10px] mt-1"
              style={{ color: "rgba(255,255,255,0.25)" }}
            >
              portof.id/
              <span style={{ color: "rgba(255,255,255,0.6)" }}>{username}</span>
            </p>
          )}
        </div>

        <div>
          <InputLabel text="Email" />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => set("email", e.target.value)}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={IStyle(focused === "email")}
          />
        </div>

        <div>
          <InputLabel text="Password" hint="min. 8 Characters" />
          <div className="relative">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Create a password"
              value={password}
              onChange={(e) => set("password", e.target.value)}
              onFocus={() => setFocused("password")}
              onBlur={() => setFocused(null)}
              style={{
                ...IStyle(focused === "password"),
                paddingRight: 40,
              }}
            />
            <button
              type="button"
              onClick={() => setShowPw(!showPw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {showPw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        <div>
          <InputLabel text="Confirm Password" />
          <div className="relative">
            <input
              type={showCpw ? "text" : "password"}
              placeholder="Confirm your password"
              value={confirmPw}
              onChange={(e) => set("confirmPw", e.target.value)}
              onFocus={() => setFocused("confirmPw")}
              onBlur={() => setFocused(null)}
              style={{
                ...IStyle(focused === "confirmPw"),
                paddingRight: 40,
                borderColor:
                  confirmPw && !pwMatch
                    ? "rgba(255,100,100,0.4)"
                    : focused === "confirmPw"
                      ? "rgba(255,255,255,0.2)"
                      : "rgba(255,255,255,0.08)",
              }}
            />
            <button
              type="button"
              onClick={() => setShowCpw(!showCpw)}
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {showCpw ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
          {confirmPw && !pwMatch && (
            <p
              className="text-[10px] mt-1"
              style={{ color: "rgba(255,120,120,0.7)" }}
            >
              Password tidak sama
            </p>
          )}
          {confirmPw && pwMatch && (
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

        <SsoButton
          label="Google"
          icon={
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
          }
        />

        <SsoButton
          label="GitHub"
          icon={
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="rgba(255,255,255,0.65)"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
          }
        />

        <p
          className="text-[10px] pt-2 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.18)" }}
        >
          SSO otomatis melanjutkan ke step berikutnya.
        </p>
      </div>
    </div>
  );
}
