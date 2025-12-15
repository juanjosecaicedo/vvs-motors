"use client"

import type React from "react"
import { useState, useEffect, use } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

export default function EditPromotionPage() {
  const router = useRouter()
  // Use useParams hook which works in Client Components
  const params = useParams()
  // Ensure we handle potential array or undefined (though dynamic route usually guarantees string for simple [id])
  const promoId = typeof params?.id === 'string' ? params.id : Array.isArray(params?.id) ? params.id[0] : null

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    discount_value: "",
    icon: "",
    active: true,
  })

  // Fetch initial data
  useEffect(() => {
    // Return early if no ID
    if (!promoId) return

    const fetchPromo = async () => {
      try {
        const response = await fetch(`/api/admin/promotions/${promoId}`)
        if (response.ok) {
          const data = await response.json()
          setFormData({
            title: data.title || "",
            description: data.description || "",
            discount_value: data.discount_value || "",
            icon: data.icon || "",
            active: data.active ?? true
          })
        } else {
          console.error("Failed to fetch promotion")
          // Optional: redirect or show error UI
        }
      } catch (error) {
        console.error("Error fetching promotion:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPromo()
  }, [promoId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!promoId) return
    setSaving(true)

    try {
      const response = await fetch(`/api/admin/promotions/${promoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/promotions")
      } else {
        alert("Error al actualizar la promoción")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al actualizar la promoción")
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

  // Fallback if ID is missing (shouldn't happen on valid route)
  if (!promoId) {
    return <div>Error: ID de promoción no válido</div>
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/admin/promotions">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Editar Promoción</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Título*</Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción*</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="discount_value">Valor del Descuento*</Label>
                <Input
                  id="discount_value"
                  required
                  value={formData.discount_value}
                  onChange={(e) => setFormData({ ...formData, discount_value: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="icon">Icono (Emoji)</Label>
                <Input
                  id="icon"
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  maxLength={2}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="active" className="cursor-pointer">
                Promoción Activa
              </Label>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={saving}
                className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
              >
                {saving ? "Guardando..." : "Actualizar Promoción"}
              </Button>
              <Link href="/admin/promotions">
                <Button type="button" variant="outline" size="lg">
                  Cancelar
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
