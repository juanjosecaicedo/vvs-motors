"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react"

interface Car {
  id: string
  brand: string
  model: string
  year: number
  price: number
  image_url: string | null
  status: string
  featured: boolean
}

export default function AdminCarsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCars()
  }, [])

  const fetchCars = async () => {
    try {
      const response = await fetch("/api/cars")
      if (response.ok) {
        const data = await response.json()
        setCars(data)
      }
    } catch (error) {
      console.error("Error fetching cars:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCar = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este vehículo?")) return

    try {
      const response = await fetch(`/api/admin/cars/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchCars()
      } else {
        alert("Error al eliminar el vehículo")
      }
    } catch (error) {
      console.error("Error deleting car:", error)
      alert("Error al eliminar el vehículo")
    }
  }

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
          <h1 className="text-4xl font-bold">Gestión de Vehículos</h1>
          <p className="text-muted-foreground mt-2">Administra el inventario de vehículos</p>
        </div>
        <Link href="/admin/cars/new">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600"
          >
            <Plus className="mr-2 h-5 w-5" />
            Nuevo Vehículo
          </Button>
        </Link>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Buscar por marca o modelo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No hay vehículos registrados</p>
                <Link href="/admin/cars/new">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Agregar primer vehículo
                  </Button>
                </Link>
              </div>
            ) : (
              filteredCars.map((car) => (
                <div
                  key={car.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition"
                >
                  <img
                    src={car.image_url || "/placeholder.svg?height=100&width=150"}
                    alt={car.model}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">
                        {car.brand} {car.model}
                      </h3>
                      {car.featured && (
                        <Badge variant="secondary" className="bg-gradient-to-r from-pink-500 to-cyan-500 text-white">
                          Destacado
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{car.year}</span>
                      <span>•</span>
                      <span className="font-semibold text-foreground">${car.price.toLocaleString("es-CO")}</span>
                      <span>•</span>
                      <Badge
                        variant={car.status === "available" ? "default" : "secondary"}
                        className={car.status === "available" ? "bg-green-500" : ""}
                      >
                        {car.status === "available" ? "Disponible" : car.status === "sold" ? "Vendido" : "Reservado"}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/catalogo/${car.id}`} target="_blank">
                      <Button variant="ghost" size="icon" title="Ver en catálogo">
                        <Eye className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href={`/admin/cars/${car.id}`}>
                      <Button variant="ghost" size="icon" title="Editar">
                        <Edit className="h-5 w-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteCar(car.id)}
                      title="Eliminar"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
