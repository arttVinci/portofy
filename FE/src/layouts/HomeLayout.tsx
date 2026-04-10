import { Outlet } from "react-router-dom";
import { NavbarDemo } from "../components/navigation/Navbar";
import ScrollToTop from "../components/utils/ScrollToTop";

export default function HomeLayout() {
  return (
    <div className="relative w-full">
      <NavbarDemo />

      <Outlet />
      <ScrollToTop />
    </div>
  );
}
