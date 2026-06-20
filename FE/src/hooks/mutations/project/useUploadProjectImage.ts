import { useMutation } from "@tanstack/react-query";
import projectService from "@/services/project.service";
import { ApiError } from "@/api/apiError";

interface UseUploadImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadProjectImage = (options?: UseUploadImageOptions) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (formData) => projectService.uploadImage(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
