"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, DollarSign, MessageSquare, TrendingUp } from "lucide-react"
import {useEffect, useState} from "react";


type AdminStats = {
  totalCars: number
  availableCars: number
  soldCars: number
  pendingMessages: number
  totalRevenue?: number
}

export default function AdminDashboardPage() {
  // Fetch real stats from API


  const [stats, setStats] = useState<AdminStats>()

  const  fetchStats = async () => {
    try {
      const res = await fetch(`/api/admin/stats`, {
        cache: "no-store",
        // Ensure absolute URL is optional; empty base works on server in Next.js
      })
      if (res.ok) {
        const data = (await res.json()) as AdminStats

        setStats(data)

      }
    } catch {
      // Silently fall back to zeros
    }
  }

  useEffect(() => {
    fetchStats()
  }, []);


  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Bienvenido al panel de administración de VVS Motors</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Vehículos</CardTitle>
            <Car className="h-5 w-5 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.totalCars}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats?.availableCars} disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(((stats?.totalRevenue ?? 0) as number) / 1_000_000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Valor inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mensajes Pendientes</CardTitle>
            <MessageSquare className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats?.pendingMessages}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crecimiento Mensual</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">N/A</div>
            <p className="text-xs text-muted-foreground mt-1">vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      </div>
    </div>
  )
}
