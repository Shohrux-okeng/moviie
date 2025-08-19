import { memo, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

interface CastType {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface SimilarMovieType {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [casts, setCasts] = useState<CastType[]>([]);
  const [similar, setSimilar] = useState<SimilarMovieType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"actors" | "similar">("actors");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const [movieRes, creditsRes, similarRes] = await Promise.all([
          api.get(`/movie/${id}?language=en-US`),
          api.get(`/movie/${id}/credits?language=en-US`),
          api.get(`/movie/${id}/similar?language=en-US`),
        ]);

        setMovie(movieRes.data);
        setCasts(creditsRes.data.cast.slice(0, 12));
        setSimilar(similarRes.data.results.slice(0, 12));
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
    <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 mb-12">
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
            onClick={() => navigate("/")}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm sm:text-base">
            Go Home
          </button>
        </div>
      </div>

      <div className="flex gap-6 border-b border-gray-700 mb-6">
        <button
          className={`pb-2 font-bold ${
            activeTab === "actors"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("actors")}>
          Actors
        </button>
        <button
          className={`pb-2 font-bold ${
            activeTab === "similar"
              ? "text-red-500 border-b-2 border-red-500"
              : "text-gray-400"
          }`}
          onClick={() => setActiveTab("similar")}>
          Similar movies
        </button>
      </div>

      {activeTab === "actors" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {casts.map((actor) => (
            <div
              key={actor.id}
              className="bg-[#111] rounded-lg overflow-hidden text-center p-2">
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : "https://via.placeholder.com/200x300?text=No+Image"
                }
                alt={actor.name}
                className="w-full h-[200px] object-cover rounded-lg mb-2"
              />
              <h3 className="font-bold text-sm text-white">{actor.name}</h3>
              <p className="text-gray-400 text-xs">{actor.character}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "similar" && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {similar.map((m) => (
            <Link
              to={`/movie/${m.id}`}
              key={m.id}
              className="bg-[#111] rounded-lg overflow-hidden hover:scale-105 duration-200 block">
              <img
                src={
                  m.poster_path
                    ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={m.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-2">
                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {m.title}
                </h3>
                <p className="text-yellow-500 text-xs">
                  ⭐ {m.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(MovieDetail);
