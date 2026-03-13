import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

import SuccessScreen from "../../components/auth/SuccessScreen";
import TemplateCard from "../../components/marketing/TemplateCard";

import type { TemplateItem } from "../../@types/ui.types";
import type { RegisterUserRequest } from "../../@types/entities/auth";
import type { CreateProfileRequest } from "../../@types/entities/profile";

import { useAuth } from "../../hooks/mutations/useAuth";
import { useProfile } from "../../hooks/mutations/useProfile";

import CreateAccountStepper from "../../sections/auth/Register/StepperForm/CreateAccountStepper";
import OtpCodeStepper from "../../sections/auth/Register/StepperForm/OtpCodeStepper";
import CreateUserProfile from "../../sections/auth/Register/StepperForm/CreateUserProfile";

const ANIMATION_SMOOTH = [0.22, 1, 0.36, 1] as [number, number, number, number];

const STORAGE_KEYS = {
  TOKEN: "authToken",
  REGISTER_STEP: "registerStep",
  REGISTER_DATA: "registerData",
} as const;

const VALIDATION_RULES = {
  MIN_USERNAME_LENGTH: 3,
  MIN_PASSWORD_LENGTH: 8,
  MIN_FULLNAME_LENGTH: 3,
  OTP_LENGTH: 6,
} as const;

const STEPS = [
  { num: 1, title: "Buat Akun", desc: "Username, email & password" },
  { num: 2, title: "Verifikasi Email", desc: "Masukkan kode OTP" },
  { num: 3, title: "Profil Kamu", desc: "Avatar, bio & detail" },
  { num: 4, title: "Pilih Template", desc: "Tampilan awal" },
] as const;

const TEMPLATES: TemplateItem[] = [
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
];

interface FormData {
  // Account
  username: string;
  email: string;
  password: string;
  confirmPw: string;
  phone: string;
  // Profile
  fullName: string;
  profileUrl: string;
  address: string;
  about: string;
  bio: string;
  theme: string;
  tags: string[];
  userId: string;
}

interface SavedRegisterData {
  userId: string;
  email: string;
  username: string;
}

export default function RegisterPage() {
  const {
    createUser,
    loading: isLoadingUser,
    error: userError,
    validationErrors: userValidationErrors,
    clearError: userClearError,
  } = useAuth();

  const {
    createProfile,
    handleImageProfile,
    loading: isLoadingProfile,
    error: profileError,
    validationErrors: profileValidationErrors,
    clearError: profileClearError,
  } = useProfile();

  const [token, setToken] = useState<string>("");
  const [step, setStep] = useState<number>(1);
  const [dir, setDir] = useState<number>(1);
  const [showPw, setShowPw] = useState<boolean>(false);
  const [showCpw, setShowCpw] = useState<boolean>(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [done, setDone] = useState<boolean>(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [otp, setOtp] = useState<string>("");
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPw: "",
    phone: "",
    fullName: "",
    profileUrl: "",
    address: "",
    about: "",
    bio: "",
    theme: "minimal",
    tags: [],
    userId: "",
  });

  const pwMatch = formData.password === formData.confirmPw;
  const pwStrong =
    formData.password.length >= VALIDATION_RULES.MIN_PASSWORD_LENGTH;

  const handleFormChange = useCallback(
    (key: string, value: string | string[]): void => {
      setFormData((prev) => ({ ...prev, [key]: value }));

      if (userValidationErrors || profileValidationErrors) {
        userClearError();
        profileClearError();
      }
    },
    [
      userValidationErrors,
      profileValidationErrors,
      userClearError,
      profileClearError,
    ],
  );

  const handleCreateUser = useCallback(async (): Promise<void> => {
    try {
      const payload: RegisterUserRequest = {
        username: formData.username,
        password: formData.password,
        email: formData.email,
        no_telp: formData.phone,
      };

      const response = await createUser(payload);

      if (!response) {
        console.error("Registration failed: No response received");
        return;
      }

      // Save token
      setToken(response.token);
      localStorage.setItem(STORAGE_KEYS.TOKEN, response.token);

      setFormData((prev) => ({ ...prev, userId: response.user.id }));

      const crucialData: SavedRegisterData = {
        userId: response.user.id,
        email: formData.email,
        username: formData.username,
      };
      localStorage.setItem(
        STORAGE_KEYS.REGISTER_DATA,
        JSON.stringify(crucialData),
      );

      setOtpSent(true);
      setDir(1);
      setStep((s) => Math.min(s + 1, STEPS.length));
    } catch (err) {
      console.error("Registration failed:", err);
    }
  }, [formData, createUser]);

  const handleUploadImage = useCallback(async (): Promise<void> => {
    if (!avatarImageFile) {
      setDir(1);
      setStep((s) => Math.min(s + 1, STEPS.length));
      return;
    }

    try {
      const uploadData = new FormData();
      uploadData.append("image_profile", avatarImageFile);
      uploadData.append("id_user", formData.userId);

      const response = await handleImageProfile(uploadData);
      console.log("coba", response?.url_profile);

      if (response?.url_profile) {
        setFormData((prev) => ({
          ...prev,
          profileUrl: response.url_profile,
        }));
        console.log("Profile image uploaded:", response.url_profile);
      }

      setDir(1);
      setStep((s) => Math.min(s + 1, STEPS.length));
    } catch (err) {
      console.error("Upload error:", err);
    }
  }, [avatarImageFile, formData.userId, handleImageProfile]);

  const handleCreateProfile = useCallback(async (): Promise<void> => {
    try {
      if (!formData.userId || !token) {
        console.error("Access denied: User ID or Token is missing.");
        return;
      }

      const payload: CreateProfileRequest = {
        user_id: formData.userId,
        full_name: formData.fullName,
        url_profile: formData.profileUrl,
        address: formData.address,
        about: formData.about,
        bio: formData.bio,
        theme: formData.theme,
        tags: formData.tags,
      };

      const response = await createProfile(payload);

      console.log("Profile created successfully:", response);
      //   localStorage.removeItem(STORAGE_KEYS.TOKEN);
      setDone(true);
    } catch (err) {
      console.error("Failed to create profile:", err);
    } finally {
      //   localStorage.removeItem(STORAGE_KEYS.REGISTER_STEP);
      //   localStorage.removeItem(STORAGE_KEYS.REGISTER_DATA);
    }
  }, [formData, token, createProfile]);

  const canNext = useCallback((): boolean => {
    switch (step) {
      case 1:
        return (
          formData.username.length >= VALIDATION_RULES.MIN_USERNAME_LENGTH &&
          !!formData.email &&
          pwStrong &&
          pwMatch
        );
      //   case 2:
      //     return otp.length === VALIDATION_RULES.OTP_LENGTH;
      case 3:
        return formData.fullName.length > VALIDATION_RULES.MIN_FULLNAME_LENGTH;
      default:
        return true;
    }
  }, [step, formData, pwStrong, pwMatch, otp]);

  const goNext = useCallback((): void => {
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length));
  }, []);

  const goPrev = useCallback((): void => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  }, []);

  // ─────────────────────────────────────────────────────────────
  // Effects
  // ─────────────────────────────────────────────────────────────

  // Restore session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const savedStep = localStorage.getItem(STORAGE_KEYS.REGISTER_STEP);
    const savedUserData = localStorage.getItem(STORAGE_KEYS.REGISTER_DATA);

    if (savedToken) {
      setToken(savedToken);

      if (savedStep) {
        const parsedStep = parseInt(savedStep, 10);
        if (
          !isNaN(parsedStep) &&
          parsedStep >= 1 &&
          parsedStep <= STEPS.length
        ) {
          setStep(parsedStep);
          setDir(1);
        }
      } else {
        setStep(2); // Default to step 2 if token exists but no step saved
      }

      if (savedUserData) {
        try {
          const parsedData: SavedRegisterData = JSON.parse(savedUserData);
          setFormData((prev) => ({
            ...prev,
            userId: parsedData.userId,
            email: parsedData.email,
            username: parsedData.username,
          }));
        } catch (err) {
          console.error("Failed to parse saved user data:", err);
          localStorage.removeItem(STORAGE_KEYS.REGISTER_DATA);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (token && step > 1) {
      localStorage.setItem(STORAGE_KEYS.REGISTER_STEP, step.toString());
    }
  }, [step, token]);

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 24 : -24,
    }),
    center: {
      opacity: 1,
      x: 0,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -24 : 24,
    }),
  };

  const getStepTitle = () => {
    const titles = [
      <>
        Buat akun <em style={{ color: "rgba(255,255,255,0.35)" }}>portof.</em>
      </>,
      <>
        Verifikasi <em style={{ color: "rgba(255,255,255,0.35)" }}>emailmu.</em>
      </>,
      <>
        Lengkapi <em style={{ color: "rgba(255,255,255,0.35)" }}>profilmu.</em>
      </>,
      <>
        Pilih <em style={{ color: "rgba(255,255,255,0.35)" }}>tampilanmu.</em>
      </>,
    ];

    return titles[step - 1] || titles[0];
  };

  const getStepDescription = (): string => {
    const descriptions: string[] = [
      "Daftar dengan email atau langsung pakai akun Google / GitHub.",
      `Kode 6 digit dikirim ke ${formData.email || "emailmu"}.`,
      "Upload CV dan biarkan AI mengisi form otomatis — atau isi sendiri.",
      "Template bisa diganti kapan saja dari dashboard.",
    ];

    return descriptions[step - 1] || "";
  };

  const getActionButtonText = (): string => {
    if (step === 1) {
      return isLoadingUser ? "Mendaftar..." : "Kirim Kode";
    }
    if (step === 3) {
      return isLoadingProfile ? "Mengunggah..." : "Lanjut";
    }
    if (step === 4) {
      return isLoadingProfile ? "Membangun..." : "Buat Portfolio";
    }
    return "Lanjut";
  };

  const handleActionButtonClick = (): void => {
    if (step === 1) {
      handleCreateUser();
    } else if (step === 3) {
      handleUploadImage();
    } else if (step === 4) {
      handleCreateProfile();
    } else {
      goNext();
    }
  };

  const isActionButtonDisabled = (): boolean => {
    if (!canNext()) return true;
    if (step === 1 && isLoadingUser) return true;
    if (step === 3 && isLoadingProfile) return true;
    if (step === 4 && isLoadingProfile) return true;
    return false;
  };

  const isLoadingAny = isLoadingUser || isLoadingProfile;

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#0a0a0f", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── LEFT BRANDING SECTION ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-90 shrink-0 relative overflow-hidden px-10 py-10"
        style={{ borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Gradient Background */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0"
          style={{
            height: 360,
            background:
              "radial-gradient(ellipse at center bottom, rgba(255,255,255,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Logo */}
        <a href="/" className="relative inline-block">
          <span
            className="text-[17px] font-semibold"
            style={{ letterSpacing: "-0.025em" }}
          >
            <span style={{ color: "rgba(255,255,255,0.9)" }}>por</span>
            <span style={{ color: "rgba(255,255,255,0.32)" }}>tof</span>
          </span>
        </a>

        {/* Step Information */}
        <div className="relative">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: ANIMATION_SMOOTH }}
          >
            {/* Progress Bars */}
            <div className="flex items-center gap-1.5 mb-5">
              {STEPS.map((s) => (
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

            {/* Step Counter */}
            <p
              className="text-[10px] font-semibold tracking-widest uppercase mb-2"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Langkah {step} dari {STEPS.length}
            </p>

            {/* Step Title */}
            <h2
              className="text-white mb-2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 30,
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
            >
              {getStepTitle()}
            </h2>

            {/* Step Description */}
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {getStepDescription()}
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

      {/* ── RIGHT FORM SECTION ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative z-10">
        {/* Mobile Logo */}
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

        {/* Main Content Container */}
        <div className="w-full max-w-240">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: ANIMATION_SMOOTH }}
              >
                <div
                  className="rounded-2xl overflow-hidden"
                  style={{
                    backgroundColor: "#0e0e14",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  {/* ── Stepper Header ── */}
                  <div
                    className="px-6 pt-5 pb-4"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {/* Step Indicators */}
                    <div className="flex items-center mb-3">
                      {STEPS.map((s, i) => {
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
                                border: `1.5px solid ${
                                  isDone
                                    ? "transparent"
                                    : isActive
                                      ? "rgba(255,255,255,0.3)"
                                      : "rgba(255,255,255,0.08)"
                                }`,
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
                            {i < STEPS.length - 1 && (
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

                    {/* Step Info Text */}
                    <p
                      className="text-[14px] font-semibold"
                      style={{ color: "rgba(255,255,255,0.85)" }}
                    >
                      {STEPS[step - 1].title}
                    </p>
                    <p
                      className="text-[12px]"
                      style={{ color: "rgba(255,255,255,0.3)" }}
                    >
                      Langkah {step} dari {STEPS.length} —{" "}
                      {STEPS[step - 1].desc}
                    </p>
                  </div>

                  {/* ── Form Content ── */}
                  <div className="relative overflow-hidden">
                    <AnimatePresence custom={dir} mode="wait">
                      <motion.div
                        key={step}
                        custom={dir}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: ANIMATION_SMOOTH }}
                      >
                        {/* Step 1: Create Account */}
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

                        {/* Step 2: OTP Verification */}
                        {step === 2 && (
                          <OtpCodeStepper
                            email={formData.email}
                            otp={otp}
                            setOtp={setOtp}
                          />
                        )}

                        {/* Step 3: Create Profile */}
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

                        {/* Step 4: Choose Template */}
                        {step === 4 && (
                          <div className="p-6">
                            <p
                              className="text-[12px] mb-4"
                              style={{ color: "rgba(255,255,255,0.3)" }}
                            >
                              Pilih tampilan awal — bisa diganti kapan saja dari
                              dashboard.
                            </p>
                            <div className="grid grid-cols-3 gap-3">
                              {TEMPLATES.map((template, i) => (
                                <TemplateCard
                                  key={template.id}
                                  template={template}
                                  i={i}
                                  noPreview={true}
                                  hoveredId={hoveredId}
                                  setForm={handleFormChange}
                                  setHoveredId={setHoveredId}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* ── Footer Navigation ── */}
                  <div
                    className="px-6 py-4 flex items-center justify-between"
                    style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                  >
                    {/* Back Button */}
                    {step > 1 ? (
                      <button
                        onClick={goPrev}
                        type="button"
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

                    {/* Action Button */}
                    <button
                      onClick={handleActionButtonClick}
                      disabled={isActionButtonDisabled()}
                      type="button"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      style={{
                        backgroundColor: "rgba(255,255,255,0.9)",
                        color: "#0a0a0f",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActionButtonDisabled()) {
                          (
                            e.currentTarget as HTMLElement
                          ).style.backgroundColor = "#fff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.backgroundColor =
                          "rgba(255,255,255,0.9)";
                      }}
                    >
                      {getActionButtonText()}
                      {!isLoadingAny && <ArrowRight size={14} />}
                    </button>
                  </div>
                </div>

                {/* Login Link */}
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
