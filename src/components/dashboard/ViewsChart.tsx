import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

// ── Dummy data ────────────────────────────────────────────────────────────────
const WEEKLY_DATA = [
  { date: "Sen", views: 42, visitors: 28 },
  { date: "Sel", views: 58, visitors: 35 },
  { date: "Rab", views: 35, visitors: 20 },
  { date: "Kam", views: 91, visitors: 55 },
  { date: "Jum", views: 124, visitors: 78 },
  { date: "Sab", views: 67, visitors: 40 },
  { date: "Min", views: 49, visitors: 30 },
];

const MONTHLY_DATA = [
  { date: "Jan", views: 320, visitors: 210 },
  { date: "Feb", views: 480, visitors: 290 },
  { date: "Mar", views: 390, visitors: 240 },
  { date: "Apr", views: 520, visitors: 310 },
  { date: "Mei", views: 680, visitors: 420 },
  { date: "Jun", views: 590, visitors: 370 },
  { date: "Jul", views: 720, visitors: 445 },
  { date: "Agu", views: 840, visitors: 510 },
  { date: "Sep", views: 760, visitors: 470 },
  { date: "Okt", views: 910, visitors: 560 },
  { date: "Nov", views: 1020, visitors: 620 },
  { date: "Des", views: 880, visitors: 540 },
];

// ── Chart config ──────────────────────────────────────────────────────────────
// views    → biru solid  (blue-500)
// visitors → biru muda   (blue-300)
const chartConfig = {
  views: {
    label: "Views",
    color: "#3b82f6",
  },
  visitors: {
    label: "Visitors",
    color: "#93c5fd",
  },
} satisfies ChartConfig;

type Period = "weekly" | "monthly";

export function ViewsChart() {
  const [period, setPeriod] = useState<Period>("weekly");
  const data = period === "weekly" ? WEEKLY_DATA : MONTHLY_DATA;

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-medium">
              Portfolio Views
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Kunjungan ke halaman publik portofolio
            </CardDescription>
          </div>

          {/* Period toggle */}
          <div className="flex items-center gap-1 rounded-lg border bg-muted/40 p-0.5 shrink-0">
            {(["weekly", "monthly"] as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium transition-colors",
                  period === p
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {p === "weekly" ? "Mingguan" : "Bulanan"}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ChartContainer config={chartConfig} className="h-52 w-full">
          <AreaChart
            data={data}
            margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#93c5fd" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#93c5fd" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="#3b82f6"
              strokeWidth={2}
              fill="url(#fillViews)"
              dot={false}
              activeDot={{ r: 4, strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="visitors"
              stroke="#93c5fd"
              strokeWidth={1.5}
              fill="url(#fillVisitors)"
              dot={false}
              activeDot={{ r: 3, strokeWidth: 0 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
