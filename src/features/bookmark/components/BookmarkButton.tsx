import { memo } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';
import type { BookmarkedMovie } from '../../../app/slices/bookmarkSlice';

interface BookmarkButtonProps {
  movie: BookmarkedMovie;
  className?: string;
}

const BookmarkButton = ({ movie, className = '' }: BookmarkButtonProps) => {
  const { toggleBookmark, isBookmarked } = useBookmarks();
  const bookmarked = isBookmarked(movie.id);

  return (
    <button
      onClick={() => toggleBookmark(movie)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition duration-200 ${
        bookmarked
          ? 'bg-red-600 hover:bg-red-700 text-white'
          : 'bg-gray-700 hover:bg-gray-600 text-white'
      } ${className}`}
      title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}>
      <span className="text-lg">
        {bookmarked ? '🔖' : '🔗'}
      </span>
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
};

export default memo(BookmarkButton);
