import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

const apiService = axios.create({
  baseURL: baseUrl,
});

apiService.interceptors.request.use(
  (config) => {
    if (config.isAuth === true) {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }

    // Allow FormData by not setting Content-Type if it's FormData
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized! Logging out...");
      // Handle logout logic here (clear token, redirect, etc.)
    }
    return Promise.reject(error);
  }
);

export default apiService;
