import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.REACT_APP_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;