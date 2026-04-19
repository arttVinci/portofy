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
  Command,
} from "lucide-react";

function NewBadge() {
  return (
    <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-medium text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200">
      New
    </span>
  );
}

function ProBadge() {
  return (
    <span className="rounded-full bg-violet-100 px-1.5 py-0.5 text-[10px] font-medium text-violet-800 dark:bg-violet-900 dark:text-violet-200">
      Pro
    </span>
  );
}

function UnreadBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
      {count > 99 ? "99+" : count}
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
    badge: <NewBadge />,
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
      { title: "Testimonials", url: "/app/testimonials" },
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
      { title: "Talks & Speaking", url: "/app/talks" },
    ],
  },

  {
    title: "CV Builder",
    url: "/app/cv-builder",
    icon: <FileTextIcon />,
    group: "Features",
    badge: <ProBadge />,
  },
  {
    title: "Messages",
    url: "/app/messages",
    icon: <MessageSquareIcon />,
    group: "Features",
  },
  {
    title: "AI Assistant",
    url: "/app/ai-assistant",
    icon: <SparklesIcon />,
    group: "Features",
    badge: <NewBadge />,
  },

  {
    title: "Appearance",
    url: "/app/appearance",
    icon: <PaletteIcon />,
    group: "System",
  },
  {
    title: "Settings",
    url: "/app/settings",
    icon: <SettingsIcon />,
    group: "System",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const unreadMessages = 3;

  const items = NAV_ITEMS.map((item) =>
    item.url === "/dashboard/messages"
      ? { ...item, badge: <UnreadBadge count={unreadMessages} /> }
      : item,
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      {/* ── Header ─────────────────────────────── */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link className="flex items-center gap-3" to="/app">
                {/* <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src="/logo.png" alt="logo" />
                </div> */}
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
                    Pro
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
              <a href="" target="_blank" rel="noopener noreferrer">
                <ExternalLinkIcon />
                <span>Live Preview</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarSeparator />
        <NavUser />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
