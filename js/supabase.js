import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const SUPABASE_URL = "https://songs.supabase.co";
const SUPABASE_KEY = "sb_publishable_z3rvc8UI7StezvviDTAi0g_uTii1O8e";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
