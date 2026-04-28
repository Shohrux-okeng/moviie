import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../app/store';
import { setBookmarks, addBookmark, removeBookmark } from '../../../app/slices/bookmarkSlice';
import { BookmarkedMovie } from '../../../app/slices/bookmarkSlice';

const BOOKMARK_STORAGE_KEY = 'movieapp_bookmarks';

export const useBookmarks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookmarks = useSelector((state: RootState) => state.bookmark.movies);

  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem(BOOKMARK_STORAGE_KEY);
    if (savedBookmarks) {
      try {
        const parsed = JSON.parse(savedBookmarks);
        dispatch(setBookmarks(parsed));
      } catch (error) {
        console.error('Failed to load bookmarks:', error);
      }
    }
  }, [dispatch]);

  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (movie: BookmarkedMovie) => {
    const isBookmarked = bookmarks.some(b => b.id === movie.id);
    if (isBookmarked) {
      dispatch(removeBookmark(movie.id));
    } else {
      dispatch(addBookmark(movie));
    }
  };

  const isBookmarked = (movieId: number): boolean => {
    return bookmarks.some(b => b.id === movieId);
  };

  return {
    bookmarks,
    toggleBookmark,
    isBookmarked,
  };
};
