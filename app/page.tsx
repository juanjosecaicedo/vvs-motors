import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Zap, Car, Percent } from "lucide-react"
import { getSupabaseServerClient } from "@/lib/supabase-server"

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()

  // Fetch Featured Cars
  const { data: featuredCars } = await supabase
    .from("cars")
    .select("*")
    .eq("featured", true)
    .eq("status", "available")
    .limit(3)

  // Fetch Active Promotions
  const { data: promotionsData } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false })
    .limit(3)

  const promotions = promotionsData?.map(promo => {
    // Map specific unicode icons to Lucide components if needed, or fallback
    // For now, we'll try to guess based on content or stick to generic, 
    // but the design expects dynamic icons. 
    // The current DB 'icon' is a string (emoji). The UI expects a component?
    // The previous code had `const Icon = promo.icon` where promo.icon was a Component.
    // We need to adapt the UI to render the string emoji OR map to a component.
    // Let's adapt the UI to use the emoji string directly or a default icon.
    return {
      ...promo,
      icon: promo.icon || "🎉"
    }
  }) || []

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
              VVS MOTORS
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-200 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Tu concesionario de confianza con los mejores vehículos y precios increíbles
          </p>
          <Link href="/catalogo">
            <Button
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
            >
              Ver Vehículos
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-white">Promociones Especiales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {promotions.map((promo, index) => {
              return (
                <Card
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <CardContent className="p-8 text-center text-white">
                    <div className="text-6xl mb-4">
                      {promo.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{promo.title}</h3>
                    <div className="text-4xl font-bold text-cyan-300 mb-4">{promo.discount_value}</div>
                    <p className="text-gray-100 leading-relaxed">{promo.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">Vehículos Destacados</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">Descubre nuestra selección premium</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {featuredCars?.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={car.image_url || "/placeholder.svg"}
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg">
                    ${car.price.toLocaleString("es-CO")}
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-2">
                    {car.brand} {car.model}
                  </h3>
                  <div className="flex gap-4 text-sm text-muted-foreground mb-4">
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.fuel_type}</span>
                    <span>•</span>
                    <span>{car.year}</span>
                  </div>
                  <Link href={`/catalogo/${car.id}`}>
                    <Button className="w-full bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600">
                      Ver Detalles
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/catalogo">
              <Button variant="outline" size="lg" className="border-2 hover:bg-accent bg-transparent">
                Ver Todos los Vehículos
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Quiénes Somos</h2>
              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                En VVS Motors creemos que la pasión, la innovación y el conocimiento pueden construir grandes cosas.
                Somos Julio Sebastian Salcedo Aponza, dos estudiantes de Ingeniería que en 2024
                decidimos transformar una idea universitaria en un proyecto real con impacto.
              </p>
              <p className="text-lg leading-relaxed mb-6 text-gray-100">
                VVS Motors nació como una propuesta académica, pero rápidamente evolucionó hacia un concepto automotriz
                enfocado en el diseño inteligente, la tecnología sostenible y la experiencia del usuario.
              </p>
              <p className="text-lg leading-relaxed text-gray-100">
                Este es solo el comienzo. Bienvenidos a VVS Motors: donde la ingeniería se convierte en movimiento.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1196&q=80"
                alt="VVS Motors Team"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-purple-600 to-purple-800 text-white border-none hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-6 text-cyan-300">Nuestra Misión</h3>
                <p className="text-lg leading-relaxed">
                  Proporcionar vehículos de la más alta calidad con un servicio excepcional, garantizando la
                  satisfacción total de nuestros clientes y construyendo relaciones duraderas basadas en la confianza y
                  la transparencia.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-600 to-pink-800 text-white border-none hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <CardContent className="p-8 text-center">
                <h3 className="text-3xl font-bold mb-6 text-cyan-300">Nuestra Visión</h3>
                <p className="text-lg leading-relaxed">
                  Ser el concesionario líder en innovación automotriz en Colombia, reconocidos por nuestra excelencia en
                  servicio, tecnología sostenible y compromiso con la movilidad del futuro.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">¿Listo para tu próximo vehículo?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Contáctanos y descubre cómo podemos ayudarte a encontrar el auto perfecto
          </p>
          <Link href="/contacto">
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-2xl"
            >
              Contáctanos Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
