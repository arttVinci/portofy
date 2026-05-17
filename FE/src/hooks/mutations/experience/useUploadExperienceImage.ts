import { useMutation } from "@tanstack/react-query";
import experienceService from "@/services/experience.service";
import { ApiError } from "@/api/apiError";

interface UseUploadExperienceImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

interface UploadExperienceImageVariables {
  id: string;
  payload: FormData;
}

export const useUploadExperienceImage = (options?: UseUploadExperienceImageOptions) => {
  return useMutation<string, ApiError, UploadExperienceImageVariables>({
    mutationFn: ({ id, payload }) => experienceService.uploadImage(id, payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
