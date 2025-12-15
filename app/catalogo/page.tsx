"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Search, SlidersHorizontal, Loader2 } from "lucide-react"

// Define interface matching the database/API response
interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  transmission: string
  fuel_type: string
  image_url: string | null
  mileage: number
  color: string | null
  status: "available" | "sold" | "reserved"
  featured: boolean
}

export default function CatalogoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // Debounce search term to avoid too many API calls
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")

  const [filterBrand, setFilterBrand] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [sortBy, setSortBy] = useState("featured") // Mapped to sort option logic

  const [cars, setCars] = useState<Car[]>([])
  const [initialCars, setInitialCars] = useState<Car[]>([]) // For deriving brands/years options
  const [loading, setLoading] = useState(true)
  const [isFiltering, setIsFiltering] = useState(false)

  // Handle debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  // Initial Data Fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch("/api/cars")
        if (!response.ok) throw new Error("Failed to fetch cars")
        const data = await response.json()
        setCars(data)
        setInitialCars(data)
      } catch (error) {
        console.error("Error fetching initial data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInitialData()
  }, [])

  // Filter Data Fetch
  const fetchFilteredCars = useCallback(async () => {
    if (loading) return // Don't trigger during initial load

    setIsFiltering(true)
    try {
      const params = new URLSearchParams()

      if (filterBrand !== "all") params.append("brand", filterBrand)
      if (filterYear !== "all") params.append("year", filterYear)
      if (debouncedSearchTerm) params.append("search", debouncedSearchTerm)

      // Handle Sorting
      if (sortBy === "price-asc") {
        params.append("sortBy", "price")
        params.append("order", "asc")
      } else if (sortBy === "price-desc") {
        params.append("sortBy", "price")
        params.append("order", "desc")
      } else if (sortBy === "year") {
        params.append("sortBy", "year")
        params.append("order", "desc")
      } else {
        // Featured or default (created_at)
        params.append("sortBy", "created_at")
        params.append("order", "desc")
      }

      const response = await fetch(`/api/cars?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch filtered cars")
      const data = await response.json()
      setCars(data)
    } catch (error) {
      console.error("Error fetching filtered cars:", error)
    } finally {
      setIsFiltering(false)
    }
  }, [filterBrand, filterYear, debouncedSearchTerm, sortBy])

  // Trigger filter fetch when dependencies change
  // Skip initial render as separate effect handles 'all' cars
  useEffect(() => {
    if (!loading) {
      fetchFilteredCars()
    }
  }, [fetchFilteredCars, loading])

  // Derive unique brands and years from INITIAL dataset to keep options constant while filtering
  const brands = ["all", ...new Set(initialCars.map((car) => car.brand).filter(Boolean))].sort()
  const years = ["all", ...new Set(initialCars.map((car) => car.year.toString()))].sort((a, b) => b.localeCompare(a))

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
        <div className="mb-6 flex items-center gap-2">
          {loading || isFiltering ? (
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          ) : null}
          <p className="text-muted-foreground">
            {loading ? "Cargando vehículos..." : `Mostrando ${cars.length} de ${cars.length} vehículos`}
            {/* Note: In a paginated API, usage would be 'Showing X of Total' */}
          </p>
        </div>

        {/* Cars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            // Skeleton Loading State
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden h-[400px]">
                <div className="h-56 bg-muted animate-pulse" />
                <CardContent className="p-6 space-y-3">
                  <div className="h-6 w-3/4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-1/2 bg-muted animate-pulse rounded" />
                </CardContent>
              </Card>
            ))
          ) : (
            cars.map((car) => (
              <Card
                key={car.id}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={car.image_url || "/placeholder.svg"}
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
                    <span>{car.fuel_type || car.transmission}</span>
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
            ))
          )}
        </div>

        {!loading && cars.length === 0 && (
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
