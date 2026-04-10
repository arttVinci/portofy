import { useLocation } from "react-router-dom";

interface Breadcrumb {
  label: string;
  href: string;
}

const ROUTE_LABELS: Record<string, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  profile: "Profile",
  social: "Social Media",
  projects: "Projects",
  achievements: "Achievements",
  testimonials: "Testimonials",
  experience: "Experience",
  education: "Education",
  skills: "Skills",
  talks: "Talks & Speaking",
  "cv-builder": "CV Builder",
  messages: "Messages",
  "ai-assistant": "AI Assistant",
  appearance: "Appearance",
  settings: "Settings",
};

export function useBreadcrumbs(): Breadcrumb[] {
  const { pathname } = useLocation();

  return pathname
    .split("/")
    .filter(Boolean)
    .map((seg, i, arr) => ({
      label: ROUTE_LABELS[seg] ?? seg,
      href: "/" + arr.slice(0, i + 1).join("/"),
    }));
}
