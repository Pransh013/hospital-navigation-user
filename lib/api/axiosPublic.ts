import axios from "axios";

const API_URL = "http://192.168.29.41:8000/api/v1";

export const axiosPublic = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
