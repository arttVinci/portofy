import { useOutletContext } from "react-router-dom";
import AboutView from "../../templates/subTemp/views/AboutView";
import type { AboutViewProps } from "../../templates/subTemp/views/AboutView";

export default function AboutPage() {
  const contextData = useOutletContext<AboutViewProps>();

  const template = contextData?.profile?.theme || "default";

  if (template === "subTemp") {
    return <AboutView {...contextData} />;
  }

  return null;
}
