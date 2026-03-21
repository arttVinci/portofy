import { useMutation, useQueryClient } from "@tanstack/react-query";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateProjectRequest, ProjectResponse } from "@/@types";

interface UseCreateProjectOptions {
  onSuccess?: (data: ProjectResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateProject = (options?: UseCreateProjectOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ProjectResponse, ApiError, CreateProjectRequest>({
    mutationFn: (payload) => projectService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
