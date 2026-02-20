import { useOutletContext } from "react-router-dom";
import HomeView from "../../templates/subTemp/views/HomeView";
import type { HomeViewProps } from "../../templates/subTemp/views/HomeView";

export default function HomePage() {
  const contextData = useOutletContext<HomeViewProps>();

  const template = contextData?.profile.theme || "default";

  if (template === "subTemp") {
    return <HomeView {...contextData} />;
  }

  return null;
}
