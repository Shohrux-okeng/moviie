import { configureStore } from '@reduxjs/toolkit'
import bookmarkReducer from './slices/bookmarkSlice'
import authReducer from './slices/authSlice'

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
