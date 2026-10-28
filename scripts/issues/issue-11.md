### 🎯 User Story
As a photograph owner, I want to edit the title and description of my uploaded photo, or permanently delete it if I no longer want it on the platform, so that I have complete control over my artwork.

---

### 📖 Context & Scope
Creators must be able to modify the metadata of their photos or delete them permanently. Deletions must cascade: deleting both the image file from Cloudinary storage and the document record in MongoDB. Non-owners must be blocked from modifying or deleting someone else's work.

---

### 🛠️ Technical Implementation Guide

#### 1. Route Handlers (`app/api/photos/[id]/route.ts`)
- **`PATCH /api/photos/[id]`**:
  - Verify session. Return `401 Unauthorized` if not logged in.
  - Verify ownership: Check if `photo.owner.toString() === session.user.id`. Return `403 Forbidden` if not owner.
  - Parse body: `{ title, description }`.
  - Validate `title` (required, 1–120 chars) and `description` (optional, max 1000 chars).
  - Update and return updated photograph document.
- **`DELETE /api/photos/[id]`**:
  - Verify session.
  - Verify ownership (`photo.owner === session.user.id`) OR admin role (`session.user.role === 'admin'`).
  - Delete file from Cloudinary: `await deleteImageFromCloudinary(photo.imagePublicId)`.
  - Delete document from MongoDB: `await Photograph.findByIdAndDelete(id)`.
  - Return `{ success: true, message: 'Photograph deleted successfully' }`.

#### 2. UI Action Menu & Modals
- Add an "Actions" dropdown menu (three vertical dots icon) on `PhotoCard` and `/photos/[id]` detail view (visible only to the owner).
- **Edit Modal**: Pre-fills existing title & description; saves changes and updates UI.
- **Delete Confirmation Modal**: Alert dialog ("Are you sure you want to delete this photograph? This action is permanent."). On confirm, calls `DELETE /api/photos/[id]` and redirects to `/`.

---

### ⚠️ Edge Cases
- Ensure server checks ownership before touching Cloudinary or MongoDB.
- Gracefully handle cases where Cloudinary asset deletion succeeds/fails.

---

### ✅ Definition of Done (DoD)
- [ ] Owner-only action menu with Edit and Delete options.
- [ ] Edit modal updates title and description via `PATCH /api/photos/[id]`.
- [ ] Delete modal requires confirmation before permanently deleting.
- [ ] Deletion removes file from Cloudinary AND deletes MongoDB record.
- [ ] Non-owners receive HTTP 403 Forbidden on unauthorized edit/delete requests.
