import { useQuery } from "@tanstack/react-query";
import { getBrands, getCar, getCars, getLatestCars, searchCars } from "../apis/carsServices";
import { use } from "react";

export const useCars = (filters) => {
  return useQuery({
    queryKey: ["cars", filters],
    queryFn: () => getCars(filters),
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
    retry: 0, 
  });
};

export const useLatestCars = () => {
  return useQuery({
    queryKey: ["latestCars"],
    queryFn: () => getLatestCars(),
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
    retry: 0, 
  });
};
export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: () => getBrands(),
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
    retry: 0, 
  });
};


export const useSearch = (query) => {
  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchCars(query),
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
    retry: 0, 
  });
};

export const useCar = (id) => {
  return useQuery({
    queryKey: ["car", id],
    queryFn: () => getCar(id),
    gcTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
    retry: 0, 
  });
};

