import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteExperienceOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteExperience = (options?: UseDeleteExperienceOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => experienceService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
