### 🎯 User Story
As a platform visitor, I want to scroll through the gallery and click "Load More" to seamlessly fetch subsequent sets of photographs, so that I can explore the entire collection without slow full-page reloads.

---

### 📖 Context & Scope
The gallery reads photographs from MongoDB sorted newest-first. Rather than loading hundreds of photographs at once, the gallery fetches in batches of 12. You will implement the client-side JavaScript logic to fetch additional photos from `/api/photos?page=X` and append them to the existing grid.

---

### 🛠️ Technical Implementation Guide

#### 1. Client-Side Gallery Manager (`components/gallery/GalleryContainer.tsx`)
- Maintain state:
  - `photos`: Array of photo objects.
  - `page`: Current page number (starts at 1).
  - `hasMore`: Boolean indicating if more photos are available.
  - `isLoading`: Boolean for network request state.
- "Load More Photographs" button:
  - Located at the bottom of the grid.
  - When clicked, increment `page`, call `/api/photos?page=${page}&limit=12`, and concatenate the new photos:
    ```javascript
    const res = await fetch(`/api/photos?page=${nextPage}&limit=12`);
    const data = await res.json();
    setPhotos(prev => [...prev, ...data.photos]);
    setHasMore(data.pagination.hasMore);
    ```
  - Show a small spinner icon inside the button while loading.
  - Hide or disable the button with a message ("You've reached the end of the showcase") when `hasMore === false`.

#### 2. Network Error Handling
- If the fetch request fails, display an inline retry button: "Failed to load photos. [Retry]".

---

### ⚠️ Edge Cases
- Prevent duplicate requests if a user rapidly double-clicks the "Load More" button.
- Ensure newly loaded images correctly retain Next.js image optimization.

---

### ✅ Definition of Done (DoD)
- [ ] Initial gallery loads the first batch of 12 photos.
- [ ] Clicking "Load More" appends the next 12 photos without wiping existing items.
- [ ] Button shows loading spinner during network requests.
- [ ] End-of-list indicator displays when all photographs have been fetched.
- [ ] Network errors offer a user-friendly retry mechanism.
