import { createClient } from '@supabase/supabase-js';

// Supabase sert uniquement aux comptes et à la synchro de la progression (le contenu est embarqué).
// Sans variables d'environnement, l'app fonctionne sans compte (progression sur l'appareil seulement).
const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && anonKey ? createClient(url, anonKey) : null;
