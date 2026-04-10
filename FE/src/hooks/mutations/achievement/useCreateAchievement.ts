import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateAchievementRequest, AchievementResponse } from "@/@types";

interface UseCreateAchievementOptions {
  onSuccess?: (data: AchievementResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateAchievement = (options?: UseCreateAchievementOptions) => {
  const queryClient = useQueryClient();

  return useMutation<AchievementResponse, ApiError, CreateAchievementRequest>({
    mutationFn: (payload: CreateAchievementRequest) =>
      achievementService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
