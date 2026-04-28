import { memo } from 'react';
import { useBookmarks } from '../hooks/useBookmarks';

interface BookmarkBadgeProps {
  className?: string;
}

const BookmarkBadge = ({ className = '' }: BookmarkBadgeProps) => {
  const { bookmarks } = useBookmarks();

  if (bookmarks.length === 0) return null;

  return (
    <div
      className={`absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ${className}`}>
      {bookmarks.length > 9 ? '9+' : bookmarks.length}
    </div>
  );
};

export default memo(BookmarkBadge);
