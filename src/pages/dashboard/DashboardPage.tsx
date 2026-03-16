import { StatsCards } from "@/components/dashboard/StatsCards";
import { ViewsChart } from "@/components/dashboard/ViewsChart";
import { CopyPortfolioLink } from "@/components/dashboard/CopyPortfolioLink";
import { ProfileCompletion } from "@/components/dashboard/ProfileCompletion";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

const USERNAME = "putra.rizky";

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Selamat pagi" : hour < 17 ? "Selamat siang" : "Selamat malam";

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          {greeting}, {USERNAME} 👋
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Berikut ringkasan aktivitas portofolio kamu.
        </p>
      </div>

      <CopyPortfolioLink />

      <StatsCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <ViewsChart />
        <ProfileCompletion />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
        <QuickActions />
        <RecentActivity />
      </div>
    </div>
  );
}
