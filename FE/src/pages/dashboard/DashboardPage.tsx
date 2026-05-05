import { CopyPortfolioLink } from "@/components/dashboard/CopyPortfolioLink";
import { HeroProfileCard } from "@/components/dashboard/HeroProfileCard";
import { NotificationCard } from "@/components/dashboard/NotificationCard";
import { PortfolioHighlights } from "@/components/dashboard/PortfolioHighlights";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Skeleton } from "@/components/ui/skeleton";
import { useCurrent } from "@/hooks/queries/user/useCurrent";

import {
  useGetProfile,
  useAdminProjects,
  useAdminAchievements,
  useAdminSkills,
  useAdminSocials,
  useAdminExperiences,
  useAdminEducations,
} from "@/hooks/queries";

export default function DashboardPage() {
  const { data: currentUser, isLoading: currentUserLoading } = useCurrent({
    enabled: true,
  });

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
  const { data: educations } = useAdminEducations();

  // ── Profile completion calculation ──────────────────────────────────────────
  const completionProfileChecks = [
    { label: "Tambahkan Foto Profile", done: !!profile?.image_url },
    { label: "Tambahkan Alamat", done: !!profile?.address },
    { label: "Tambahkan Bio Kamu", done: !!profile?.bio },
    { label: "Tambahkan About", done: !!profile?.about },
    { label: "Tambahkan Tags", done: !!profile?.tags },
  ];

  const completionPortfolioChecks = [
    { label: "Lengkapi Profile", done: !!profile, url: "/app/profile" },
    {
      label: "Perlihatkan minimal 1 Project Kamu",
      done: (projects?.length ?? 0) > 0,
      url: "/app/projects",
    },
    {
      label: "Tunjukan minimal 1 Pencapaian Kamu",
      done: (achievements?.length ?? 0) > 0,
      url: "/app/achievements",
    },
    {
      label: "Tampilkan latar belakang Pendidikan Kamu",
      done: (educations?.length ?? 0) > 0,
      url: "/app/education",
    },
    {
      label: "Tampilkan Riwayat Pekerjaan Kamu",
      done: (experiences?.length ?? 0) > 0,
      url: "/app/experience",
    },
    {
      label: "Tampilkan keahlian Kamu",
      done: (skills?.length ?? 0) > 0,
      url: "/app/skills",
    },
    {
      label: "Tambahkan social media",
      done: (socials?.length ?? 0) > 0,
    },
  ];

  function caclLabel(items: any[], options: string) {
    const done = items.filter((c) => c.done).length;
    const remaining = items.length - done;
    return remaining > 0
      ? `${remaining} langkah lagi untuk ${items.length}%`
      : `${options} kamu sudah Siap!`;
  }

  function calcPercent(items: any[]) {
    const done = items.filter((c) => c.done).length;
    return Math.round((done / items.length) * 100);
  }

  const completionProfilePercent = calcPercent(completionProfileChecks);
  const completionPortfolioPercent = calcPercent(completionPortfolioChecks);

  const completionProfileLabel = caclLabel(completionProfileChecks, "Profile");
  const completionPortfolioLabel = caclLabel(
    completionPortfolioChecks,
    "Portfolio",
  );

  return (
    <div className="flex flex-col gap-6">
      {/* ── Greeting Header ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}, {profile?.full_name} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Berikut ringkasan Portofolio anda.
        </p>
      </div>

      {/* ── Copy Portfolio Link ──────────────────────────────────────────── */}
      <CopyPortfolioLink username={currentUser?.username ?? "Username"} />

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
            completionPercent={completionProfilePercent}
            completionLabel={completionProfileLabel}
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
        <ProfileCompletion
          completionItems={completionPortfolioChecks}
          completionLabel={completionPortfolioLabel}
          completionPercent={completionPortfolioPercent}
        />
        <QuickActions />
      </div>
    </div>
  );
}
