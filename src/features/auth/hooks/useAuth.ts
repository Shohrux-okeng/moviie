import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../../app/store';
import { setUser, setLoading, setError } from '../../../app/slices/authSlice';
import { supabase } from '../../../shared/supabase';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Initialize auth session from localStorage and Supabase
  useEffect(() => {
    const initAuth = async () => {
      dispatch(setLoading(true));
      try {
        // Check stored session
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          dispatch(setUser(JSON.parse(storedUser)));
        }

        // Get current session from Supabase
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (data.session?.user) {
          const authUser = {
            id: data.session.user.id,
            email: data.session.user.email || '',
            fullName: data.session.user.user_metadata?.full_name,
            avatarUrl: data.session.user.user_metadata?.avatar_url,
          };
          dispatch(setUser(authUser));
          localStorage.setItem('auth_user', JSON.stringify(authUser));
        } else {
          dispatch(setUser(null));
          localStorage.removeItem('auth_user');
        }
      } catch (err) {
        console.error('[v0] Auth init error:', err);
        dispatch(setError(err instanceof Error ? err.message : 'Auth error'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          const authUser = {
            id: session.user.id,
            email: session.user.email || '',
            fullName: session.user.user_metadata?.full_name,
            avatarUrl: session.user.user_metadata?.avatar_url,
          };
          dispatch(setUser(authUser));
          localStorage.setItem('auth_user', JSON.stringify(authUser));
        } else {
          dispatch(setUser(null));
          localStorage.removeItem('auth_user');
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return { user, isLoading, error, isAuthenticated };
};
