// ==========================================
// BACKEND CONFIGURATION: Supabase Client Setup
// ==========================================
// This file initializes the Supabase client, which acts as our connection bridge 
// to the PostgreSQL database hosted on Supabase.

// We import the standard client builder function from the official Supabase library
import { createClient } from '@supabase/supabase-js';

// We import 'dotenv' to load secret credentials (URL, API keys) from our .env file.
// This prevents hardcoding sensitive passwords or keys in our source code.
import dotenv from 'dotenv';

// Execute the dotenv configuration. This reads variables inside the '.env' file 
// and adds them to Node's 'process.env' object.
dotenv.config();

// Extract the URL and API key from process.env
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

// Beginner Tip: It's good practice to alert the developer if their setup is incomplete.
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '⚠️  WARNING: SUPABASE_URL or API keys are missing from your backend env variables!\n' +
    'Please configure your .env file inside the backend directory to enable database operations.'
  );
}

// Create and export the Supabase client instance.
// Now, other files can import this 'supabase' object to run database queries.
export const supabase = createClient(supabaseUrl || '', supabaseKey || '');
