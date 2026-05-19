import { Outlet, Navigate, useSearchParams } from "react-router-dom";
import { STORAGE_KEYS } from "@/config/api.config";

export default function AuthLayout() {
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  const [searchParams] = useSearchParams();
  const isOAuthRegister = searchParams.get("oauth") === "true";

  // Allow access to register page during OAuth flow (profile creation step)
  if (token && !isOAuthRegister) {
    return <Navigate to="/app" replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
}
