### 🎯 User Story
As the platform system, I want a secure API route that receives multipart image payloads, validates file integrity server-side, streams the photo to Cloudinary, and stores metadata in MongoDB, so that published photographs are securely hosted and immediately discoverable.

---

### 📖 Context & Scope
The frontend upload form submits a `FormData` payload containing the image file, title, and description. You will implement the backend route handler `POST /api/photos/upload` to authenticate the user, stream the image to Cloudinary, and create the `Photograph` document in MongoDB.

---

### 🛠️ Technical Implementation Guide

#### 1. Route Handler (`app/api/photos/upload/route.ts`)
- Use `export async function POST(req: NextRequest)`.
- **Session Check**:
  - Verify session via `await auth()`. Return `401 Unauthorized` if not signed in.
- **Multipart Data Extraction**:
  - `const formData = await req.formData();`
  - Retrieve `file = formData.get('file') as File;`
  - Retrieve `title = formData.get('title') as string;`
  - Retrieve `description = formData.get('description') as string;`
- **Server-Side Validation**:
  - Verify MIME type (`image/jpeg`, `image/png`, `image/webp`).
  - Verify file size <= 10MB (`file.size <= 10 * 1024 * 1024`).
  - Verify title is present and non-empty. Return `400 Bad Request` if validation fails.
- **Cloudinary Storage**:
  - Convert file into Buffer: `const bytes = await file.arrayBuffer(); const buffer = Buffer.from(bytes);`
  - Call Cloudinary upload helper: `const uploadResult = await uploadImageToCloudinary(buffer);` (returns `secure_url` and `public_id`).
- **Database Persistence**:
  - Create Photograph record:
    ```javascript
    await connectToDatabase();
    const newPhoto = await Photograph.create({
      owner: session.user.id,
      title: title.trim(),
      description: description ? description.trim() : '',
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });
    ```
  - Return `201 Created` with `{ success: true, photo: newPhoto }`.

---

### ⚠️ Edge Cases
- Fail-safe rollback: If MongoDB creation fails after Cloudinary upload succeeds, invoke `deleteImageFromCloudinary(uploadResult.public_id)` to prevent orphaned files.
- Ensure route handles network interruptions gracefully with clear 500 error messages.

---

### ✅ Definition of Done (DoD)
- [ ] Authenticated `POST /api/photos/upload` route handler implemented.
- [ ] Server enforces file type and size constraints.
- [ ] Image uploaded to Cloudinary; `imageUrl` and `imagePublicId` saved in MongoDB.
- [ ] Returns HTTP 201 with created photograph document.
- [ ] Unauthenticated requests are rejected with HTTP 401.
