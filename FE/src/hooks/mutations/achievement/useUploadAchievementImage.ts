import { useMutation } from "@tanstack/react-query";
import achievementService from "@/services/achievement.service";
import { ApiError } from "@/api/apiError";

interface UseUploadImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadAchievementImage = (options?: UseUploadImageOptions) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (formData) => achievementService.uploadImage(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
