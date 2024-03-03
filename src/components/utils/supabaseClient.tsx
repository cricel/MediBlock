import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://porapmlcltaiaqgozxkk.supabase.co'
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBvcmFwbWxjbHRhaWFxZ296eGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0MjAzODUsImV4cCI6MjAyNDk5NjM4NX0.9uDsH8oIzEL6-Fxyg-uck5LSZ-vtOVi7JWyFiDezQ1I" 
export const supabase = createClient(supabaseUrl, SUPABASE_KEY)