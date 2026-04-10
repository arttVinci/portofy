import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { UpdateSkillRequest, SkillResponse } from "@/@types";

interface UseUpdateSkillOptions {
  onSuccess?: (data: SkillResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateSkill = (options?: UseUpdateSkillOptions) => {
  const queryClient = useQueryClient();

  return useMutation<
    SkillResponse,
    ApiError,
    { id: string; payload: UpdateSkillRequest }
  >({
    mutationFn: ({ id, payload }) => skillService.update(id, payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
