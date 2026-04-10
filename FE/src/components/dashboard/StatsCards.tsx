import { StatCard } from "@/components/ui/StatCard";
import {
  EyeIcon,
  UsersIcon,
  MousePointerClickIcon,
  ClockIcon,
} from "lucide-react";

// ── Dummy data — ganti dengan data dari API nanti ─────────────────────────────
const STATS = [
  {
    label: "Total Views",
    value: "2,847",
    trend: 12,
    trendLabel: "vs bulan lalu",
    icon: <EyeIcon />,
  },
  {
    label: "Unique Visitors",
    value: "1,203",
    trend: 8,
    trendLabel: "vs bulan lalu",
    icon: <UsersIcon />,
  },
  {
    label: "Link Clicks",
    value: "348",
    trend: -3,
    trendLabel: "vs bulan lalu",
    icon: <MousePointerClickIcon />,
  },
  {
    label: "Avg. Time on Page",
    value: "2m 14s",
    trend: 5,
    trendLabel: "vs bulan lalu",
    icon: <ClockIcon />,
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {STATS.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
