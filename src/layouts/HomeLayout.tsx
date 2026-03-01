import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";
import ScrollToTop from "../components/utils/ScrollToTop";

export default function HomeLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
      <ScrollToTop />
    </>
  );
}
