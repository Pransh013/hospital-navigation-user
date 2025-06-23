import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const API_URL = "http://192.168.65.253:8000/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let interceptorsAttached = false;

export const useApi = () => {
  const { token, signout } = useAuthStore();

  if (!interceptorsAttached) {
    axiosInstance.interceptors.request.use(
      async (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          console.log("token", token);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("Unauthorized. Logging out.");
          signout();
        }
        return Promise.reject(error);
      }
    );

    interceptorsAttached = true;
  }

  return axiosInstance;
};
