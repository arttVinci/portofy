import { useQuery } from "@tanstack/react-query";
import type { ProjectResponse } from "@/@types";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseProjectOptions {
  enabled?: boolean;
  onSuccess?: (data: ProjectResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useProject = (
  username: string,
  id: string,
  options?: UseProjectOptions,
) => {
  return useQuery<ProjectResponse, ApiError>({
    queryKey: ["public-project", username, id],
    queryFn: () => projectService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
