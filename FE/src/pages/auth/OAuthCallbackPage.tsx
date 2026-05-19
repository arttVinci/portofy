import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { STORAGE_KEYS } from "@/config/api.config";
import { profileService } from "@/services";

const OAuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [statusText, setStatusText] = useState("Mengamankan sesi Anda...");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      navigate("/auth/login?error=oauth_failed", { replace: true });
      return;
    }

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);

    const checkProfile = async () => {
      try {
        setStatusText("Memeriksa profil Anda...");
        await profileService.getProfile();
        // Profile exists → go to dashboard
        navigate("/app", { replace: true });
      } catch {
        // Profile not found (404) → redirect to register step 3 (profile creation)
        navigate("/auth/register?oauth=true", { replace: true });
      }
    };

    checkProfile();
  }, [navigate, searchParams]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <p className="text-lg font-semibold animate-pulse">
        {statusText}
      </p>
    </div>
  );
};

export default OAuthCallbackPage;
