import { useMutation } from "@tanstack/react-query";
import projectService from "@/services/project.service";
import { ApiError } from "@/api/apiError";

interface UseUploadProjectThumbnailOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

interface UploadProjectThumbnailVariables {
  id: string;
  payload: FormData;
}

export const useUploadProjectThumbnail = (options?: UseUploadProjectThumbnailOptions) => {
  return useMutation<string, ApiError, UploadProjectThumbnailVariables>({
    mutationFn: ({ id, payload }) => projectService.uploadThumbnail(id, payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
