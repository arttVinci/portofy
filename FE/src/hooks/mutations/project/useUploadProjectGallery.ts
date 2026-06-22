import { useMutation } from "@tanstack/react-query";
import projectService from "@/services/project.service";
import { ApiError } from "@/api/apiError";

interface UseUploadProjectGalleryOptions {
  onSuccess?: (imageUrls: string[]) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadProjectGallery = (
  options?: UseUploadProjectGalleryOptions,
) => {
  return useMutation<string[], ApiError, FormData>({
    mutationFn: (formData) => projectService.uploadGallery(formData),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
