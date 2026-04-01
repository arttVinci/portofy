import { useQueryClient } from "@tanstack/react-query";
import { CopyPortfolioLink } from "@/components/dashboard/CopyPortfolioLink";
import { HeroProfileCard } from "@/components/dashboard/HeroProfileCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { PortfolioHighlights } from "@/components/dashboard/PortfolioHighlights";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Skeleton } from "@/components/ui/skeleton";

import {
  useGetProfile,
  useAdminProjects,
  useAdminAchievements,
  useAdminSkills,
  useAdminSocials,
  useAdminExperiences,
} from "@/hooks/queries";

export default function DashboardPage() {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<any>(["auth", "currentUser"]);
  const currentUsername = currentUser?.username || "loading...";

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat siang" : "Selamat malam";

  // ── Data from TanStack Query cache ──────────────────────────────────────────
  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: projects } = useAdminProjects();
  const { data: achievements } = useAdminAchievements();
  const { data: skills } = useAdminSkills();
  const { data: socials } = useAdminSocials();
  const { data: experiences } = useAdminExperiences();

  // ── Profile completion calculation ──────────────────────────────────────────
  const completionChecks = [
    { label: "Lengkapi profil", done: !!profile?.full_name && !!profile?.bio },
    { label: "Upload foto avatar", done: !!profile?.image_url },
    { label: "Tambah social media", done: (socials?.length ?? 0) > 0 },
    { label: "Tambah minimal 1 project", done: (projects?.length ?? 0) > 0 },
    { label: "Tambah experience", done: (experiences?.length ?? 0) > 0 },
    { label: "Tambah skill", done: (skills?.length ?? 0) > 0 },
  ];
  const doneCount = completionChecks.filter((c) => c.done).length;
  const completionPercent = Math.round(
    (doneCount / completionChecks.length) * 100,
  );
  const remaining = completionChecks.length - doneCount;
  const completionLabel =
    remaining > 0
      ? `${remaining} langkah lagi untuk profil 100%`
      : "Profil kamu sudah lengkap! 🎉";

  return (
    <div className="flex flex-col gap-6">
      {/* ── Greeting Header ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}, {profile?.full_name} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Berikut ringkasan aktivitas portofolio kamu.
        </p>
      </div>

      {/* ── Copy Portfolio Link ──────────────────────────────────────────── */}
      <CopyPortfolioLink username={currentUsername} />

      {/* ── Hero Profile + Notifications ─────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_380px]">
        {profileLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        ) : profile ? (
          <HeroProfileCard
            profile={profile}
            skills={skills ?? []}
            completionPercent={completionPercent}
            completionLabel={completionLabel}
          />
        ) : null}

        <NotificationCard />
      </div>

      {/* ── Portfolio Highlights ──────────────────────────────────────────── */}
      <PortfolioHighlights
        projects={projects ?? []}
        achievements={achievements ?? []}
      />

      {/* ── Checklist + Quick Actions ────────────────────────────────────── */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ProfileCompletion />
        <QuickActions />
      </div>
    </div>
  );
}
