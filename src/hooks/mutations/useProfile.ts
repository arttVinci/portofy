import { useState, useCallback } from "react";
import type {
  CreateProfileRequest,
  ImageProfileResponse,
  ProfileResponse,
} from "../../@types/entities/profile";
import profileService from "../../services/profile.service";
import { ApiError } from "../../api/apiError";

interface UseProfileReturn {
  createProfile: (
    payload: CreateProfileRequest,
  ) => Promise<ProfileResponse | null>;
  handleImageProfile: (
    payload: FormData,
  ) => Promise<ImageProfileResponse | null>;
  loading: boolean;
  error: string | null;
  validationErrors: Record<string, string[]> | null;
  clearError: () => void;
}

export const useProfile = (): UseProfileReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  const clearError = useCallback(() => {
    setError(null);
    setValidationErrors(null);
  }, []);

  const createProfile = useCallback(
    async (payload: CreateProfileRequest): Promise<ProfileResponse | null> => {
      try {
        const result = await profileService.createProfile(payload);

        return result;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            setValidationErrors(err.errors);
          }
        } else {
          setError("An unexpected error occurred");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [clearError],
  );

  const handleImageProfile = useCallback(
    async (payload: FormData): Promise<ImageProfileResponse | null> => {
      try {
        const result = await profileService.handleImageProfile(payload);

        return result;
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
          if (err.errors) {
            setValidationErrors(err.errors);
          }
        } else {
          setError("An unexpected error occurred");
        }
        return null;
      } finally {
        setLoading(false);
      }
    },
    [clearError],
  );

  return {
    createProfile,
    handleImageProfile,
    loading,
    error,
    validationErrors,
    clearError,
  };
};
