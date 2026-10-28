# Photography Showcase Platform — Chapter 1 (Project 2)

> An open web platform for KIIT University students and photography enthusiasts to publish, share, and discover original photography work without club membership barriers.

---

## 🛠️ Tech Stack & Architecture

This repository is structured as a lightweight monorepo containing the main web application and an auxiliary image intelligence microservice:

- **Web Application (`/web`)**:
  - **Framework**: Next.js 16 (App Router, React 19, TypeScript)
  - **Styling**: Tailwind CSS
  - **Database & ODM**: MongoDB Atlas + Mongoose
  - **Authentication**: Auth.js / NextAuth v5 (Credentials provider with bcrypt password hashing)
  - **Image Storage**: Cloudinary SDK
- **Photo Intelligence Service (`/services/image-service`)**:
  - **Framework**: Python FastAPI
  - **Capabilities**: Camera EXIF metadata extraction (`exifread`, `Pillow`) & automated safety/moderation filtering

---

## 👥 Team & Ownership Roster

| Developer Name | GitHub Handle | Assigned Focus | Key Issues |
| :--- | :--- | :--- | :--- |
| **Aman Bhardwaj** | `@aman-0905` | Auth & Upload Integration | Issue #1 (Registration), Issue #8 (Upload Pipeline) |
| **Apoorv Pal** | `@pandatech717-code` | Auth & Profile Settings | Issue #2 (Login & Session), Issue #10 (Edit Profile) |
| **SATYAM KUMAR** | `@SatyamCodes7` | Gallery Logic & Photo Actions | Issue #4 (Pagination), Issue #11 (Photo Edit/Delete) |
| **Samridhi kumari** | `@404SAMfound` | Detail Page & Moderation | Issue #5 (Photo Detail View), Issue #12 (Admin Moderation) |
| **Satyaprakash Samal** | `@satyaprakashs89420-blip` | Upload Frontend & Preview | Issue #7 (Drag & Drop Upload UI) |
| **Tushar Agarwala** | `@Tushar-162` | Photo Lightbox & Zoom UI | Issue #6 (Fullscreen Lightbox Viewer) |
| **Ananya Umang** | `@ananya-umang` | Public Gallery Layout & Hero | Issue #3 (Responsive Gallery Grid) |
| **Manish Pandey** | `@manishpandey01-max` | Photographer Portfolio View | Issue #9 (User Profile Page) |

---

## 📁 Repository Structure

```text
project-wing-web-chapter-1-project-2/
├── web/                           # Next.js 16 Web Application
│   ├── app/                       # App Router routes & pages
│   │   ├── (auth)/                # Login & Register views
│   │   ├── api/                   # API Route Handlers (auth, photos, users)
│   │   ├── photos/[id]/           # Photo detail page
│   │   ├── users/[id]/            # User profile page
│   │   ├── upload/                # Photo upload form
│   │   ├── layout.tsx             # Root layout with Navbar & Footer
│   │   └── page.tsx               # Homepage gallery
│   ├── components/                # Modular React UI components
│   │   ├── gallery/               # PhotoCard, PhotoGrid, Lightbox
│   │   ├── layout/                # Navbar, Footer, GuidelinesModal
│   │   └── ui/                    # Modals, Buttons, Toasts
│   ├── lib/                       # Utilities (mongodb.ts, cloudinary.ts)
│   ├── models/                    # Mongoose Data Models (User.ts, Photograph.ts)
│   ├── auth.ts                    # Auth.js configuration
│   └── .env.example
├── services/
│   └── image-service/             # Python FastAPI Photo Intelligence Microservice
│       ├── main.py
│       ├── requirements.txt
│       └── README.md
└── README.md                      # Team onboarding guide
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

## 🌿 Git & Collaboration Workflow

1. Always pull latest `dev` before creating your branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/issue-X-description
   ```
2. Commit with clean conventional messages:
   ```bash
   git commit -m "feat(auth): add client-side validation to registration form"
   ```
3. Push your feature branch and open a Pull Request into `dev`:
   ```bash
   git push -u origin feat/issue-X-description
   ```
4. In your PR description, link your issue: `Closes #X`.
5. Once reviewed and approved by the tech lead, the branch will merge into `dev`.
