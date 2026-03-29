import type { TemplateResponse } from "../../@types";

interface MockPreviewProps {
  template: TemplateResponse;
  hovered?: boolean;
}
export default function MockPreview({ template, hovered }: MockPreviewProps) {
  return (
    <div
      className="w-full rounded-xl overflow-hidden transition-all duration-300"
      style={{
        backgroundColor: "#111116",
        border: `1px solid ${hovered ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.06)"}`,
      }}
    >
      {/* Browser bar */}
      <div
        className="flex items-center gap-2 px-3 py-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="size-2 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            />
          ))}
        </div>
        <div
          className="flex-1 h-4 rounded-md mx-2"
          style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
        />
      </div>

      {/* Content */}
      <div className="px-4 py-5" style={{ minHeight: 170 }}>
        {/* Nav */}
        <div className="flex items-center justify-between mb-5">
          <div
            className="h-2 w-10 rounded-full"
            style={{ backgroundColor: "rgba(255,255,255,0.55)" }}
          />
          <div className="flex gap-2">
            {[16, 20, 14].map((w, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{ width: w, backgroundColor: "rgba(255,255,255,0.1)" }}
              />
            ))}
          </div>
        </div>

        {/* Lines */}
        <div className="space-y-2.5 mb-5">
          {template.tags.map((line, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: line,
                height: line,
                backgroundColor:
                  i === 0 ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>

        {/* Cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg"
              style={{
                height: 32,
                backgroundColor: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
