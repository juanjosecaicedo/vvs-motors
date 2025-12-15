import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { SettingsProvider } from "@/components/providers/settings-provider"
import { getSupabaseServerClient } from "@/lib/supabase-server"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "VVS Motors - Tu Concesionario de Confianza",
  description:
    "Descubre los mejores vehículos en VVS Motors. Financiamiento flexible, mejores precios y servicio de excelencia en Colombia.",
  generator: "nextjs",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

async function getSettings() {
  try {
    const supabase = await getSupabaseServerClient()
    const { data } = await supabase.from("settings").select("*")

    if (!data) return {}

    return data.reduce((acc: any, item: any) => {
      acc[item.name] = item.value
      return acc
    }, {})
  } catch (error) {
    console.error("Error fetching settings:", error)
    return {}
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const settings = await getSettings()

  return (
    <html lang="es">
      <body className="font-sans antialiased">
        <SettingsProvider initialSettings={settings}>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
          <Analytics />
        </SettingsProvider>
      </body>
    </html>
  )
}
