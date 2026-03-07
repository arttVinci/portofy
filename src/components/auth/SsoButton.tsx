interface SSOButtonProps {
  label: string;
  icon: React.ReactNode;
}
export default function SsoButton({ label, icon }: SSOButtonProps) {
  return (
    <button
      type="button"
      key={label}
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
      {icon} Lanjut dengan {label}
    </button>
  );
}
