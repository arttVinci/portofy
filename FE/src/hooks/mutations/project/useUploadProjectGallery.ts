import { useMutation } from "@tanstack/react-query";
import projectService from "@/services/project.service";
import { ApiError } from "@/api/apiError";

interface UseUploadProjectGalleryOptions {
  onSuccess?: (imageUrls: string[]) => void;
  onError?: (error: ApiError) => void;
}

interface UploadProjectGalleryVariables {
  id: string;
  payload: FormData;
}

export const useUploadProjectGallery = (options?: UseUploadProjectGalleryOptions) => {
  return useMutation<string[], ApiError, UploadProjectGalleryVariables>({
    mutationFn: ({ id, payload }) => projectService.uploadGallery(id, payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
