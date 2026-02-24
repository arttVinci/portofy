import { motion } from "framer-motion";
import {
  FormInput,
  LayoutTemplate,
  MonitorSmartphone,
  PencilLine,
} from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: smoothEase, delay },
});

const features = [
  {
    delay: 0.35,
    icon: <FormInput size={36} strokeWidth={1.5} />,
    title: "Tanpa Coding Sama Sekali",
    desc: "Cukup isi form, pilih template, dan portfolio kamu langsung hidup. Tidak perlu tahu HTML, CSS, atau apapun teknis.",
  },
  {
    delay: 0.45,
    icon: <LayoutTemplate size={36} strokeWidth={1.5} />,
    title: "Template Siap Pakai",
    desc: "Pilih dari puluhan template profesional yang dirancang khusus untuk menarik perhatian HR dan rekruter sejak detik pertama.",
  },
  {
    delay: 0.55,
    icon: <MonitorSmartphone size={36} strokeWidth={1.5} />,
    title: "Tampil di Semua Perangkat",
    desc: "Portfolio kamu otomatis responsif — terlihat sempurna di laptop, tablet, maupun HP rekruter yang membuka link kamu.",
  },
  {
    delay: 0.65,
    icon: <PencilLine size={36} strokeWidth={1.5} />,
    title: "Update Kapan Saja",
    desc: "Baru selesai proyek baru? Raih pencapaian baru? Edit portfolio kamu dalam hitungan menit — selalu relevan, selalu fresh.",
  },
];

export default function IconBlocksSection() {
  return (
    <div
      className="max-w-7xl px-6 py-14 mx-auto"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Section label */}
      <motion.p
        {...fadeUp(0.2)}
        className="text-center text-[12px] font-semibold tracking-widest uppercase mb-10"
        style={{ color: "rgba(129,140,248,0.8)" }}
      >
        Kenapa pilih platform kami
      </motion.p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-start gap-10">
        {features.map((f) => (
          <motion.div key={f.title} {...fadeUp(f.delay)}>
            <div style={{ color: "rgba(255,255,255,0.85)" }}>{f.icon}</div>

            <div
              className="mt-6 h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(129,140,248,0.5), rgba(129,140,248,0.1), transparent)",
              }}
            >
              <div
                className="h-px w-9"
                style={{ backgroundColor: "rgba(255,255,255,0.85)" }}
              />
            </div>

            <div className="mt-5">
              <h3
                className="text-[15px] font-semibold leading-snug"
                style={{ color: "rgba(255,255,255,0.9)" }}
              >
                {f.title}
              </h3>
              <p
                className="mt-2 text-[13px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                {f.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
