import { Outlet } from "react-router-dom";
import { NavbarDemo } from "../components/navigation/Navbar";
import ScrollToTop from "../components/utils/ScrollToTop";

export default function HomeLayout() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Grid — fixed biar ga ikut scroll */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette — fixed juga */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 60% 60%, transparent 20%, #0a0a0a 80%)",
        }}
      />

      {/* Konten di atas background */}
      <div className="relative z-10">
        <NavbarDemo />
        <Outlet />
        <ScrollToTop />
      </div>
    </div>
  );
}
