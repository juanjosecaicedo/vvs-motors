"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface Promotion {
  id: string
  title: string
  description: string
  discount_value: string
  icon: string
  active: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
}

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPromotions()
  }, [])

  const fetchPromotions = async () => {
    try {
      const response = await fetch("/api/promotions")
      if (response.ok) {
        const data = await response.json()
        setPromotions(data)
      }
    } catch (error) {
      console.error("Error fetching promotions:", error)
    } finally {
      setLoading(false)
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/admin/promotions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ active: !currentStatus }),
      })

      if (response.ok) {
        fetchPromotions()
      }
    } catch (error) {
      console.error("Error toggling promotion:", error)
    }
  }

  const deletePromotion = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar esta promoción?")) return

    try {
      const response = await fetch(`/api/admin/promotions/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchPromotions()
      }
    } catch (error) {
      console.error("Error deleting promotion:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold">Gestión de Promociones</h1>
          <p className="text-muted-foreground mt-2">Administra las ofertas y promociones activas</p>
        </div>
        <Link href="/admin/promotions/new">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nueva Promoción
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promotions.map((promo) => (
          <Card key={promo.id} className={!promo.active ? "opacity-60" : ""}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{promo.icon}</div>
                <Badge variant={promo.active ? "default" : "secondary"} className={promo.active ? "bg-green-500" : ""}>
                  {promo.active ? "Activa" : "Inactiva"}
                </Badge>
              </div>

              <h3 className="font-bold text-xl mb-2">{promo.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{promo.description}</p>

              <div className="mb-4">
                <Badge variant="outline" className="text-lg font-bold">
                  {promo.discount_value}
                </Badge>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleActive(promo.id, promo.active)}
                  className="flex-1"
                >
                  {promo.active ? (
                    <>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Desactivar
                    </>
                  ) : (
                    <>
                      <Eye className="mr-2 h-4 w-4" />
                      Activar
                    </>
                  )}
                </Button>
                <Link href={`/admin/promotions/${promo.id}`}>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="sm" variant="outline" onClick={() => deletePromotion(promo.id)}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {promotions.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No hay promociones registradas</p>
            <Link href="/admin/promotions/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear primera promoción
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
