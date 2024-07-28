
import { createClient } from '@supabase/supabase-js'

const supabase = createClient("https://ayvkirlkkejpolrqawvx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5dmtpcmxra2VqcG9scnFhd3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE0OTkxNDEsImV4cCI6MjAzNzA3NTE0MX0.ojMWTC0_lfC32oYFhr_2A1UFLymDgPzTCZl5L1hLOZs ")

export default supabase