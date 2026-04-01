import { useQuery } from "@tanstack/react-query";
import type { EducationResponse } from "@/@types";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminEducationsOptions {
  enabled?: boolean;
  onSuccess?: (data: EducationResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminEducations = (options?: UseAdminEducationsOptions) => {
  return useQuery<EducationResponse[], ApiError>({
    queryKey: ["educations", "admin"],
    queryFn: () => educationService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
