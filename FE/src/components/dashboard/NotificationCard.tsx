import {
  MailIcon,
  MessageSquareIcon,
  EyeIcon,
  DownloadIcon,
  BellIcon,
  ChevronRightIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NotifType = "email" | "message" | "view" | "download";

interface Notification {
  id: string;
  type: NotifType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// ── Dummy data — ganti dengan API notifikasi nanti ────────────────────────────
const NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    type: "email",
    title: "Coming Soon",
    message: "Fitur notifikasi akan hadir segera",
    timestamp: "Segera Hadir",
    read: false,
  },
];

const NOTIF_CONFIG: Record<
  NotifType,
  { icon: React.ReactNode; className: string }
> = {
  email: {
    icon: <MailIcon />,
    className:
      "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400",
  },
  message: {
    icon: <MessageSquareIcon />,
    className:
      "bg-violet-100 text-violet-600 dark:bg-violet-950 dark:text-violet-400",
  },
  view: {
    icon: <EyeIcon />,
    className:
      "bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400",
  },
  download: {
    icon: <DownloadIcon />,
    className:
      "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400",
  },
};

export function NotificationCard() {
  const unreadCount = NOTIFICATIONS.filter((n) => !n.read).length;

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
          <BellIcon className="size-4 text-muted-foreground" />
          <CardTitle className="text-sm font-medium">Notifikasi</CardTitle>
        </div>
        <CardAction>
          {unreadCount > 0 && (
            <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-[10px] px-1.5">
              {unreadCount} baru
            </Badge>
          )}
        </CardAction>
      </CardHeader>

      <CardContent className="pt-0 flex-1">
        <ScrollArea className="h-[280px] pr-2">
          <ul className="flex flex-col gap-1">
            {NOTIFICATIONS.map((notif) => {
              const config = NOTIF_CONFIG[notif.type];
              return (
                <li
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg p-2.5 transition-colors cursor-pointer",
                    "hover:bg-muted/60",
                    !notif.read && "bg-muted/40",
                  )}
                >
                  {/* Icon */}
                  <span
                    className={cn(
                      "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full [&>svg]:size-3.5",
                      config.className,
                    )}
                  >
                    {config.icon}
                  </span>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p
                        className={cn(
                          "text-sm leading-tight truncate",
                          !notif.read && "font-semibold",
                        )}
                      >
                        {notif.title}
                      </p>
                      {!notif.read && (
                        <span className="size-1.5 rounded-full bg-blue-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                      {notif.message}
                    </p>
                    <p className="text-[11px] text-muted-foreground/60 mt-0.5">
                      {notif.timestamp}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </ScrollArea>
      </CardContent>

      <CardFooter className="justify-center">
        <Button variant="ghost" size="sm" className="gap-1 text-xs w-full">
          Lihat Semua Notifikasi
          <ChevronRightIcon className="size-3" />
        </Button>
      </CardFooter>
    </Card>
  );
}
