import type {
  GenerateExperienceDescRequest,
  GenerateExperienceDescResponse,
} from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { aiDescriptionService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseGenerateExperienceDescriptionOptions {
  onSuccess?: (data: GenerateExperienceDescResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGenerateExperienceDescription = (
  options?: UseGenerateExperienceDescriptionOptions,
) => {
  return useMutation<
    GenerateExperienceDescResponse,
    ApiError,
    GenerateExperienceDescRequest
  >({
    mutationFn: (payload: GenerateExperienceDescRequest) =>
      aiDescriptionService.generateExperienceDescription(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
