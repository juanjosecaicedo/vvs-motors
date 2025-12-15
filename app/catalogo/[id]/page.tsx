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
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react"

// Sample data - will be replaced with database query
const carsData = [
  {
    id: "1",
    brand: "BMW",
    model: "Serie 3",
    year: 2023,
    price: 45000000,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    transmission: "Automático",
    fuel_type: "Gasolina",
    engine: "2.0L Turbo",
    mileage: 5000,
    color: "Negro",
    status: "available",
    description:
      "Vehículo premium con tecnología de última generación y máximo confort. El BMW Serie 3 2023 combina elegancia deportiva con rendimiento excepcional. Equipado con el motor turbo más reciente de BMW, ofrece una experiencia de conducción inigualable.",
    features: [
      "Sistema de navegación GPS",
      "Asientos de cuero premium",
      "Techo panorámico",
      "Sistema de sonido Harman Kardon",
      "Control de crucero adaptativo",
      "Cámara 360°",
      "Faros LED adaptativos",
      "Apple CarPlay y Android Auto",
    ],
  },
  {
    id: "2",
    brand: "Audi",
    model: "A4",
    year: 2022,
    price: 35000000,
    image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    transmission: "Automático",
    fuel_type: "Gasolina",
    engine: "1.8L TFSI",
    mileage: 12000,
    color: "Blanco",
    status: "available",
    description:
      "Elegancia y rendimiento en un solo vehículo. Perfecto para la ciudad. El Audi A4 ofrece tecnología avanzada y confort superior en cada viaje.",
    features: [
      "Virtual Cockpit",
      "Asientos deportivos",
      "Sistema MMI Touch",
      "Control de clima automático",
      "Sensores de estacionamiento",
      "Bluetooth y USB",
      "Llantas de aleación 18",
      "Asistente de cambio de carril",
    ],
  },
  {
    id: "3",
    brand: "Mercedes-Benz",
    model: "C-Class",
    year: 2023,
    price: 55000000,
    image:
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    transmission: "Automático",
    fuel_type: "Gasolina",
    engine: "2.5L V6",
    mileage: 3000,
    color: "Plateado",
    status: "available",
    description:
      "Lujo y sofisticación alemana con la mejor tecnología incorporada. Mercedes-Benz C-Class redefine el concepto de lujo deportivo con su diseño elegante y prestaciones excepcionales.",
    features: [
      "Sistema MBUX",
      "Asientos con masaje",
      "Suspensión neumática",
      "Sistema de sonido Burmester",
      "Head-up Display",
      "Paquete AMG",
      "Iluminación ambiental 64 colores",
      "Asistente de estacionamiento activo",
    ],
  },
]

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const car = carsData.find((c) => c.id === id)

  if (!car) {
    notFound()
  }

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
              <img src={car.image || "/placeholder.svg"} alt={`${car.brand} ${car.model}`} className="w-full h-auto" />
              {car.status === "available" && (
                <Badge className="absolute top-6 left-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 text-base">
                  Disponible
                </Badge>
              )}
            </div>
          </div>

          {/* Info Section */}
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {car.brand} {car.model}
            </h1>
            <p className="text-3xl font-bold text-transparent bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text mb-6">
              ${car.price.toLocaleString("es-CO")}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Año</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Gauge className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Kilometraje</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} km</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Fuel className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Combustible</p>
                    <p className="font-semibold">{car.fuel_type}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Transmisión</p>
                    <p className="font-semibold">{car.transmission}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Settings className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Motor</p>
                    <p className="font-semibold">{car.engine}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4 flex items-center gap-3">
                  <Palette className="h-8 w-8 text-cyan-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Color</p>
                    <p className="font-semibold">{car.color}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Descripción</h2>
              <p className="text-muted-foreground leading-relaxed">{car.description}</p>
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

        {/* Features Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Características Destacadas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {car.features.map((feature, index) => (
              <Card key={index}>
                <CardContent className="p-4 flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span>{feature}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

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
