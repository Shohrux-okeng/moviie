import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface BookmarkedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface BookmarkState {
  movies: BookmarkedMovie[];
}

const initialState: BookmarkState = {
  movies: [],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<BookmarkedMovie>) => {
      const exists = state.movies.some(m => m.id === action.payload.id);
      if (!exists) {
        state.movies.push(action.payload);
      }
    },
    removeBookmark: (state, action: PayloadAction<number>) => {
      state.movies = state.movies.filter(m => m.id !== action.payload);
    },
    setBookmarks: (state, action: PayloadAction<BookmarkedMovie[]>) => {
      state.movies = action.payload;
    },
    clearAllBookmarks: (state) => {
      state.movies = [];
    },
  },
});

export const { addBookmark, removeBookmark, setBookmarks, clearAllBookmarks } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
