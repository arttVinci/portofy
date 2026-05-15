import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { BulkDeleteExperienceRequest } from "@/@types";

interface UseBulkDeleteExperienceOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useBulkDeleteExperience = (
  options?: UseBulkDeleteExperienceOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, BulkDeleteExperienceRequest>({
    mutationFn: (payload: BulkDeleteExperienceRequest) =>
      experienceService.bulkDelete(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
