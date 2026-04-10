import { useMutation, useQueryClient } from "@tanstack/react-query";
import { educationService } from "@/services";
import { ApiError } from "@/api/apiError";
import type { CreateEducationRequest, EducationResponse } from "@/@types";

interface UseCreateEducationOptions {
  onSuccess?: (data: EducationResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateEducation = (options?: UseCreateEducationOptions) => {
  const queryClient = useQueryClient();

  return useMutation<EducationResponse, ApiError, CreateEducationRequest>({
    mutationFn: (payload) => educationService.create(payload),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["educations"] });
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
