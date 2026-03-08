import { useState } from "react";
import type {
  CreateProfileRequest,
  ProfileResponse,
} from "../../types/entities/profile";
import { createProfile } from "../../services/profile.service";

export const useCreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfileData = async (
    data: CreateProfileRequest,
  ): Promise<ProfileResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createProfile(data);
      console.log("Succes Create Profile :", result.data);
      return result.data;
    } catch (err: any) {
      setError("Failed create profile :" + (err.message || "Unknown error"));
      throw null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProfileData,
    isLoading,
    error,
  };
};
