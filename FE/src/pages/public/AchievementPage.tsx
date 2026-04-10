import { useOutletContext } from "react-router-dom";
import type { AchievementViewProps } from "../../templates/subTemp/views/AchievementView";
import AchievementView from "../../templates/subTemp/views/AchievementView";

export default function AchievementPage() {
  const contextData = useOutletContext<AchievementViewProps>();

  const template = contextData?.profile?.theme || "default";

  if (template === "subTemp") {
    return <AchievementView {...contextData} />;
  }

  return null;
}
