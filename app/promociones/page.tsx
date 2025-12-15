"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Promotion = {
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

export default function PromocionesPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/promotions", { cache: "no-store" })
        if (!res.ok) throw new Error("No se pudieron cargar las promociones")
        const data: Promotion[] = await res.json()
        setPromotions(data)
      } catch (e: any) {
        setError(e.message ?? "Error inesperado")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) {
    return (
      <section className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white" />
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Promociones</h1>
          <p className="opacity-90">{error}</p>
        </div>
      </section>
    )
  }

  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Promociones</h1>
          <p className="text-white/90 max-w-2xl mx-auto">
            Descubre nuestras ofertas y beneficios activos para que estrenes tu próximo vehículo con el mejor precio.
          </p>
        </div>
      </section>

      {/* Listado de promociones */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          {promotions.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center">
              <Card className="bg-white/80 dark:bg-neutral-900/60">
                <CardContent className="p-12">
                  <div className="text-5xl mb-4">🎉</div>
                  <h2 className="text-2xl font-bold mb-2">Pronto nuevas promociones</h2>
                  <p className="text-muted-foreground">
                    En este momento no hay promociones activas. Vuelve más tarde para encontrar ofertas increíbles.
                  </p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {promotions.map((promo) => (
                <Card
                  key={promo.id}
                  className="bg-white/80 dark:bg-neutral-900/60 backdrop-blur border border-white/20 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="text-6xl mb-4">{promo.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{promo.title}</h3>
                    <div className="mb-4 flex items-center justify-center gap-2">
                      <Badge className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white text-base px-3 py-1">
                        {promo.discount_value}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">{promo.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
