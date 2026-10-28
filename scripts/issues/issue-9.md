### 🎯 User Story
As a student photographer, I want a dedicated public profile page that displays my bio, avatar, and all the photographs I have shared on the platform, so that I can send a single link to friends and peers to showcase my work.

---

### 📖 Context & Scope
Each photographer has a public profile page at `/users/[id]`. Anyone can browse a photographer's collection. As an HTML/CSS & UI specialist, you will design and implement the user profile view layout, bio card, and responsive showcase grid.

---

### 🛠️ Technical Implementation Guide

#### 1. Public Profile Page (`app/users/[id]/page.tsx`)
- Server Component that retrieves `params.id`.
- Connect to database and fetch user:
  ```javascript
  const user = await User.findById(id).select('-passwordHash').lean();
  ```
- Fetch all photographs published by this creator:
  ```javascript
  const photos = await Photograph.find({ owner: id }).sort({ createdAt: -1 }).lean();
  ```
- If user not found, trigger Next.js `notFound()`.

#### 2. Layout & Profile Header UI
- **Profile Header Card**:
  - Photographer avatar (large circular image with fallback initials icon).
  - Full Name in display typography.
  - Member join date (e.g. "Joined October 2026").
  - Bio text block (supports multi-line bios up to 300 characters).
  - Quick stats badge: "📸 {photos.length} Photographs Published".
- **Photographer's Gallery Grid**:
  - Render the user's photos using the reusable `<PhotoCard />` component.
  - Responsive grid: 1 col on mobile, 2 on tablet, 3-4 on desktop.
- **Empty State**:
  - If `photos.length === 0`, display a friendly empty state: "This photographer hasn't published any work yet."

---

### ⚠️ Edge Cases
- Test profiles with no bio or profile picture (ensure graceful fallbacks).
- Ensure long names or bios wrap properly without overflowing container widths.

---

### ✅ Definition of Done (DoD)
- [ ] Public profile page displays user avatar, name, bio, and join date.
- [ ] Responsive grid displays all photographs published by this photographer.
- [ ] Friendly empty state when creator has 0 uploads.
- [ ] Non-existent user IDs render a clean 404 page.
