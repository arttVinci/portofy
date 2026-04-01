import { useQuery } from "@tanstack/react-query";
import type { ProjectResponse } from "@/@types";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseProjectsOptions {
  enabled?: boolean;
  onSuccess?: (data: ProjectResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useProjects = (username: string, options?: UseProjectsOptions) => {
  return useQuery<ProjectResponse[], ApiError>({
    queryKey: ["projects", "public", username],
    queryFn: () => projectService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
