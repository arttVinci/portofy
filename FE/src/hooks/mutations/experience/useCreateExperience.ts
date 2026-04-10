import { useMutation, useQueryClient } from "@tanstack/react-query";
import { experienceService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateExperienceRequest, ExperienceResponse } from "@/@types";

interface UseCreateExperienceOptions {
  onSuccess?: (data: ExperienceResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateExperience = (options?: UseCreateExperienceOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ExperienceResponse, ApiError, CreateExperienceRequest>({
    mutationFn: (payload) => experienceService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
