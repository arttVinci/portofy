import { useQuery } from "@tanstack/react-query";
import type { EducationResponse } from "@/@types";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminEducationOptions {
  enabled?: boolean;
  onSuccess?: (data: EducationResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminEducation = (
  id: string,
  options?: UseAdminEducationOptions,
) => {
  return useQuery<EducationResponse, ApiError>({
    queryKey: ["educations", "admin", id],
    queryFn: () => educationService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
