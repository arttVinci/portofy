import { useMutation } from "@tanstack/react-query";
import profileService from "@/services/profile.service";
import { ApiError } from "@/api/apiError";

interface UseUploadAvatarOptions {
  onSuccess?: (imageUrl: string) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadAvatar = (options?: UseUploadAvatarOptions) => {
  return useMutation<string, ApiError, FormData>({
    mutationFn: (payload: FormData) => profileService.uploadAvatar(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
