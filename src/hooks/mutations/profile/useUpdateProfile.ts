import { useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../../../services/profile.service";
import { ApiError } from "../../../api/apiError";
import type {
  UpdateProfileRequest,
  ProfileResponse,
} from "../../../@types/entities/profile";
interface UseUpdateProfileOptions {
  onSuccess?: (data: ProfileResponse) => void;
  onError?: (error: ApiError) => void;
}

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  const queryClient = useQueryClient();
  return useMutation<ProfileResponse, ApiError, UpdateProfileRequest>({
    mutationFn: (payload) => profileService.updateProfile(payload),
    onSuccess: (data) => {
      queryClient.setQueryData(["user-profile"], data);

      options?.onSuccess?.(data);
    },
    onError: (error) => {
      options?.onError?.(error);
    },
  });
};
