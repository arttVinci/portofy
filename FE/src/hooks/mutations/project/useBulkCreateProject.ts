import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";
import type {
  BulkCreateProjectRequest,
  ProjectResponse,
} from "@/@types";

interface UseBulkCreateProjectOptions {
  onSuccess?: (data: ProjectResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useBulkCreateProject = (
  options?: UseBulkCreateProjectOptions,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    ProjectResponse[],
    ApiError,
    BulkCreateProjectRequest
  >({
    mutationFn: (payload: BulkCreateProjectRequest) =>
      projectService.bulkCreate(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
