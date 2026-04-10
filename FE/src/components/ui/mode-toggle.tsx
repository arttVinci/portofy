import { useTheme } from "@/components/utils/theme-provider";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative w-[52px] h-[28px] rounded-full border transition-all duration-400 cursor-pointer",
        isDark
          ? "bg-zinc-800 border-zinc-700"
          : "border-zinc-200 border-zinc-400",
      )}
      aria-label="Toggle theme"
    >
      {/* Thumb */}
      <span
        className={cn(
          "absolute top-[3px] left-[3px] w-[20px] h-[20px] rounded-full flex items-center justify-center transition-all duration-400",
          isDark
            ? "translate-x-[24px] bg-zinc-100"
            : "translate-x-0 bg-zinc-900",
        )}
      >
        {/* Sun */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-[11px] h-[11px] absolute transition-all duration-300",
            isDark
              ? "opacity-0 scale-50 rotate-45"
              : "opacity-100 scale-100 rotate-0",
          )}
          fill="none"
        >
          <circle cx="12" cy="12" r="4.5" fill="#f5f4f0" />
          <g stroke="#f5f4f0" strokeWidth="1.5" strokeLinecap="round">
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22" />
            <line x1="2" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
            <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
            <line x1="19.07" y1="4.93" x2="17.3" y2="6.7" />
            <line x1="6.7" y1="17.3" x2="4.93" y2="19.07" />
          </g>
        </svg>
        {/* Moon */}
        <svg
          viewBox="0 0 24 24"
          className={cn(
            "w-[11px] h-[11px] absolute transition-all duration-300",
            isDark
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-45",
          )}
          fill="none"
        >
          <path
            d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"
            fill="#1a1918"
          />
        </svg>
      </span>
    </button>
  );
}
