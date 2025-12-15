import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Car, DollarSign, MessageSquare, TrendingUp } from "lucide-react"

export default function AdminDashboardPage() {
  // Sample stats - will be replaced with database queries
  const stats = {
    totalCars: 8,
    availableCars: 8,
    soldCars: 0,
    totalRevenue: 328000000,
    pendingMessages: 5,
    monthlyGrowth: 12.5,
  }

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
            <div className="text-3xl font-bold">{stats.totalCars}</div>
            <p className="text-xs text-muted-foreground mt-1">{stats.availableCars} disponibles</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Ingresos Totales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${(stats.totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground mt-1">Valor inventario</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Mensajes Pendientes</CardTitle>
            <MessageSquare className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.pendingMessages}</div>
            <p className="text-xs text-muted-foreground mt-1">Requieren atención</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Crecimiento Mensual</CardTitle>
            <TrendingUp className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">+{stats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground mt-1">vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <div className="flex-1">
                  <p className="font-medium">Nuevo vehículo publicado</p>
                  <p className="text-sm text-muted-foreground">Tesla Model 3 - Hace 2 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="font-medium">Mensaje recibido</p>
                  <p className="text-sm text-muted-foreground">Carlos Rodríguez - Hace 3 horas</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-accent/50 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <div className="flex-1">
                  <p className="font-medium">Promoción actualizada</p>
                  <p className="text-sm text-muted-foreground">Financiamiento 0% - Hace 1 día</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vehículos Más Vistos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">BMW Serie 3</p>
                  <p className="text-sm text-muted-foreground">234 visualizaciones</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$45M</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mercedes-Benz C-Class</p>
                  <p className="text-sm text-muted-foreground">198 visualizaciones</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$55M</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Porsche Macan</p>
                  <p className="text-sm text-muted-foreground">167 visualizaciones</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">$65M</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
