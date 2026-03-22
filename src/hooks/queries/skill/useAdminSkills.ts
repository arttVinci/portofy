import { useQuery } from "@tanstack/react-query";
import type { SkillResponse } from "@/@types";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminSkillsOptions {
  enabled?: boolean;
  onSuccess?: (data: SkillResponse[]) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminSkills = (options?: UseAdminSkillsOptions) => {
  return useQuery<SkillResponse[], ApiError>({
    queryKey: ["admin-skills"],
    queryFn: () => skillService.getAll(),
    enabled: options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
