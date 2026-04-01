import { useQuery } from "@tanstack/react-query";
import type { ExperienceResponse } from "@/@types";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseExperienceOptions {
  enabled?: boolean;
  onSuccess?: (data: ExperienceResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useExperience = (
  username: string,
  id: string,
  options?: UseExperienceOptions,
) => {
  return useQuery<ExperienceResponse, ApiError>({
    queryKey: ["experiences", "public", username, id],
    queryFn: () => experienceService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
