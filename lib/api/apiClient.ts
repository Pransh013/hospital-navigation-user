import { useAuthStore } from "@/stores/authStore";
import { SigninResponse } from "@/types";
import { useMemo } from "react";
import { useApi } from "./axios";

export const useApiClient = () => {
  const axiosInstance = useApi();
  const { signin } = useAuthStore();

  return useMemo(
    () => ({
      auth: {
        signin: async (email: string, password: string) => {
          try {
            const response = await axiosInstance.post<SigninResponse>(
              "/auth/signin",
              { email, password }
            );

            const { message, token, user } = response.data;
            signin(token, user);
            return message;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Something went wrong";
            throw new Error(errorMessage);
          }
        },
      },
    }),
    [axiosInstance]
  );
};
