import { useQuery } from "@tanstack/react-query";
import type { ProjectResponse } from "@/@types";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminProjectOptions {
  enabled?: boolean;
  onSuccess?: (data: ProjectResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminProject = (
  id: string,
  options?: UseAdminProjectOptions,
) => {
  return useQuery<ProjectResponse, ApiError>({
    queryKey: ["admin-project", id],
    queryFn: () => projectService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
