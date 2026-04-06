"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";

import React, { useRef, useState } from "react";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-3 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        boxShadow: visible
          ? "0 10px 40px rgba(0,0,0,0.1), 0 0 60px rgba(59,130,246,0.05), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "none",
        width: visible ? "fit-content" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        // Let flex take care of the sizing seamlessly
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl min-w-max flex-row items-center justify-between self-start rounded-full px-5 py-2 lg:flex border border-transparent transition-colors duration-300",
        visible &&
          "bg-[#0c1a30]/90 border-[#1e3a5f]/70 shadow-[0_8px_32px_rgba(7,14,27,0.5)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "hidden flex-1 flex-row items-center justify-center space-x-0.5 text-sm font-medium text-slate-300 transition duration-200 lg:flex lg:space-x-1 xl:space-x-2 whitespace-nowrap",
        className,
      )}
    >
      {items.map((item, idx) => {
        const isHash = item.link.startsWith("#");
        return (
          <a
            onMouseEnter={() => setHovered(idx)}
            onClick={(e) => {
              if (isHash) {
                e.preventDefault();
                const element = document.querySelector(item.link);
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }
              if (onItemClick) onItemClick();
            }}
            className="relative px-4 py-2 text-blue-100 hover:text-white transition-colors duration-200 cursor-pointer"
            key={`link-${idx}`}
            href={item.link}
          >
            {hovered === idx && (
              <motion.div
                layoutId="hovered"
                className="absolute inset-0 h-full w-full rounded-full bg-[#2563eb]/40 border border-[#60a5fa]/30"
              />
            )}
            <span className="relative z-20 font-medium">{item.name}</span>
          </a>
        );
      })}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(16px)" : "blur(0px)",
        boxShadow: visible
          ? "0 10px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.1)"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between px-0 py-2 lg:hidden border border-transparent transition-colors duration-300",
        visible &&
          "bg-[#0c1a30]/90 border-[#1e3a5f]/70 shadow-[0_8px_32px_rgba(7,14,27,0.5)]",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-[#0c1a30]/95 border border-[#1e3a5f]/50 px-4 py-8 shadow-2xl backdrop-blur-xl",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX
      className="text-blue-200 hover:text-white transition-colors"
      onClick={onClick}
    />
  ) : (
    <IconMenu2
      className="text-blue-200 hover:text-white transition-colors"
      onClick={onClick}
    />
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="/"
      className="relative z-20 mr-4 flex items-center gap-2.5 px-2 py-1"
    >
      <img
        src="/images/portofLogo.png"
        alt="Portofy logo"
        className="w-8 h-8 rounded-full object-cover"
      />
      <span className="text-lg font-bold tracking-tight text-white">
        Portofy
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-5 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 inline-flex items-center justify-center cursor-pointer min-w-max";

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] text-white shadow-[0_0_20px_rgba(56,189,248,0.3)] hover:-translate-y-0.5 border border-blue-400/20",
    secondary:
      "bg-transparent text-slate-300 hover:text-white border border-[#1e293b] hover:border-slate-500 hover:bg-[#1e293b]/50",
    dark: "bg-[#0f172a] text-white hover:bg-[#1e293b] border border-[#1e293b]",
    gradient:
      "bg-gradient-to-b from-[#1e40af] to-[#2563eb] text-white hover:-translate-y-0.5",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
