### 🎯 User Story
As an art admirer or student photographer, I want to view a photograph on its own dedicated page with a high-resolution viewer, photographer attribution card, title, and description, so that I can appreciate the artwork in full detail.

---

### 📖 Context & Scope
Every published photograph has a dedicated page route at `/photos/[id]`. This view provides the high-res view, creator metadata, and links to the photographer's personal profile.

---

### 🛠️ Technical Implementation Guide

#### 1. Dynamic Route Page (`app/photos/[id]/page.tsx`)
- Server Component that retrieves `params.id`.
- Connect to database and fetch photo:
  ```javascript
  const photo = await Photograph.findById(id).populate('owner', 'name profileImageUrl bio').lean();
  ```
- If photo does not exist, invoke Next.js `notFound()`.

#### 2. Layout & Metadata Display
- **Hero Image Container**:
  - Full-width / large stage container displaying the high-resolution Cloudinary image.
  - Support high visual quality without distorting aspect ratio (`max-h-[80vh]`, object-contain).
- **Metadata Sidebar / Bottom Bar**:
  - Photo `title` in bold header typography.
  - Formatted publication date (e.g., "Published Oct 28, 2026").
  - Description paragraph (supporting line breaks).
- **Photographer Card**:
  - Creator's avatar (with initials fallback).
  - Creator's name linking to `/users/[ownerId]`.
  - Short bio preview with a button: "View Portfolio".
- **Navigation Controls**:
  - "← Back to Gallery" button to return to the discovery feed.

---

### ⚠️ Edge Cases
- Handle non-existent or invalid MongoDB ObjectIds cleanly by returning a 404 page rather than 500 server crash.
- Handle deleted user accounts gracefully with an "Unknown Photographer" fallback.

---

### ✅ Definition of Done (DoD)
- [ ] Valid photo IDs render large photo, title, description, and date.
- [ ] Photographer card links directly to their profile at `/users/[id]`.
- [ ] Invalid IDs render a clean 404 Not Found page.
- [ ] Responsive design stacks image and info vertically on mobile.
