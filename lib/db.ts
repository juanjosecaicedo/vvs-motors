// Database utility functions for VVS Motors
// This file will contain reusable database operations

export type Car = {
  id: string
  brand: string
  model: string
  year: number
  price: number
  transmission: string
  fuel_type: string
  engine: string
  description: string | null
  image_url: string | null
  mileage: number
  color: string | null
  status: "available" | "sold" | "reserved"
  featured: boolean
  created_at: string
  updated_at: string
}

export type Promotion = {
  id: string
  title: string
  description: string
  discount_value: string
  icon: string | null
  active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
}

export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  car_id: string | null
  status: "pending" | "replied" | "archived"
  created_at: string
}

export type AdminUser = {
  id: string
  email: string
  full_name: string
  role: string
  active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

import { createBrowserClient } from "@supabase/ssr"

export function getSupabaseBrowserClient() {
  return createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
}

// Placeholder for database connection
// When Supabase or Neon is connected, replace this with actual DB client
export const db = {
  query: async (sql: string, params?: any[]) => {
    // This will be replaced with actual database connection
    console.log("[v0] Database query:", sql, params)
    return { rows: [], rowCount: 0 }
  },
}
