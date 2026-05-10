import type {
  GenerateEducationDescRequest,
  GenerateEducationDescResponse,
} from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { aiDescriptionService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseGenerateEducationDescriptionOptions {
  onSuccess?: (data: GenerateEducationDescResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGenerateEducationDescription = (
  options?: UseGenerateEducationDescriptionOptions,
) => {
  return useMutation<
    GenerateEducationDescResponse,
    ApiError,
    GenerateEducationDescRequest
  >({
    mutationFn: (payload: GenerateEducationDescRequest) =>
      aiDescriptionService.generateEducationDescription(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
