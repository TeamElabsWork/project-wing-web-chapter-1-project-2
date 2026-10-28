# Photography Showcase Platform — Chapter 1

> An open, student-first web platform for KIIT University photography enthusiasts to publish, share, and discover original photography work without club membership barriers.

---

## 🏗️ Architecture & Collaboration Model

This codebase is built using a **Contract-Driven, Decoupled Fullstack Architecture** designed for seamless collaboration between **Frontend ("Up to JS")** engineers and **Fullstack** engineers:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PRESENTATION LAYER (Up to JS Team)                    │
│  • React Components (Tailwind CSS, Lucide icons, responsive layouts)        │
│  • Client-side interactions (Lightbox zoom, drag-and-drop dropzone, modals) │
│  • Interactive state (Pagination controller, skeleton cards, toast alerts)  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Consumes typed contracts & endpoints
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA CONTRACTS & TYPES (/types)                      │
│  • Shared TypeScript interfaces: IUser, IPhotograph, ExifData               │
│  • Mock Dataset (/lib/mock-data.ts) for instant zero-dependency UI testing  │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Powered by server logic
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       BACKEND & PLATFORM CORE (Fullstack Team)              │
│  • Next.js 16 API Route Handlers (Auth, Photos CRUD, User Profile PATCH)    │
│  • MongoDB Atlas + Mongoose Models (Users, Photographs with indexes)        │
│  • Auth.js v5 (NextAuth) session tokens & route middleware protection       │
│  • Cloudinary storage streaming upload & asset destruction pipeline         │
│  • Python FastAPI Microservice (/services/image-service) for EXIF & safety  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 👥 Unified Team Roster & Ownership

### Group A: Frontend & UI Specialists ("Up to JS")
*Focus: Visual design, Tailwind CSS, DOM interactivity, drag-and-drop, modals, and client-side validation.*

| Member | GitHub Handle | Assigned Issue | Core Deliverable |
| :--- | :--- | :--- | :--- |
| **Aman Bhardwaj** | `@aman-0905` | **Issue #1** | User Registration Form & Client-Side Validation UI |
| **Apoorv Pal** | `@pandatech717-code` | **Issue #2** | User Login Page & Session UI State Feedback |
| **Ananya Umang** | `@ananya-umang` | **Issue #3** | Public Gallery Hero Banner & Responsive Grid Layout |
| **SATYAM KUMAR** | `@SatyamCodes7` | **Issue #4** | Client-Side Pagination & "Load More" Controller |
| **Samridhi kumari** | `@404SAMfound` | **Issue #5** | Photo Detail Page Presentation & Photographer Card |
| **Tushar Agarwala** | `@Tushar-162` | **Issue #6** | Fullscreen Lightbox Zoom & Modal Overlay |
| **Satyaprakash Samal** | `@satyaprakashs89420-blip` | **Issue #7** | Drag-and-Drop Image Upload Dropzone & Live Preview |
| **Manish Pandey** | `@manishpandey01-max` | **Issue #8** | Public Photographer Portfolio Showcase Layout |
| **Aman Bhardwaj** | `@aman-0905` | **Issue #9** | Edit Photograph Metadata Form Modal |
| **Apoorv Pal** | `@pandatech717-code` | **Issue #10** | Edit Profile Settings Modal & Bio Counter |
| **Ananya Umang** | `@ananya-umang` | **Issue #11** | Community Guidelines Modal & Accessibility (A11y) Polish |
| **Manish Pandey** | `@manishpandey01-max` | **Issue #12** | Gallery Skeleton Cards & Toast Notification Container |

---

### Group B: Systems & Fullstack Engineers ("Fullstack")
*Focus: API Route Handlers, Database Schemas, Session Security, Cloudinary Streaming, and Python Service.*

| Member | GitHub Handle | Assigned Issue | Core Deliverable |
| :--- | :--- | :--- | :--- |
| **Satwik Chandra** | `@SATWIKKKKK` | **Issue #13** | Core System Middleware & Route Protection Guard |
| **Tejash Rai** | `@tejrai07` | **Issue #14** | Registration API Route & Auth.js v5 Credentials Provider |
| **Abhisekh Nayak** | `@AbhisekhNayak21` | **Issue #15** | Cloudinary Upload Pipeline & Multipart Route Handler |
| **Dristi Singh** | `@dristi-singh` | **Issue #16** | Paginated Photos API Route (`GET /api/photos`) |
| **Rishikesh Kumar** | `@Rishikesh2298` | **Issue #17** | Photo Detail Backend Route (`GET /api/photos/[id]`) |
| **Mritunjay Kumar Mandal** | `@Mritunjay4528` | **Issue #18** | User Profile Backend Route (`PATCH /api/users/[id]`) |
| **Saroj Sen** | `@sarojsenn` | **Issue #19** | Photo Owner Edit & Delete API (`DELETE /api/photos/[id]`) |
| **Sumit Bag** | `@Corot-7BSumit` | **Issue #20** | Admin Moderation Override Endpoints & Seed Script |
| **Ayush Sinha** | `@TheRedGrim07` | **Issue #21** | Python FastAPI Photo Intelligence Microservice |

---

## 📁 Repository Structure

```text
project-wing-web-chapter-1-project-2/
├── web/                           # Next.js 16 Web Application
│   ├── app/                       # App Router routes & pages
│   │   ├── (auth)/                # /login & /register
│   │   ├── api/                   # Server Route Handlers
│   │   │   ├── auth/[...nextauth]/# NextAuth v5 session endpoint
│   │   │   ├── photos/            # GET (paginated) & POST (upload)
│   │   │   ├── photos/[id]/       # GET, PATCH, DELETE
│   │   │   └── users/[id]/        # GET & PATCH
│   │   ├── photos/[id]/           # Photo detail page
│   │   ├── users/[id]/            # User portfolio page
│   │   ├── upload/                # Photo upload form
│   │   ├── layout.tsx             # Root layout with Navbar & Footer
│   │   └── page.tsx               # Homepage gallery
│   ├── components/                # Modular React UI components
│   │   ├── gallery/               # PhotoCard, PhotoGrid, Lightbox, Skeletons
│   │   ├── layout/                # Navbar, Footer, GuidelinesModal
│   │   ├── profile/               # EditProfileModal
│   │   └── ui/                    # Modals, Buttons, Toasts
│   ├── lib/                       # Utilities (mongodb.ts, cloudinary.ts, mock-data.ts)
│   ├── models/                    # Mongoose Data Models (User.ts, Photograph.ts)
│   ├── types/                     # Shared TypeScript contracts (index.ts)
│   ├── auth.ts                    # Auth.js configuration
│   └── .env.example
├── services/
│   └── image-service/             # Python FastAPI Photo Intelligence Microservice
│       ├── main.py
│       ├── requirements.txt
│       └── README.md
└── README.md                      # Central engineering guide
```

---

## 🚀 Getting Started

### 1. Web Application (`/web`)
```bash
cd web
npm install
cp .env.example .env.local
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> **Tip for Frontend (JS) Developers**: You can import `mockPhotographs` and `mockUsers` from `@/lib/mock-data` to render and test your components immediately with real sample images without waiting for the database to be connected!

### 2. Python Image Service (`/services/image-service`)
```bash
cd services/image-service
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
# source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Open [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive Swagger API documentation.

---

## 🌿 Git & Pull Request Guidelines

1. Always branch off the latest `dev` branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/issue-X-description
   ```
2. Commit with clean, conventional messages:
   ```bash
   git commit -m "feat(gallery): add lightbox zoom component"
   ```
3. Push your feature branch and open a Pull Request into `dev`:
   ```bash
   git push -u origin feat/issue-X-description
   ```
4. In your PR description, link your issue: `Closes #X`.
5. Once verified by the tech lead, your code will be merged into `dev`.
