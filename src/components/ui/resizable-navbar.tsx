import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isResized, setIsResized] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    if (latest > 100) {
      setIsResized(true);
    } else {
      setIsResized(false);
    }
  });

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0,
        width: isResized ? "60%" : "90%",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      style={{
        minWidth: "800px",
        maxWidth: "1200px",
        left: "50%",
        translateX: "-50%",
      }}
      className={cn(
        "fixed top-4 z-[60] flex items-center justify-between rounded-full border border-white/[0.08] bg-[#0c1222]/80 px-8 py-2.5 shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_60px_rgba(56,189,248,0.04)] backdrop-blur-xl transition-all duration-300",
        className
      )}
    >
      {children}
    </motion.nav>
  );
};

export const NavBody = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("hidden w-full items-center justify-between md:flex", className)}>
      {children}
    </div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
}: {
  items: { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {items.map((item, idx) => (
        <a
          key={idx}
          href={item.link}
          onClick={onItemClick}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className="relative px-3.5 py-1.5 text-[13px] font-medium text-neutral-400 transition-colors duration-200 hover:text-white"
        >
          {hovered === idx && (
            <motion.span
              layoutId="nav-hover"
              className="absolute inset-0 rounded-full bg-white/[0.06]"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export const MobileNav = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col md:hidden", className)}>
      {children}
    </div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {children}
    </div>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="text-neutral-400 outline-none focus:outline-none hover:text-white transition-colors cursor-pointer"
    >
      {isOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
    </button>
  );
};

export const MobileNavMenu = ({
  children,
  isOpen,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
        >
          <div className="flex flex-col gap-3 py-4 border-t border-white/[0.06] mt-2">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const NavbarButton = ({
  children,
  variant = "primary",
  className,
  href,
  ...props
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  className?: string;
  href?: string;
} & React.ComponentPropsWithoutRef<"a">) => {
  const baseStyles =
    "px-4 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 inline-flex items-center justify-center cursor-pointer";

  const variantStyles = {
    primary:
      "bg-white text-[#0c1222] hover:-translate-y-0.5 shadow-[0_0_20px_rgba(255,255,255,0.15)]",
    secondary:
      "bg-transparent text-neutral-400 hover:text-white border border-white/[0.1] hover:border-white/[0.2] hover:bg-white/[0.04]",
    dark: "bg-[#111a2e] text-white hover:bg-[#162035] border border-white/[0.08] shadow-lg",
    gradient:
      "bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 text-white shadow-[0_4px_24px_rgba(59,130,246,0.35)] hover:-translate-y-0.5",
  };

  return (
    <a
      href={href || "#"}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </a>
  );
};
