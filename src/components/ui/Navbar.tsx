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
        className="size-4.5 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        className="size-4.5 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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
        className="size-4.5 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
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

function MenuItemRow({ item }: { item: MenuItem }) {
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
        style={{ backgroundColor: "#f8fafc" }}
        variants={{ rest: { opacity: 0 }, hovered: { opacity: 1 } }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <motion.div
        className="relative shrink-0 flex items-center justify-center size-10 rounded-xl"
        variants={{
          rest: {
            backgroundColor: "#f3f4f6",
            boxShadow: "0 0 0 0 rgba(0,0,0,0)",
          },
          hovered: {
            backgroundColor: "#ffffff",
            boxShadow: "0 1px 6px 0 rgba(0,0,0,0.09)",
          },
        }}
        transition={t}
      >
        {item.icon}
      </motion.div>

      <div className="relative grow min-w-0">
        <p className="text-[15px] font-semibold leading-[1.3] tracking-[-0.01em] text-gray-900">
          {item.label}
        </p>
        <p className="mt-1 text-[13px] font-normal text-gray-500 leading-[1.55]">
          {item.description}
        </p>
      </div>

      <motion.div
        className="relative shrink-0"
        variants={{
          rest: { x: 0, opacity: 0.25, color: "#9ca3af" },
          hovered: { x: 5, opacity: 1, color: "#111827" },
        }}
        transition={{ duration: 0.25, ease: smoothEase }}
      >
        <HiArrowRight className="size-3.75" />
      </motion.div>
    </motion.a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentY = window.scrollY;
      const diff = currentY - lastScrollY.current;
      if (currentY < 10) {
        setNavVisible(true);
      } else if (diff > 6) {
        setNavVisible(false);
        setIsOpen(false);
      } else if (diff < -6) {
        setNavVisible(true);
      }
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  const navLinkClass =
    "px-3 py-2 flex items-center text-[14px] font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none transition-colors duration-150";

  return (
    <motion.header
      animate={{ y: navVisible ? 0 : "-100%" }}
      transition={{ duration: 0.35, ease: smoothEase }}
      className="fixed top-0 left-0 right-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="relative max-w-340 w-full mx-auto flex items-center justify-between py-3 px-4 sm:px-6 lg:px-8">
        <a
          href="#"
          aria-label="Brand"
          className="flex-none font-bold text-[18px] tracking-[-0.02em] text-gray-900 focus:outline-none"
        >
          Brand
        </a>

        <div className="flex items-center gap-1">
          <a href="#" className={navLinkClass}>
            Landing
          </a>

          <div className="static">
            <button
              type="button"
              onMouseEnter={openMenu}
              onMouseLeave={scheduleClose}
              onClick={() => (isOpen ? setIsOpen(false) : openMenu())}
              className={`${navLinkClass} gap-1`}
            >
              Resources
              <motion.svg
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.22 }}
                className="shrink-0 size-4 text-gray-400"
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
                  className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 top-full mt-2 z-50"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-5">
                      {/* Left — menu items */}
                      <div className="col-span-3 p-3">
                        <p className="px-4 pt-2 pb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">
                          Explore
                        </p>
                        <div className="flex flex-col">
                          {menuItems.map((item) => (
                            <MenuItemRow key={item.label} item={item} />
                          ))}
                        </div>
                      </div>

                      <motion.div
                        variants={storyVariants}
                        className="col-span-2 bg-gray-50 border-l border-gray-100 p-6 flex flex-col"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400 mb-4">
                          Customer stories
                        </p>
                        <a
                          className="group flex flex-col gap-3 focus:outline-none"
                          href="#"
                        >
                          <div className="overflow-hidden rounded-xl">
                            <img
                              className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                              src="https://images.unsplash.com/photo-1661956602116-aa6865609028?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=560&q=80"
                              alt="Customer Story"
                            />
                          </div>
                          <div>
                            <p className="text-[13px] font-normal text-gray-600 leading-[1.6]">
                              Preline Projects has proved to be the most
                              efficient cloud based project tracking and bug
                              tracking tool.
                            </p>
                            <p className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 group-hover:underline underline-offset-2">
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

          <a href="#" className={navLinkClass}>
            Account
          </a>
          <a href="#" className={navLinkClass}>
            Work
          </a>
          <a href="#" className={navLinkClass}>
            Blog
          </a>

          <div className="mx-2 h-5 w-px bg-gray-200" />

          <a
            href="#"
            className="px-3.5 py-2 inline-flex items-center text-[14px] font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors duration-150 focus:outline-none"
          >
            Sign in
          </a>
          <a
            href="#"
            className="ml-1.5 px-3.5 py-2 inline-flex items-center text-[14px] font-semibold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-150 focus:outline-none shadow-sm"
          >
            Get started
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
