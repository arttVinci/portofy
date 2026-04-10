import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateSocialRequest, SocialResponse } from "@/@types";

interface UseCreateSocialOptions {
  onSuccess?: (data: SocialResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateSocial = (options?: UseCreateSocialOptions) => {
  const queryClient = useQueryClient();

  return useMutation<SocialResponse, ApiError, CreateSocialRequest>({
    mutationFn: (payload) => socialService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
