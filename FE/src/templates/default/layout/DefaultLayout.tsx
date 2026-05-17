import { Outlet, useParams } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function DefaultLayout() {
  const { username } = useParams<{ username: string }>();

  const { profile, socials, isLoading, isProfileNotFound } = usePortfolioData(
    username ?? "",
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#00d4ff] border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (isProfileNotFound || !profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-muted-foreground/20">
            404
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Portfolio not found
          </p>
          <p className="mt-1 text-sm text-muted-foreground/60">
            The user <span className="font-mono text-[#00d4ff]">@{username}</span> doesn't exist or hasn't set up their portfolio yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar username={username!} fullName={profile.full_name} />
      <main className="flex-1">
        <Outlet context={{ username: username! }} />
      </main>
      <Footer fullName={profile.full_name} socials={socials} />
    </div>
  );
}
