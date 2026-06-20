import { useMutation } from "@tanstack/react-query";
import experienceService from "@/services/experience.service";
import { ApiError } from "@/api/apiError";

interface UseUploadImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}



export const useUploadExperienceImage = (options?: UseUploadImageOptions) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (formData) => experienceService.uploadImage(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
