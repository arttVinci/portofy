import { useQuery } from "@tanstack/react-query";
import type { ExperienceResponse } from "@/@types";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminExperiencesOptions {
  enabled?: boolean;
  onSuccess?: (data: ExperienceResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminExperiences = (options?: UseAdminExperiencesOptions) => {
  return useQuery<ExperienceResponse[], ApiError>({
    queryKey: ["experiences", "admin"],
    queryFn: () => experienceService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
