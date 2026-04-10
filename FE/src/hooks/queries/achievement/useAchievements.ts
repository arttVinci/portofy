import { useQuery } from "@tanstack/react-query";
import type { AchievementResponse } from "@/@types";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAchievementsOptions {
  enabled?: boolean;
  onSuccess?: (data: AchievementResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAchievements = (
  username: string,
  options?: UseAchievementsOptions,
) => {
  return useQuery<AchievementResponse[], ApiError>({
    queryKey: ["achievements", "public", username],
    queryFn: () => achievementService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
