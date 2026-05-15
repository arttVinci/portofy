import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { BulkDeleteProjectRequest } from "@/@types";

interface UseBulkDeleteProjectOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useBulkDeleteProject = (
  options?: UseBulkDeleteProjectOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, BulkDeleteProjectRequest>({
    mutationFn: (payload: BulkDeleteProjectRequest) =>
      projectService.bulkDelete(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
