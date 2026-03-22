import { useQuery } from "@tanstack/react-query";
import type { ExperienceResponse } from "@/@types";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseExperiencesOptions {
  enabled?: boolean;
  onSuccess?: (data: ExperienceResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useExperiences = (
  username: string,
  options?: UseExperiencesOptions,
) => {
  return useQuery<ExperienceResponse[], ApiError>({
    queryKey: ["public-experiences", username],
    queryFn: () => experienceService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
