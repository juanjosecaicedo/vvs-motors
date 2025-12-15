"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

interface Settings {
  site_name: string
  site_description: string
  contact_email: string
  contact_phone: string
  address: string
  facebook_url: string
  instagram_url: string
  whatsapp_number: string
  // Add other settings as needed
  [key: string]: string
}

const defaultSettings: Settings = {
  site_name: "VVS Motors",
  site_description: "Tu concesionario de confianza",
  contact_email: "",
  contact_phone: "",
  address: "",
  facebook_url: "",
  instagram_url: "",
  whatsapp_number: "",
}

const SettingsContext = createContext<Settings>(defaultSettings)

export function useSettings() {
  return useContext(SettingsContext)
}

interface SettingsProviderProps {
  children: React.ReactNode
  initialSettings?: Settings
}

export function SettingsProvider({ children, initialSettings }: SettingsProviderProps) {
  const [settings, setSettings] = useState<Settings>(initialSettings || defaultSettings)

  useEffect(() => {
    // If we didn't get initial settings (e.g., static export), we could fetch them here
    if (!initialSettings) {
      fetch("/api/admin/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data && !data.error) {
            setSettings(prev => ({ ...prev, ...data }))
          }
        })
        .catch(err => console.error("Failed to fetch settings client-side:", err))
    }
  }, [initialSettings])

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  )
}
