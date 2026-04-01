import { useQuery } from "@tanstack/react-query";
import type { ProjectResponse } from "@/@types";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminProjectsOptions {
  enabled?: boolean;
  onSuccess?: (data: ProjectResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminProjects = (options?: UseAdminProjectsOptions) => {
  return useQuery<ProjectResponse[], ApiError>({
    queryKey: ["projects", "admin"],
    queryFn: () => projectService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
