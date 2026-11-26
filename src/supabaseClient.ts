import { createClient } from '@supabase/supabase-js';

// Supabase is only used for accounts and progress sync (the content is bundled).
// Without environment variables, the app works without accounts (progress on the device only).
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
