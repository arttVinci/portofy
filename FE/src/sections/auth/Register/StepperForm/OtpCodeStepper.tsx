import OtpInput from "../../../../components/auth/OtpInput";

interface OtpCodeStepperProps {
  email: string;
  otp: string;
  setOtp: (v: string) => void;
  handleCreateUser: () => void;
}
export default function OtpCodeStepper({
  email,
  otp,
  setOtp,
  handleCreateUser,
}: OtpCodeStepperProps) {
  return (
    <div className="p-10 flex flex-col items-center text-center space-y-6">
      <div>
        <p className="text-sm text-slate-400 mb-1">Kode 6 digit dikirim ke</p>
        <p className="text-sm font-semibold text-white">{email}</p>
      </div>

      <OtpInput value={otp} onChange={setOtp} />

      <div className="flex flex-col items-center gap-2">
        <p className="text-[11px] text-slate-600">Tidak menerima kode?</p>
        <button
          type="button"
          onClick={handleCreateUser}
          className="text-[12px] font-semibold text-slate-500 hover:text-blue-400 cursor-pointer transition-colors"
        >
          Kirim ulang kode
        </button>
      </div>
    </div>
  );
}
