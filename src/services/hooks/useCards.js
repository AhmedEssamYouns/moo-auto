import { useQuery } from "@tanstack/react-query";
import { getBrands, getCars, searchCars } from "../apis/getCars";
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