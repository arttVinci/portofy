import { useQuery } from "@tanstack/react-query";
import type { SkillResponse } from "@/@types";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseAdminSkillOptions {
  enabled?: boolean;
  onSuccess?: (data: SkillResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useAdminSkill = (id: string, options?: UseAdminSkillOptions) => {
  return useQuery<SkillResponse, ApiError>({
    queryKey: ["admin-skill", id],
    queryFn: () => skillService.getById(id),
    enabled: !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
