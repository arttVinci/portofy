import { motion } from "framer-motion";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

const links = {
  Produk: [
    { label: "Fitur", href: "#fitur" },
    { label: "Template", href: "#template" },
    { label: "Harga", href: "#harga" },
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
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#0a0a0f",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto px-6 pt-16 pb-10">
        {/* ── Top: brand + links ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-14"
        >
          {/* Brand col */}
          <div className="col-span-2 lg:col-span-1">
            <a
              href="/"
              className="text-[18px] font-bold tracking-[-0.02em] text-white"
            >
              PortofId
            </a>
            <p
              className="mt-3 text-[13px] leading-relaxed max-w-[200px]"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              Platform portfolio no-code untuk semua kreator Indonesia.
            </p>

            {/* Socials */}
            <div className="mt-5 flex items-center gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex items-center justify-center size-8 rounded-lg transition-all duration-200"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "rgba(255,255,255,0.35)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.1)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.8)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor =
                      "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.35)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <p
                className="text-[11px] font-semibold tracking-[0.1em] uppercase mb-4"
                style={{ color: "rgba(255,255,255,0.2)" }}
              >
                {category}
              </p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-[13px] transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.38)" }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.75)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.color =
                          "rgba(255,255,255,0.38)")
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* ── Divider ── */}
        <div
          className="h-px mb-6"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3"
        >
          <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2025 PortofId. Dibuat dengan ☕ di Indonesia.
          </p>
          <div className="flex items-center gap-4">
            {["Syarat & Ketentuan", "Kebijakan Privasi", "Cookie"].map(
              (label) => (
                <a
                  key={label}
                  href="#"
                  className="text-[11px] transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.5)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(255,255,255,0.2)")
                  }
                >
                  {label}
                </a>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
