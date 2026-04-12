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
import { Outlet, Navigate, Link } from "react-router-dom";
import { useBreadcrumbs } from "@/hooks/ui/useBreadcrumbs";
import { LoaderOne } from "@/components/ui/loader";

import { useCurrent } from "@/hooks/queries/user/useCurrent";

export default function DashboardLayout() {
  const breadcrumbs = useBreadcrumbs();
  const token = localStorage.getItem("authToken");

  const {
    data: currentUser,
    isLoading,
    isError,
  } = useCurrent({ enabled: !!token });

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (isLoading) {
    return (
      <div className="bg-slate-900 flex h-screen w-full items-center justify-center">
        <LoaderOne />
      </div>
    );
  }

  if (isError || !currentUser) {
    localStorage.removeItem("authToken");
    return <Navigate to="/auth/login" replace />;
  }

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
                              {!isLast && (
                                <BreadcrumbSeparator className="hidden md:block" />
                              )}
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
