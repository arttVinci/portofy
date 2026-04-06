"use client";
import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { IconArrowRight } from "@tabler/icons-react";

export function NavbarDemo() {
  const navItems = [
    { name: "Langganan", link: "#langganan" },
    { name: "Blog", link: "#blog" },
    { name: "FAQ", link: "#faq" },
    { name: "Template", link: "/templates" },
    { name: "Tentang Kami", link: "/about" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Logo match for Elysian / Portofy
  const BrandLogo = () => (
    <a
      href="/"
      className="relative z-20 flex shrink-0 items-center gap-2.5 mr-4 px-2 py-1"
    >
      <img
        src="/images/portofLogo.png"
        alt="Portofy logo"
        className="w-[32px] h-[32px] object-contain rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] shrink-0"
        onError={(e) => {
          // Fallback if image not found
          e.currentTarget.style.display = "none";
          e.currentTarget.nextElementSibling?.classList.remove("hidden");
        }}
      />
      <div className="hidden flex items-center justify-center size-8 rounded-full bg-slate-800 border border-slate-700 shadow-inner shrink-0">
        <span className="text-[16px]">🦅</span>
      </div>
      <span className="text-[18px] font-bold tracking-tight text-white drop-shadow-sm whitespace-nowrap shrink-0">
        Portofy
      </span>
    </a>
  );

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <BrandLogo />

        <NavItems items={navItems} />

        <div className="flex shrink-0 items-center gap-2 xl:gap-4">
          <div className="h-4 w-[1px] bg-slate-600/50 mx-1 shrink-0"></div>

          <NavbarButton
            variant="secondary"
            className="px-4 py-1.5 text-[13px] border-none hover:bg-slate-800/50"
            href="/auth/login"
          >
            Login
          </NavbarButton>
          <NavbarButton
            variant="primary"
            className="gap-1.5 px-5 py-2"
            href="/auth/register"
          >
            Mulai Gratis
            <IconArrowRight size={16} stroke={2} />
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <BrandLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        >
          {navItems.map((item, idx) => {
            const isHash = item.link.startsWith("#");
            return (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={(e) => {
                  if (isHash) {
                    e.preventDefault();
                    const element = document.querySelector(item.link);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth" });
                    }
                  }
                  setIsMobileMenuOpen(false);
                }}
                className="relative text-slate-300 hover:text-white transition-colors duration-200 text-[15px] font-medium px-2 py-1 cursor-pointer"
              >
                <span className="block">{item.name}</span>
              </a>
            );
          })}
          <div className="flex w-full flex-col gap-3 mt-4 pt-4 border-t border-slate-800">
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="secondary"
              className="w-full"
              href="/auth/login"
            >
              Login
            </NavbarButton>
            <NavbarButton
              onClick={() => setIsMobileMenuOpen(false)}
              variant="primary"
              className="w-full gap-2 justify-center"
              href="/auth/register"
            >
              Mulai Gratis <IconArrowRight size={16} stroke={2} />
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
