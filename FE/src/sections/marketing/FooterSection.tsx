import {
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandGithub,
  IconBrandLinkedin,
  IconArrowRight,
} from "@tabler/icons-react";

const FOOTER_LINKS = {
  Produk: [
    { label: "Template Portfolio", href: "#" },
    { label: "AI Description", href: "#" },
    { label: "Portfolio Analyzer", href: "#" },
    { label: "CV Parser", href: "#" },
  ],
  Resources: [
    { label: "Blog & Tips", href: "#" },
    { label: "Panduan Pemula", href: "#how-it-works" },
    { label: "FAQ", href: "#" },
    { label: "Showcase Inspirasi", href: "#" },
  ],
  Perusahaan: [
    { label: "Tentang Kami", href: "#" },
    { label: "Hubungi Kami", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

const SOCIALS = [
  { icon: IconBrandTwitter, href: "#", label: "Twitter" },
  { icon: IconBrandInstagram, href: "#", label: "Instagram" },
  { icon: IconBrandLinkedin, href: "#", label: "LinkedIn" },
  { icon: IconBrandGithub, href: "#", label: "GitHub" },
];

export default function FooterSection() {
  return (
    <footer className="relative bg-[#050a15] pt-24 overflow-hidden border-t border-white/[0.04]">
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[300px] bg-violet-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          {/* Brand & Newsletter (Left Col) */}
          <div className="lg:col-span-5 pr-0 lg:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <img
                src="/images/portofLogo.png"
                alt="Portofy logo"
                className="h-10 w-10 rounded-xl object-contain shadow-[0_0_10px_rgba(255,255,255,0.15)]"
              />
              <span className="text-2xl font-bold text-white tracking-tight">
                Portofy
              </span>
            </div>

            <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-sm">
              Platform pembangun portofolio modern untuk profesional Indonesia.
              Buat karya terbaikmu bersinar dengan bantuan AI.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-white mb-3">
                Subscribe newsletter kami
              </h4>
              <div className="flex gap-2 max-w-sm">
                <input
                  type="email"
                  placeholder="Email kamu..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                />
                <button className="bg-white/10 hover:bg-blue-500 hover:text-white transition-colors text-slate-300 rounded-lg px-3 flex items-center justify-center shrink-0 border border-white/10 hover:border-transparent">
                  <IconArrowRight size={18} stroke={1.5} />
                </button>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02] text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:bg-blue-500/10 hover:text-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                >
                  <social.icon size={18} stroke={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid (Right Col) */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-6">
                  {title}
                </h4>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="group flex items-center text-sm text-slate-400 transition-colors"
                      >
                        <span className="relative overflow-hidden">
                          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                            {link.label}
                          </span>
                          <span className="absolute left-0 inline-block translate-y-full text-blue-400 transition-transform duration-300 group-hover:translate-y-0">
                            {link.label}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
