// Authentication utilities for VVS Motors Admin
// TODO: Replace with proper authentication system (Supabase Auth, NextAuth, etc.)

export const AUTH_CONFIG = {
  // In production, move these to environment variables
  DEFAULT_ADMIN_EMAIL: "admin@vvsmotors.com",
  DEFAULT_ADMIN_PASSWORD: "admin123", // This should be hashed in production
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("admin_authenticated") === "true"
}

// Login function
export async function login(email: string, password: string): Promise<boolean> {
  // TODO: Replace with actual authentication API call
  // This is a simplified version for demonstration
  if (email === AUTH_CONFIG.DEFAULT_ADMIN_EMAIL && password === AUTH_CONFIG.DEFAULT_ADMIN_PASSWORD) {
    localStorage.setItem("admin_authenticated", "true")
    return true
  }
  return false
}

// Logout function
export function logout(): void {
  localStorage.removeItem("admin_authenticated")
}

// Get current user (mock function)
export function getCurrentUser() {
  if (!isAuthenticated()) return null
  return {
    email: AUTH_CONFIG.DEFAULT_ADMIN_EMAIL,
    name: "VVS Motors Admin",
    role: "admin",
  }
}
