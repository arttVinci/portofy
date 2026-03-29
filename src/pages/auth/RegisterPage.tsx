import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";
import { ApiError } from "@/api/apiError";

import SuccessScreen from "@/components/auth/SuccessScreen";
import TemplateCard from "@/components/marketing/TemplateCard";

import type {
  TemplateResponse,
  RegisterUserRequest,
  CreateProfileRequest,
} from "@/@types";

import { useToast } from "@/hooks/ui/useToast";

import CreateAccountStepper from "@/sections/auth/Register/StepperForm/CreateAccountStepper";
import OtpCodeStepper from "@/sections/auth/Register/StepperForm/OtpCodeStepper";
import CreateUserProfile from "@/sections/auth/Register/StepperForm/CreateUserProfile";
import { useRegister } from "@/hooks/mutations/auth/useRegister";
import { useCreateProfile } from "@/hooks/mutations/profile/useCreateProfile";
import { useUploadImage } from "@/hooks/mutations/useUploadImage";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const steps = [
  { num: 1, title: "Create Account", desc: "Username, email & password" },
  { num: 2, title: "Email Verification", desc: "Enter OTP code" },
  { num: 3, title: "Your Profile", desc: "Avatar, bio & detail" },
  { num: 4, title: "Choose Template", desc: "Initial display" },
];

const templates: TemplateResponse[] = [
  {
    id: "1",
    title: "Minimal",
    category: "Minimal",
    tags: ["Clean", "Developer", "Simple"],
    description: "Bersih dan fokus. Biarkan karya kamu yang bicara.",
    badge: "Paling Populer",
    used_count: "8.2k",
    is_pro: false,
  },
  {
    id: "2",
    title: "Editorial",
    category: "Creative",
    tags: ["Bold", "Designer", "Typography"],
    description: "Layout magazine dengan tipografi kuat dan berani.",
    badge: "Trending",
    used_count: "6.1k",
    is_pro: false,
  },
  {
    id: "3",
    title: "Grid",
    category: "Creative",
    tags: ["Gallery", "Visual", "Photographer"],
    description: "Berbasis grid untuk menampilkan portofolio visual.",
    badge: "Trending",
    used_count: "4.5k",
    is_pro: false,
  },
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

  const [token, setToken] = useState<string>("");

  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [showPw, setShowPw] = useState(false);
  const [showCpw, setShowCpw] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [avatarImageFile, setAvatarImageFile] = useState<File | null>(null);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    // Account
    username: "",
    email: "",
    password: "",
    confirmPw: "",
    phone: "",
    // Profile
    fullName: "",
    image_url: "",
    address: "",
    about: "",
    bio: "",
    theme: "minimal",
    tags: [],
    userId: "",
  });

  const createUserMutation = useRegister({
    onSuccess: (response) => {
      // console.log("Login success:", data);
      setToken(response.token);
      setFormData((prev) => ({ ...prev, userId: response.user.id }));

      setOtpSent(true);
      goNext();
      toast("success", "Success", `Your account has been created successfully`);
    },
    onError: (error: ApiError) => {
      // console.error("Login failed:", error.message);
      toast("error", "Failed", error.message);
    },
  });

  const createProfileMutation = useCreateProfile({
    onSuccess: (response) => {
      toast("success", "Success", `Welcome ${response.full_name},`);
    },
    onError: (error) => {
      toast("error", "Failed", error.message);
    },
  });

  const uploadMutation = useUploadImage({
    onSuccess: (response) => {
      setFormData((prev) => ({
        ...prev,
        image_url: response.image_url[0],
      }));

      toast(
        "success",
        "Success",
        "Profile picture has been updated successfully",
      );
    },
    onError: (error: ApiError) => toast("error", "Failed", error.message),
  });

  const handleCreateUser = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const payload: RegisterUserRequest = {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      no_telp: formData.phone,
    };

    createUserMutation.mutate(payload);
  };

  const handleCreateProfile = (e?: React.FormEvent) => {
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
    setDone(true);
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
    // if (step === 2) return otp.length === 6;
    if (step === 3) return formData.fullName.length > 3;
    return true;
  };

  const goNext = () => {
    if (step === 1 && !otpSent) {
      toast(
        "success",
        "Success",
        "Code verification has been sent to your email",
      );
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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (token && step > 1) {
      localStorage.setItem("registerStep", step.toString());
    }
  }, [step, token]);

  return (
    <div
      className="flex min-h-screen"
      style={{ backgroundColor: "#0a0a0f", fontFamily: "'Inter', sans-serif" }}
    >
      {renderToasts()}
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
            <span style={{ color: "rgba(255,255,255,0.32)" }}>tofy</span>
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
              Step {step} of {steps.length}
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
                  Create Account{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>portofy.</em>
                </>
              )}
              {step === 2 && (
                <>
                  Verification{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your Email.
                  </em>
                </>
              )}
              {step === 3 && (
                <>
                  Complete{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your Profile.
                  </em>
                </>
              )}
              {step === 4 && (
                <>
                  Choose{" "}
                  <em style={{ color: "rgba(255,255,255,0.35)" }}>
                    Your Template.
                  </em>
                </>
              )}
            </h2>
            <p
              className="text-[13px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              {step === 1 &&
                "Register with email or directly use Google / GitHub account."}
              {step === 2 &&
                `6 digit code sent to ${formData.email || "your email"}.`}
              {step === 3 &&
                "Upload CV and let AI fill the form automatically — or fill it yourself."}
              {step === 4 &&
                "Template can be changed anytime from the dashboard."}
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
            "Setup 10 minutes, the next day someone will reach out."
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
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 relative z-10">
        <div className="lg:hidden mb-8">
          <a href="/">
            <span
              className="text-[17px] font-semibold"
              style={{ letterSpacing: "-0.025em" }}
            >
              <span style={{ color: "rgba(255,255,255,0.9)" }}>por</span>
              <span style={{ color: "rgba(255,255,255,0.32)" }}>tofy</span>
            </span>
          </a>
        </div>

        <div className="w-full max-w-240">
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

                        {/* Step 2 Otp Code Email*/}
                        {step === 2 && (
                          <OtpCodeStepper
                            email={formData.email}
                            otp={otp}
                            setOtp={setOtp}
                          />
                        )}

                        {/* Step 3 Create User Profile and CV Upload */}
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

                        {/* Step 4: Pilih Template */}
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
                              {templates.map((template, i) => (
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
                        <ArrowLeft size={14} /> Back
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 4 ? (
                      <button
                        onClick={
                          step === 2
                            ? handleCreateUser
                            : step === 3
                              ? handleUploadImage
                              : goNext
                        }
                        disabled={
                          !canNext() ||
                          (step === 1 && createUserMutation.isPending) ||
                          (step === 3 && createProfileMutation.isPending)
                        }
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
                        {step === 2 && createUserMutation.isPending
                          ? "Registering..."
                          : step === 3 && createProfileMutation.isPending
                            ? "Uploading..."
                            : step === 1
                              ? "Send Code"
                              : "Next"}

                        {!createUserMutation.isPending &&
                          !createProfileMutation.isPending && (
                            <ArrowRight size={14} />
                          )}
                      </button>
                    ) : (
                      <button
                        onClick={handleCreateProfile}
                        disabled={createProfileMutation.isPending}
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
                        {createProfileMutation.isPending
                          ? "Building..."
                          : "Create Portfolio"}
                        {!createProfileMutation.isPending && (
                          <ArrowRight size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <p
                  className="text-center mt-5 text-[13px]"
                  style={{ color: "rgba(255,255,255,0.3)" }}
                >
                  Already have an account?{" "}
                  <a
                    href="/auth/login"
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
                    Login
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
