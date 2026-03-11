import { useState } from "react";
import type {
  CreateProfileRequest,
  ImageProfileResponse,
  ProfileResponse,
} from "../../types/entities/profile";
import { create, handleImageProfile } from "../../services/profile.service";
import type { WebResponse } from "../../types/base/api";

export const useCreateProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createProfile = async (
    data: CreateProfileRequest,
    token: string,
  ): Promise<WebResponse<ProfileResponse>> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await create(data, token);
      console.log("Succes Create Profile :", result.data);
      return result;
    } catch (err: any) {
      const errorMsg = err.message || "Unknown error";
      setError("Failed create profile: " + errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createProfile,
    isLoading,
    error,
  };
};

export const useHandleImageProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const imageProfile = async (
    data: FormData,
    token: string,
  ): Promise<WebResponse<ImageProfileResponse>> => {
    try {
      const result = await handleImageProfile(data, token);

      console.log("Succes create image :", result.data);
      return result;
    } catch (err: any) {
      const errorMsg = err.message || "Unknown error";
      setError("Failed upload profile image: " + errorMsg);
      throw new Error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    imageProfile,
    isLoading,
    error,
  };
};
