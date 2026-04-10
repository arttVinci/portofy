import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateSocialRequest, SocialResponse } from "@/@types";

interface UseUpdateSocialOptions {
  onSuccess?: (data: SocialResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateSocial = (options?: UseUpdateSocialOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    SocialResponse,
    ApiError,
    { id: string; payload: UpdateSocialRequest }
  >({
    mutationFn: ({ id, payload }) => socialService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
