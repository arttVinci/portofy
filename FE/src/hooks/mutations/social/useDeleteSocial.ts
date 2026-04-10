import { useMutation, useQueryClient } from "@tanstack/react-query";
import { socialService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteSocialOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteSocial = (options?: UseDeleteSocialOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => socialService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["socials"] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
