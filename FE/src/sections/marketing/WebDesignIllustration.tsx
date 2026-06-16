import {
  Wand2Icon,
  LayoutTemplateIcon,
  Code2Icon,
  EyeIcon,
  SparklesIcon,
  CheckCircle2Icon,
  PenLineIcon,
} from "lucide-react";

/* ─── Chat History ───────────────────────────────── */
const CHAT_HISTORY = [
  {
    role: "user",
    text: "Buatkan hero section dengan split layout. Kiri teks + tombol CTA, kanan gambar 3D melayang.",
  },
  {
    role: "agent",
    text: "Tentu! Saya sedang menyusun layout Hero Section. Menambahkan grid 2 kolom, typography besar, dan placeholder gambar 3D...",
    status: "done",
  },
  {
    role: "user",
    text: "Bagus! Ubah tombol CTA nya jadi warna cyan glow.",
  },
];

export default function WebDesignIllustration() {
  return (
    <div className="relative w-full max-w-[1100px] mx-auto py-10 px-5">
      {/* ── Ambient Glows ──────────────────────────── */}
      <div className="absolute w-[400px] h-[400px] top-[20%] left-[30%] rounded-full pointer-events-none blur-[150px] bg-[rgba(0,212,255,0.04)]" />

      {/* ═══ WORKSPACE LAYOUT ═══════════════════════ */}
      <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:h-[500px]">
        {/* ────────────────────────────────────────────
            LEFT: Agentic Chat / Prompt Input
        ──────────────────────────────────────────── */}
        <div className="w-full lg:w-[380px] flex flex-col bg-[rgba(10,10,10,0.85)] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.5)] min-h-[350px] lg:min-h-0">
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.04] bg-white/[0.01]">
            <div className="w-8 h-8 rounded-lg bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0">
              <Wand2Icon size={16} className="text-[#00d4ff]" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                Design Agent
              </div>
              <div className="text-[10px] text-[#00d4ff] flex items-center gap-1">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00d4ff] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00d4ff]"></span>
                </span>
                Online & Ready
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-5 overflow-y-auto space-y-5">
            {CHAT_HISTORY.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 animate-cv-agent-fade-in`}
                style={{ animationDelay: `${idx * 400}ms` }}
              >
                {msg.role === "agent" ? (
                  <div className="w-6 h-6 rounded-md bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0 mt-0.5">
                    <SparklesIcon size={10} className="text-[#00d4ff]" />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-md bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shrink-0 mt-0.5">
                    <UserIcon size={10} className="text-slate-400" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-[10px] font-semibold text-slate-400 mb-1">
                    {msg.role === "agent" ? "Portofy Agent" : "You"}
                  </div>
                  <div
                    className={`text-[11px] leading-relaxed p-3 rounded-xl rounded-tl-none border ${
                      msg.role === "agent"
                        ? "bg-[rgba(0,212,255,0.03)] border-[rgba(0,212,255,0.1)] text-slate-300"
                        : "bg-white/[0.02] border-white/[0.05] text-slate-300"
                    }`}
                  >
                    {msg.text}
                    {msg.status === "done" && (
                      <div className="mt-2 flex items-center gap-1 text-[9px] text-[#00d4ff] font-medium">
                        <CheckCircle2Icon size={10} />
                        Layout updated
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            <div
              className="flex gap-3 animate-cv-agent-fade-in"
              style={{ animationDelay: "1400ms" }}
            >
              <div className="w-6 h-6 rounded-md bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] flex items-center justify-center shrink-0">
                <SparklesIcon size={10} className="text-[#00d4ff]" />
              </div>
              <div className="bg-[rgba(0,212,255,0.03)] border border-[rgba(0,212,255,0.1)] rounded-xl rounded-tl-none px-3 py-2.5 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/[0.04] bg-white/[0.01]">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <PenLineIcon size={12} className="text-[#00d4ff]" />
              </div>
              <input
                type="text"
                disabled
                placeholder="Memperbarui warna tombol CTA..."
                className="w-full bg-white/[0.03] border border-white/[0.1] rounded-lg pl-8 pr-10 py-2.5 text-[11px] text-slate-300 placeholder:text-slate-500 focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
              />
              <div className="absolute inset-y-0 right-1.5 flex items-center">
                <button className="w-7 h-7 rounded-md bg-[#00d4ff] text-black flex items-center justify-center hover:bg-white transition-colors">
                  <Wand2Icon size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ────────────────────────────────────────────
            RIGHT: Live Preview Canvas
        ──────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col bg-[rgba(15,15,18,0.9)] border border-white/[0.08] rounded-2xl overflow-hidden backdrop-blur-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.3)] min-h-[300px] lg:min-h-0">
          {/* Editor Header */}
          <div className="flex justify-between items-center px-4 py-3 border-b border-white/[0.04] bg-black/20">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <div className="h-4 w-[1px] bg-white/[0.1]" />
              <div className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
                <LayoutTemplateIcon size={12} />
                <span>Live Canvas</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.05] hover:bg-white/[0.1] text-[10px] text-slate-300 transition-colors">
                <Code2Icon size={12} />
                <span>Code</span>
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 border border-[#00d4ff]/20 text-[10px] text-[#00d4ff] transition-colors">
                <EyeIcon size={12} />
                <span>Preview</span>
              </button>
            </div>
          </div>

          {/* Canvas Area (Generated UI) */}
          <div className="flex-1 p-6 relative flex items-center justify-center overflow-hidden">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />

            {/* Generated Hero Section */}
            <div
              className="relative w-full max-w-[500px] bg-black/40 border border-white/[0.05] rounded-xl overflow-hidden shadow-2xl animate-cv-agent-fade-in"
              style={{ animationDelay: "800ms" }}
            >
              {/* Browser bar mini */}
              <div className="h-5 bg-white/[0.02] border-b border-white/[0.05] flex items-center px-3 gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white/[0.2]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/[0.2]" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/[0.2]" />
              </div>

              <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 items-center">
                {/* Left: Text & CTA */}
                <div className="space-y-4">
                  {/* Skeleton Title */}
                  <div className="space-y-1.5">
                    <div className="h-6 w-3/4 bg-gradient-to-r from-white to-white/60 rounded-md" />
                    <div className="h-6 w-full bg-gradient-to-r from-white/80 to-white/40 rounded-md" />
                  </div>
                  {/* Skeleton Desc */}
                  <div className="space-y-1.5">
                    <div className="h-2 w-full bg-white/20 rounded" />
                    <div className="h-2 w-5/6 bg-white/20 rounded" />
                    <div className="h-2 w-4/6 bg-white/20 rounded" />
                  </div>
                  {/* The CTA Button being updated */}
                  <div className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#00d4ff] text-black text-[9px] font-bold shadow-[0_0_20px_rgba(0,212,255,0.4)] animate-cv-output-pulse">
                    Mulai Sekarang
                    {/* Scanning effect over the button */}
                    <div className="absolute inset-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-20deg] animate-[shimmer_2s_infinite]" />
                  </div>
                </div>

                {/* Right: 3D Image Placeholder */}
                <div className="relative aspect-square rounded-xl bg-gradient-to-tr from-white/[0.02] to-white/[0.08] border border-white/[0.1] flex items-center justify-center overflow-hidden group">
                  {/* Holographic grid */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0ibm9uZSIvPjxwYXRoIGQ9Ik0wIDEwaDQwbTAtMjBWMG0wIDQwdjEwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]" />
                  {/* 3D Object mock */}
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#00d4ff] to-blue-600/50 shadow-[0_0_30px_rgba(0,212,255,0.3)] animate-cv-particle-1 backdrop-blur-md border border-white/20 rotate-12" />
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500/50 to-pink-500/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-cv-particle-2 backdrop-blur-md border border-white/20 -bottom-2 -left-2" />
                </div>
              </div>
            </div>

            {/* Updating Overlay */}
            <div className="absolute inset-x-0 bottom-4 flex justify-center">
              <div className="bg-[#00d4ff]/10 border border-[#00d4ff]/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 animate-cv-upload-glow">
                <SparklesIcon size={12} className="text-[#00d4ff]" />
                <span className="text-[10px] font-medium text-[#00d4ff]">
                  Updating CTA Button Style...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Icon helper since we didn't import it at the top
function UserIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
