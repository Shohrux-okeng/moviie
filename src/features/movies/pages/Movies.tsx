import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api } from "../../../shared/api";
import { Pagination, Select, Spin } from "antd";

const { Option } = Select;

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre") || "";
  const sort = searchParams.get("sort") || "popularity.desc";
  const year = searchParams.get("year") || "";

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/discover/movie?language=en-US&page=${page}&with_genres=${genre}&sort_by=${sort}&primary_release_year=${year}`
        );
        setMovies(res.data);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page, genre, sort, year]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/genre/movie/list?language=en-US");
        setGenres(res.data.genres);
      } catch (error) {
        console.error("Genres error:", error);
      }
    };
    fetchGenres();
  }, []);

  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="max-w-[1360px] mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-red-500">All Movies</h1>

        <div className="flex flex-wrap gap-4 mb-8">
          <Select
            value={genre || undefined}
            placeholder="Filter by Genre"
            allowClear
            onChange={(val) => {
              setSearchParams({ page: "1", genre: val || "", sort, year });
            }}>
            {genres.map((g) => (
              <Option key={g.id} value={g.id}>
                {g.name}
              </Option>
            ))}
          </Select>

          <Select
            value={sort}
            onChange={(val) => {
              setSearchParams({ page: "1", genre, sort: val, year });
            }}>
            <Option value="popularity.desc">Most Popular</Option>
            <Option value="release_date.desc">Newest</Option>
            <Option value="release_date.asc">Oldest</Option>
            <Option value="vote_average.desc">Top Rated</Option>
          </Select>

          <Select
            value={year || undefined}
            placeholder="Select Year"
            allowClear
            onChange={(val) => {
              setSearchParams({ page: "1", genre, sort, year: val || "" });
            }}>
            {Array.from({ length: 50 }, (_, i) => {
              const y = 2025 - i;
              return (
                <Option key={y} value={y}>
                  {y}
                </Option>
              );
            })}
          </Select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {movies.results?.map((movie: any) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-red-500/40 transition duration-300 cursor-pointer bg-[#111] block">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[300px] sm:h-[340px] md:h-[380px] object-cover rounded-t-xl"
              />
              <div className="p-3">
                <h2 className="font-bold text-base text-white line-clamp-1">
                  {movie.title}
                </h2>
                <p className="text-yellow-500 text-sm">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-400 text-xs">{movie.release_date}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Pagination
            current={page}
            total={movies.total_results}
            pageSize={20}
            showSizeChanger={false}
            onChange={(p) => {
              setSearchParams({ page: String(p), genre, sort, year });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Movies;
