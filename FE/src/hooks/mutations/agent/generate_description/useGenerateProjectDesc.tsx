import type {
  GenerateProjectDescRequest,
  GenerateProjectDescResponse,
} from "@/@types";
import { useMutation } from "@tanstack/react-query";
import { aiDescriptionService } from "@/services";
import { ApiError } from "@/api/apiError";

interface UseGenerateProjectDescOptions {
  onSuccess?: (data: GenerateProjectDescResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useGenerateProjectDescription = (
  options?: UseGenerateProjectDescOptions,
) => {
  return useMutation<
    GenerateProjectDescResponse,
    ApiError,
    GenerateProjectDescRequest
  >({
    mutationFn: (payload: GenerateProjectDescRequest) =>
      aiDescriptionService.generateProjectDescription(payload),
    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
