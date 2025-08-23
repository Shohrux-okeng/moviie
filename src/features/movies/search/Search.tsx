import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../shared/api";

interface MovieType {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await api.get(`/search/movie?query=${query}&language=en-US`);
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <form onSubmit={handleSearch} className="flex justify-center mb-8 gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center text-gray-400">
            Loading...
          </div>
        )}

        {!loading && results.length === 0 && query && (
          <div className="flex justify-center items-center text-gray-500">
            No movies found
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {results.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-500/40 transition duration-300 cursor-pointer bg-gray-900 block"
            >
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={movie.title}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-2">
                <h3 className="font-bold text-sm text-white line-clamp-1">
                  {movie.title}
                </h3>
                <p className="text-yellow-500 text-xs">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Search);
