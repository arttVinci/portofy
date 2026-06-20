import { useMutation } from "@tanstack/react-query";
import educationService from "@/services/education.service";
import { ApiError } from "@/api/apiError";

interface UseUploadImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}



export const useUploadEducationImage = (options?: UseUploadImageOptions) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (formData) => educationService.uploadImage(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
