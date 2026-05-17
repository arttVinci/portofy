import { useMutation } from "@tanstack/react-query";
import educationService from "@/services/education.service";
import { ApiError } from "@/api/apiError";

interface UseUploadEducationImageOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

interface UploadEducationImageVariables {
  id: string;
  payload: FormData;
}

export const useUploadEducationImage = (options?: UseUploadEducationImageOptions) => {
  return useMutation<string, ApiError, UploadEducationImageVariables>({
    mutationFn: ({ id, payload }) => educationService.uploadImage(id, payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
