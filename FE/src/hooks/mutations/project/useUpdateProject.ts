import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateProjectRequest, ProjectResponse } from "@/@types";

interface UseUpdateProjectOptions {
  onSuccess?: (data: ProjectResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateProject = (options?: UseUpdateProjectOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    ProjectResponse,
    ApiError,
    { id: string; payload: UpdateProjectRequest }
  >({
    mutationFn: ({ id, payload }) => projectService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
