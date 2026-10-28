### 🎯 User Story
As an account owner, I want to edit my profile details—updating my name, short bio, and profile picture—so that my public portfolio accurately reflects who I am.

---

### 📖 Context & Scope
When a logged-in user visits their own profile, they must be able to click an "Edit Profile" button to launch an edit modal, update their details, and save changes via `PATCH /api/users/[id]`.

---

### 🛠️ Technical Implementation Guide

#### 1. Backend Route Handler (`app/api/users/[id]/route.ts`)
- **`PATCH /api/users/[id]`**:
  - Verify session via `await auth()`. Return `401 Unauthorized` if not signed in.
  - Verify ownership: Check if `session.user.id === id`. Return `403 Forbidden` if attempting to modify someone else's profile.
  - Parse request body: `{ name, bio, profileImageUrl }`.
  - Validate:
    - `name`: String, 2–60 chars, trimmed.
    - `bio`: String, max 300 chars, trimmed.
    - `profileImageUrl`: Optional URL string.
  - Update MongoDB user record:
    ```javascript
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, bio, profileImageUrl },
      { new: true, runValidators: true }
    ).select('-passwordHash');
    ```
  - Return `200 OK` with updated user object.

#### 2. Edit Profile Modal Component (`components/profile/EditProfileModal.tsx`)
- Trigger button: "Edit Profile" (rendered only if `session.user?.id === user._id`).
- Modal dialog:
  - Input for Full Name (pre-filled with current name).
  - Textarea for Bio with live character counter: `X / 300`.
  - Input for Profile Image URL (or avatar selector).
  - "Save Changes" button (shows spinner during save).
  - "Cancel" button to dismiss.
- On successful submission, trigger page refresh (`router.refresh()`) and display a success toast notification.

---

### ⚠️ Edge Cases
- Prevent users from editing roles or passwords via this endpoint.
- Strictly block non-owners from modifying another user's bio (server-side check).

---

### ✅ Definition of Done (DoD)
- [ ] "Edit Profile" button appears only when viewing one's own profile.
- [ ] Modal dialog allows editing Name, Bio, and Avatar.
- [ ] Bio character counter constrains input to 300 characters.
- [ ] `PATCH /api/users/[id]` validates ownership and updates MongoDB.
- [ ] Non-owners receive HTTP 403 Forbidden if attempting an unauthorized patch.
