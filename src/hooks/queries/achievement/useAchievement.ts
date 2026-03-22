import { useQuery } from "@tanstack/react-query";
import type { AchievementResponse } from "@/@types";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAchievementOptions {
  enabled?: boolean;
  onSuccess?: (data: AchievementResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAchievement = (
  username: string,
  id: string,
  options?: UseAchievementOptions,
) => {
  return useQuery<AchievementResponse, ApiError>({
    queryKey: ["public-achievement", username, id],
    queryFn: () => achievementService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
