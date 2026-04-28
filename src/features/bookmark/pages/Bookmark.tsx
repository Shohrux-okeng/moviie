import { memo } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks } from '../hooks/useBookmarks';

const Bookmark = () => {
  const { bookmarks, toggleBookmark } = useBookmarks();

  return (
    <div className="bg-black text-white min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-[1360px] mx-auto pt-[40px] pb-10">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-red-500">
            My Bookmarks
          </h1>
          <p className="text-gray-400 text-sm sm:text-base">
            {bookmarks.length === 0
              ? 'No bookmarked movies yet. Start adding your favorite movies!'
              : `You have ${bookmarks.length} bookmarked movie${bookmarks.length !== 1 ? 's' : ''}`}
          </p>
        </div>

        {/* Empty State */}
        {bookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 sm:py-24">
            <div className="text-6xl mb-4">🔖</div>
            <h2 className="text-2xl font-bold mb-2">No Bookmarks Yet</h2>
            <p className="text-gray-400 text-center mb-8 max-w-md">
              Start exploring and bookmark your favorite movies to build your personal collection.
            </p>
            <Link
              to="/movies"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
              Browse Movies
            </Link>
          </div>
        ) : (
          <>
            {/* Bookmarks Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {bookmarks.map((movie) => (
                <div
                  key={movie.id}
                  className="rounded-xl overflow-hidden shadow-lg hover:shadow-red-500/40 transition duration-300 bg-[#111] h-full flex flex-col group">
                  {/* Image Container */}
                  <Link
                    to={`/movie/${movie.id}`}
                    className="relative overflow-hidden flex-shrink-0">
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : 'https://via.placeholder.com/300x450?text=No+Image'
                      }
                      alt={movie.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition duration-300" />
                  </Link>

                  {/* Content Section */}
                  <div className="p-3 flex-grow flex flex-col justify-between">
                    <Link
                      to={`/movie/${movie.id}`}
                      className="group/link">
                      <h2 className="font-bold text-base text-white line-clamp-2 group-hover/link:text-red-500 transition">
                        {movie.title}
                      </h2>
                    </Link>

                    <div className="mt-2">
                      <p className="text-yellow-500 text-sm mb-1">
                        ⭐ {movie.vote_average.toFixed(1)}
                      </p>
                      <p className="text-gray-400 text-xs mb-3">
                        {movie.release_date}
                      </p>
                    </div>

                    {/* Overview Preview */}
                    <p className="text-gray-300 text-xs line-clamp-2 mb-3">
                      {movie.overview || 'No description available'}
                    </p>

                    {/* Remove Button */}
                    <button
                      onClick={() => toggleBookmark(movie)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition duration-200">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Clear All Button */}
            <div className="flex justify-center">
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
                className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition duration-200">
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
