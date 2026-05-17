import * as React from "react";
import { Link } from "react-router-dom";
import { NavMain, type NavItem } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  LayoutDashboardIcon,
  BarChart2Icon,
  UserIcon,
  RocketIcon,
  BriefcaseIcon,
  FileTextIcon,
  MessageSquareIcon,
  SparklesIcon,
  PaletteIcon,
  SettingsIcon,
  ExternalLinkIcon,
} from "lucide-react";

import { useCurrent } from "@/hooks/queries";
import { useGetProfile } from "@/hooks/queries";

function UngoingBadge() {
  return (
    <span className="rounded-full bg-blue-900 px-1.5 py-0.5 text-[10px] font-medium text-blue-300 dark:bg-blue-900 dark:text-blue-300">
      Ungoing
    </span>
  );
}

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    url: "/app",
    icon: <LayoutDashboardIcon />,
    group: "Overview",
  },
  {
    title: "Analytics",
    url: "/app/analytics",
    icon: <BarChart2Icon />,
    group: "Overview",
    badge: <UngoingBadge />,
    disabled: true,
  },

  {
    title: "Profile",
    url: "/app/profile",
    icon: <UserIcon />,
    group: "Content",
  },
  {
    title: "Portfolio",
    url: "/app/portfolio",
    icon: <RocketIcon />,
    group: "Content",
    children: [
      { title: "Projects", url: "/app/projects" },
      { title: "Achievements", url: "/app/achievements" },
    ],
  },
  {
    title: "Background",
    url: "/app/background",
    icon: <BriefcaseIcon />,
    group: "Content",
    children: [
      { title: "Experience", url: "/app/experience" },
      { title: "Education", url: "/app/education" },
      { title: "Skills", url: "/app/skills" },
    ],
  },

  {
    title: "CV Parser",
    url: "/app/cv-parser",
    icon: <FileTextIcon />,
    group: "Features",
  },
  {
    title: "Messages",
    url: "/app/messages",
    icon: <MessageSquareIcon />,
    group: "Features",
    badge: <UngoingBadge />,
    disabled: true,
  },
  {
    title: "AI Assistant",
    url: "/app/ai-assistant",
    icon: <SparklesIcon />,
    group: "Features",
    badge: <UngoingBadge />,
    disabled: true,
  },

  {
    title: "Appearance",
    url: "/app/appearance",
    icon: <PaletteIcon />,
    group: "System",
    badge: <UngoingBadge />,
    disabled: true,
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: <SettingsIcon />,
    group: "System",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const items = NAV_ITEMS.map((item) =>
    item.url === "/app/messages" || item.url === "/dashboard/messages"
      ? { ...item, badge: <UngoingBadge />, disabled: true }
      : item,
  );

  const { data: profile, isLoading: profileLoading } = useGetProfile();
  const { data: currentUser, isLoading: currentUserLoading } = useCurrent({
    enabled: true,
  });

  const isLoading = profileLoading || currentUserLoading;

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Header ─────────────────────────────── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link className="flex items-center gap-3" to="/app">
                <img
                  src="/images/portofLogo.png"
                  alt="Portofy logo"
                  className="flex w-[34px] h-[34px] object-contain rounded-full shadow-[0_0_10px_rgba(255,255,255,0.2)] shrink-0"
                  onError={(e) => {
                    // Fallback if image not found
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextElementSibling?.classList.remove(
                      "hidden",
                    );
                  }}
                />
                <div className="grid flex-1 text-left text-base leading-tight">
                  <span className="truncate font-medium">Portofy</span>
                  <span className="truncate text-xs text-muted-foreground">
                    Tahap Uji Coba
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={items} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Live Preview">
              <a
                href={`https://portofy.net/${currentUser?.username ?? ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLinkIcon />
                <span>Live Preview</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <NavUser
          user={currentUser ?? null}
          profile={profile ?? null}
          isLoading={isLoading}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
