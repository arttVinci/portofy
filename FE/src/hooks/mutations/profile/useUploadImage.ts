import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { ImageProfileResponse } from "@/@types";

interface UseUploadImageOptions {
  onSuccess?: (data: ImageProfileResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUploadImage = (options?: UseUploadImageOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ImageProfileResponse, ApiError, FormData>({
    mutationFn: (payload: FormData) =>
      profileService.handleImageProfile(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user-profile"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
