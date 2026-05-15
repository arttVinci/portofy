import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { BulkDeleteAchievementRequest } from "@/@types";

interface UseBulkDeleteAchievementOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useBulkDeleteAchievement = (
  options?: UseBulkDeleteAchievementOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, BulkDeleteAchievementRequest>({
    mutationFn: (payload: BulkDeleteAchievementRequest) =>
      achievementService.bulkDelete(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
