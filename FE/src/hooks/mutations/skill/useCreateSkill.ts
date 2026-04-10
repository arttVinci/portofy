import { useMutation, useQueryClient } from "@tanstack/react-query";
import { skillService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateSkillRequest, SkillResponse } from "@/@types";

interface UseCreateSkillOptions {
  onSuccess?: (data: SkillResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateSkill = (options?: UseCreateSkillOptions) => {
  const queryClient = useQueryClient();

  return useMutation<SkillResponse, ApiError, CreateSkillRequest>({
    mutationFn: (payload) => skillService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
