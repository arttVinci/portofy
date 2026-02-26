import { Zap } from "lucide-react";

interface SpotlightMockProps {
  type: "speed" | "analytics";
}
export default function SpotlightMock({ type }: SpotlightMockProps) {
  if (type === "speed") {
    return (
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "#0e0e14",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 56px rgba(0,0,0,0.4)",
        }}
      >
        {/* Browser bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            backgroundColor: "#111118",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="flex gap-1.5">
            {[
              "rgba(255,255,255,0.15)",
              "rgba(255,255,255,0.1)",
              "rgba(255,255,255,0.07)",
            ].map((c, i) => (
              <div
                key={i}
                className="size-2 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
          <div
            className="flex-1 h-4 mx-2 rounded"
            style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
          >
            <span
              className="text-[9px] px-2 leading-4 block"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              portofolio.id/budisantoso
            </span>
          </div>
          <span
            className="flex items-center gap-1 text-[9px]"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Live
          </span>
        </div>
        {/* Content */}
        <div className="p-5 space-y-3">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="size-10 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ backgroundColor: "#1e1b4b", color: "#818cf8" }}
            >
              BS
            </div>
            <div>
              <div
                className="h-2.5 w-24 rounded-full mb-1.5"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              />
              <div
                className="h-1.5 w-16 rounded-full"
                style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
              />
            </div>
          </div>
          {[90, 70, 80].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full"
              style={{
                width: `${w}%`,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          ))}
          <div className="grid grid-cols-2 gap-2 mt-3">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-16 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
        </div>
        {/* Timer badge */}
        <div className="px-5 pb-5">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <Zap size={12} style={{ color: "rgba(255,255,255,0.4)" }} />
            <span
              className="text-[11px]"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              Portfolio live dalam
            </span>
            <span
              className="text-[11px] font-bold ml-auto"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              2m 48s
            </span>
          </div>
        </div>
      </div>
    );
  }

  // analytics
  return (
    <div
      id="featured"
      className="rounded-2xl overflow-hidden"
      style={{
        backgroundColor: "#0e0e14",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 24px 56px rgba(0,0,0,0.4)",
      }}
    >
      <div className="p-5">
        <p
          className="text-[11px] font-semibold tracking-widest uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Analytics — 7 hari terakhir
        </p>
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: "Views", val: "1,284" },
            { label: "Pengunjung", val: "847" },
            { label: "Klik CV", val: "132" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-xl p-3 text-center"
              style={{
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <p
                className="text-[16px] font-bold"
                style={{ color: "rgba(255,255,255,0.8)" }}
              >
                {s.val}
              </p>
              <p
                className="text-[10px] mt-0.5"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {/* Bar chart mock */}
        <div className="flex items-end gap-1.5 h-20 mb-4">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-t-md transition-all"
              style={{
                height: `${h}%`,
                backgroundColor:
                  i === 5 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.08)",
              }}
            />
          ))}
        </div>
        <div className="flex justify-between">
          {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((d) => (
            <span
              key={d}
              className="text-[9px]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              {d}
            </span>
          ))}
        </div>
        {/* Traffic sources */}
        <div className="mt-4 space-y-2">
          <p
            className="text-[10px] font-semibold uppercase tracking-wide mb-2"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            Sumber Traffic
          </p>
          {[
            { src: "LinkedIn", pct: 48 },
            { src: "Direct", pct: 31 },
            { src: "Google", pct: 21 },
          ].map((t) => (
            <div key={t.src} className="flex items-center gap-2">
              <span
                className="text-[11px] w-14"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {t.src}
              </span>
              <div
                className="flex-1 h-1.5 rounded-full overflow-hidden"
                style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${t.pct}%`,
                    backgroundColor: "rgba(255,255,255,0.25)",
                  }}
                />
              </div>
              <span
                className="text-[11px] w-8 text-right"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                {t.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
