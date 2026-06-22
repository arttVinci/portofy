import { useMutation } from "@tanstack/react-query";
import projectService from "@/services/project.service";
import { ApiError } from "@/api/apiError";

interface UseUploadProjectThumbnailOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadProjectThumbnail = (
  options?: UseUploadProjectThumbnailOptions,
) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (formData) => projectService.uploadThumbnail(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
