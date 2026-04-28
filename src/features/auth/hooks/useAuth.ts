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
        // Check stored session first
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          try {
            dispatch(setUser(JSON.parse(storedUser)));
          } catch (e) {
            localStorage.removeItem('auth_user');
          }
        }

        // Get current session from Supabase only if configured
        if (supabase) {
          const { data, error: sessionError } = await supabase.auth.getSession();
          if (sessionError) {
            console.warn('[v0] Supabase session error:', sessionError.message);
          } else if (data.session?.user) {
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
        }
      } catch (err) {
        console.error('[v0] Auth init error:', err);
        dispatch(setError(err instanceof Error ? err.message : 'Auth error'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    initAuth();

    // Listen for auth changes only if Supabase is configured
    let subscription: any = null;
    if (supabase) {
      try {
        const { data: { subscription: sub } } = supabase.auth.onAuthStateChange(
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
        subscription = sub;
      } catch (err) {
        console.warn('[v0] Auth listener setup failed:', err);
      }
    }

    return () => {
      subscription?.unsubscribe();
    };
  }, [dispatch]);

  return { user, isLoading, error, isAuthenticated };
};
