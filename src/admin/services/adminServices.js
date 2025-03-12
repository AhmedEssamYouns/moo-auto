import apiService from "../../services/interceptor";

export const postLogin = async (email, password) => {
  const response = await apiService.post("/api/auth/login", { email, password });
  return response.data;
};

export const editBrand = async (id, data) => {
  const response = await apiService.put(`/api/brands/${id}`, data, { isAuth: true });
  return response.data;
};
export const deleteBrand = async (id) => {
  const response = await apiService.delete(`/api/brands/${id}`, { isAuth: true });
  return response.data;
}

export const addBrand = async (data) => {
  const response = await apiService.post(`/api/brands`, data, { isAuth: true });
  return response.data;
}

export const getRequests = async (searchValue = "") => {
    const response = await apiService.get("/car-requests", {
      params: {
        SearchValue: searchValue,
        IsPaginated: false,
        PageNumber: 1,
        PageSize: 100,
      },
      isAuth: true,
    });
    return response.data;
  };

  export const addUser = async (data) => {
    const response = await apiService.post(`/api/users`, data, { isAuth: true });
    return response.data;
  }

  export const getAllUsers = async () => {
    const response = await apiService.get(`/api/users`, { isAuth: true });
    return response.data;
  }
  