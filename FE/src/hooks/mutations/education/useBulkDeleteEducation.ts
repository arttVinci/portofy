import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { BulkDeleteEducationRequest } from "@/@types";

interface UseBulkDeleteEducationOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useBulkDeleteEducation = (
  options?: UseBulkDeleteEducationOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, BulkDeleteEducationRequest>({
    mutationFn: (payload: BulkDeleteEducationRequest) =>
      educationService.bulkDelete(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
