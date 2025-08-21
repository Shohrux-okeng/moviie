import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const useCast = () => {
  
  const getCastById = (id: number) =>
    useQuery({
      queryKey: ["cast-key", id],
      queryFn: () => api.get(`/person/${id}`).then((res) => res.data),
    });

  const getCastItems = (id: number, path:string) =>
    useQuery({
      queryKey: ["cast-key", id, path],
      queryFn: () => api.get(`/person/${id}/${path}`).then((res) => res.data),
    });



  return { getCastById, getCastItems };
};
