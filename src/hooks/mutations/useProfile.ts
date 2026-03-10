import { useState } from "react";
import type {
  CreateProfileRequest,
  ImageProfileResponse,
  ProfileResponse,
} from "../../types/entities/profile";
import {
  createProfile,
  handleImageProfile,
} from "../../services/profile.service";

export const useCreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfileData = async (
    data: CreateProfileRequest,
    token: string,
  ): Promise<ProfileResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await createProfile(data, token);
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

export const useHandleImageProfile = () => {
  const [error, setError] = useState<string | null>(null);

  const imageProfile = async (
    data: FormData,
    token: string,
  ): Promise<ImageProfileResponse> => {
    try {
      const result = await handleImageProfile(data, token);

      console.log("Succes create image :", result.data);
      return result.data;
    } catch (err: any) {
      setError("Failed create profile :" + (err.message || "Unknown error"));
      throw null;
    }
  };
  return {
    imageProfile,
    error,
  };
};
