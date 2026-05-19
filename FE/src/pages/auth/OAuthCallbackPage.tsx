import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STORAGE_KEYS } from "@/config/api.config";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

      navigate("/dashboard", { replace: true });
    } else {
      navigate("/auth/login?error=oauth_failed", { replace: true });
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-lg font-semibold animate-pulse">
        Mengamankan sesi Anda...
      </p>
    </div>
  );
};

export default OAuthCallbackPage;
