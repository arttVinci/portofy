import { useMutation } from "@tanstack/react-query";
import type { SendOtpRequest } from "@/@types/entities/auth.types";
import { ApiError } from "@/api/apiError";
import authService from "@/services/auth.service";

interface UseSendOtpOptions {
  onSuccess?: (data: boolean) => void;
  onError?: (error: ApiError) => void;
}

export const useSendOtp = (options?: UseSendOtpOptions) => {
  return useMutation<any, ApiError, SendOtpRequest>({
    mutationFn: (payload: SendOtpRequest) => authService.sendOtp(payload),

    onSuccess: (data) => {
      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
