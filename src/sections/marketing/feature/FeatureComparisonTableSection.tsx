import { motion } from "framer-motion";
import ChecklistIcon from "../../../components/marketing/ChecklistIcon";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: smooth, delay },
});

const comparisonItems = [
  { label: "Tidak perlu coding", us: true, diy: false, notion: false },
  { label: "Template profesional", us: true, diy: false, notion: false },
  { label: "URL bersih", us: true, diy: true, notion: false },
  { label: "Custom domain", us: true, diy: true, notion: false },
  { label: "Analytics bawaan", us: true, diy: false, notion: false },
  { label: "SEO otomatis", us: true, diy: false, notion: false },
  { label: "AI Bio Generator", us: true, diy: false, notion: false },
  { label: "Siap dalam 3 menit", us: true, diy: false, notion: false },
];

export default function FeatureComparisonTableSection() {
  return (
    <section
      id="feature-comparison-table-section"
      className="py-20 max-w-3xl mx-auto px-6"
    >
      <motion.div {...fadeUp(0)} className="text-center mb-12">
        <p
          className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Perbandingan
        </p>
        <h2
          className="text-[36px] font-normal leading-[1.1] tracking-[-0.03em] text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Kenapa pilih{" "}
          <span className="italic" style={{ color: "rgba(255,255,255,0.4)" }}>
            platform kami?
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: smooth }}
        className="rounded-2xl overflow-hidden"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Table header */}
        <div
          className="grid grid-cols-4 px-5 py-3"
          style={{
            backgroundColor: "#111118",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <p
            className="text-[11px] font-semibold"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Fitur
          </p>
          {[
            { label: "PortofId", highlight: true },
            { label: "Bikin Sendiri", highlight: false },
            { label: "Notion/Linktree", highlight: false },
          ].map((col) => (
            <p
              key={col.label}
              className="text-[11px] font-semibold text-center"
              style={{
                color: col.highlight
                  ? "rgba(255,255,255,0.8)"
                  : "rgba(255,255,255,0.3)",
              }}
            >
              {col.label}
            </p>
          ))}
        </div>

        {/* Rows */}
        {comparisonItems.map((item, i) => (
          <div
            key={item.label}
            className="grid grid-cols-4 px-5 py-3.5"
            style={{
              backgroundColor: i % 2 === 0 ? "#0e0e14" : "#0a0a0f",
              borderBottom:
                i < comparisonItems.length - 1
                  ? "1px solid rgba(255,255,255,0.04)"
                  : "none",
            }}
          >
            <p
              className="text-[12px]"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {item.label}
            </p>
            <ChecklistIcon val={item.us} />
            <ChecklistIcon val={item.diy} />
            <ChecklistIcon val={item.notion} />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
