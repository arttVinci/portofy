import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseDeleteProjectOptions {
  onSuccess?: () => void;
  onError?: (error: ApiError) => void;
}

export const useDeleteProject = (options?: UseDeleteProjectOptions) => {
  const queryClient = useQueryClient();

  return useMutation<void, ApiError, string>({
    mutationFn: (id) => projectService.delete(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      options?.onSuccess?.();
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
