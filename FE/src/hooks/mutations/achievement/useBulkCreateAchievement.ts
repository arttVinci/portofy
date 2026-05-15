import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";
import type {
  BulkCreateAchievementRequest,
  AchievementResponse,
} from "@/@types";

interface UseBulkCreateAchievementOptions {
  onSuccess?: (data: AchievementResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useBulkCreateAchievement = (
  options?: UseBulkCreateAchievementOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    AchievementResponse[],
    ApiError,
    BulkCreateAchievementRequest
  >({
    mutationFn: (payload: BulkCreateAchievementRequest) =>
      achievementService.bulkCreate(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
