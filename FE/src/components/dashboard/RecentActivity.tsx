import {
  EyeIcon,
  UserIcon,
  MessageSquareIcon,
  RocketIcon,
  DownloadIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type ActivityType = "view" | "message" | "update" | "download" | "new";

interface Activity {
  id: string;
  type: ActivityType;
  message: string;
  timestamp: string;
}

// ── Dummy data ────────────────────────────────────────────────────────────────
const ACTIVITIES: Activity[] = [
  {
    id: "1",
    type: "view",
    message: "Seseorang dari LinkedIn melihat portofolio kamu",
    timestamp: "2 menit lalu",
  },
  {
    id: "2",
    type: "message",
    message: "HR dari Tokopedia mengirim pesan",
    timestamp: "1 jam lalu",
  },
  {
    id: "3",
    type: "view",
    message: "3 orang baru mengunjungi profil hari ini",
    timestamp: "3 jam lalu",
  },
  {
    id: "4",
    type: "download",
    message: "CV kamu diunduh oleh seseorang",
    timestamp: "Kemarin, 14:30",
  },
  {
    id: "5",
    type: "update",
    message: "Kamu memperbarui bagian Projects",
    timestamp: "Kemarin, 10:15",
  },
  {
    id: "6",
    type: "new",
    message: "Project baru 'portof.id' berhasil ditambahkan",
    timestamp: "2 hari lalu",
  },
];

const ACTIVITY_CONFIG: Record<
  ActivityType,
  { icon: React.ReactNode; className: string }
> = {
  view: {
    icon: <EyeIcon />,
    className: "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  message: {
    icon: <MessageSquareIcon />,
    className:
      "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  },
  update: {
    icon: <UserIcon />,
    className:
      "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
  download: {
    icon: <DownloadIcon />,
    className:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  new: {
    icon: <RocketIcon />,
    className: "bg-pink-100 text-pink-600 dark:bg-pink-950 dark:text-pink-400",
  },
};

export function RecentActivity() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Aktivitas Terbaru
          </CardTitle>
          <CardDescription className="text-xs">7 hari terakhir</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <ScrollArea className="h-[272px] pr-3">
          <ul className="flex flex-col divide-y">
            {ACTIVITIES.map((activity) => {
              const config = ACTIVITY_CONFIG[activity.type];
              return (
                <li
                  key={activity.id}
                  className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full [&>svg]:size-3.5",
                      config.className,
                    )}
                  >
                    {config.icon}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {activity.timestamp}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
