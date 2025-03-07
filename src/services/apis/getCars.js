import apiService from "../interceptor";

export const getCars = async (filters) => {
  console.log("Fetching cars with filters:", filters); // Log the payload

  const response = await apiService.get("/cars", { params: filters, isAuth: false });

  console.log("API Response:", response.data); // Log the response

  return response.data;
};

// export const getCar = async (id) => {
//   console.log("Fetching car with id:", id); // Log the payload

//   const response = await apiService.get(`/cars/${id}`, { isAuth: false });

//   console.log("API Response:", response.data); // Log the response

//   return response.data;
// }

export const getBrands = async () => {
  const response = await apiService.get("/brands", { isAuth: false });

  console.log("API Response:", response.data); // Log the response

  return response.data;
}