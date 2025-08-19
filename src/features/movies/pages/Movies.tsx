import { useEffect, useState } from "react";
import { api } from "../../../shared/api/index";

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movie/popular?language=en-US&page=1");
        setMovies(res.data.results);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1360px] mx-auto py-10 px-4">
        <h1 className="text-2xl font-bold mb-6 text-red-500">All Movies</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300 cursor-pointer bg-gray-900"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full object-contain bg-black"
              />
              <h2 className="text-center py-3 font-semibold">{movie.title}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
