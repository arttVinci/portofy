import { motion } from "framer-motion";
import ComparisonTable from "../../../components/marketing/ComparisonTable";
import SectionHeader from "../../../components/marketing/SectionHeader";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const comparisonItems = [
  {
    label: "Tidak perlu coding",
    feature1: true,
    feature2: false,
    feature3: false,
  },
  {
    label: "Template profesional",
    feature1: true,
    feature2: false,
    feature3: false,
  },
  { label: "URL bersih", feature1: true, feature2: true, feature3: false },
  { label: "Custom domain", feature1: true, feature2: true, feature3: false },
  {
    label: "Analytics bawaan",
    feature1: true,
    feature2: false,
    feature3: false,
  },
  { label: "SEO otomatis", feature1: true, feature2: false, feature3: false },
  {
    label: "AI Bio Generator",
    feature1: true,
    feature2: false,
    feature3: false,
  },
  {
    label: "Siap dalam 3 menit",
    feature1: true,
    feature2: false,
    feature3: false,
  },
];

export default function FeatureComparisonTableSection() {
  return (
    <section
      id="feature-comparison-table-section"
      className="py-20 max-w-3xl mx-auto px-6"
    >
      <SectionHeader
        tag="Perbandingan"
        title="Kenapa pilih"
        italicTitle="platform kami?"
      />

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
          <ComparisonTable
            key={item.label}
            item={item}
            i={i}
            itemLength={comparisonItems.length}
          />
        ))}
      </motion.div>
    </section>
  );
}
