import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { ProjectResponse } from "@/@types";
import { projectService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { ApiResponse, SearchParams } from "@/@types/base/api.types";

interface UseAdminProjectsOptions extends SearchParams {
  enabled?: boolean;
  onSuccess?: (data: ProjectResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminProjects = ({
  page = 1,
  size = 10,
  title = "",
}: UseAdminProjectsOptions) => {
  return useQuery<ApiResponse<ProjectResponse[]>, ApiError>({
    queryKey: ["projects", "admin", { page, size, title }],
    queryFn: () => projectService.search({ page, size, title }),
    staleTime: 5 * 60 * 1000,
    retry: 1,

    placeholderData: keepPreviousData,
  });
};
