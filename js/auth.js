/**
 * KIIT SOCIETYDEX — AUTHENTICATION & RBAC MODULE (auth.js)
 * Maintained by: Tejash Rai (@tejrai07) — Fullstack Engineering Team
 *
 * Provides Supabase Authentication with:
 *  - KIIT email domain validation (@kiit.ac.in)
 *  - Role-Based Access Control (student, society_coordinator, admin)
 *  - Session persistence & helper functions
 *
 * Depends on: supabase-client.js (must be loaded first)
 */

const KIIT_EMAIL_DOMAIN = '@kiit.ac.in';

/**
 * Validate that an email belongs to the KIIT domain.
 * @param {string} email
 * @returns {boolean} true if the email ends with @kiit.ac.in
 */
function validateKiitEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return email.trim().toLowerCase().endsWith(KIIT_EMAIL_DOMAIN);
}

/**
 * Sign up a new user with email & password.
 * Enforces @kiit.ac.in domain for student signups.
 * Profile row is auto-created by the database trigger (handle_new_user).
 *
 * @param {string} email       - Must end with @kiit.ac.in
 * @param {string} password    - Minimum 6 characters
 * @param {string} name        - Display name
 * @param {string} rollNumber  - KIIT roll number (optional)
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
async function signUpWithEmail(email, password, name, rollNumber) {
  const client = window.supabaseClient;
  if (!client) {
    return { data: null, error: 'Supabase client is not initialized. Check your project URL and anon key.' };
  }

  // Enforce KIIT email domain
  if (!validateKiitEmail(email)) {
    return { data: null, error: 'Only @kiit.ac.in email addresses are allowed for signup.' };
  }

  if (!password || password.length < 6) {
    return { data: null, error: 'Password must be at least 6 characters long.' };
  }

  try {
    const { data, error } = await client.auth.signUp({
      email: email.trim().toLowerCase(),
      password,
      options: {
        data: {
          name: name || '',
          roll_number: rollNumber || '',
          role: 'student'
        }
      }
    });

    if (error) {
      console.warn('Signup error:', error.message);
      return { data: null, error: error.message };
    }

    console.log('✓ Signup successful for:', email);
    return { data, error: null };
  } catch (err) {
    console.warn('Signup exception:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Sign in an existing user with email & password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{data: object|null, error: string|null}>}
 */
async function signInWithEmail(email, password) {
  const client = window.supabaseClient;
  if (!client) {
    return { data: null, error: 'Supabase client is not initialized.' };
  }

  try {
    const { data, error } = await client.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

    if (error) {
      console.warn('Sign-in error:', error.message);
      return { data: null, error: error.message };
    }

    console.log('✓ Sign-in successful for:', email);
    return { data, error: null };
  } catch (err) {
    console.warn('Sign-in exception:', err);
    return { data: null, error: err.message };
  }
}

/**
 * Sign out the current user and clear the session.
 * @returns {Promise<{error: string|null}>}
 */
async function signOut() {
  const client = window.supabaseClient;
  if (!client) {
    return { error: 'Supabase client is not initialized.' };
  }

  try {
    const { error } = await client.auth.signOut();
    if (error) {
      console.warn('Sign-out error:', error.message);
      return { error: error.message };
    }

    console.log('✓ User signed out.');
    return { error: null };
  } catch (err) {
    console.warn('Sign-out exception:', err);
    return { error: err.message };
  }
}

/**
 * Retrieve the current active session.
 * @returns {Promise<{session: object|null, error: string|null}>}
 */
async function getCurrentSession() {
  const client = window.supabaseClient;
  if (!client) {
    return { session: null, error: 'Supabase client is not initialized.' };
  }

  try {
    const { data, error } = await client.auth.getSession();
    if (error) {
      return { session: null, error: error.message };
    }
    return { session: data.session, error: null };
  } catch (err) {
    return { session: null, error: err.message };
  }
}

/**
 * Get the currently authenticated user object from the session.
 * @returns {Promise<{user: object|null, error: string|null}>}
 */
async function getCurrentUser() {
  const { session, error } = await getCurrentSession();
  if (error || !session) {
    return { user: null, error: error || 'No active session.' };
  }
  return { user: session.user, error: null };
}

/**
 * Fetch the role of the currently authenticated user from the profiles table.
 * Falls back to the session metadata if the profiles query fails.
 * @returns {Promise<{role: string|null, error: string|null}>}
 */
async function getCurrentRole() {
  const client = window.supabaseClient;
  const { user, error: userError } = await getCurrentUser();

  if (userError || !user) {
    return { role: null, error: userError || 'No authenticated user.' };
  }

  // Try fetching the authoritative role from the profiles table
  if (client) {
    try {
      const { data, error } = await client
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        return { role: data.role, error: null };
      }
    } catch (err) {
      console.warn('Profile role lookup failed, falling back to session metadata:', err.message);
    }
  }

  // Fallback: read role from the auth session metadata
  const metaRole = user.user_metadata?.role || 'student';
  return { role: metaRole, error: null };
}

/**
 * Subscribe to authentication state changes (sign-in, sign-out, token refresh).
 * @param {function} callback - Called with (event, session) on every auth state change.
 * @returns {{unsubscribe: function}|null} Subscription handle, or null if client is unavailable.
 */
function onAuthChange(callback) {
  const client = window.supabaseClient;
  if (!client) {
    console.warn('Supabase client is not initialized. Auth state listener not attached.');
    return null;
  }

  const { data } = client.auth.onAuthStateChange((event, session) => {
    console.log('Auth state changed:', event);
    if (typeof callback === 'function') {
      callback(event, session);
    }
  });

  return data.subscription;
}

// ========================================================
// Expose auth API on window for use by other modules
// ========================================================
window.SocietyDexAuth = {
  validateKiitEmail,
  signUpWithEmail,
  signInWithEmail,
  signOut,
  getCurrentSession,
  getCurrentUser,
  getCurrentRole,
  onAuthChange
};

console.log('SocietyDex auth.js initialized.');
