import { useMutation } from "@tanstack/react-query";
import { uploadService, type UploadResponse } from "@/services/upload.service";
import { ApiError } from "@/api/apiError";

interface UseUploadImageOptions {
  onSuccess?: (data: UploadResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadImage = (options?: UseUploadImageOptions) => {
  return useMutation<UploadResponse, ApiError, FormData>({
    mutationFn: (payload: FormData) => uploadService.uploadImages(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
