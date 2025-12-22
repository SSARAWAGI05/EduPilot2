import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Singleton instance
let instance: SupabaseClient | null = null;

function getSupabaseClient() {
  if (!instance) {
    instance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: 'deeco-auth', // ✅ Unique storage key for your app
      },
    });
  }
  return instance;
}

export const supabase = getSupabaseClient();