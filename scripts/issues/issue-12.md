### 🎯 User Story
As a platform administrator, I want to remove photographs that violate community guidelines and display clear upload rules to all users, so that our photography showcase remains a respectful, high-quality, and legally compliant platform.

---

### 📖 Context & Scope
Because uploads are open to everyone, at least one admin must be able to remove inappropriate or copyrighted content. You will implement the admin moderation delete capability and build the Community Guidelines modal (`components/layout/GuidelinesModal.tsx`).

---

### 🛠️ Technical Implementation Guide

#### 1. Admin Moderation Delete Logic
- On `PhotoCard` and `/photos/[id]` detail view:
  - Check if `session.user?.role === 'admin'`.
  - If admin, display an amber/red "Admin Moderation" button / badge on the photo.
  - Clicking launches a moderation confirmation dialog: "Admin Action: Remove this photograph for community guidelines violation?".
  - Submits to `DELETE /api/photos/[id]`, which allows admin deletion override.
  - Purges file in Cloudinary and deletes record in MongoDB.

#### 2. Community Guidelines Modal (`components/layout/GuidelinesModal.tsx`)
- Build an accessible modal component detailing the platform's rules:
  - 1. **Original Work Only**: Photographers must only upload images they personally created.
  - 2. **Respect & Safety**: No explicit, hateful, or copyrighted imagery.
  - 3. **Non-Commercial**: The platform is an open student portfolio showcase, not a commercial marketplace.
  - 4. **Moderation Authority**: Violating content or accounts will be permanently removed by administrators.
- Accessible via a button in the `Footer` and linked from the `/upload` form.
- Support Escape key to close, and click-outside backdrop dismiss.

---

### ⚠️ Edge Cases
- Strictly verify `session.user.role === 'admin'` on the server before permitting non-owner deletions.
- Never show admin moderation controls to regular users.

---

### ✅ Definition of Done (DoD)
- [ ] Admin users see a moderation delete action on all photographs across the platform.
- [ ] Non-admin users cannot trigger admin deletions (server returns 403 Forbidden).
- [ ] Community Guidelines modal renders cleanly and is accessible from Footer and Upload screen.
- [ ] WCAG AA accessible contrast, keyboard closable (Escape key).
