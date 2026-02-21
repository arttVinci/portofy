import { useOutletContext } from "react-router-dom";
import type { AchievementViewProps } from "../../templates/subTemp/views/AchievementView";
import AchievementView from "../../templates/subTemp/views/AchievementView";
import type { ProfileItem } from "../../types/ui.types";

interface OutletContextData {
  achievementData: AchievementViewProps;
  themeData: ProfileItem;
}

export default function AchievementPage() {
  const { achievementData, themeData } = useOutletContext<OutletContextData>();

  const template = themeData?.theme || "default";

  if (template === "subTemp") {
    return <AchievementView {...achievementData} />;
  }

  return null;
}
