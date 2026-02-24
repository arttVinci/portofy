import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { Info, HelpCircle, Mail, ScrollText } from "lucide-react";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface MenuItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

// ── Mega menu "Tentang" ──────────────────────────────────────────────────────
const menuItems: MenuItem[] = [
  {
    label: "Tentang Kami",
    href: "/about",
    description:
      "Kenalan sama orang di balik platform ini — kenapa kami bikin, dan misi kami ke depan.",
    icon: <Info size={16} strokeWidth={1.8} />,
  },
  {
    label: "FAQ",
    href: "/faq",
    description:
      "Pertanyaan yang sering ditanya — dari fitur gratis, cara kerja, sampai soal privasi data.",
    icon: <HelpCircle size={16} strokeWidth={1.8} />,
  },
  {
    label: "Hubungi Kami",
    href: "/contact",
    description:
      "Ada pertanyaan, saran, atau kolaborasi? Kami biasanya balas dalam 1x24 jam.",
    icon: <Mail size={16} strokeWidth={1.8} />,
  },
  {
    label: "Changelog",
    href: "/changelog",
    description:
      "Lihat fitur & perbaikan terbaru yang baru kami rilis — platform ini terus berkembang.",
    icon: <ScrollText size={16} strokeWidth={1.8} />,
  },
];

// ── Featured portfolio sidebar ───────────────────────────────────────────────
const featuredPortfolio = {
  name: "Rizky Aditya",
  role: "UI/UX Designer · Bandung",
  quote:
    "Dalam 10 menit portfolio gw udah live. Langsung dapet interview dari 3 perusahaan minggu itu.",
  avatar: "RA",
  avatarBg: "#312e81",
  views: "4.2k views bulan ini",
};

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -14, scaleY: 0.93, transformOrigin: "top" },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.26,
      ease: smoothEase,
      staggerChildren: 0.07,
      delayChildren: 0.05,
    } as Transition,
  },
  exit: {
    opacity: 0,
    y: -12,
    scaleY: 0.95,
    transformOrigin: "top",
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    } as Transition,
  },
};

const menuItemVariants: Variants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.24, ease: smoothEase } as Transition,
  },
};

const storyVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: smoothEase, delay: 0.18 } as Transition,
  },
};

function MenuItemRow({ item, isDark }: { item: MenuItem; isDark: boolean }) {
  const t: Transition = { duration: 0.28, ease: smoothEase };
  return (
    <motion.a
      href={item.href}
      variants={menuItemVariants}
      className="flex items-center gap-4 px-4 py-3.5 rounded-xl cursor-pointer relative"
      whileHover="hovered"
      initial="rest"
      animate="rest"
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{
          backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#f8fafc",
        }}
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      />
      <motion.div
        className="relative shrink-0 flex items-center justify-center size-10 rounded-xl"
        style={{ color: isDark ? "rgba(255,255,255,0.7)" : "#4b5563" }}
        variants={{
          rest: {
            backgroundColor: isDark ? "rgba(255,255,255,0.08)" : "#f3f4f6",
            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          },
          hovered: {
            backgroundColor: isDark ? "rgba(255,255,255,0.14)" : "#ffffff",
            boxShadow: isDark
              ? "0 1px 6px 0 rgba(0,0,0,0.4)"
              : "0 1px 6px 0 rgba(0,0,0,0.09)",
          },
        }}
        transition={t}
      >
        {item.icon}
      </motion.div>
      <div className="relative grow min-w-0">
        <p
          className="text-[14px] font-semibold leading-[1.3] tracking-[-0.01em]"
          style={{ color: isDark ? "rgba(255,255,255,0.9)" : "#111827" }}
        >
          {item.label}
        </p>
        <p
          className="mt-0.5 text-[12px] font-normal leading-[1.55]"
          style={{ color: isDark ? "rgba(255,255,255,0.4)" : "#6b7280" }}
        >
          {item.description}
        </p>
      </div>
      <motion.div
        className="relative shrink-0"
        variants={{
          rest: { x: 0, opacity: 0.25, color: isDark ? "#6b7280" : "#9ca3af" },
          hovered: { x: 5, opacity: 1, color: isDark ? "#ffffff" : "#111827" },
        }}
        transition={{ duration: 0.25, ease: smoothEase }}
      >
        <HiArrowRight className="size-3.5" />
      </motion.div>
    </motion.a>
  );
}

// ─── Hook: detect dark section overlap ───────────────────────────────────────
function useNavTheme(darkSectionId = "hero-section") {
  const [isDark, setIsDark] = useState(true);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function update() {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;

      if (currentY < 10) setNavVisible(true);
      else if (diff > 6) setNavVisible(false);
      else if (diff < -6) setNavVisible(true);
      lastScrollY.current = currentY;

      const darkEl = document.getElementById(darkSectionId);
      if (darkEl) {
        const darkBottom = darkEl.offsetTop + darkEl.offsetHeight;
        setIsDark(currentY + 64 < darkBottom);
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [darkSectionId]);

  return { isDark, navVisible };
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { isDark, navVisible } = useNavTheme("hero-section");

  function openMenu() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setIsOpen(true);
  }
  function scheduleClose() {
    closeTimer.current = setTimeout(() => setIsOpen(false), 120);
  }
  function cancelClose() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }

  const textColor = isDark ? "rgba(255,255,255,0.75)" : "#4b5563";
  const textHover = isDark ? "#ffffff" : "#111827";
  const brandColor = isDark ? "#ffffff" : "#111827";
  const borderColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)";
  const hoverBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)";

  const megaBg = isDark ? "#16161e" : "#ffffff";
  const megaBorder = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const megaSidebarBg = isDark ? "#0f0f16" : "#f9fafb";
  const megaSidebarBorder = isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6";
  const megaLabel = isDark ? "rgba(255,255,255,0.3)" : "#9ca3af";

  const navLinkStyle = {
    color: textColor,
    transition: "color 0.3s ease, background-color 0.2s ease",
  };
  const onEnter = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = textHover;
    (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
  };
  const onLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.color = textColor;
    (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
  };

  const navLinks = [
    { label: "Fitur", href: "#fitur" },
    { label: "Template", href: "#template" },
    { label: "Harga", href: "#harga" },
    { label: "Blog", href: "/blog" },
  ];

  return (
    <motion.header
      animate={{ y: navVisible ? 0 : "-100%" }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-md"
      style={{
        fontFamily: "'Inter', sans-serif",
        borderBottom: `1px solid ${borderColor}`,
        backgroundColor: isDark
          ? "rgba(10,10,15,0.5)"
          : "rgba(255,255,255,0.9)",
        transition: "background-color 0.4s ease, border-color 0.4s ease",
      }}
    >
      <nav className="relative max-w-screen-xl w-full mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        {/* ── Brand ── */}
        <a
          href="/"
          className="flex-none font-bold text-[18px] tracking-[-0.02em] focus:outline-none"
          style={{ color: brandColor, transition: "color 0.4s ease" }}
        >
          PortofId
        </a>

        <div className="flex items-center gap-0.5">
          {/* ── Plain nav links ── */}
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="px-3 py-1.5 text-[14px] font-medium rounded-lg focus:outline-none"
              style={navLinkStyle}
              onMouseEnter={onEnter}
              onMouseLeave={onLeave}
            >
              {label}
            </a>
          ))}

          {/* ── Tentang dropdown ── */}
          <div className="relative">
            <button
              type="button"
              onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
              onMouseEnter={(e) => {
                onEnter(e);
                openMenu();
              }}
              onMouseLeave={(e) => {
                onLeave(e);
                scheduleClose();
              }}
              className="px-3 py-1.5 flex items-center gap-1 text-[14px] font-medium rounded-lg focus:outline-none cursor-pointer"
              style={navLinkStyle}
            >
              Tentang
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="shrink-0 size-4 opacity-50"
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
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  onMouseEnter={cancelClose}
                  onMouseLeave={scheduleClose}
                  className="fixed left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 z-50"
                  style={{ top: 56 }}
                >
                  <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                      backgroundColor: megaBg,
                      border: `1px solid ${megaBorder}`,
                      boxShadow: isDark
                        ? "0 24px 64px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.04) inset"
                        : "0 16px 48px rgba(0,0,0,0.12)",
                    }}
                  >
                    <div className="grid grid-cols-5">
                      {/* ── Left: menu items ── */}
                      <div className="col-span-3 p-3">
                        <p
                          className="px-4 pt-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                          style={{ color: megaLabel }}
                        >
                          Tentang Platform
                        </p>
                        <div className="flex flex-col">
                          {menuItems.map((item) => (
                            <MenuItemRow
                              key={item.label}
                              item={item}
                              isDark={isDark}
                            />
                          ))}
                        </div>
                      </div>

                      {/* ── Right: portfolio showcase ── */}
                      <motion.div
                        variants={storyVariants}
                        className="col-span-2 p-6 flex flex-col"
                        style={{
                          backgroundColor: megaSidebarBg,
                          borderLeft: `1px solid ${megaSidebarBorder}`,
                        }}
                      >
                        <p
                          className="text-[11px] font-semibold uppercase tracking-[0.08em] mb-4"
                          style={{ color: megaLabel }}
                        >
                          Portfolio minggu ini
                        </p>

                        <a
                          href="#"
                          className="group flex flex-col gap-4 focus:outline-none"
                        >
                          {/* Mini portfolio card */}
                          <div
                            className="w-full rounded-xl p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                            style={{
                              backgroundColor: isDark ? "#1e1b4b" : "#eef2ff",
                              border: `1px solid ${isDark ? "rgba(99,102,241,0.2)" : "rgba(99,102,241,0.15)"}`,
                            }}
                          >
                            <div className="flex items-center gap-3 mb-3">
                              <div
                                className="size-10 rounded-full flex items-center justify-center text-[12px] font-bold"
                                style={{
                                  backgroundColor: featuredPortfolio.avatarBg,
                                  color: "#818cf8",
                                }}
                              >
                                {featuredPortfolio.avatar}
                              </div>
                              <div>
                                <p
                                  className="text-[13px] font-semibold"
                                  style={{
                                    color: isDark
                                      ? "rgba(255,255,255,0.9)"
                                      : "#1e1b4b",
                                  }}
                                >
                                  {featuredPortfolio.name}
                                </p>
                                <p
                                  className="text-[11px]"
                                  style={{
                                    color: isDark
                                      ? "rgba(255,255,255,0.4)"
                                      : "#6b7280",
                                  }}
                                >
                                  {featuredPortfolio.role}
                                </p>
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5 mb-3">
                              {[80, 60, 40].map((w, i) => (
                                <div
                                  key={i}
                                  className="h-1.5 rounded-full"
                                  style={{
                                    width: `${w}%`,
                                    backgroundColor: "#818cf8",
                                    opacity: 0.25 + i * 0.15,
                                  }}
                                />
                              ))}
                            </div>
                            <div className="flex items-center justify-between">
                              <span
                                className="text-[10px]"
                                style={{
                                  color: isDark
                                    ? "rgba(255,255,255,0.3)"
                                    : "#9ca3af",
                                }}
                              >
                                {featuredPortfolio.views}
                              </span>
                              <div className="flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
                                <span
                                  className="text-[10px]"
                                  style={{
                                    color: isDark
                                      ? "rgba(255,255,255,0.3)"
                                      : "#9ca3af",
                                  }}
                                >
                                  Live
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Quote */}
                          <p
                            className="text-[12px] leading-[1.65] italic"
                            style={{
                              color: isDark
                                ? "rgba(255,255,255,0.45)"
                                : "#6b7280",
                            }}
                          >
                            "{featuredPortfolio.quote}"
                          </p>

                          <p className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-400 group-hover:underline underline-offset-2">
                            Lihat portfolionya
                            <svg
                              className="size-3.5 transition-transform group-hover:translate-x-1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="m9 18 6-6-6-6" />
                            </svg>
                          </p>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Divider ── */}
          <div
            className="mx-2 h-5 w-px"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "#e5e7eb",
              transition: "background-color 0.4s ease",
            }}
          />

          {/* ── Masuk ── */}
          <a
            href="/login"
            className="px-3.5 py-1.5 inline-flex items-center text-[14px] font-medium rounded-lg border focus:outline-none transition-all duration-200"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.15)" : "#d1d5db",
              color: isDark ? "rgba(255,255,255,0.75)" : "#374151",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = isDark
                ? "rgba(255,255,255,0.07)"
                : "#f9fafb";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "transparent";
            }}
          >
            Masuk
          </a>

          {/* ── Mulai Gratis ── */}
          <a
            href="/register"
            className="ml-1.5 px-3.5 py-1.5 inline-flex items-center text-[14px] font-semibold rounded-lg text-white focus:outline-none transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: isDark
                ? "0 4px 20px rgba(99,102,241,0.4)"
                : "0 2px 8px rgba(99,102,241,0.25)",
            }}
          >
            Mulai Gratis →
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
