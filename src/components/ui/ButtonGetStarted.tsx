interface ButtonGetStartedProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
}
export default function ButtonGetStarted({
  title,
  backgroundColor,
  textColor,
}: ButtonGetStartedProps) {
  return (
    <a
      href="/register"
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-semibold ${textColor || "text-[#0a0a0f]"} transition-all duration-200 hover:-translate-y-0.5`}
      style={{ backgroundColor: backgroundColor || "rgba(255,255,255,0.9)" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor = "#fff")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.backgroundColor =
          "rgba(255,255,255,0.9)")
      }
    >
      {title}
    </a>
  );
}
