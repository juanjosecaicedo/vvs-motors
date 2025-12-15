"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Save, Loader2, Building2, Phone, Share2 } from "lucide-react"

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [settings, setSettings] = useState({
    site_name: "",
    site_description: "",
    contact_email: "",
    contact_phone: "",
    address: "",
    facebook_url: "",
    instagram_url: "",
    whatsapp_number: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (response.ok) {
        const data = await response.json()
        // Merge with default/empty state to ensure controlled inputs
        setSettings(prev => ({ ...prev, ...data }))
      }
    } catch (error) {
      console.error("Error fetching settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSettings(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert("Configuración guardada exitosamente")
      } else {
        alert("Error al guardar la configuración")
      }
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Error al guardar la configuración")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-4xl font-bold">Configuración</h1>
        <p className="text-muted-foreground mt-2">Administra la información general del sitio</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <CardTitle>Información General</CardTitle>
            </div>
            <CardDescription>Detalles básicos de la empresa y el sitio web</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="site_name">Nombre del Sitio</Label>
              <Input
                id="site_name"
                name="site_name"
                value={settings.site_name}
                onChange={handleChange}
                placeholder="VVS Motors"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="site_description">Descripción</Label>
              <Textarea
                id="site_description"
                name="site_description"
                value={settings.site_description}
                onChange={handleChange}
                rows={3}
                placeholder="Tu concesionario de confianza..."
              />
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" />
              <CardTitle>Datos de Contacto</CardTitle>
            </div>
            <CardDescription>Información visible para los clientes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="contact_email">Email</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={handleChange}
                  placeholder="contacto@vvsmotors.com"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact_phone">Teléfono</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  value={settings.contact_phone}
                  onChange={handleChange}
                  placeholder="+57 300 123 4567"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Dirección Física</Label>
              <Input
                id="address"
                name="address"
                value={settings.address}
                onChange={handleChange}
                placeholder="Calle 100 # 15-20, Bogotá"
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Share2 className="h-6 w-6 text-primary" />
              <CardTitle>Redes Sociales</CardTitle>
            </div>
            <CardDescription>Enlaces a perfiles oficiales y chat</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="whatsapp_number">Número de WhatsApp (para botón de chat)</Label>
              <Input
                id="whatsapp_number"
                name="whatsapp_number"
                value={settings.whatsapp_number}
                onChange={handleChange}
                placeholder="573001234567"
              />
              <p className="text-xs text-muted-foreground">Ingresa el número con código de país, sin espacios ni símbolos (+).</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                name="instagram_url"
                value={settings.instagram_url}
                onChange={handleChange}
                placeholder="https://instagram.com/vvsmotors"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                name="facebook_url"
                value={settings.facebook_url}
                onChange={handleChange}
                placeholder="https://facebook.com/vvsmotors"
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={saving}
            className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Guardar Cambios
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
