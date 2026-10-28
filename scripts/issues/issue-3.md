### 🎯 User Story
As a visitor browsing the platform, I want to see a visually stunning homepage with a welcoming hero banner and an organized, responsive photo grid, so that I am excited to discover student photography work on any device.

---

### 📖 Context & Scope
The public discovery gallery is the primary showcase of the application. As an HTML/CSS specialist, you will design and implement the homepage layout (`app/page.tsx`), header hero section, and responsive CSS grid to showcase photographs cleanly.

---

### 🛠️ Technical Implementation Guide

#### 1. Hero Header Section (`app/page.tsx`)
- Headline: "Original Stories Captured Through Student Lenses" (with warm amber highlight accents).
- Subtitle: "An open showcase platform for university photographers. No club restrictions. Pure passion, shared."
- Visual accent elements: subtle gradients, badge counters (e.g. "Over 100+ Student Captures"), and call-to-action buttons ("Explore Gallery", "Join Showcase").

#### 2. Responsive Photo Grid Container
- CSS Grid with Tailwind:
  - Mobile screens (< 640px): 1 column with comfortable touch padding.
  - Tablets (640px–1023px): 2 columns.
  - Desktop screens (1024px+): 3 to 4 columns.
- Integrate the reusable `<PhotoCard />` component from `@/components/gallery/PhotoCard`.
- Ensure consistent aspect ratio containers (`aspect-[4/3]`) to prevent layout shifts as images load.

#### 3. Empty & Loading Skeleton States
- Create `components/gallery/PhotoCardSkeleton.tsx` for animated loading placeholders.
- Design a beautiful empty state with an icon and message for when no photos have been published yet.

---

### ⚠️ Edge Cases
- Test extreme viewport widths (320px up to 2560px ultra-wide).
- Ensure zero horizontal scrolling or clipping on small phone screens.

---

### ✅ Definition of Done (DoD)
- [ ] Engaging Hero section with clear typography and call-to-action.
- [ ] Responsive grid adjusting smoothly from 1 to 4 columns across breakpoints.
- [ ] Visual skeleton card component designed for loading states.
- [ ] Empty state UI designed with friendly graphics and call-to-action.
