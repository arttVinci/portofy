import { motion } from "framer-motion";
import {
  FormInput,
  LayoutTemplate,
  MonitorSmartphone,
  PencilLine,
  Globe,
  BarChart2,
  Sparkles,
  Link,
  Search,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, ease: smooth, delay },
});

const features = [
  {
    icon: <FormInput size={20} strokeWidth={1.8} />,
    title: "No-Code Editor",
    desc: "Isi form, portfolio jadi. Tidak ada satu baris kode yang perlu ditulis. Semua bisa dikonfigurasi lewat UI yang intuitif.",
  },
  {
    icon: <LayoutTemplate size={20} strokeWidth={1.8} />,
    title: "30+ Template",
    desc: "Dari minimalis sampai editorial — semua dirancang oleh designer profesional dan dioptimasi untuk kesan pertama yang kuat.",
  },
  {
    icon: <MonitorSmartphone size={20} strokeWidth={1.8} />,
    title: "Mobile Responsive",
    desc: "Portfolio kamu otomatis menyesuaikan tampilan di semua ukuran layar. Dari HP rekruter sampai monitor ultrawide.",
  },
  {
    icon: <Sparkles size={20} strokeWidth={1.8} />,
    title: "AI Bio Generator",
    desc: "Bingung nulis deskripsi diri? AI kami bantu tulis bio yang profesional dan personal berdasarkan pengalaman kamu.",
  },
  {
    icon: <BarChart2 size={20} strokeWidth={1.8} />,
    title: "Analytics Dashboard",
    desc: "Pantau siapa yang buka portfolio kamu, dari mana mereka datang, dan konten mana yang paling banyak dilihat.",
  },
  {
    icon: <Globe size={20} strokeWidth={1.8} />,
    title: "Custom Domain",
    desc: "Hubungkan domain sendiri seperti namakamu.com. Cukup ubah satu DNS record — panduan langkah demi langkah tersedia.",
  },
  {
    icon: <Link size={20} strokeWidth={1.8} />,
    title: "URL Bersih",
    desc: "Setiap portfolio dapat URL unik: portofolio.id/username. Mudah diingat, mudah dibagikan ke siapa saja.",
  },
  {
    icon: <Search size={20} strokeWidth={1.8} />,
    title: "SEO Ready",
    desc: "Portfolio kamu bisa ditemukan di Google. Meta tags, structured data, dan sitemap diatur otomatis oleh sistem.",
  },
  {
    icon: <PencilLine size={20} strokeWidth={1.8} />,
    title: "Edit Kapan Saja",
    desc: "Update proyek baru, ganti foto, ubah bio — semua perubahan langsung live tanpa perlu republish manual.",
  },
  {
    icon: <Shield size={20} strokeWidth={1.8} />,
    title: "Data Aman",
    desc: "Data kamu disimpan aman dan tidak pernah dijual ke pihak ketiga. Export atau hapus akun kapan saja.",
  },
  {
    icon: <Zap size={20} strokeWidth={1.8} />,
    title: "Loading Cepat",
    desc: "Dioptimasi untuk performa — portfolio kamu load dalam hitungan milidetik, tidak membuat rekruter menunggu.",
  },
  {
    icon: <Users size={20} strokeWidth={1.8} />,
    title: "Team & Komunitas",
    desc: "Untuk kampus atau bootcamp — onboarding massal, dashboard admin, dan pantau progress seluruh anggota.",
  },
];

export default function FeatureHeroSection() {
  return (
    <section id="feature-grid-section" className="py-20 max-w-5xl mx-auto px-6">
      <motion.div
        {...fadeUp(0)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: smooth, delay: i * 0.04 }}
            className="group rounded-2xl p-5 transition-all duration-300"
            style={{
              backgroundColor: "#0e0e14",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.12)";
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "#111118";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor =
                "rgba(255,255,255,0.06)";
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "#0e0e14";
            }}
          >
            <div
              className="size-9 rounded-xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {f.icon}
            </div>
            <p
              className="text-[14px] font-semibold mb-2"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              {f.title}
            </p>
            <p
              className="text-[12px] leading-relaxed"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {f.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
