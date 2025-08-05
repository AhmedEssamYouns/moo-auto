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

export const getBanners = async () => {
  try {
    const response = await apiService.get("api/banner", {
      params: {
        pageNumber: 1,
        pageSize: 1000,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch banners:", error);
    throw error;
  }
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
    params: { SearchValue },
    isAuth: false,
  });
  return response.data;
};

export const getCar = async (id) => {
  const response = await apiService.get(`/api/cars/${id}`, { isAuth: false });
  return response.data;
};

export const editCar = async (id, data) => {
  const response = await apiService.put(`/api/cars/${id}`, data, {
    isAuth: true,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
export const addCar = async (data) => {
  console.log("[addCar] 📤 Sending car data:", data);

  try {
    const response = await apiService.post(`/api/cars`, data, {
      isAuth: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("[addCar] ✅ Response received:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("[addCar] ❌ Server error:", {
        status: error.response.status,
        data: error.response.data,
        headers: error.response.headers,
      });
    } else if (error.request) {
      // Request was made but no response received
      console.error("[addCar] ❌ No response received:", error.request);
    } else {
      // Something happened setting up the request
      console.error("[addCar] ❌ Error setting up request:", error.message);
    }

    throw error; // rethrow to handle elsewhere if needed
  }
};


export const deleteCar = async (id) => {
  const response = await apiService.delete(`/api/cars/${id}`, { isAuth: true });
  return response.data;
};

export const addRequest = async (data) => {
  const response = await apiService.post(`/car-requests`, data, {
    headers: { "Content-Type": "application/json" },
    isAuth: false,
  });
  return response.data;
};
