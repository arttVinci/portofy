import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const token = localStorage.getItem("authToken");

  if (token) {
    return <Navigate to="/app" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}
