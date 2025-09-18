import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

const API_URL = "http://192.168.31.178:8000/api/v1";
// const API_URL = "https://hospital-navigation-backend.onrender.com/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().signout();
    }
    return Promise.reject(error);
  }
);

export const useApi = () => axiosInstance;
