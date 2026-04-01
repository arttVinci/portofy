import { useQuery } from "@tanstack/react-query";
import type { SkillResponse } from "@/@types";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseSkillOptions {
  enabled?: boolean;
  onSuccess?: (data: SkillResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useSkill = (
  username: string,
  id: string,
  options?: UseSkillOptions,
) => {
  return useQuery<SkillResponse, ApiError>({
    queryKey: ["skills", "public", username, id],
    queryFn: () => skillService.getByUsername(username, id),
    enabled: !!username && !!id && options?.enabled !== false,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
