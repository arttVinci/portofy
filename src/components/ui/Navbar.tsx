import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";

const smoothEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

interface MenuItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
}

const menuItems: MenuItem[] = [
  {
    label: "Product",
    href: "#",
    description:
      "Explore our core product features and capabilities built for modern teams.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect width="7" height="7" x="14" y="3" rx="1" />
        <path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />
      </svg>
    ),
  },
  {
    label: "Pricing",
    href: "#",
    description:
      "Simple, transparent pricing that grows with your business — no surprises.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Gallery",
    href: "#",
    description:
      "Browse our showcase of projects built by teams around the world.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
  },
];

const dropdownVariants: Variants = {
  hidden: { opacity: 0, y: -14, scaleY: 0.93, transformOrigin: "top" },
  visible: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.26,
      ease: smoothEase,
      staggerChildren: 0.08,
      delayChildren: 0.06,
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
    transition: { duration: 0.3, ease: smoothEase, delay: 0.2 } as Transition,
  },
};

function MenuItemRow({ item, isDark }: { item: MenuItem; isDark: boolean }) {
  const t: Transition = { duration: 0.28, ease: smoothEase };
  return (
    <motion.a
      href={item.href}
      variants={menuItemVariants}
      className="flex items-center gap-4 px-4 py-4 rounded-xl cursor-pointer relative"
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
          className="text-[15px] font-semibold leading-[1.3] tracking-[-0.01em]"
          style={{ color: isDark ? "rgba(255,255,255,0.9)" : "#111827" }}
        >
          {item.label}
        </p>
        <p
          className="mt-1 text-[13px] font-normal leading-[1.55]"
          style={{ color: isDark ? "rgba(255,255,255,0.45)" : "#6b7280" }}
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
  // Subtle hover bg — dark: white tint, light: black tint
  const hoverBg = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.04)";

  // Mega menu adaptive colors
  const megaBg = isDark ? "#16161e" : "#ffffff";
  const megaBorder = isDark ? "rgba(255,255,255,0.08)" : "#e5e7eb";
  const megaSidebarBg = isDark ? "#0f0f16" : "#f9fafb";
  const megaSidebarBorder = isDark ? "rgba(255,255,255,0.06)" : "#f3f4f6";
  const megaLabel = isDark ? "rgba(255,255,255,0.3)" : "#9ca3af";

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
        {/* Brand */}
        <a
          href="#"
          className="flex-none font-bold text-[18px] tracking-[-0.02em] focus:outline-none"
          style={{ color: brandColor, transition: "color 0.4s ease" }}
        >
          Brand
        </a>

        <div className="flex items-center gap-0.5">
          {/* Nav links */}
          {["Landing", "Work", "Blog"].map((label) => (
            <a
              key={label}
              href="#"
              className="px-3 py-1.5 text-[14px] font-medium rounded-lg focus:outline-none"
              style={{
                color: textColor,
                transition: "color 0.3s ease, background-color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = textHover;
                el.style.backgroundColor = hoverBg;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = textColor;
                el.style.backgroundColor = "transparent";
              }}
            >
              {label}
            </a>
          ))}

          {/* Resources dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = textHover;
                el.style.backgroundColor = hoverBg;
                openMenu();
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = textColor;
                el.style.backgroundColor = "transparent";
                scheduleClose();
              }}
              className="px-3 py-1.5 flex items-center gap-1 text-[14px] font-medium rounded-lg focus:outline-none cursor-pointer"
              style={{
                color: textColor,
                transition: "color 0.3s ease, background-color 0.2s ease",
              }}
            >
              Resources
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
                      {/* Left — menu items */}
                      <div className="col-span-3 p-3">
                        <p
                          className="px-4 pt-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em]"
                          style={{ color: megaLabel }}
                        >
                          Explore
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

                      {/* Right — customer stories */}
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
                          Customer stories
                        </p>
                        <a
                          className="group flex flex-col gap-3 focus:outline-none"
                          href="#"
                        >
                          <div className="overflow-hidden rounded-xl">
                            <img
                              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&auto=format&fit=crop&w=560&q=80"
                              alt="Customer Story"
                            />
                          </div>
                          <div>
                            <p
                              className="text-[13px] font-normal leading-[1.6]"
                              style={{
                                color: isDark
                                  ? "rgba(255,255,255,0.5)"
                                  : "#6b7280",
                              }}
                            >
                              Preline Projects has proved to be the most
                              efficient cloud based project tracking and bug
                              tracking tool.
                            </p>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-indigo-400 group-hover:underline underline-offset-2">
                              Learn more
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
                          </div>
                        </a>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <a
            href="#"
            className="px-3 py-1.5 text-[14px] font-medium rounded-lg focus:outline-none"
            style={{
              color: textColor,
              transition: "color 0.3s ease, background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = textHover;
              el.style.backgroundColor = hoverBg;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = textColor;
              el.style.backgroundColor = "transparent";
            }}
          >
            Account
          </a>

          {/* Divider */}
          <div
            className="mx-2 h-5 w-px"
            style={{
              backgroundColor: isDark ? "rgba(255,255,255,0.12)" : "#e5e7eb",
              transition: "background-color 0.4s ease",
            }}
          />

          {/* Sign in */}
          <a
            href="#"
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
            Sign in
          </a>

          {/* Get started */}
          <a
            href="#"
            className="ml-1.5 px-3.5 py-1.5 inline-flex items-center text-[14px] font-semibold rounded-lg text-white focus:outline-none transition-all duration-200 hover:-translate-y-px"
            style={{
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              boxShadow: isDark
                ? "0 4px 20px rgba(99,102,241,0.4)"
                : "0 2px 8px rgba(99,102,241,0.25)",
            }}
          >
            Get started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
