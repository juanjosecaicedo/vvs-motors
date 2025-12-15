"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Mail, MailOpen, Archive, Trash2 } from "lucide-react"

interface Message {
  id: string
  name: string
  email: string
  phone: string | null
  message: string
  car_id: string | null
  status: string
  created_at: string
}

export default function AdminMessagesPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "replied">("all")
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/admin/messages")
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error("Error fetching messages:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateMessageStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error updating message:", error)
    }
  }

  const deleteMessage = async (id: string) => {
    if (!confirm("¿Estás seguro de eliminar este mensaje?")) return

    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchMessages()
      }
    } catch (error) {
      console.error("Error deleting message:", error)
    }
  }

  const filteredMessages = messages.filter((msg) => filter === "all" || msg.status === filter)

  const getStatusColor = (status: string) => {
    if (status === "pending") return "bg-orange-500"
    if (status === "replied") return "bg-green-500"
    return "bg-gray-500"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">Mensajes de Contacto</h1>
        <p className="text-muted-foreground mt-2">Gestiona las consultas de clientes</p>
      </div>

      <div className="flex gap-2">
        <Button variant={filter === "all" ? "default" : "outline"} onClick={() => setFilter("all")}>
          Todos ({messages.length})
        </Button>
        <Button variant={filter === "pending" ? "default" : "outline"} onClick={() => setFilter("pending")}>
          Pendientes ({messages.filter((m) => m.status === "pending").length})
        </Button>
        <Button variant={filter === "replied" ? "default" : "outline"} onClick={() => setFilter("replied")}>
          Respondidos ({messages.filter((m) => m.status === "replied").length})
        </Button>
      </div>

      <div className="space-y-4">
        {filteredMessages.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No hay mensajes en esta categoría</p>
            </CardContent>
          </Card>
        ) : (
          filteredMessages.map((message) => (
            <Card key={message.id} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getStatusColor(message.status)} ${message.status === "pending" ? "animate-pulse" : ""}`}
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{message.email}</span>
                        {message.phone && (
                          <>
                            <span>•</span>
                            <span>{message.phone}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={message.status === "pending" ? "destructive" : "secondary"}>
                      {message.status === "pending"
                        ? "Pendiente"
                        : message.status === "replied"
                          ? "Respondido"
                          : "Archivado"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(message.created_at).toLocaleDateString("es-CO")}
                    </span>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4 leading-relaxed">{message.message}</p>

                {message.car_id && (
                  <div className="mb-4 p-3 bg-accent/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Interesado en: Vehículo ID #{message.car_id}</p>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  {message.status === "pending" ? (
                    <Button
                      size="sm"
                      className="bg-green-500 hover:bg-green-600"
                      onClick={() => updateMessageStatus(message.id, "replied")}
                    >
                      <MailOpen className="mr-2 h-4 w-4" />
                      Marcar como Respondido
                    </Button>
                  ) : message.status === "replied" ? (
                    <Button size="sm" variant="outline" onClick={() => updateMessageStatus(message.id, "pending")}>
                      <Mail className="mr-2 h-4 w-4" />
                      Marcar como Pendiente
                    </Button>
                  ) : null}
                  <Button size="sm" variant="outline" onClick={() => updateMessageStatus(message.id, "archived")}>
                    <Archive className="mr-2 h-4 w-4" />
                    Archivar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                    onClick={() => deleteMessage(message.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Eliminar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
