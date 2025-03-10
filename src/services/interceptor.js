import axios from "axios";
import { baseUrl } from "../utils/baseUrl";
import { Alert } from "@mui/material";

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
      alert("Session expired, please login again");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("refreshToken");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect using JavaScrip
      }, 500);
    }
    return Promise.reject(error);
  }
);

export default apiService;
