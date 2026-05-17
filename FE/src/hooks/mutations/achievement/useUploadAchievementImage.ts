import { useMutation } from "@tanstack/react-query";
import achievementService from "@/services/achievement.service";
import { ApiError } from "@/api/apiError";

interface UseUploadAchievementImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

interface UploadAchievementImageVariables {
  id: string;
  payload: FormData;
}

export const useUploadAchievementImage = (options?: UseUploadAchievementImageOptions) => {
  return useMutation<string, ApiError, UploadAchievementImageVariables>({
    mutationFn: ({ id, payload }) => achievementService.uploadImage(id, payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
