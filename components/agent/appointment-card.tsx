"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin, CheckCircle, X, MessageSquare } from "lucide-react"
import type { Appointment } from "@/lib/agent-service"

interface AppointmentCardProps {
  appointment: Appointment
  onComplete?: (id: string) => void
  onCancel?: (id: string) => void
  onMessage?: (clientId: string) => void
}

export function AppointmentCard({ appointment, onComplete, onCancel, onMessage }: AppointmentCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "scheduled":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="overflow-hidden rounded-3xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg">{appointment.propertyTitle}</h3>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              <span>Property Viewing</span>
            </div>
          </div>
          <Badge className={`${getStatusColor(appointment.status)} rounded-full`}>
            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
          </Badge>
        </div>

        <div className="flex items-center mb-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={appointment.clientAvatar || "/placeholder.svg"} alt={appointment.clientName} />
            <AvatarFallback>{appointment.clientName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{appointment.clientName}</div>
            <div className="text-sm text-muted-foreground">Client</div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{appointment.time}</span>
          </div>
          {appointment.notes && (
            <div className="text-sm text-muted-foreground mt-2">
              <p className="italic">"{appointment.notes}"</p>
            </div>
          )}
        </div>

        {appointment.status === "scheduled" && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 flex items-center justify-center rounded-full"
              onClick={() => onMessage?.(appointment.clientId)}
            >
              <MessageSquare className="h-4 w-4 mr-1" />
              Message
            </Button>
            <Button
              variant="outline"
              className="flex items-center justify-center text-destructive rounded-full"
              onClick={() => onCancel?.(appointment.id)}
            >
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
            <Button
              className="flex items-center justify-center bg-brand-dark text-white rounded-full"
              onClick={() => onComplete?.(appointment.id)}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Complete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
