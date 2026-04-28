# Bookmark Feature Documentation

## Overview
The bookmark feature allows users to save their favorite movies for quick access later. Bookmarks are stored in browser localStorage and synced with Redux state for real-time updates.

## Architecture

### Redux Slice (`bookmarkSlice.ts`)
- **State**: Array of bookmarked movies
- **Actions**:
  - `addBookmark`: Add a movie to bookmarks
  - `removeBookmark`: Remove a movie from bookmarks
  - `setBookmarks`: Set all bookmarks (used for localStorage sync)
  - `clearAllBookmarks`: Clear all bookmarks

### Custom Hook (`useBookmarks.ts`)
Provides an easy interface for components to interact with bookmarks:
- **Responsibilities**:
  - Loads bookmarks from localStorage on mount
  - Automatically syncs Redux state to localStorage when bookmarks change
  - Provides convenience methods for toggling and checking bookmarks

```typescript
const { bookmarks, toggleBookmark, isBookmarked } = useBookmarks();
```

### Components

#### BookmarkButton
A reusable button component that:
- Displays bookmark status (bookmarked/not bookmarked)
- Handles toggle functionality
- Shows visual feedback with icon and color changes

Usage:
```tsx
<BookmarkButton movie={movieData} />
```

#### BookmarkBadge
Optional component that displays the count of bookmarks:
- Shows a badge with count (displays "9+" for 10+ bookmarks)
- Hides when no bookmarks exist

## Data Persistence

### localStorage Integration
- Key: `movieapp_bookmarks`
- Stored as: JSON string of BookmarkedMovie array
- Auto-synced: Changes to Redux state automatically update localStorage

### Data Structure
```typescript
interface BookmarkedMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
}
```

## Pages

### Bookmark Page (`/bookmarks`)
Features:
- Grid display of all bookmarked movies
- Each card shows:
  - Movie poster with hover effects
  - Title (clickable link to detail page)
  - Rating
  - Release date
  - Overview preview
  - Remove button
- Empty state with helpful messaging and browse button
- Clear All Bookmarks button with confirmation
- Responsive design (2-5 columns based on screen size)

## Width/Height Fixes
Movie cards now have consistent heights across all grid views:
- Fixed image height: `h-64` (256px)
- Cards use flexbox with `flex-col` and `flex-grow` for content area
- Text content properly scales to fill available space
- No more responsive height variations that caused alignment issues

## Integration Points

### MovieDetail Page
- Bookmark button added next to "Go Home" button
- Shows current bookmark status
- Allows quick bookmarking while viewing details

### Movies Page
- Movie cards use consistent height layout
- Ready for bookmark button integration

### Header Navigation
- Bookmark link in main navigation
- Optional: BookmarkBadge component for showing count

## Usage Examples

### Adding to a Component
```tsx
import { useBookmarks } from '@/features/bookmark/hooks/useBookmarks';
import BookmarkButton from '@/features/bookmark/components/BookmarkButton';

function MyComponent() {
  const { bookmarks, isBookmarked } = useBookmarks();
  
  return (
    <div>
      <BookmarkButton movie={movieData} />
      {isBookmarked(movieId) && <p>This movie is bookmarked!</p>}
    </div>
  );
}
```

### Manual Bookmark Management
```tsx
const { toggleBookmark, bookmarks } = useBookmarks();

// Toggle bookmark
toggleBookmark(movieObject);

// Check if bookmarked
const isBookmarked = bookmarks.some(b => b.id === movieId);
```

## Browser Support
Works on all modern browsers that support:
- localStorage API
- React 16.8+ (hooks)
- Redux Toolkit

## Future Enhancements
- Cloud sync with user accounts
- Export/Import bookmarks
- Bookmark collections/folders
- Sort and filter options
- Share bookmarks with other users
