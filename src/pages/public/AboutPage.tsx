import { useOutletContext } from "react-router-dom";
import AboutView from "../../templates/subTemp/views/AboutView";
import type { AboutItem } from "../../types/ui.types";

export default function AboutPage() {
  const contextData = useOutletContext<AboutItem>();

  const template = contextData?.profile.theme || "default";

  if (template === "subTemp") {
    return <AboutView {...contextData} />;
  }

  return null;
}
