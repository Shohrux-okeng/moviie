import { memo, type FC } from "react";
import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
}

interface Props {
  data?: { results: Movie[] };
  title?: string;
}

const MovieGrid: FC<Props> = ({ data, title }) => {
  return (
    <section className="relative bg-black py-8">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-center px-2 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white">
            {title || "Фильмы"}
          </h2>
          <button className="text-red-500 text-sm hover:underline">
            Показать все →
          </button>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data?.results?.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="bg-[#111] rounded-lg overflow-hidden hover:scale-105 duration-200 block">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] object-cover bg-black"
              />
              <div className="p-2">
                <h3 className="font-bold text-sm sm:text-base line-clamp-1 text-white">
                  {movie.title}
                </h3>
                <p className="text-yellow-500 text-sm sm:text-base">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(MovieGrid);
