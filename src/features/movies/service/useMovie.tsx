import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "../../../shared/api";

export const useMovie = () => {
  const getMovies = (search?: string) =>
    useQuery({
      queryKey: ["movie-key", search],
      queryFn: () =>
        api
          .get(search ? `/search/movie?query=${search}` : "/discover/movie")
          .then((res) => res.data),
    });

  const createMovie = useMutation({
    mutationFn: (data: any) => api.post("/discover/movie", data),
  });

  return { getMovies, createMovie };
};
