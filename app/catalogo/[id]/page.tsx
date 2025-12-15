import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Calendar,
  Gauge,
  Fuel,
  Settings,
  Palette,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase-server"

// Define interface matching the database
interface Car {
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
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await getSupabaseServerClient()

  const { data: car, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .single()

  if (error || !car) {
    console.error("Error fetching car:", error)
    notFound()
  }

  // Cast car to typed interface (Supabase types might be loosely inferenced)
  const carData = car as Car

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/catalogo">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver al Catálogo
          </Button>
        </Link>
      </div>

      {/* Car Details */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4">
              <img
                src={carData.image_url || "/placeholder.svg"}
                alt={`${carData.brand} ${carData.model}`}
                className="w-full h-auto"
              />
              {carData.status === "available" && (
                <Badge className="absolute top-6 left-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-base">
                  Disponible
                </Badge>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {carData.brand} {carData.model}
            </h1>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text mb-6">
              ${carData.price.toLocaleString("es-CO")}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Año</p>
                    <p className="font-semibold">{carData.year}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Gauge className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kilometraje</p>
                    <p className="font-semibold">{carData.mileage?.toLocaleString() || "N/A"} km</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Fuel className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Combustible</p>
                    <p className="font-semibold">{carData.fuel_type}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Transmisión</p>
                    <p className="font-semibold">{carData.transmission}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Motor</p>
                    <p className="font-semibold">{carData.engine || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Palette className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{carData.color || "N/A"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">
                {carData.description || "Sin descripción disponible."}
              </p>
            </div>

            {/* Contact CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/contacto" className="flex-1">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
                >
                  <MessageSquare className="mr-2 h-5 w-5" />
                  Solicitar Información
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                <Phone className="mr-2 h-5 w-5" />
                Llamar Ahora
              </Button>
            </div>
          </div>
        </div>

        {/* Note: 'Features' section removed as it's not present in the current database schema */}

        {/* Financing Section */}
        <div className="mt-12">
          <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-none">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Financiamiento Disponible</h2>
              <p className="text-lg mb-6 text-gray-100">
                Ofrecemos planes de financiamiento flexibles con tasas competitivas. Hasta 60 cuotas con 0% de interés
                en vehículos seleccionados.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100">
                  <Mail className="mr-2 h-5 w-5" />
                  Solicitar Cotización
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 bg-transparent"
                >
                  Ver Planes de Financiamiento
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
