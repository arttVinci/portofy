import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/ui/mode-toggle";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/utils/theme-provider";
import { useEffect } from "react";
import { Outlet, useNavigate, Navigate, Link } from "react-router-dom";
import { useBreadcrumbs } from "@/hooks/ui/useBreadcrumbs";

export default function DashboardLayout() {
  const breadcrumbs = useBreadcrumbs();
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  useEffect(() => {
    const checkAuth = async () => {
      try {
      } catch (err) {
        navigate("/auth/login", { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);
  return (
    <ThemeProvider>
      <TooltipProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="data-[orientation=vertical]:h-4"
                />

                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((crumb, i) => {
                      const isLast = i === breadcrumbs.length - 1;
                      return (
                        <BreadcrumbItem key={crumb.href}>
                          {isLast ? (
                            <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                          ) : (
                            <>
                              <BreadcrumbLink
                                asChild
                                className="hidden md:block"
                              >
                                <Link to={crumb.href}>{crumb.label}</Link>
                              </BreadcrumbLink>
                              <BreadcrumbSeparator className="hidden md:block" />
                            </>
                          )}
                        </BreadcrumbItem>
                      );
                    })}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Right: theme toggle */}
              <ThemeToggle />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-5">
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
}
