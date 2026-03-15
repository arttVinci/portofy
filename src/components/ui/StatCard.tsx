import { Card, CardContent } from "@/components/ui/card";
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  trend?: number;
  trendLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  label,
  value,
  trend,
  trendLabel,
  icon,
  className,
}: StatCardProps) {
  const isUp = trend !== undefined && trend > 0;
  const isDown = trend !== undefined && trend < 0;
  const isFlat = trend !== undefined && trend === 0;

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{label}</span>
          {icon && (
            <span className="text-muted-foreground/40 [&>svg]:size-4">
              {icon}
            </span>
          )}
        </div>

        <p className="text-2xl font-semibold tracking-tight">{value}</p>

        {trend !== undefined && (
          <div className="flex items-center gap-1.5 text-xs">
            <span
              className={cn(
                "flex items-center gap-0.5 font-medium",
                isUp && "text-emerald-600 dark:text-emerald-400",
                isDown && "text-red-500 dark:text-red-400",
                isFlat && "text-muted-foreground",
              )}
            >
              {isUp && <TrendingUpIcon className="size-3" />}
              {isDown && <TrendingDownIcon className="size-3" />}
              {isFlat && <MinusIcon className="size-3" />}
              {isUp ? "+" : ""}
              {trend}%
            </span>
            {trendLabel && (
              <span className="text-muted-foreground">{trendLabel}</span>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
