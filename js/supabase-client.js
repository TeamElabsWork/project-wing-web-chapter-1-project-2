/**
 * KIIT SOCIETYDEX — SUPABASE & POSTGRESQL API LAYER
 * Maintained by the Fullstack Engineering Team
 * Provides live PostgreSQL data fetching with automatic fallback to data.js
 */

const SUPABASE_CONFIG = {
  url: window.SUPABASE_URL || 'https://your-project.supabase.co',
  anonKey: window.SUPABASE_ANON_KEY || 'your-anon-key'
};

let supabaseClient = null;

if (typeof supabase !== 'undefined' && SUPABASE_CONFIG.url !== 'https://your-project.supabase.co') {
  try {
    supabaseClient = supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
    console.log('✓ Supabase Client Initialized with live PostgreSQL connection.');
  } catch (err) {
    console.warn('! Supabase initialization skipped, using local data.js dataset:', err.message);
  }
}

/**
 * Fetch all societies from PostgreSQL (with fallback to data.js)
 */
async function getSocieties() {
  if (supabaseClient) {
    try {
      const { data, error } = await supabaseClient
        .from('societies')
        .select('*, society_stats(*)');
      if (!error && data && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Fallback to local data.js:', e);
    }
  }
  return typeof SOCIETY_DATA !== 'undefined' ? SOCIETY_DATA : [];
}

/**
 * Fetch single society by Dex ID
 */
async function getSocietyById(id) {
  const all = await getSocieties();
  return all.find(s => s.id === id || s.dexNumber === `#${id}`) || all[0];
}

window.SocietyDexAPI = {
  getSocieties,
  getSocietyById
};
