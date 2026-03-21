import { useMutation, useQueryClient } from "@tanstack/react-query";
import { achievementService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteAchievementOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteAchievement = (options?: UseDeleteAchievementOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id: string) => achievementService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["achievements"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
