import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { AchievementResponse } from "@/@types";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { ApiResponse, SearchParams } from "@/@types/base/api.types";

interface UseAdminAchievementsOptions extends SearchParams {
  enabled?: boolean;
  onSuccess?: (data: AchievementResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminAchievements = ({
  page = 1,
  size = 10,
  title = "",
}: UseAdminAchievementsOptions) => {
  return useQuery<ApiResponse<AchievementResponse[]>, ApiError>({
    queryKey: ["achievements", "admin", { page, size, title }],
    queryFn: () => achievementService.search({ page, size, title }),
    staleTime: 5 * 60 * 1000,
    retry: 1,

    placeholderData: keepPreviousData,
  });
};
