import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { IconBrandInstagram, IconBrandX, IconBrandLinkedin, IconBrandTiktok } from "@tabler/icons-react";

const smooth = [0.22, 1, 0.36, 1] as [number, number, number, number];

const links = {
  Produk: [
    { label: "Fitur", href: "/fitur" },
    { label: "Template", href: "/template" },
    { label: "Harga", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Karir", href: "/karir" },
    { label: "Hubungi Kami", href: "/contact" },
  ],
  Bantuan: [
    { label: "FAQ", href: "/faq" },
    { label: "Panduan", href: "/docs" },
    { label: "Status", href: "/status" },
    { label: "Kebijakan Privasi", href: "/privacy" },
  ],
};

const socials = [
  { label: "Instagram", href: "#", icon: IconBrandInstagram },
  { label: "Twitter / X", href: "#", icon: IconBrandX },
  { label: "LinkedIn", href: "#", icon: IconBrandLinkedin },
  { label: "TikTok", href: "#", icon: IconBrandTiktok },
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: "-50px" });

  return (
    <footer
      ref={footerRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: "#060b18",
        borderTop: "1px solid rgba(59,130,246,0.06)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(59,130,246,0.04) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Top gradient border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.15), transparent)" }}
      />

      <div className="relative max-w-5xl mx-auto px-6 pt-16 pb-10">
        {/* ── Top: brand + links ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: smooth }}
          className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14"
        >
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <a href="/" className="flex items-center gap-2.5 mb-3">
              <img src="/images/portofLogo.png" alt="portof logo" className="w-9 h-9" />
              <span className="text-[18px] font-bold tracking-[-0.02em]" style={{ color: "#f1f5f9" }}>
                <span className="text-white/85">por</span>
                <span className="text-white/30">tof</span>
              </span>
            </a>
            <p className="text-[13px] leading-relaxed max-w-[200px]" style={{ color: "rgba(148,163,184,0.4)" }}>
              Platform portfolio no-code untuk semua kreator Indonesia.
            </p>

            {/* Socials - Floating dock inspired */}
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="flex items-center justify-center size-9 rounded-xl transition-all duration-200"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.03)",
                      color: "rgba(148,163,184,0.4)",
                      border: "1px solid rgba(255,255,255,0.05)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(59,130,246,0.12)";
                      (e.currentTarget as HTMLElement).style.color = "#60a5fa";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(59,130,246,0.25)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(59,130,246,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.03)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.4)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.05)";
                      (e.currentTarget as HTMLElement).style.boxShadow = "none";
                    }}
                  >
                    <Icon size={16} strokeWidth={1.8} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([category, items], catIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + catIdx * 0.08 }}
            >
              <p
                className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-4"
                style={{ color: "rgba(59,130,246,0.4)" }}
              >
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[13px] transition-colors duration-200 hover:text-blue-400"
                      style={{ color: "rgba(148,163,184,0.4)" }}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div
          className="h-px mb-6"
          style={{ background: "linear-gradient(to right, transparent, rgba(59,130,246,0.1), transparent)" }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[12px]" style={{ color: "rgba(148,163,184,0.2)" }}>
            © 2025 PortofId. Dibuat dengan ☕ di Indonesia.
          </p>
          <div className="flex items-center gap-4">
            {["Syarat & Ketentuan", "Kebijakan Privasi", "Cookie"].map((label) => (
              <a
                key={label}
                href="#"
                className="text-[11px] transition-colors duration-200 hover:text-blue-400/60"
                style={{ color: "rgba(148,163,184,0.2)" }}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
