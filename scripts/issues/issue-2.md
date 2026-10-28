### 🎯 User Story
As a registered photographer, I want to sign into my account securely using my email and password, stay logged in across visits, and be protected from unauthorized access, so that I can manage my uploads safely.

---

### 📖 Context & Scope
Authentication is powered by Auth.js (NextAuth v5) using a Credentials provider and JWT session cookies. You will build the `/login` page UI, connect it to the signIn function, handle invalid login feedback, and implement route protection middleware.

---

### 🛠️ Technical Implementation Guide

#### 1. Sign In Page (`app/(auth)/login/page.tsx`)
- Build a responsive login card styled with Tailwind CSS.
- Form inputs:
  - **Email Address**: `type="email"`, required.
  - **Password**: `type="password"`, required.
- Show a link to `/register` ("Don't have an account? Sign up").
- Show a success alert banner if URL query param `?registered=true` is present ("Account created successfully! Please sign in.").
- Submission handler:
  ```javascript
  import { signIn } from 'next-auth/react'; // or server action via auth.ts
  const res = await signIn('credentials', {
    redirect: false,
    email,
    password,
  });
  if (res?.error) {
    // Show error toast / alert: "Invalid email or password"
  } else {
    // Redirect to home or callbackUrl
  }
  ```

#### 2. Route Protection Middleware (`middleware.ts`)
- In `/web`, configure `middleware.ts`:
  - Protect private paths such as `/upload` and `/settings`.
  - If a user is not logged in and visits `/upload`, redirect them to `/login?callbackUrl=/upload`.

---

### ⚠️ Edge Cases
- Show clear loading spinner state while authentication is being verified.
- Ensure bad credentials never reveal whether the email exists (constant-time response message: "Invalid email or password").

---

### ✅ Definition of Done (DoD)
- [ ] Clean, accessible login form with Email and Password fields.
- [ ] Correctly authenticates against Auth.js credentials provider.
- [ ] Displays clear error message when invalid credentials are provided.
- [ ] Unauthenticated requests to `/upload` redirect automatically to `/login`.
