import apiService from "../interceptor";

export const getCars = async (filters) => {
  console.log("Fetching cars with filters:", filters); // Log the payload

  const response = await apiService.get("/api/cars", {
    params: filters,
    isAuth: false,
  });

  console.log("API Response:", response.data); // Log the response

  return response.data;
};

export const getLatestCars = async () => {
  const response = await apiService.get("/api/cars/Latest", { isAuth: false });

  console.log("API Response:", response.data); // Log the response

  return response.data;
};

export const getBrands = async () => {
  const response = await apiService.get("/api/brands", { isAuth: false });

  console.log("API Response:", response.data); // Log the response

  return response.data;
};

export const searchCars = async (SearchValue) => {
  const response = await apiService.get(`/api/cars/Search`, {
    params: { SearchValue},
    isAuth: false,
  });
  return response.data;
};


export const  getCar = async (id) => {
  const response = await apiService.get(`/api/cars/${id}`, { isAuth: false });
  return response.data;
}

export const editCar = async (id, data) => {
  const response = await apiService.put(`/api/cars/${id}`, data, { isAuth: true });
  return response.data;
}


export const deleteCar = async (id) => {
  const response = await apiService.delete(`/api/cars/${id}`, { isAuth: true });
  return response.data;
}