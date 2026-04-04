import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "../ui/resizable-navbar";

const navItems = [
  { name: "Fitur", link: "/fitur" },
  { name: "Template", link: "/template" },
  { name: "Langganan", link: "/pricing" },
  { name: "Blog", link: "/blog" },
  { name: "Tentang", link: "/about" },
];

function NavbarLogo() {
  return (
    <a href="/" className="flex items-center gap-2.5 flex-none">
      <img
        src="/images/portofLogo.png"
        alt="portof logo"
        className="w-9 h-9"
      />
      <span
        className="text-[20px] font-semibold"
        style={{ letterSpacing: "-0.025em" }}
      >
        <span className="text-white/90">por</span>
        <span className="text-white/30">tof</span>
      </span>
    </a>
  );
}

export default function NavbarWrapper() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-2">
            <NavbarButton variant="secondary" href="/auth/login">
              Masuk
            </NavbarButton>
            <NavbarButton variant="gradient" href="/auth/register">
              Mulai Gratis →
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                className="text-[14px] font-medium text-neutral-400 hover:text-white transition-colors px-2 py-1"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 pt-2 border-t border-white/[0.06]">
              <NavbarButton variant="secondary" href="/auth/login" className="w-full">
                Masuk
              </NavbarButton>
              <NavbarButton variant="gradient" href="/auth/register" className="w-full">
                Mulai Gratis →
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
