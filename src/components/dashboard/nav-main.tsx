import * as React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ChevronRightIcon } from "lucide-react";

export type NavSubItem = {
  title: string;
  url: string;
};

export type NavItem = {
  title: string;
  url: string;
  icon?: React.ReactNode;
  group: string;
  badge?: React.ReactNode;
  children?: NavSubItem[];
};

const GROUP_ORDER = ["Overview", "Content", "Features", "System"] as const;

const GROUP_LABELS: Record<string, string> = {
  Overview: "Overview",
  Content: "Content",
  Features: "Features",
  System: "System",
};

export function NavMain({ items }: { items: NavItem[] }) {
  const { pathname } = useLocation();

  const grouped = GROUP_ORDER.reduce<Record<string, NavItem[]>>((acc, g) => {
    acc[g] = items.filter((item) => item.group === g);
    return acc;
  }, {});

  return (
    <>
      {GROUP_ORDER.map((groupKey) => {
        const groupItems = grouped[groupKey];
        if (!groupItems?.length) return null;

        return (
          <SidebarGroup key={groupKey}>
            <SidebarGroupLabel>{GROUP_LABELS[groupKey]}</SidebarGroupLabel>
            <SidebarMenu>
              {groupItems.map((item) => {
                const hasChildren = !!item.children?.length;

                const isActive = hasChildren
                  ? item.children!.some((c) => pathname.startsWith(c.url))
                  : pathname === item.url;

                if (hasChildren) {
                  return (
                    <Collapsible
                      key={item.title}
                      asChild
                      defaultOpen={isActive}
                      className="group/collapsible"
                    >
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            tooltip={item.title}
                            isActive={isActive}
                          >
                            {item.icon}
                            <span>{item.title}</span>
                            {item.badge && (
                              <span className="ml-auto">{item.badge}</span>
                            )}
                            <ChevronRightIcon className="ml-auto size-3.5 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children!.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <SidebarMenuSubButton
                                  asChild
                                  isActive={pathname === child.url}
                                >
                                  <Link to={child.url}>{child.title}</Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={isActive}
                    >
                      <Link to={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                        {item.badge && (
                          <span className="ml-auto">{item.badge}</span>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        );
      })}
    </>
  );
}
