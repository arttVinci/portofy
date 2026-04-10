import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateAchievementRequest, AchievementResponse } from "@/@types";

interface UseUpdateAchievementOptions {
  onSuccess?: (data: AchievementResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateAchievement = (options?: UseUpdateAchievementOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    AchievementResponse,
    ApiError,
    { id: string; payload: UpdateAchievementRequest }
  >({
    mutationFn: ({ id, payload }) => achievementService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
