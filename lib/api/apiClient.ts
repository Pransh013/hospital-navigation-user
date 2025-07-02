import { useAuthStore } from "@/stores/authStore";
import {
  ConsultationSummary,
  SigninResponse,
  TestStatus,
  TestType,
} from "@/types";
import { useMemo } from "react";
import { useApi } from "./axios";

export const useApiClient = () => {
  const axiosInstance = useApi();
  const { signin, token } = useAuthStore();

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
      tests: {
        fetchAll: async () => {
          try {
            const response = await axiosInstance.get<{
              tests: TestType[];
            }>("/tests");
            return response.data.tests;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to fetch tests";
            throw new Error(errorMessage);
          }
        },

        markComplete: async (id: string) => {
          try {
            const response = await axiosInstance.patch<{
              message: string;
              status: TestStatus;
            }>(`/tests/${id}/complete`);
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "Failed to mark test as completed";
            throw new Error(errorMessage);
          }
        },
      },
      patient: {
        getDetails: async (patientId: string) => {
          try {
            const response = await axiosInstance.get<ConsultationSummary>(
              `/${patientId}/consultation`
            );
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message ||
              "Failed to fetch consultation details";
            throw new Error(errorMessage);
          }
        },
      },
    }),
    [axiosInstance, token]
  );
};
