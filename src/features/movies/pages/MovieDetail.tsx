import { memo, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../../shared/api";

interface MovieDetailType {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  vote_average: number;
  poster_path: string;
  popularity: number;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movie/${id}?language=en-US`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error fetching movie:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Movie not found
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-12 flex flex-col md:flex-row items-center md:items-start gap-10">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="rounded-xl shadow-lg w-[240px] sm:w-[280px] md:w-[360px] lg:w-[400px] object-cover"
      />

      <div className="max-w-2xl text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
          {movie.title}
        </h1>
        <p className="text-gray-300 text-sm sm:text-base mb-6 leading-relaxed">
          {movie.overview}
        </p>

        <h3 className="font-bold text-lg sm:text-xl mb-2">Released</h3>
        <div className="flex flex-col sm:flex-row sm:justify-between text-gray-300 text-sm sm:text-base mb-6 gap-2 sm:gap-0">
          <span>{movie.release_date}</span>
          <span>{movie.vote_average.toFixed(1)} rating</span>
          <span>{Math.round(movie.popularity)} views</span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base">
          Go Home
        </button>
      </div>
    </div>
  );
};

export default memo(MovieDetail);
