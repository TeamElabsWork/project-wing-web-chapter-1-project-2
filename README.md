# 🎮 KIIT SocietyDex

> **A Pokémon-Inspired Society Discovery Platform for KIIT**  
> *Tagline: Gotta Know 'Em All — KIIT Edition*

---

## 📖 Project Overview

**KIIT SocietyDex** is a gamified web platform designed to showcase and explore the diverse societies and student clubs of KIIT University. Taking inspiration from the classic Pokémon Pokédex, every university society is represented as a collectible Pokédex-style entry with its own number, type, abilities, and animated stat bars.

### 🎮 The Pokédex Concept Mapping

| Pokémon Pokédex 🎮 | KIIT SocietyDex 🏛️ | Description |
| :--- | :--- | :--- |
| **Unique Pokémon Card** | **Unique Society Card** | Every society gets a collectible entry with a unique Dex number (`#001`, `#002`). |
| **Pokémon Type & Abilities** | **Society Domain & Activities** | Categorized by domain: ⚡ Tech, 🧠 AI/ML, ⚙️ Robotics, 📷 Creative, 🎵 Sound, 💃 Arts, 🏆 Sports, 💰 Business, 🌱 Social. |
| **Battle Stats & Evolution** | **Society Information & Stats** | Game-inspired visual stat bars: Activity, Events, Community, Innovation, and Technical Skill. |
| **Pokédex Search & Filter** | **Society Search & Filter** | Real-time search by name, keywords, or Dex number; one-click domain filter chips. |
| **Pokédex Navigation** | **Previous / Next Navigation** | Direct sequential navigation between society entries (`← #003 KRS | #004 KPC | #005 Korus →`). |
| **Complete the Pokédex** | **Explore All Societies** | Discover recruitment status, coordinators, achievements, and upcoming events. |

---

## 🏗️ Architecture & Collaboration Model

The project is structured to allow the **Frontend ("Up to JS")** team and the **Fullstack** team to work in parallel without blocking each other:

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│                       SOCIETYDEX FRONTEND (Up to JS Team)                   │
│  • HTML5 Semantic Page Structure (index.html, pages/society.html)           │
│  • CSS3 Pokédex Visual Language (cards.css, details.css, stat bars)         │
│  • JavaScript DOM Logic (Dynamic card render, search/filter, navigation)    │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Consumes data.js (offline) OR Supabase API
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        DATA & CLIENT LAYER (/js/data.js)                    │
│  • Central Society Dataset (data.js) - Works 100% offline with zero setup   │
│  • Supabase Client Wrapper (supabase-client.js) for live cloud data         │
└──────────────────────────────────────┬──────────────────────────────────────┘
                                       │ Powered by backend services
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BACKEND & DATABASE (Fullstack Team)                    │
│  • Supabase Auth & REST APIs (Access control, data queries, rankings)       │
│  • PostgreSQL Database (supabase/schema.sql, tables, stats, memberships)    │
│  • Analytics & Statistics Engine (Python microservice / data seeder)        │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Folder Structure

```text
kiit-societydex/
├── index.html                   # Homepage: Pokédex banner, search bar, domain filter chips, card grid
├── pages/
│   └── society.html             # Pokédex Detail Page: Left (avatar/meta), Right (about/events), Bottom (stat bars)
├── css/
│   ├── style.css                # Global Pokédex theme, colors, navigation bar, typography
│   ├── cards.css                # Pokédex collectible cards, glowing type badges, hover effects
│   └── details.css              # Pokédex detail screen layout, animated stat bars
├── js/
│   ├── data.js                  # Central dataset of KIIT societies (works offline out-of-the-box)
│   ├── app.js                   # Homepage rendering controller
│   ├── search.js                # Search, domain filter, and sorting controller
│   ├── society.js               # Detail page dynamic renderer & prev/next navigator
│   └── supabase-client.js       # Supabase SDK integration with automatic fallback to data.js
├── supabase/
│   ├── schema.sql               # PostgreSQL tables (societies, society_stats, profiles, bookmarks)
│   └── seed.sql                 # SQL insert statements for initial society data
├── assets/
│   ├── logos/                   # Society avatar images & logos
│   ├── icons/                   # Pokédex domain type icons
│   └── images/                  # UI graphic elements
└── README.md                    # Project documentation & team guide
```

---

## 👥 Unified Team Roster & Ownership

### 🎨 Group A: Frontend & "Up to JS / React" Team (11 Members)
*Focus: HTML5, CSS3, DOM manipulation, Pokédex UI, animations, cards, search, filters, and stat bars.*

| Member | GitHub Handle | Role & Ownership | Primary Issues |
| :--- | :--- | :--- | :--- |
| **Aman Bhardwaj** | [`@aman-0905`](https://github.com/aman-0905) | UI / HTML & Cards | Homepage Structure & Pokédex Card Markup |
| **Apoorv Pal** | [`@pandatech717-code`](https://github.com/pandatech717-code) | JavaScript Interactivity | Dynamic Society Card Rendering from `data.js` |
| **Ananya Umang** | [`@ananya-umang`](https://github.com/ananya-umang) | CSS3 & Theme Design | Pokédex Red Header, LED Indicators & Banner Theme |
| **SATYAM KUMAR** | [`@SatyamCodes7`](https://github.com/SatyamCodes7) | JavaScript Controller | Search & Domain Filter Engine (`search.js`) |
| **Samridhi kumari** | [`@404SAMfound`](https://github.com/404SAMfound) | UI / Detail Page | Two-Column Pokédex Detail Screen Structure (`society.html`) |
| **Tushar Agarwala** | [`@Tushar-162`](https://github.com/Tushar-162) | CSS / Pokédex Cards | Card Styling, Holographic Hover & Type Badges (`cards.css`) |
| **Satyaprakash Samal** | [`@satyaprakashs89420-blip`](https://github.com/satyaprakashs89420-blip) | JavaScript Navigation | Previous & Next Sequential Society Navigator |
| **Manish Pandey** | [`@manishpandey01-max`](https://github.com/manishpandey01-max) | CSS / Stat Bars | Animated Pokédex Stat Bars & Progress Trackers (`details.css`) |
| **Vishesh Mani Tripathi** | [`@Vishee02`](https://github.com/Vishee02) | Frontend & Supabase Bridge | Live Data Integration (`supabase-client.js`) & Offline Fallback |
| **Rewant Rai** | [`@rairewant26`](https://github.com/rairewant26) | JavaScript / Storage | LocalStorage Bookmarks & "My Squad" Favorites Controller (#24) |
| **Shaswat Kumar** | [`@shaswat8584`](https://github.com/shaswat8584) | React / UI Components | Society Comparison Matrix & Recruitment Apply Modal (#25) |

---

### ⚙️ Group B: Fullstack & Systems Team (9 Members)
*Focus: Supabase Auth/APIs, PostgreSQL schema, data modeling, backend seeding, security, and statistics calculation.*

| Member | GitHub Handle | Role & Ownership | Primary Issues |
| :--- | :--- | :--- | :--- |
| **Satwik Chandra** | [`@SATWIKKKKK`](https://github.com/SATWIKKKKK) | Systems Lead | Supabase Project Setup & Core API Client Architecture |
| **Tejash Rai** | [`@tejrai07`](https://github.com/tejrai07) | Backend / Auth | Supabase Authentication & Role-Based Access Control |
| **Abhisekh Nayak** | [`@AbhisekhNayak21`](https://github.com/AbhisekhNayak21) | Database Engineer | PostgreSQL Schema (`supabase/schema.sql`) & Table Constraints |
| **Dristi Singh** | [`@dristi-singh`](https://github.com/dristi-singh) | Backend Data | Seed Data Pipeline (`supabase/seed.sql`) & Society Ingestion |
| **Rishikesh Kumar** | [`@Rishikesh2298`](https://github.com/Rishikesh2298) | API Integration | Society Query & Detail Retrieval API Endpoints |
| **Mritunjay Kumar Mandal** | [`@Mritunjay4528`](https://github.com/Mritunjay4528) | Database Operations | Society Recruitment Status & Bookmarks Table Schema |
| **Saroj Sen** | [`@sarojsenn`](https://github.com/sarojsenn) | Data Quality & Testing | Stat Range Validation (0–100%) & Schema Integrity Tests |
| **Sumit Bag** | [`@Corot-7BSumit`](https://github.com/Corot-7BSumit) | Fullstack Integration | API Error Handling, CORS & Environment Configuration |
| **Ayush Sinha** | [`@TheRedGrim07`](https://github.com/TheRedGrim07) | Senior Systems | Society Activity Scoring & Analytics Engine |

---

## 🚀 Getting Started

### 1. Running the Frontend (Zero Setup Required!)
Because the initial version is built with pure HTML5, CSS3, and JavaScript, you don't even need Node.js installed to view the project:

- **Option A (Instant)**: Simply double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Safari).
- **Option B (Local Web Server)**:
  ```bash
  npx serve .
  # or using Python:
  python -m http.server 3000
  ```
  Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Developing Features
- **Frontend Developers ("Up to JS")**: Work inside `index.html`, `pages/`, `css/`, and `js/`. You can use the `SOCIETY_DATA` array in `js/data.js` to see real KIIT society entries immediately!
- **Fullstack Developers**: Work inside `supabase/` and `js/supabase-client.js`. Execute `supabase/schema.sql` on your Supabase project dashboard to set up the PostgreSQL tables.

---

## 🌿 Git Collaboration & Pull Request Workflow

1. Always pull latest `dev` before creating your feature branch:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/issue-X-description
   ```
2. Make your changes and commit with clean conventional messages:
   ```bash
   git commit -m "feat(cards): implement pokédex card hover animations"
   ```
3. Push your branch and open a Pull Request into `dev`:
   ```bash
   git push -u origin feat/issue-X-description
   ```
4. In your PR description, link your issue: `Closes #X`.
5. Once reviewed and approved by the tech lead, your code will be merged into `dev`.
