import OtpInput from "../../../../components/auth/OtpInput";

interface OtpCodeStepperProps {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
}
export default function OtpCodeStepper({
  email,
  otp,
  setOtp,
}: OtpCodeStepperProps) {
  return (
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
          {email}
        </p>
      </div>

      <OtpInput value={otp} onChange={setOtp} />

      <div className="flex flex-col items-center gap-2">
        <p className="text-[11px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          Tidak menerima kode?
        </p>
        <button
          type="button"
          className="text-[12px] font-semibold cursor-pointer transition-colors duration-150"
          style={{ color: "rgba(255,255,255,0.45)" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.8)")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.color =
              "rgba(255,255,255,0.45)")
          }
        >
          Kirim ulang kode
        </button>
      </div>
    </div>
  );
}
