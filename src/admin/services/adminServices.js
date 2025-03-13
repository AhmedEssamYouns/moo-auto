import apiService from "../../services/interceptor";

export const postLogin = async (email, password) => {
  const response = await apiService.post("/api/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const editBrand = async (id, data) => {
  const response = await apiService.put(`/api/brands/${id}`, data, {
    isAuth: true,
  });
  return response.data;
};
export const deleteBrand = async (id) => {
  const response = await apiService.delete(`/api/brands/${id}`, {
    isAuth: true,
  });
  return response.data;
};

export const addBrand = async (data) => {
  const response = await apiService.post(`/api/brands`, data, { isAuth: true });
  return response.data;
};

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
};

export const getAllUsers = async () => {
  const response = await apiService.get(`/api/users`, { isAuth: true });
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiService.delete(`/api/users/${id}`, {
    isAuth: true,
  });
  return response.data;
};

export const editUser = async (id, data) => {
  const response = await apiService.put(`/api/users`, data, {
    headers: { "Content-Type": "application/json" },
    isAuth: true,
  });
  return response.data;
};

export const getProviders = async () => {
  const response = await apiService.get(
    "/api/installment-providers/ProvidersWithPlan",
    { isAuth: true }
  );
  return response.data;
};

export const addProvider = async (name, image) => {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("image", image);

  const response = await apiService.post("/api/installment-providers", formData, {
    headers: { "Content-Type": "application/json" },
    isAuth: true,
  });
  return response.data;
};
export const getProvidersWithoutPlan = async () => {
  const response = await apiService.get(
    "/api/installment-providers",
    { isAuth: true }
  );
  return response.data;
}
export const addInstallmentPlan = async (providerId, plan) => {
  const response = await apiService.post(
    `/api/installment-providers`,
    plan,
    {
      headers: { "Content-Type": "application/json" },
      isAuth: true,
    }
  );
  return response.data;
};

export const deletePlan = async (id) => {
  const response = await apiService.delete(`/api/installment-plans/${id}`, {
    isAuth: true,
  });
  return response.data;
};
export const deleteProviderapi = async (id) => {
  const response = await apiService.delete(`/api/installment-providers/${id}`, {
    isAuth: true,
  });
  return response.data;
};