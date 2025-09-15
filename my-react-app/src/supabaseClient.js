import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ebyvtjuakwrhbajcimbm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVieXZ0anVha3dyaGJhamNpbWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc3OTI4NjcsImV4cCI6MjA3MzM2ODg2N30.kplDcdJIPzJhAvCR91DjiLEAmSWVPxGZ7qWU2wG2KXU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);