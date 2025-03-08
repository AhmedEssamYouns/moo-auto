import { useQuery } from "@tanstack/react-query";
import { getRequests } from "../services/adminServices";

export const useRequests = (searchValue = "") => {
    return useQuery({
      queryKey: ["requests", searchValue], // Cache by searchValue
      queryFn: () => getRequests(searchValue),
      gcTime: 1000 * 60 * 10, // Cache for 10 minutes
      refetchOnWindowFocus: false,
      retry: 0,
    });
  };