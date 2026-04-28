import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

const Bookmark = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1360px] mx-auto pt-[40px] pb-10">
        {/* Header Section */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-400/10 blur-3xl -z-10"></div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
            My Bookmarks
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-2xl">
            {bookmarks.length === 0
              ? '🎬 No bookmarked movies yet. Start exploring and bookmark your favorites!'
              : `✨ You have ${bookmarks.length} bookmarked movie${bookmarks.length !== 1 ? 's' : ''} in your collection`}
          </p>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24 px-4">
            <div className="text-8xl mb-6 opacity-80">🔖</div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-3 text-center">No Bookmarks Yet</h2>
            <p className="text-gray-400 text-center mb-10 max-w-md text-lg">
              Start exploring and add your favorite movies to your personal collection.
            </p>
            <Link
              to="/movies"
              className="group relative inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold transition duration-200 flex items-center gap-2">
                Browse Movies <span className="text-xl">→</span>
              </div>
            </Link>
          </div>
        ) : (
          <>
            {/* Bookmarks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
              {bookmarks.map((movie) => (
                <div
                  key={movie.id}
                  className="group h-full flex flex-col">
                  {/* Image Container */}
                  <Link
                    to={`/movie/${movie.id}`}
                    className="relative overflow-hidden rounded-xl bg-gradient-to-b from-gray-800 to-black flex-shrink-0">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://via.placeholder.com/300x450?text=No+Image'
                      }
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    {/* Rating Badge */}
                    <div className="absolute top-2 right-2 bg-black/70 backdrop-blur px-2 py-1 rounded-lg text-yellow-500 text-xs font-bold">
                      ⭐ {movie.vote_average.toFixed(1)}
                    </div>
                  </Link>

                  {/* Content Section */}
                  <div className="flex-grow flex flex-col justify-between mt-3">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="group/link">
                      <h2 className="font-bold text-base text-white line-clamp-2 group-hover/link:text-red-500 transition">
                        {movie.title}
                      </h2>
                    </Link>

                    <div className="mt-2 text-xs">
                      <p className="text-gray-400 mb-2">
                        {movie.release_date}
                      </p>
                    </div>

                    {/* Overview Preview */}
                    <p className="text-gray-400 text-xs line-clamp-2 mb-4 flex-grow">
                      {movie.overview || 'No description available'}
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() => toggleBookmark(movie)}
                      className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 px-3 py-2 rounded-lg text-sm font-semibold transition duration-200">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            <div className="flex justify-center pt-8">
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to clear all bookmarks?'
                    )
                  ) {
                    bookmarks.forEach((movie) => toggleBookmark(movie));
                  }
                }}
                className="px-6 py-3 rounded-lg font-semibold transition duration-200 bg-gray-900/50 border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600">
                Clear All Bookmarks
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Bookmark);
