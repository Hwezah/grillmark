/**
 * Central place for the public Supabase env vars.
 *
 * Keys are provisioned later (Vercel → Settings → Environment Variables and a
 * local `.env.local`). Until they exist, `isSupabaseConfigured` is false and
 * every Supabase entrypoint no-ops gracefully so the app still builds and
 * renders — the UI works, auth/data simply stay dormant until keys are set.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
