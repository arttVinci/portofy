import { Outlet } from "react-router-dom";
import Navbar from "../components/navigation/Navbar";

export default function HomeLayout() {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
}
