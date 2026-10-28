import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const REPO = 'TeamElabsWork/project-wing-web-chapter-1-project-2';
const ghPath = '"C:\\Program Files\\GitHub CLI\\gh.exe"';

const issues = [
  // --- UP TO JS (FRONTEND) ISSUES ---
  {
    title: '[Frontend] User Registration Form & Client-Side Validation UI',
    assignee: 'aman-0905',
    group: 'Up to JS',
    labels: ['frontend', 'auth', 'ui'],
    body: `### 🎯 Objective
Build the client-side user registration interface at \`/register\` with responsive Tailwind CSS layout and client validation.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build centered card layout for \`app/(auth)/register/page.tsx\` with dark aesthetic.
- [ ] Create input components for Full Name, Email, Password, and Confirm Password.
- [ ] Implement client-side validation logic:
  - Check non-empty name (>= 2 chars).
  - Check email format with regex (encouraging \`@kiit.ac.in\`).
  - Check password length (>= 6 chars).
  - Verify password and confirm password match.
- [ ] Display inline error warnings in red below inputs when validation fails.
- [ ] Connect form submission to \`POST /api/auth/register\` with loading spinner on the submit button.
- [ ] Display an alert banner on server rejection (e.g. email duplicate).

### 🔍 Definition of Done
- Registration form responds smoothly across mobile and desktop.
- Mismatched or invalid inputs are flagged before submission.
- Submit button shows disabled loading state during network request.`
  },
  {
    title: '[Frontend] Edit Photograph Metadata Form Modal',
    assignee: 'aman-0905',
    group: 'Up to JS',
    labels: ['frontend', 'modal', 'ui'],
    body: `### 🎯 Objective
Create a modal dialog allowing photographers to edit the title and description of their published artwork.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create \`components/gallery/EditPhotoModal.tsx\` using Tailwind CSS.
- [ ] Pre-populate inputs with existing photo title and description.
- [ ] Add live character counters (Title: max 120 chars, Description: max 1000 chars).
- [ ] Implement Save and Cancel buttons with smooth modal transition.
- [ ] Submit form data via \`PATCH /api/photos/[id]\`.
- [ ] Show success toast alert upon saving and refresh UI view.

### 🔍 Definition of Done
- Modal opens and closes with backdrop overlay.
- Character limits are respected.
- Submits cleanly and reflects updated title/description.`
  },
  {
    title: '[Frontend] User Login Form & Session UI State Feedback',
    assignee: 'pandatech717-code',
    group: 'Up to JS',
    labels: ['frontend', 'auth', 'ui'],
    body: `### 🎯 Objective
Build the user sign-in page at \`/login\` with credentials inputs and clear user feedback.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build login form container in \`app/(auth)/login/page.tsx\`.
- [ ] Form fields: Email Address and Password with show/hide password toggle.
- [ ] Add "Don't have an account? Sign up" redirect link.
- [ ] Check URL search query for \`?registered=true\` to display a green success banner.
- [ ] Connect to Auth.js credentials sign-in.
- [ ] Display an actionable red error banner on invalid login attempts ("Invalid email or password").

### 🔍 Definition of Done
- Clean, accessible sign-in form.
- Clear error handling for bad credentials without page refresh crash.
- Successful login redirects user to home gallery.`
  },
  {
    title: '[Frontend] Edit Profile Settings Modal & Bio Counter',
    assignee: 'pandatech717-code',
    group: 'Up to JS',
    labels: ['frontend', 'profile', 'ui'],
    body: `### 🎯 Objective
Build an interactive "Edit Profile" modal dialog allowing users to update their display name, bio, and avatar.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create \`components/profile/EditProfileModal.tsx\`.
- [ ] Input fields: Full Name, Short Bio, and Avatar Image URL.
- [ ] Implement live character countdown for Bio (\`0 / 300\`).
- [ ] Show live avatar preview thumbnail when a URL is typed.
- [ ] Submit payload via \`PATCH /api/users/[id]\`.
- [ ] Close modal and trigger visual update on success.

### 🔍 Definition of Done
- Accessible modal dialog with focus trap and ESC key dismiss.
- Character counter strictly limits bio to 300 characters.
- Profile changes reflect immediately on the profile card.`
  },
  {
    title: '[Frontend] Public Gallery Hero Banner & Responsive Grid Layout',
    assignee: 'ananya-umang',
    group: 'Up to JS',
    labels: ['frontend', 'layout', 'css'],
    body: `### 🎯 Objective
Design and implement the public gallery homepage layout (\`app/page.tsx\`) with hero branding and responsive grid.

### 📋 Detailed Tasks & Sub-issues
- [ ] Style the Hero header section with warm amber gradient typography accents.
- [ ] Add subheadline describing the open student showcase mission.
- [ ] Add quick call-to-action buttons ("Explore Captures", "Submit Photograph").
- [ ] Implement CSS Grid container for photos:
  - Mobile (< 640px): 1 column.
  - Tablet (640px - 1023px): 2 columns.
  - Desktop (1024px+): 3 to 4 columns.
- [ ] Integrate \`<PhotoCard />\` component with consistent \`aspect-[4/3]\` frames.

### 🔍 Definition of Done
- Responsive layout with zero horizontal overflow across 320px–1920px.
- High-contrast visual typography meeting WCAG AA standards.
- Smooth grid spacing with Tailwind gap utilities.`
  },
  {
    title: '[Frontend] Community Guidelines Modal & Accessibility (A11y) Polish',
    assignee: 'ananya-umang',
    group: 'Up to JS',
    labels: ['frontend', 'accessibility', 'ui'],
    body: `### 🎯 Objective
Create the platform Community Guidelines modal explaining copyright and content rules, and audit UI accessibility.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create \`components/layout/GuidelinesModal.tsx\`.
- [ ] Document 4 core platform principles:
  1. Original Photography Only (no third-party downloads).
  2. Respect & Safety (no explicit or hateful imagery).
  3. Non-Commercial Student Showcase.
  4. Admin Moderation Authority.
- [ ] Connect modal trigger button in Footer and Upload page.
- [ ] Audit global color contrast (WCAG AA) and add ARIA labels to icon buttons.

### 🔍 Definition of Done
- Guidelines modal opens smoothly from footer and upload flows.
- ESC key and backdrop click close modal.
- Screen readers can navigate form inputs and navigation links.`
  },
  {
    title: '[Frontend] Client-Side Pagination & Infinite "Load More" Controller',
    assignee: 'SatyamCodes7',
    group: 'Up to JS',
    labels: ['frontend', 'javascript', 'api'],
    body: `### 🎯 Objective
Implement client-side pagination controller fetching and appending subsequent batches of photographs.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create client wrapper component \`components/gallery/GalleryGrid.tsx\`.
- [ ] Manage local photo state initialized with first 12 photos.
- [ ] Add "Load More Photographs" button below the grid.
- [ ] Handle fetch call: \`fetch('/api/photos?page=' + nextPage + '&limit=12')\`.
- [ ] Concatenate newly returned photos to state without duplicates.
- [ ] Show loading spinner inside the button while fetching.
- [ ] Show "All captures loaded" text when \`hasMore === false\`.

### 🔍 Definition of Done
- Clicking "Load More" smoothly appends 12 new photo cards.
- Network loading state is indicated with spinner.
- Gracefully handles network errors with a retry button.`
  },
  {
    title: '[Frontend] Photo Owner 3-Dots Action Menu & Delete Confirmation Dialog',
    assignee: 'SatyamCodes7',
    group: 'Up to JS',
    labels: ['frontend', 'ui', 'javascript'],
    body: `### 🎯 Objective
Build the creator action menu on photo cards and detail pages with an edit option and delete confirmation modal.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build 3-dots dropdown menu icon on \`PhotoCard.tsx\` visible only to photo owners.
- [ ] Add menu options: "Edit Metadata" and "Delete Photograph".
- [ ] Build Delete Confirmation Modal ("Are you sure you want to delete this photo? This cannot be undone.").
- [ ] Trigger \`DELETE /api/photos/[id]\` upon confirmation.
- [ ] Handle successful deletion by removing card from DOM and showing a toast notification.

### 🔍 Definition of Done
- Dropdown menu opens and closes cleanly on click outside.
- Confirmation dialog prevents accidental one-click deletions.
- Deletion triggers visual feedback without crashing page.`
  },
  {
    title: '[Frontend] Photo Detail View Presentation & Photographer Attribution Card',
    assignee: '404SAMfound',
    group: 'Up to JS',
    labels: ['frontend', 'ui', 'layout'],
    body: `### 🎯 Objective
Build the visual layout of the single photo detail page at \`/photos/[id]\`.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build presentation layout in \`app/photos/[id]/page.tsx\`.
- [ ] High-resolution image viewport with responsive height constraints (\`max-h-[80vh]\`).
- [ ] Title header, date formatting, and description paragraph.
- [ ] Photographer Attribution Card:
  - Avatar image with initials fallback.
  - Name linking to \`/users/[ownerId]\`.
  - Bio preview and "View Portfolio" button.
- [ ] "← Back to Gallery" navigation link.

### 🔍 Definition of Done
- Image scales cleanly without warping aspect ratio.
- Photographer details link correctly to their profile.
- Mobile view stacks image and details vertically.`
  },
  {
    title: '[Frontend] Admin Moderation Action UI Badge & Warning Modal',
    assignee: '404SAMfound',
    group: 'Up to JS',
    labels: ['frontend', 'admin', 'ui'],
    body: `### 🎯 Objective
Build the frontend visual controls allowing administrators to flag and remove policy-violating photographs.

### 📋 Detailed Tasks & Sub-issues
- [ ] Inspect user session role (\`role === 'admin'\`).
- [ ] Display an "Admin Moderation" badge and red "Remove Content" button on photo cards for admins.
- [ ] Create Admin Removal Warning Modal ("Policy Enforcement: Remove this photo for guidelines violation?").
- [ ] Connect modal confirmation to delete handler with admin feedback toast.

### 🔍 Definition of Done
- Controls are completely invisible to regular users.
- Admin button triggers confirmation modal.
- Provides immediate visual feedback upon removal.`
  },
  {
    title: '[Frontend] Fullscreen Photo Lightbox Zoom & Modal Overlay',
    assignee: 'Tushar-162',
    group: 'Up to JS',
    labels: ['frontend', 'ui', 'interactive'],
    body: `### 🎯 Objective
Build a distraction-free fullscreen Lightbox component allowing users to view photographs at maximum resolution.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create \`components/gallery/PhotoLightbox.tsx\`.
- [ ] Dark backdrop overlay (\`bg-black/95\`) with smooth fade-in animation.
- [ ] Centered high-resolution image fitted to screen dimensions (\`max-h-[90vh]\`, \`max-w-[90vw]\`).
- [ ] Close button in top-right corner (\`X\` icon).
- [ ] Listen for Escape key press to dismiss modal.
- [ ] Click outside image on backdrop closes modal.
- [ ] Disable body page scroll while Lightbox is open.

### 🔍 Definition of Done
- Clicking photo on detail page launches fullscreen Lightbox.
- Image fits screen without distortion.
- Escape key and backdrop clicks dismiss cleanly.`
  },
  {
    title: '[Frontend] Drag-and-Drop Image Upload Dropzone & Live Preview',
    assignee: 'satyaprakashs89420-blip',
    group: 'Up to JS',
    labels: ['frontend', 'ui', 'upload'],
    body: `### 🎯 Objective
Build the creator upload dropzone at \`/upload\` with drag-and-drop interactions and live client preview.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build drag-and-drop upload zone in \`app/upload/page.tsx\`.
- [ ] Highlight dashed border when file is dragged over area.
- [ ] Validate file type on drop (JPEG, PNG, WebP) and size (<= 10MB).
- [ ] Generate instant client preview of selected image using \`URL.createObjectURL\`.
- [ ] Add "Change Image" button to reset selection.
- [ ] Add Title and Description inputs with validation indicators.

### 🔍 Definition of Done
- Dragging file over zone visually highlights container.
- Live preview displays immediately upon selection.
- Clear error banner if file is not an image or exceeds 10MB.`
  },
  {
    title: '[Frontend] Public Photographer Portfolio Showcase Layout (/users/[id])',
    assignee: 'manishpandey01-max',
    group: 'Up to JS',
    labels: ['frontend', 'profile', 'layout'],
    body: `### 🎯 Objective
Build the public portfolio view at \`/users/[id]\` showcasing a creator's bio and gallery.

### 📋 Detailed Tasks & Sub-issues
- [ ] Build layout in \`app/users/[id]/page.tsx\`.
- [ ] Header banner with large user avatar, name, join date, and bio text.
- [ ] Stat chip: "📸 X Photographs Published".
- [ ] Responsive grid rendering all photos published by this creator using \`<PhotoCard />\`.
- [ ] Empty state card when creator has not uploaded any photos yet.

### 🔍 Definition of Done
- Displays photographer header and collection cleanly.
- Grid matches global gallery responsive breakpoints.
- Empty state displays friendly illustration and text.`
  },
  {
    title: '[Frontend] Gallery Loading Skeletons, Empty States & Toast Alerts',
    assignee: 'manishpandey01-max',
    group: 'Up to JS',
    labels: ['frontend', 'ui', 'states'],
    body: `### 🎯 Objective
Build core UI states across the app: animated loading skeleton cards, empty illustrations, and global toast alerts.

### 📋 Detailed Tasks & Sub-issues
- [ ] Enhance \`components/ui/Skeleton.tsx\` with shimmer pulse animations.
- [ ] Build empty state component with photography icon and call to action.
- [ ] Integrate \`components/ui/Toast.tsx\` provider in root layout.
- [ ] Test toast trigger functions for success, error, and info notices.

### 🔍 Definition of Done
- Skeleton cards display while data is loading.
- Empty state renders gracefully when 0 photos match.
- Toasts appear smoothly in bottom-right corner and auto-dismiss after 4s.`
  },

  // --- FULLSTACK & BACKEND ISSUES ---
  {
    title: '[Backend] Next.js 16 Base Routing, Route Middleware Guard & Shared API Contracts',
    assignee: 'SATWIKKKKK',
    group: 'Fullstack',
    labels: ['backend', 'architecture', 'middleware'],
    body: `### 🎯 Objective
Configure server middleware route protection and shared API contract types.

### 📋 Detailed Tasks & Sub-issues
- [ ] Create \`middleware.ts\` guarding private paths (\`/upload/:path*\`, \`/settings/:path*\`).
- [ ] Redirect unauthenticated visitors to \`/login?callbackUrl=...\`.
- [ ] Ensure cached MongoDB connection singleton in \`lib/mongodb.ts\` handles serverless pooling.
- [ ] Validate TypeScript models for User and Photograph against \`types/index.ts\`.

### 🔍 Definition of Done
- Middleware redirects unauthorized requests to login.
- Zero connection leaks in MongoDB pool during hot reloads.
- Shared types align with all API payload structures.`
  },
  {
    title: '[Backend] User Registration API Route & Auth.js Credentials Provider',
    assignee: 'tejrai07',
    group: 'Fullstack',
    labels: ['backend', 'auth', 'security'],
    body: `### 🎯 Objective
Implement secure credential authentication backend and registration route handler.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`POST /api/auth/register\` route handler:
  - Validate email domain (\`@kiit.ac.in\` check with toggle).
  - Check duplicate email with HTTP 409 Conflict response.
  - Hash passwords using \`bcryptjs\` with salt rounds >= 10.
  - Save new User document in MongoDB.
- [ ] Configure Auth.js v5 Credentials provider in \`auth.ts\`.
- [ ] Attach user ID and role to session and JWT callbacks.

### 🔍 Definition of Done
- Passwords stored in MongoDB are strictly bcrypt hashes.
- Duplicate emails rejected with clear 409 error.
- Valid credentials issue secure HTTP-only session cookies.`
  },
  {
    title: '[Backend] Cloudinary Image Storage Streaming Pipeline & Upload Route Handler',
    assignee: 'AbhisekhNayak21',
    group: 'Fullstack',
    labels: ['backend', 'storage', 'cloudinary'],
    body: `### 🎯 Objective
Implement server-side multipart photo upload route handler and Cloudinary streaming pipeline.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`POST /api/photos/upload\` route handler.
- [ ] Verify active session (HTTP 401 if unauthenticated).
- [ ] Validate MIME type (JPEG/PNG/WebP) and file size (<= 10MB) on server.
- [ ] Stream image buffer to Cloudinary using SDK in \`lib/cloudinary.ts\`.
- [ ] Save Photograph document in MongoDB linking \`owner: session.user.id\`.
- [ ] Return HTTP 201 with newly created photo document.

### 🔍 Definition of Done
- Rejects non-image or oversized uploads with HTTP 400.
- Asset stored in Cloudinary; URL and public_id saved in MongoDB.
- Deletes asset from Cloudinary if database insertion fails (rollback).`
  },
  {
    title: '[Backend] Paginated Photographs API Handler & MongoDB Index Optimization',
    assignee: 'dristi-singh',
    group: 'Fullstack',
    labels: ['backend', 'database', 'api'],
    body: `### 🎯 Objective
Implement high-performance paginated API route fetching published photos for the gallery feed.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`GET /api/photos\` route handler.
- [ ] Support query params: \`page\` (default 1) and \`limit\` (default 12).
- [ ] Query MongoDB with \`.skip()\` and \`.limit()\`, sorted by \`createdAt: -1\`.
- [ ] Populate owner fields: \`name\`, \`profileImageUrl\`, \`_id\`.
- [ ] Ensure descending index on \`photographs.createdAt\` is active.
- [ ] Return standardized response: \`{ photos, pagination: { page, limit, total, hasMore } }\`.

### 🔍 Definition of Done
- Returns 12 newest photos per batch.
- Response includes complete pagination metadata.
- Query executes in < 50ms using MongoDB index.`
  },
  {
    title: '[Backend] Photograph Detail & Metadata Population Route Handler',
    assignee: 'Rishikesh2298',
    group: 'Fullstack',
    labels: ['backend', 'api', 'database'],
    body: `### 🎯 Objective
Implement backend data retrieval for individual photograph pages with author population.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`GET /api/photos/[id]\` route handler.
- [ ] Validate MongoDB ObjectId format (return 400 if invalid ID format).
- [ ] Query Photograph by ID and populate author fields (\`name\`, \`bio\`, \`profileImageUrl\`).
- [ ] Return 404 Not Found if photo does not exist.
- [ ] Include EXIF metadata object if present in database.

### 🔍 Definition of Done
- Returns full photo document with author info for valid IDs.
- Returns 404 for missing IDs.
- Prevents database error crashes on malformed ID strings.`
  },
  {
    title: '[Backend] User Profile & Bio/Avatar Mutation Route Handler',
    assignee: 'Mritunjay4528',
    group: 'Fullstack',
    labels: ['backend', 'profile', 'security'],
    body: `### 🎯 Objective
Implement user profile retrieval and update endpoints with strict ownership verification.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`GET /api/users/[id]\` returning user public profile and upload count.
- [ ] Implement \`PATCH /api/users/[id]\` route handler.
- [ ] Enforce session check: user must be signed in.
- [ ] Enforce ownership check: \`session.user.id === params.id\` (HTTP 403 Forbidden for others).
- [ ] Validate and sanitize \`name\` (2-60 chars) and \`bio\` (max 300 chars).
- [ ] Update document in MongoDB and return updated user object.

### 🔍 Definition of Done
- Unauthenticated requests return HTTP 401.
- Non-owners receive HTTP 403 Forbidden.
- Updates persist cleanly in MongoDB.`
  },
  {
    title: '[Backend] Photo Owner Edit & Delete with Cloudinary Permanent Purge',
    assignee: 'sarojsenn',
    group: 'Fullstack',
    labels: ['backend', 'storage', 'database'],
    body: `### 🎯 Objective
Implement owner-only photo editing and permanent deletion with Cloudinary asset cleanup.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`PATCH /api/photos/[id]\`:
  - Verify session and verify ownership (\`photo.owner === session.user.id\`).
  - Update \`title\` and \`description\`.
- [ ] Implement \`DELETE /api/photos/[id]\`:
  - Verify user is owner OR admin.
  - Call Cloudinary destroy utility to delete image file permanently.
  - Delete photograph document from MongoDB.
  - Return HTTP 200 with success status.

### 🔍 Definition of Done
- Non-owners receive HTTP 403 Forbidden on update or delete attempts.
- Deletion removes asset from Cloudinary AND deletes record in MongoDB.
- Zero orphaned storage files remaining.`
  },
  {
    title: '[Backend] Admin Moderation Override Endpoints & Admin Database Seeding Script',
    assignee: 'Corot-7BSumit',
    group: 'Fullstack',
    labels: ['backend', 'admin', 'security'],
    body: `### 🎯 Objective
Implement administrator moderation delete overrides and automated admin seeding script.

### 📋 Detailed Tasks & Sub-issues
- [ ] Verify \`session.user.role === 'admin'\` server-side helper function.
- [ ] Enhance \`DELETE /api/photos/[id]\` to allow admin overrides regardless of owner.
- [ ] Implement \`DELETE /api/admin/users/[id]\` to ban infringing accounts and purge their photos.
- [ ] Write \`scripts/seed-admin.ts\` to promote an initial email to \`role: 'admin'\`.

### 🔍 Definition of Done
- Admin can delete any photo or infringing user account.
- Non-admins blocked with HTTP 403 Forbidden.
- Seed script runs via command line and grants admin privileges.`
  },
  {
    title: '[Python Microservice] FastAPI Photo Intelligence: Camera EXIF Parsing & Safety Filter',
    assignee: 'TheRedGrim07',
    group: 'Fullstack',
    labels: ['python', 'fastapi', 'microservice'],
    body: `### 🎯 Objective
Maintain and test the standalone Python FastAPI microservice extracting camera EXIF metadata and safety checks.

### 📋 Detailed Tasks & Sub-issues
- [ ] Implement \`POST /api/v1/analyze-image\` in \`services/image-service/main.py\`.
- [ ] Parse EXIF tags using \`Pillow\` and \`exifread\` (Make, Model, Lens, Focal Length, Aperture, Shutter Speed, ISO).
- [ ] Format rational exposure numbers into standard strings (e.g. \`1/500s\`, \`f/2.8\`).
- [ ] Implement basic image corruption and safety heuristic checks.
- [ ] Provide \`requirements.txt\` and local launch instructions.

### 🔍 Definition of Done
- Service runs via \`uvicorn main:app --reload --port 8000\`.
- Successfully extracts camera specs from uploaded sample images.
- Handles images with no EXIF tags gracefully with null values.`
  }
];

console.log(`Starting creation of ${issues.length} detailed issues across 17 team members...`);

for (let i = 0; i < issues.length; i++) {
  const issue = issues[i];
  console.log(`Creating [${i + 1}/${issues.length}] for @${issue.assignee} (${issue.group}): ${issue.title}...`);

  const tempFile = path.resolve(process.cwd(), `scripts/temp-issue-${i + 1}.md`);
  fs.writeFileSync(tempFile, issue.body, 'utf-8');

  try {
    const cmd = `${ghPath} issue create --repo ${REPO} --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${tempFile}" --assignee "${issue.assignee}"`;
    const out = execSync(cmd, { encoding: 'utf-8' });
    console.log(`  ✓ Created & Assigned: ${out.trim()}`);
  } catch (err) {
    try {
      const fallbackCmd = `${ghPath} issue create --repo ${REPO} --title "${issue.title.replace(/"/g, '\\"')}" --body-file "${tempFile}"`;
      const fallbackOut = execSync(fallbackCmd, { encoding: 'utf-8' });
      const issueUrl = fallbackOut.trim();
      console.log(`  ✓ Created: ${issueUrl}`);

      const commentCmd = `${ghPath} issue comment ${issueUrl} --body "Assigned to @${issue.assignee} (${issue.group} team). Note: Please accept your repository collaborator invitation to activate your assignee badge."`;
      execSync(commentCmd, { encoding: 'utf-8' });
      console.log(`  ✓ Tagged @${issue.assignee}`);
    } catch (e) {
      console.error(`  ✗ Error: ${e.message}`);
    }
  } finally {
    if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  }
}

console.log("All issues processed successfully!");
