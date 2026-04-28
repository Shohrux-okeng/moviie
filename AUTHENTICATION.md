# Authentication System Documentation

## Overview
Complete Supabase-based authentication system with email/password and social login support, Redux state management, and session persistence.

## Architecture

### Core Components

**1. Supabase Client** (`src/shared/supabase.ts`)
- Initializes Supabase client with environment variables
- Single instance for entire application
- Handles all API communication

**2. Auth Redux Slice** (`src/app/slices/authSlice.ts`)
- Manages authentication state globally
- Properties: `user`, `isAuthenticated`, `isLoading`, `error`
- Actions: `setUser`, `logout`, `setLoading`, `setError`

**3. Custom Hook** (`src/features/auth/hooks/useAuth.ts`)
- Provides `user`, `isAuthenticated`, `isLoading` state
- Automatically restores session on app load
- Listens for auth state changes from Supabase

**4. Auth Service** (`src/features/auth/services/authService.ts`)
- `register(credentials)` - Email/password registration
- `login(credentials)` - Email/password login
- `loginWithGoogle()` - Google OAuth
- `loginWithGithub()` - GitHub OAuth
- `logout()` - Sign out user
- `getCurrentUser()` - Get current session user

### Pages

**Login Page** (`src/features/auth/pages/Login.tsx`)
- Email/password form with validation
- Social authentication buttons (Google, GitHub)
- Link to registration page
- Modern design with gradient styling

**Register Page** (`src/features/auth/pages/Register.tsx`)
- Full name, email, password fields
- Password confirmation and strength validation
- Terms acceptance checkbox
- Link to login page
- Professional form layout

### Components

**ProtectedRoute** (`src/features/auth/components/ProtectedRoute.tsx`)
- Wraps routes that require authentication
- Redirects unauthenticated users to login
- Passes through to protected page if authenticated

## Features

### Authentication Methods
- Email/Password registration and login
- Google OAuth login
- GitHub OAuth login
- Auto-session restoration on page refresh

### Session Management
- Persistent sessions using localStorage
- Automatic token refresh
- Secure logout with session clearing

### User Interface
- Login button redirects unauthenticated users
- User profile dropdown when logged in
- Logout button in profile menu
- Mobile-responsive authentication flows

## Setup

### Environment Variables
Add to `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Configuration
1. Create Supabase project
2. Enable Email/Password auth
3. Configure OAuth providers (Google, GitHub)
4. Set redirect URLs for OAuth callbacks

## Usage

### Using Authentication in Components
```tsx
import { useAuth } from '@/features/auth/hooks/useAuth';

function MyComponent() {
  const { user, isAuthenticated } = useAuth();
  
  return isAuthenticated ? (
    <p>Welcome, {user?.email}</p>
  ) : (
    <p>Please log in</p>
  );
}
```

### Protecting Routes
```tsx
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';

<ProtectedRoute>
  <MyProtectedPage />
</ProtectedRoute>
```

### Manual Authentication
```tsx
import { authService } from '@/features/auth/services/authService';

// Register
const { user, error } = await authService.register({
  email: 'user@example.com',
  password: 'password123',
  fullName: 'John Doe'
});

// Login
const { user, error } = await authService.login({
  email: 'user@example.com',
  password: 'password123'
});

// Logout
await authService.logout();
```

## File Structure
```
src/features/auth/
├── hooks/
│   └── useAuth.ts
├── services/
│   └── authService.ts
├── pages/
│   ├── Login.tsx
│   └── Register.tsx
├── components/
│   └── ProtectedRoute.tsx
└── README.md

src/app/slices/
└── authSlice.ts

src/shared/
└── supabase.ts
```

## UI Integration

### Header Updates
- Shows user profile dropdown when authenticated
- Displays user email/name in dropdown
- Logout button in profile menu
- "Sign In" button for unauthenticated users
- Mobile-responsive auth buttons

### Routes
- `/login` - Login page
- `/register` - Registration page
- Protected routes use ProtectedRoute wrapper

## Security Considerations

1. **Session Storage**: Uses localStorage for session tokens
2. **HTTPS Only**: Supabase requires HTTPS for production
3. **CORS**: Configured in Supabase for your domain
4. **Password Security**: Supabase handles secure hashing
5. **OAuth Flow**: Uses Supabase's secure OAuth implementation

## Future Enhancements

- Email verification
- Password reset flow
- Two-factor authentication
- User profile management
- Social profile data syncing
- Account linking

## Troubleshooting

### Users can't log in
- Check Supabase URL and key in `.env`
- Verify user exists in Supabase auth table
- Check browser console for errors

### Social login not working
- Verify OAuth provider credentials in Supabase
- Check redirect URLs match your app domain
- Ensure provider app is configured correctly

### Session not persisting
- Check if localStorage is enabled in browser
- Verify Supabase session is being created
- Check useAuth hook initialization

## API Reference

### useAuth Hook
```tsx
const {
  user: User | null,              // Current user object
  isAuthenticated: boolean,        // Is user logged in
  isLoading: boolean              // Is auth state loading
} = useAuth();
```

### Auth Service
All methods return: `{ user, error }`

## Testing
To test authentication locally:
1. Create test Supabase project
2. Configure OAuth for `http://localhost:5173`
3. Use test credentials to register/login
4. Verify localStorage stores session token
