import { createClient } from '@supabase/supabase-js';
import { ENV } from '../../env/env.prod';

/**
 * Public Supabase client for client-side and public queries
 */
export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_ANON_KEY);

/**
 * Admin Supabase client for backend operations (bypasses RLS when needed)
 */
export const supabaseAdmin = createClient(
  ENV.SUPABASE_URL,
  ENV.SUPABASE_SERVICE_ROLE_KEY || ENV.SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  }
);

export default supabase;
