import apiService from "../../services/interceptor";

export const postLogin = async (email, password) => {
  const response = await apiService.post("/auth/login", { email, password });
  return response.data;
};
