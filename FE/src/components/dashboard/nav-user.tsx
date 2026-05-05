import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  ChevronsUpDownIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ProfileResponse, UserResponse } from "@/@types";
import { Skeleton } from "../ui/skeleton";

interface NavUserProps {
  user: UserResponse | null;
  profile: ProfileResponse | null;
  isLoading: boolean;
}

export function NavUser({ user, profile, isLoading }: NavUserProps) {
  const { isMobile } = useSidebar();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/auth/login", { replace: true });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {isLoading ? (
                <Skeleton className="h-8 w-8 rounded-lg" />
              ) : (
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={profile?.image_url ?? ""}
                    alt={user?.username ?? "User"}
                  />

                  <AvatarFallback className="rounded-lg">
                    {user?.username
                      ? user.username.charAt(0).toUpperCase()
                      : "U"}
                  </AvatarFallback>
                </Avatar>
              )}

              {isLoading ? (
                <div className="grid flex-1 text-left text-sm leading-tight gap-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-39" />
                </div>
              ) : (
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              )}

              <ChevronsUpDownIcon className="ml-auto size-4 shrink-0" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={profile?.image_url} alt={user?.username!} />
                  <AvatarFallback className="rounded-lg">
                    {user?.username?.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.username}</span>
                  <span className="truncate text-xs text-muted-foreground">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* {user.role === "free" && (
              <>
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => navigate("/dashboard/billing")}
                  >
                    <SparklesIcon />
                    Upgrade to Pro
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
              </>
            )} */}

            {/* Account actions */}
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate("/dashboard/settings")}>
                <BadgeCheckIcon />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/dashboard/billing")}>
                <CreditCardIcon />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigate("/dashboard/settings#notifications")}
              >
                <BellIcon />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={handleLogout}
              className="text-destructive focus:text-destructive"
            >
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
