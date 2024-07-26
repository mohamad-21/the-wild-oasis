import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = import.meta.env.VITE_APP_PROJECT_URL
const supabaseKey = import.meta.env.VITE_APP_PROJECT_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey)