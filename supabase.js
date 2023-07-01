import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({path: '.env.local'})

const supabaseUrl = 'https://uwvkekzjhgwigcuqgtqx.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase