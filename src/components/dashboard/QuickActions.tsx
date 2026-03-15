import { Link } from "react-router-dom";
import {
  UserIcon,
  RocketIcon,
  BriefcaseIcon,
  PaletteIcon,
  FileTextIcon,
  SparklesIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Action {
  label: string;
  description: string;
  url: string;
  icon: React.ReactNode;
}

const ACTIONS: Action[] = [
  {
    label: "Edit Profile",
    description: "Nama, bio, foto",
    url: "/dashboard/profile",
    icon: <UserIcon />,
  },
  {
    label: "Tambah Project",
    description: "Showcase karya",
    url: "/dashboard/projects",
    icon: <RocketIcon />,
  },
  {
    label: "Update Experience",
    description: "Riwayat kerja",
    url: "/dashboard/experience",
    icon: <BriefcaseIcon />,
  },
  {
    label: "Ganti Tema",
    description: "Tampilan portofolio",
    url: "/dashboard/appearance",
    icon: <PaletteIcon />,
  },
  {
    label: "Buat CV",
    description: "Generate PDF",
    url: "/dashboard/cv-builder",
    icon: <FileTextIcon />,
  },
  {
    label: "AI Assistant",
    description: "Auto-fill dari CV",
    url: "/dashboard/ai-assistant",
    icon: <SparklesIcon />,
  },
];

export function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {ACTIONS.map((action) => (
            <Link
              key={action.label}
              to={action.url}
              className={cn(
                "flex flex-col gap-2.5 rounded-lg border bg-muted/30 p-3.5",
                "transition-colors hover:bg-muted/60 hover:border-border/80",
                "group",
              )}
            >
              <span className="text-muted-foreground group-hover:text-foreground transition-colors [&>svg]:size-4">
                {action.icon}
              </span>
              <div>
                <p className="text-xs font-medium leading-tight">
                  {action.label}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5 leading-tight">
                  {action.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
