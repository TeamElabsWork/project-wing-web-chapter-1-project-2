### 🎯 User Story
As a photographer ready to share my work, I want to drag and drop my photo file into the upload area or click to select, immediately see a live preview of the image, and fill in the title and description, so that I can review everything before submitting.

---

### 📖 Context & Scope
The upload experience is the creator's entry point to sharing artwork. You will build the client-side upload page at `/upload` featuring a drag-and-drop dropzone, immediate client-side file inspection, and live image preview.

---

### 🛠️ Technical Implementation Guide

#### 1. Drag & Drop Upload Component (`app/upload/page.tsx`)
- Drag & Drop Dropzone:
  - Visual border styling: dashed border that changes color on `dragover` / `dragenter`.
  - Icon and helper text: "Drag your photograph here, or click to browse".
  - Accepts formats: `.jpg`, `.jpeg`, `.png`, `.webp`.
  - Max file size: 10MB.
- Client-Side Validation:
  - If a user drops a non-image file (e.g. PDF, video), reject it with an error banner: "Only JPEG, PNG, or WebP files are accepted."
  - If the file exceeds 10MB, show: "File size exceeds 10MB limit."

#### 2. Live Preview & Replace
- When a valid image file is chosen, read it via `URL.createObjectURL(file)` or `FileReader`.
- Render a live preview card showing the selected photo.
- Add a "Remove / Change Image" button so the user can easily select a different file if desired.

#### 3. Metadata Inputs
- `Title`: Text input, required, character counter (e.g. `0 / 120`).
- `Description`: Textarea, optional, character counter (`0 / 1000`).
- Community Guidelines checkbox: "I confirm this photograph is my original work and complies with community guidelines."

---

### ⚠️ Edge Cases
- Revoke object URLs (`URL.revokeObjectURL`) when replacing or unmounting to prevent browser memory leaks.
- Disable submit button until a valid image file and title are provided.

---

### ✅ Definition of Done (DoD)
- [ ] Drag-and-drop file upload zone highlights on drag hover.
- [ ] Client validation immediately catches invalid formats or oversized files.
- [ ] Instant preview of selected image with replace/remove capability.
- [ ] Title, description, and guidelines confirmation inputs are properly validated.
