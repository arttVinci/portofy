import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  username: string;
  fullName: string;
}

const NAV_ITEMS = [
  { label: "Home", path: "" },
  { label: "About", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Achievements", path: "/achievements" },
  { label: "Contact", path: "/contact" },
];

export function Navbar({ username, fullName }: NavbarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const basePath = `/${username}`;

  const isActive = (path: string) => {
    const fullPath = basePath + path;
    if (path === "") return location.pathname === basePath || location.pathname === basePath + "/";
    return location.pathname.startsWith(fullPath);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo / Name */}
        <Link
          to={basePath}
          className="text-lg font-bold tracking-tight transition-colors hover:text-[#00d4ff]"
        >
          {fullName || username}
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={basePath + item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  isActive(item.path)
                    ? "text-[#00d4ff]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[#00d4ff]" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <ul className="flex flex-col px-4 py-3 gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  to={basePath + item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={`block rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-[#00d4ff] bg-[#00d4ff]/5"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
