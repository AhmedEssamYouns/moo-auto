import axios from "axios";

const apiService = axios.create({
  baseURL: "https://almosallmy.runasp.net/api", // Update this
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor (Attach Token only if isAuth is true)
apiService.interceptors.request.use(
  (config:any) => {
    if (config.isAuth === true) {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor (Handle Errors)
api.interceptors.response.use(
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
