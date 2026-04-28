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
    <section className="relative bg-black py-10 border-t border-gray-900">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-white to-red-400 bg-clip-text text-transparent">
            {title || "Фильмы"}
          </h2>
          <button className="text-red-500 text-sm hover:text-red-400 font-semibold transition flex items-center gap-1">
            Показать все <span className="text-lg">→</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {data?.results?.map((movie) => (
            <Link
              to={`/movie/${movie.id}`}
              key={movie.id}
              className="group h-full flex flex-col"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-black flex-shrink-0">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "/no-image.png"
                  }
                  alt={movie.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition duration-400"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                {/* Rating Badge */}
                <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded-lg text-yellow-500 text-xs font-bold">
                  ⭐ {movie.vote_average?.toFixed(1) ?? "0.0"}
                </div>
              </div>

              {/* Content */}
              <div className="flex-grow flex flex-col justify-between mt-3">
                <h3 className="font-bold text-sm sm:text-base line-clamp-2 text-white group-hover:text-red-500 transition">
                  {movie.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default memo(MovieGrid);
