import { useQuery } from "@tanstack/react-query";
import type { SkillResponse } from "@/@types";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseSkillsOptions {
  enabled?: boolean;
  onSuccess?: (data: SkillResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useSkills = (username: string, options?: UseSkillsOptions) => {
  return useQuery<SkillResponse[], ApiError>({
    queryKey: ["skills", "public", username],
    queryFn: () => skillService.getAllByUsername(username),
    enabled: !!username && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
