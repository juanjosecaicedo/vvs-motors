"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react"

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterBrand, setFilterBrand] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [sortBy, setSortBy] = useState("featured")

  // Sample data - will be replaced with database query
  const allCars = [
    {
      id: "1",
      brand: "BMW",
      model: "Serie 3",
      year: 2023,
      price: 45000000,
      image:
        "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "2.0L Turbo",
      mileage: 5000,
      color: "Negro",
      status: "available",
    },
    {
      id: "2",
      brand: "Audi",
      model: "A4",
      year: 2022,
      price: 35000000,
      image:
        "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "1.8L TFSI",
      mileage: 12000,
      color: "Blanco",
      status: "available",
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
      fuel: "2.5L V6",
      mileage: 3000,
      color: "Plateado",
      status: "available",
    },
    {
      id: "4",
      brand: "Honda",
      model: "Civic",
      year: 2023,
      price: 28000000,
      image:
        "https://images.unsplash.com/photo-1494905998402-395d579af36f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Manual",
      fuel: "1.6L VTEC",
      mileage: 8000,
      color: "Rojo",
      status: "available",
    },
    {
      id: "5",
      brand: "Porsche",
      model: "Macan",
      year: 2023,
      price: 65000000,
      image:
        "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "3.0L V6",
      mileage: 2000,
      color: "Azul",
      status: "available",
    },
    {
      id: "6",
      brand: "Toyota",
      model: "RAV4",
      year: 2023,
      price: 32000000,
      image:
        "https://images.unsplash.com/photo-1617788138017-80ad40651399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "2.0L Híbrido",
      mileage: 6000,
      color: "Gris",
      status: "available",
    },
    {
      id: "7",
      brand: "Tesla",
      model: "Model 3",
      year: 2024,
      price: 72000000,
      image:
        "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "Eléctrico",
      mileage: 1000,
      color: "Blanco Perla",
      status: "available",
    },
    {
      id: "8",
      brand: "Mazda",
      model: "CX-5",
      year: 2023,
      price: 38000000,
      image:
        "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      transmission: "Automático",
      fuel: "2.5L Skyactiv",
      mileage: 7500,
      color: "Rojo Soul",
      status: "available",
    },
  ]

  // Filter and sort cars
  const filteredCars = allCars
    .filter((car) => {
      const matchesSearch =
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesBrand = filterBrand === "all" || car.brand === filterBrand
      const matchesYear = filterYear === "all" || car.year.toString() === filterYear
      return matchesSearch && matchesBrand && matchesYear
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price
      if (sortBy === "price-desc") return b.price - a.price
      if (sortBy === "year") return b.year - a.year
      return 0 // featured
    })

  const brands = ["all", ...new Set(allCars.map((car) => car.brand))]
  const years = ["all", ...new Set(allCars.map((car) => car.year.toString()))]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-64 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Catálogo de Vehículos</h1>
          <p className="text-xl text-gray-100">Encuentra el auto perfecto para ti</p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-xl font-semibold">Filtros y Búsqueda</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div>
                <Label htmlFor="search">Buscar</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Marca o modelo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div>
                <Label htmlFor="brand">Marca</Label>
                <Select value={filterBrand} onValueChange={setFilterBrand}>
                  <SelectTrigger id="brand">
                    <SelectValue placeholder="Todas las marcas" />
                  </SelectTrigger>
                  <SelectContent>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand === "all" ? "Todas las marcas" : brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Year Filter */}
              <div>
                <Label htmlFor="year">Año</Label>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Todos los años" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year === "all" ? "Todos los años" : year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <div>
                <Label htmlFor="sort">Ordenar por</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger id="sort">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Destacados</SelectItem>
                    <SelectItem value="price-asc">Precio: Menor a Mayor</SelectItem>
                    <SelectItem value="price-desc">Precio: Mayor a Menor</SelectItem>
                    <SelectItem value="year">Año: Más Reciente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Mostrando {filteredCars.length} de {allCars.length} vehículos
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <Card
              key={car.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={car.image || "/placeholder.svg"}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-cyan-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
                  ${car.price.toLocaleString("es-CO")}
                </div>
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-medium">
                  {car.status === "available" ? "Disponible" : "Vendido"}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  {car.brand} {car.model}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                  <span>{car.year}</span>
                  <span>•</span>
                  <span>{car.transmission}</span>
                  <span>•</span>
                  <span>{car.fuel}</span>
                </div>
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-muted-foreground">{car.mileage.toLocaleString()} km</span>
                  <span className="text-muted-foreground">{car.color}</span>
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

        {filteredCars.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-4">
              No se encontraron vehículos con los criterios seleccionados
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setFilterBrand("all")
                setFilterYear("all")
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        )}
      </section>
    </div>
  )
}
