### 🎯 User Story
As a viewer admiring a photograph on its detail page, I want to click on the image to open a distraction-free fullscreen Lightbox modal, so that I can examine the photo at maximum resolution with zero surrounding clutter.

---

### 📖 Context & Scope
Photographers love having their work seen in full glory. As an HTML/CSS & UI specialist, you will build a clean, animated fullscreen Lightbox modal (`components/gallery/PhotoLightbox.tsx`) that opens when the user clicks the main image on the photo detail page.

---

### 🛠️ Technical Implementation Guide

#### 1. Lightbox Component (`components/gallery/PhotoLightbox.tsx`)
- Props: `imageUrl: string`, `title: string`, `isOpen: boolean`, `onClose: () => void`.
- When open:
  - Dark semi-transparent backdrop overlay (`bg-black/95`).
  - Centered high-resolution image fitted to the viewport dimensions (`max-h-[90vh]`, `max-w-[90vw]`, `object-contain`).
  - Subtle caption at the bottom displaying the photo title.
  - Close button (`X` icon from `lucide-react`) in the top-right corner.

#### 2. Keyboard & Touch Interactions
- **ESC Key listener**: Pressing `Escape` key closes the Lightbox modal.
- **Click backdrop to close**: Clicking outside the image on the dark overlay closes the Lightbox.
- **Zoom toggle**: Clicking on the image inside the Lightbox toggles between fit-to-screen and 100% zoom with cursor `zoom-in` / `zoom-out`.

#### 3. Integration
- In `app/photos/[id]/page.tsx` (or an interactive client wrapper), attach `onClick={() => setIsLightboxOpen(true)}` to the main photograph.

---

### ⚠️ Edge Cases
- Prevent background page scrolling while the Lightbox modal is open (`document.body.style.overflow = 'hidden'`).
- Ensure keyboard focus is trapped or restored smoothly when closing.

---

### ✅ Definition of Done (DoD)
- [ ] Clicking photograph on detail page launches the fullscreen Lightbox.
- [ ] Close button, backdrop click, and Escape key all cleanly dismiss the Lightbox.
- [ ] Image scales responsively without exceeding screen boundaries or warping aspect ratio.
- [ ] Background page scrolling is locked while Lightbox is visible.
