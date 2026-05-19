import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { IconCheck, IconArrowRight, IconArrowLeft } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ApiError } from "@/api/apiError";
import { useSearchParams } from "react-router-dom";
import { STORAGE_KEYS } from "@/config/api.config";

import SuccessScreen from "@/components/auth/SuccessScreen";

import type {
  RegisterUserRequest,
  CreateProfileRequest,
  SendOtpRequest,
} from "@/@types";

import { useToast } from "@/hooks/ui/useToast";

import CreateAccountStepper from "@/sections/auth/Register/StepperForm/CreateAccountStepper";
import OtpCodeStepper from "@/sections/auth/Register/StepperForm/OtpCodeStepper";
import CreateUserProfile from "@/sections/auth/Register/StepperForm/CreateUserProfile";
import { useRegister } from "@/hooks/mutations/auth/useRegister";
import { useCreateProfile } from "@/hooks/mutations/profile/useCreateProfile";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";
import { useSendOtp } from "@/hooks/mutations/auth/useSendOtp";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  { num: 1, title: "Buat Akun", desc: "Username, email & password" },
  { num: 2, title: "Verifikasi Email", desc: "Masukkan kode OTP" },
  { num: 3, title: "Profil Kamu", desc: "Avatar, bio & detail" },
];

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPw: string;
  phone: string;
  fullName: string;
  image_url: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
  userId: string;
}

export default function RegisterPage() {
  const { toast, renderToasts } = useToast();
  const [searchParams] = useSearchParams();
  const isOAuth = searchParams.get("oauth") === "true";

  const [token, setToken] = useState<string>("");

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [otp, setOtp] = useState("");

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPw: "",
    phone: "",
    fullName: "",
    image_url: "",
    address: "",
    about: "",
    bio: "",
    theme: "minimal",
    tags: [],
    userId: "",
  });

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8080/api/auth/google/login";
  };

  const createUserMutation = useRegister({
    onSuccess: (response) => {
      setToken(response.token);
      setFormData((prev) => ({ ...prev, userId: response.user.id }));
      goNext();
      toast("success", "Berhasil", `Akun berhasil dibuat`);
    },
    onError: (error: ApiError) => {
      toast("error", "Gagal", error.message);
    },
  });

  const createProfileMutation = useCreateProfile({
    onSuccess: (response) => {
      toast("success", "Berhasil", `Selamat datang ${response.full_name},`);
      setDone(true);
    },
    onError: (error) => {
      toast("error", "Gagal", error.message);
    },
  });

  const uploadMutation = useUploadImage({
    onSuccess: (response) => {
      setFormData((prev) => ({
        ...prev,
        image_url: response.image_url[0],
      }));
      toast("success", "Berhasil", "Foto profil berhasil diupload");
      goNext();
    },
    onError: (error: ApiError) => toast("error", "Gagal", error.message),
  });

  const sendOtpMutation = useSendOtp({
    onSuccess: () => {
      toast("success", "Berhasil", "Kode OTP telah dikirim ke email kamu");
    },
    onError: (error: ApiError) => toast("error", "Gagal", error.message),
  });

  const handleCreateUser = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const payload: RegisterUserRequest = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      no_telp: formData.phone,
      otp_code: otp,
    };
    createUserMutation.mutate(payload);
  };

  const handleCreateProfile = (e?: React.FormEvent) => {
    handleUploadImage();

    if (e) e.preventDefault();
    const payload: CreateProfileRequest = {
      user_id: formData.userId,
      full_name: formData.fullName,
      image_url: formData.image_url,
      address: formData.address,
      about: formData.about,
      bio: formData.bio,
      theme: formData.theme,
      tags: formData.tags,
    };
    createProfileMutation.mutate(payload);
  };

  const handleUploadImage = () => {
    if (!avatarImageFile) {
      goNext();
      return;
    }
    const formData = new FormData();
    formData.append("images", avatarImageFile);
    uploadMutation.mutateAsync(formData);
  };

  const handleSendOtp = () => {
    const payload: SendOtpRequest = {
      username: formData.username,
      email: formData.email,
    };
    sendOtpMutation.mutate(payload);
  };

  const handleFormChange = useCallback(
    (key: string, value: string | string[]): void => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const pwMatch = formData.password === formData.confirmPw;
  const pwStrong = formData.password.length >= 8;

  const canNext = () => {
    if (step === 1)
      return (
        formData.username.length >= 3 && formData.email && pwStrong && pwMatch
      );
    if (step === 3) return formData.fullName.length > 3;
    return true;
  };

  const goNext = () => {
    if (step === 1) {
      handleSendOtp();
    }
    setDir(1);
    setStep((s) => Math.min(s + 1, 3));
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

  useEffect(() => {
    // OAuth flow: user already has an account + token, skip to step 3
    if (isOAuth) {
      const savedToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
      if (savedToken) {
        setToken(savedToken);
        setStep(3);
        setDir(1);

        // Decode JWT to extract userId
        try {
          const payload = JSON.parse(atob(savedToken.split(".")[1]));
          setFormData((prev) => ({
            ...prev,
            userId: payload.id || "",
            username: payload.username || "",
          }));
        } catch (e) {
          console.error("Failed to decode OAuth token:", e);
        }
      }
      return;
    }

    // Normal register flow: resume from saved state
    const savedToken = localStorage.getItem("authToken");
    const savedStep = localStorage.getItem("registerStep");
    const savedUserData = localStorage.getItem("registerData");

    if (savedToken) {
      setToken(savedToken);
      if (savedStep) {
        setStep(parseInt(savedStep, 10));
        setDir(1);
      } else {
        setStep(2);
      }
      if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        setFormData((prev) => ({
          ...prev,
          userId: parsedData.userId,
          email: parsedData.email,
          username: parsedData.username,
        }));
      }
    }
  }, [isOAuth]);

  useEffect(() => {
    if (token && step > 1) {
      localStorage.setItem("registerStep", step.toString());
    }
  }, [step, token]);

  /* ════════════════════════════ LEFT PANEL CONTENT ════════════════════════════ */

  const leftPanelTitles: Record<
    number,
    { heading: string; sub: string; desc: string }
  > = {
    1: {
      heading: "Buat Akun",
      sub: "Portofy.",
      desc: "Daftar dengan email atau langsung gunakan akun Google.",
    },
    2: {
      heading: "Verifikasi",
      sub: "Email Kamu.",
      desc: `Kode 6 digit dikirim ke ${formData.email || "email kamu"}.`,
    },
    3: {
      heading: "Lengkapi",
      sub: "Profilmu.",
      desc: "Upload CV dan biarkan AI mengisi form — atau isi sendiri.",
    },
  };

  const currentLeft = leftPanelTitles[step] || leftPanelTitles[1];

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
      <div className="absolute top-1/2 left-[15%] -translate-y-1/2 w-125 h-125 bg-blue-600/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-[30%] right-[10%] w-100 h-100 bg-violet-600/6 blur-[120px] rounded-full pointer-events-none z-0" />

      {renderToasts()}

      {/* ── LEFT BRANDING ── */}
      <div className="hidden lg:flex flex-col justify-between w-105 shrink-0 relative overflow-hidden px-12 py-12 border-r border-white/6">
        {/* Gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-75 bg-linear-to-t from-blue-600/5 to-transparent pointer-events-none" />

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
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: smooth }}
          >
            {/* Progress bar */}
            <div className="flex items-center gap-1.5 mb-6">
              {steps.map((s) => (
                <div
                  key={s.num}
                  className={cn(
                    "h-0.75 flex-1 rounded-full transition-all duration-500",
                    step > s.num
                      ? "bg-blue-400/60"
                      : step === s.num
                        ? "bg-blue-500/30"
                        : "bg-white/6",
                  )}
                />
              ))}
            </div>

            <span className="text-[10px] font-semibold tracking-widest uppercase text-slate-600 block mb-2">
              Langkah {step} dari {steps.length}
            </span>

            <h2
              className="text-[34px] font-bold text-white mb-3 leading-[1.15] tracking-tight"
              style={{
                fontFamily:
                  "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
              }}
            >
              {currentLeft.heading}{" "}
              <span className="text-slate-500">{currentLeft.sub}</span>
            </h2>

            <p className="text-sm text-slate-400 leading-relaxed max-w-70">
              {currentLeft.desc}
            </p>
          </motion.div>
        </div>

        {/* Testimonial */}
        <div className="relative z-10">
          <div className="h-px bg-white/6 mb-5" />
          <p className="text-[13px] text-slate-500 italic leading-relaxed mb-2">
            "Setup 10 menit, besoknya sudah ada yang menghubungi."
          </p>
          <p className="text-[11px] text-slate-600">
            — Rizky A., UI/UX Designer
          </p>
        </div>
      </div>

      {/* ── RIGHT FORM ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative z-10">
        {/* Mobile brand */}
        <div className="lg:hidden mb-8">
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

        <div className="w-full max-w-150">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: smooth }}
              >
                {/* Card */}
                <div className="rounded-2xl overflow-hidden bg-white/2 border border-white/2 backdrop-blur-sm">
                  {/* Top accent */}
                  <div className="h-px bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />

                  {/* Stepper header */}
                  <div className="px-6 pt-5 pb-4 border-b border-white/6">
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
                              className={cn(
                                "size-7 rounded-lg flex items-center justify-center shrink-0 transition-all duration-300 text-[11px] font-bold",
                                isDone
                                  ? "bg-blue-500 text-white border-transparent"
                                  : isActive
                                    ? "bg-blue-500/10 border-blue-500/30 text-blue-300"
                                    : "bg-white/3 border-white/8 text-slate-600",
                                "border",
                              )}
                            >
                              {isDone ? (
                                <IconCheck size={12} stroke={2.5} />
                              ) : (
                                s.num
                              )}
                            </div>
                            {i < steps.length - 1 && (
                              <div
                                className={cn(
                                  "flex-1 h-px mx-1.5 transition-all duration-500",
                                  isDone ? "bg-blue-500/40" : "bg-white/6",
                                )}
                              />
                            )}
                          </div>
                        );
                      })}
                    </div>
                    <h3
                      className="text-[15px] font-bold text-white"
                      style={{
                        fontFamily:
                          "var(--font-jakarta, 'Plus Jakarta Sans', sans-serif)",
                      }}
                    >
                      {steps[step - 1].title}
                    </h3>
                    <p className="text-[12px] text-slate-500">
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
                          <CreateAccountStepper
                            username={formData.username}
                            email={formData.email}
                            password={formData.password}
                            confirmPw={formData.confirmPw}
                            showPw={showPw}
                            showCpw={showCpw}
                            pwMatch={pwMatch}
                            focused={focused}
                            set={handleFormChange}
                            setFocused={setFocused}
                            setShowPw={setShowPw}
                            setShowCpw={setShowCpw}
                          />
                        )}

                        {/* Step 2 OTP */}
                        {step === 2 && (
                          <OtpCodeStepper
                            email={formData.email}
                            otp={otp}
                            setOtp={setOtp}
                          />
                        )}

                        {/* Step 3 Profile */}
                        {step === 3 && (
                          <CreateUserProfile
                            fullName={formData.fullName}
                            bio={formData.bio}
                            about={formData.about}
                            address={formData.address}
                            tags={formData.tags}
                            avatarPreview={avatarPreviewUrl}
                            cvFile={cvFile}
                            focused={focused}
                            setForm={handleFormChange}
                            setFocused={setFocused}
                            setAvatarPreview={setAvatarPreviewUrl}
                            setAvatarImageFile={setAvatarImageFile}
                            setCvFile={setCvFile}
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Footer nav */}
                  <div className="px-6 py-4 flex items-center justify-between border-t border-white/6">
                    {step > 1 && !isOAuth ? (
                      <button
                        onClick={goPrev}
                        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
                      >
                        <IconArrowLeft size={14} /> Kembali
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        onClick={step === 2 ? handleCreateUser : goNext}
                        disabled={
                          !canNext() ||
                          (step === 1 && createUserMutation.isPending)
                        }
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-[#070e1b] hover:bg-blue-50 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {step === 2 && createUserMutation.isPending
                          ? "Mendaftar..."
                          : step === 1
                            ? "Kirim Kode"
                            : "Lanjut"}
                        {!createUserMutation.isPending &&
                          !createProfileMutation.isPending && (
                            <IconArrowRight size={14} />
                          )}
                      </button>
                    ) : (
                      <button
                        onClick={handleCreateProfile}
                        disabled={createProfileMutation.isPending}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-white text-[#070e1b] hover:bg-blue-50 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {createProfileMutation.isPending
                          ? "Memproses..."
                          : "Buat Portfolio"}
                        {!createProfileMutation.isPending && (
                          <IconArrowRight size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Login link */}
                <p className="text-center mt-6 text-sm text-slate-500">
                  Sudah punya akun?{" "}
                  <a
                    href="/auth/login"
                    className="font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Masuk
                  </a>
                </p>
              </motion.div>
            ) : (
              <SuccessScreen
                name={formData.fullName}
                username={formData.username}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
