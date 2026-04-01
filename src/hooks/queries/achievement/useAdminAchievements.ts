import { useQuery } from "@tanstack/react-query";
import type { AchievementResponse } from "@/@types";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminAchievementsOptions {
  enabled?: boolean;
  onSuccess?: (data: AchievementResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminAchievements = (options?: UseAdminAchievementsOptions) => {
  return useQuery<AchievementResponse[], ApiError>({
    queryKey: ["achievements", "admin"],
    queryFn: () => achievementService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
