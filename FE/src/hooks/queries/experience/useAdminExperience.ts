import { useQuery } from "@tanstack/react-query";
import type { ExperienceResponse } from "@/@types";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminExperienceOptions {
  enabled?: boolean;
  onSuccess?: (data: ExperienceResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminExperience = (
  id: string,
  options?: UseAdminExperienceOptions,
) => {
  return useQuery<ExperienceResponse, ApiError>({
    queryKey: ["experiences", "admin", id],
    queryFn: () => experienceService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
