"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function NosotrosPage() {
  return (
    <main>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-pink-600 via-purple-600 to-pink-700">
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Quiénes Somos</h1>
          <p className="max-w-2xl mx-auto text-white/90">
            En VVS Motors unimos pasión por los autos, ingeniería y diseño para crear experiencias excepcionales.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Nuestra historia</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                VVS Motors nació en 2024 como una idea universitaria de dos estudiantes de ingeniería, con el objetivo
                de transformar la compra de vehículos en una experiencia transparente, estética y tecnológica.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Desde entonces, hemos construido una propuesta centrada en el usuario: información clara, procesos
                ágiles y un catálogo curado que equilibra rendimiento, seguridad y diseño.
              </p>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2250&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="VVS Motors"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">Nuestros valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Transparencia",
                desc:
                  "Información clara de precios y características para que tomes la mejor decisión, sin sorpresas.",
                emoji: "🔎",
              },
              {
                title: "Innovación",
                desc: "Tecnología y diseño al servicio de una experiencia de compra moderna y simple.",
                emoji: "⚙️",
              },
              {
                title: "Confianza",
                desc: "Acompañamiento cercano y profesional antes, durante y después de tu compra.",
                emoji: "🤝",
              },
            ].map((v, i) => (
              <Card
                key={i}
                className="bg-white/10 backdrop-blur-lg border-white/20 text-white hover:bg-white/20 transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">{v.emoji}</div>
                  <h3 className="text-2xl font-bold mb-2">{v.title}</h3>
                  <p className="text-gray-100 leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciales */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Catálogo curado",
                desc: "Selección de vehículos con estándares de calidad, historial y mantenimiento verificado.",
              },
              {
                title: "Financiación y asesoría",
                desc: "Opciones flexibles y acompañamiento experto para que estrenes sin complicaciones.",
              },
              { title: "Proceso ágil", desc: "Trámites simplificados y comunicación constante desde el primer contacto." },
              {
                title: "Postventa comprometida",
                desc: "Seguimiento y soporte para que disfrutes tu auto con total tranquilidad.",
              },
            ].map((d, i) => (
              <Card key={i} className="hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{d.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-pink-600 to-cyan-600">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">¿Listo para tu próximo vehículo?</h2>
          <p className="max-w-2xl mx-auto text-white/90 mb-8">
            Conoce nuestro catálogo o contáctanos y te acompañamos en cada paso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/catalogo">
              <Button className="bg-white text-slate-900 hover:bg-white/90">Ver catálogo</Button>
            </Link>
            <Link href="/contacto">
              <Button variant="outline" className="border-2 text-white hover:bg-white/10">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
