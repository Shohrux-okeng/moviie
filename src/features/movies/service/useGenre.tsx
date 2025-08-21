import { useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const useGenre = () => {
  const getGenres = () =>
    useQuery({
      queryKey: ["genre-key"],
      queryFn: () => api.get("/genre/movie/list").then((res) => res.data),
    });

  return { getGenres };
};
