"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, MapPin, DollarSign, BedDouble, Bath, MessageSquare, Calendar } from "lucide-react"
import type { Client } from "@/lib/agent-service"

interface ClientCardProps {
  client: Client
  onMessage?: (id: string) => void
  onSchedule?: (id: string) => void
}

export function ClientCard({ client, onMessage, onSchedule }: ClientCardProps) {
  return (
    <Card className="overflow-hidden rounded-3xl">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-12 w-12 mr-3">
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{client.name}</h3>
              <div className="text-sm text-muted-foreground">{client.email}</div>
            </div>
          </div>
          <Badge className={client.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
            {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-3 mb-4">
          <h4 className="font-medium text-sm">Preferences</h4>
          <div className="flex flex-wrap gap-2">
            {client.preferences.propertyType.map((type) => (
              <Badge key={type} variant="outline" className="flex items-center gap-1 rounded-full">
                <Home className="h-3 w-3" />
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {client.preferences.location.map((location) => (
              <Badge key={location} variant="outline" className="flex items-center gap-1 rounded-full">
                <MapPin className="h-3 w-3" />
                {location}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="flex items-center gap-1 rounded-full">
              <DollarSign className="h-3 w-3" />${client.preferences.budget[0].toLocaleString()} - $
              {client.preferences.budget[1].toLocaleString()}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 rounded-full">
              <BedDouble className="h-3 w-3" />
              {client.preferences.bedrooms} BR
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1 rounded-full">
              <Bath className="h-3 w-3" />
              {client.preferences.bathrooms} BA
            </Badge>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 flex items-center justify-center rounded-full"
            onClick={() => onMessage?.(client.id)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
          <Button
            className="flex-1 flex items-center justify-center bg-brand-dark text-white rounded-full"
            onClick={() => onSchedule?.(client.id)}
          >
            <Calendar className="h-4 w-4 mr-1" />
            Schedule
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
