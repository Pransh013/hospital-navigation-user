import { useAuthStore } from "@/stores/authStore";
import {
  AppointmentListResponse,
  AppointmentResponse,
  HospitalResponse,
  SigninResponse,
  TestBookingResponse,
} from "@/types";
import { useMemo } from "react";
import { useApi } from "./axios";
import { axiosPublic } from "./axiosPublic";

export const useApiClient = () => {
  const axiosInstance = useApi();
  const authState = useAuthStore();

  return useMemo(
    () => ({
      patient: {
        signin: async (email: string, password: string, hospitalId: string) => {
          try {
            const response = await axiosPublic.post<SigninResponse>(
              "/patient/sign-in",
              { email, password, hospitalId }
            );

            const { message, data } = response.data;
            authState.signin(data.token, data.patient);
            return message;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Something went wrong";
            throw new Error(errorMessage);
          }
        },
        getBookings: async (date: string) => {
          try {
            const response = await axiosInstance.get<TestBookingResponse>(
              `/patient/bookings?date=${date}`
            );
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to fetch bookings";
            throw new Error(errorMessage);
          }
        },
        getAppontments: async () => {
          try {
            const response = await axiosInstance.get<AppointmentListResponse>(
              "/patient/appointments"
            );
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to fetch appointments";
            throw new Error(errorMessage);
          }
        },
        getAppontmentById: async (id: string) => {
          try {
            const response = await axiosInstance.get<AppointmentResponse>(
              `/patient/appointments/${id}`
            );
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to fetch appointment";
            throw new Error(errorMessage);
          }
        },
        checkIn: async (patientId: string) => {
          try {
            const response = await axiosInstance.post(
              `/patient/${patientId}/checkin`
            );
            return response.data.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to check in";
            throw new Error(errorMessage);
          }
        },
      },
      hospital: {
        fetchAll: async () => {
          try {
            const response = await axiosPublic.get<HospitalResponse>(
              "/hospital"
            );
            return response.data;
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.message || "Failed to fetch hospitals";
            throw new Error(errorMessage);
          }
        },
      },
    }),
    [axiosInstance, authState]
  );
};
