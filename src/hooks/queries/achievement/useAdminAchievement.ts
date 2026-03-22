import { useQuery } from "@tanstack/react-query";
import type { AchievementResponse } from "@/@types";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminAchievementOptions {
  enabled?: boolean;
  onSuccess?: (data: AchievementResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminAchievement = (
  id: string,
  options?: UseAdminAchievementOptions,
) => {
  return useQuery<AchievementResponse, ApiError>({
    queryKey: ["admin-achievement", id],
    queryFn: () => achievementService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
