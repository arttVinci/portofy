import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../../../services/profile.service";
import { ApiError } from "../../../api/apiError";
import type {
  CreateProfileRequest,
  ProfileResponse,
} from "../../../@types/entities/profile";

interface UseCreateProfileOptions {
  onSuccess?: (data: ProfileResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useCreateProfile = (options?: UseCreateProfileOptions) => {
  const queryClient = useQueryClient();

  return useMutation<ProfileResponse, ApiError, CreateProfileRequest>({
    mutationFn: (payload: CreateProfileRequest) =>
      profileService.createProfile(payload),

    onSuccess: (data) => {
      queryClient.setQueryData(["user-profile"], data);

      options?.onSuccess?.(data);
    },

    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
