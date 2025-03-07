import apiService from "../axiosInstance";

export const getCars = async (filters) => {
  const response = await apiService.get("/cars", { params: filters, isAuth: false });
  return response.data;
};
