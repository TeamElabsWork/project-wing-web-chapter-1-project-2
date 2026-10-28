### 🎯 User Story
As a university student, I want to create an account using my name, email, and password through an intuitive form, so that I can gain access to publishing and managing my photography on the platform.

---

### 📖 Context & Scope
The platform provides open registration to students. You will build the `/register` page and its client-side validation logic. The form must validate user input before sending it to the backend and display actionable error alerts if submission fails.

---

### 🛠️ Technical Implementation Guide

#### 1. Registration Page (`app/(auth)/register/page.tsx`)
- Build a responsive registration card styled with Tailwind CSS, centered on the page.
- Fields:
  - **Full Name**: Text input, required, minimum 2 characters.
  - **Email Address**: Email input, required, validates standard email format (and encourages `@kiit.ac.in`).
  - **Password**: Password input, minimum 6 characters.
  - **Confirm Password**: Password input, must match the password field.
- Form interactions:
  - Live client-side validation on blur / submit.
  - Show inline validation warnings (e.g. "Passwords do not match", "Password must be at least 6 characters").
  - Submit button with loading spinner when request is pending (disabled during submit).

#### 2. Backend Submission Integration
- On submit, send a POST request:
  ```javascript
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password })
  });
  ```
- If successful (`res.status === 201`), redirect user to `/login?registered=true`.
- If error (e.g. `409 Conflict`), display a clear red alert banner ("An account with this email already exists").

---

### ⚠️ Edge Cases
- Prevent multiple rapid clicks on the Submit button.
- Trim whitespace from name and email inputs before submission.
- Ensure form is accessible via keyboard tab navigation.

---

### ✅ Definition of Done (DoD)
- [ ] Accessible registration form with Name, Email, Password, and Confirm Password fields.
- [ ] Client validation catches empty fields, mismatched passwords, and short passwords.
- [ ] Form posts to `/api/auth/register` and handles success and error responses gracefully.
- [ ] Responsive across mobile and desktop viewports.
