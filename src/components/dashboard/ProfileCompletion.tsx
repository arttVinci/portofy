import { Link } from "react-router-dom";
import { CheckCircle2Icon, CircleIcon, ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface CompletionItem {
  label: string;
  done: boolean;
  url: string;
}

// ── Dummy data — ganti dengan cek data asli dari API nanti ────────────────────
const COMPLETION_ITEMS: CompletionItem[] = [
  { label: "Lengkapi profile", done: true, url: "/dashboard/profile" },
  { label: "Tambah social media", done: true, url: "/dashboard/social" },
  { label: "Upload foto avatar", done: false, url: "/dashboard/profile" },
  {
    label: "Tambah minimal 1 project",
    done: false,
    url: "/dashboard/projects",
  },
  { label: "Tambah experience", done: false, url: "/dashboard/experience" },
  { label: "Pilih tema tampilan", done: false, url: "/dashboard/appearance" },
];

function calcPercent(items: CompletionItem[]) {
  const done = items.filter((i) => i.done).length;
  return Math.round((done / items.length) * 100);
}

export function ProfileCompletion() {
  const percent = calcPercent(COMPLETION_ITEMS);
  const remaining = COMPLETION_ITEMS.filter((i) => !i.done).length;
  const isComplete = percent === 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="text-sm font-medium">
              Kelengkapan Profil
            </CardTitle>
            <CardDescription className="text-xs mt-0.5">
              Profil lengkap tampil lebih baik di pencarian
            </CardDescription>
          </div>
          <Badge
            variant={isComplete ? "default" : "secondary"}
            className={cn(
              "shrink-0 text-xs",
              isComplete && "bg-emerald-500 hover:bg-emerald-500 text-white",
            )}
          >
            {percent}%
          </Badge>
        </div>

        <Progress
          value={percent}
          className={cn("h-1.5 mt-2", isComplete && "[&>div]:bg-emerald-500")}
        />
      </CardHeader>

      <CardContent className="pt-0">
        <ul className="flex flex-col gap-0.5">
          {COMPLETION_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={item.done ? "#" : item.url}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
                  item.done
                    ? "pointer-events-none text-muted-foreground"
                    : "hover:bg-muted/60 text-foreground",
                )}
              >
                {item.done ? (
                  <CheckCircle2Icon className="size-4 shrink-0 text-emerald-500" />
                ) : (
                  <CircleIcon className="size-4 shrink-0 text-muted-foreground/30" />
                )}
                <span className={cn("flex-1", item.done && "line-through")}>
                  {item.label}
                </span>
                {!item.done && (
                  <ChevronRightIcon className="size-3.5 text-muted-foreground" />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <p className="mt-3 text-xs text-muted-foreground px-2">
            {remaining} langkah lagi untuk profil 100%
          </p>
        )}
      </CardContent>
    </Card>
  );
}
