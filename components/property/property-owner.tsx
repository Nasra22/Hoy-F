"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageSquare, Star } from "lucide-react"
import type { PropertyOwner } from "@/lib/property-service"
import { useSocket } from "@/components/chat/socket-provider"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface PropertyOwnerProps {
  owner: PropertyOwner
  propertyId: string
}

export function PropertyOwner({ owner, propertyId }: PropertyOwnerProps) {
  const router = useRouter()
  const { joinRoom } = useSocket()
  const [isMessageSending, setIsMessageSending] = useState(false)

  const handleContactOwner = () => {
    setIsMessageSending(true)

    // In a real app, you would create or get a chat room with this owner
    // For now, we'll simulate this with a timeout
    setTimeout(() => {
      // Join the room (using owner ID as room ID for this example)
      joinRoom(`room-${owner.id}`)

      // Navigate to messages page
      router.push("/client/messages")

      setIsMessageSending(false)
    }, 1000)
  }

  const handleBookProperty = () => {
    // In a real app, this would initiate the booking process
    alert("Booking functionality would be implemented here")
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="h-12 w-12 mr-3">
            <AvatarImage src={owner.avatar || "/placeholder.svg"} alt={owner.name} />
            <AvatarFallback>{owner.name.charAt(0)}</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">Hosted by {owner.name}</h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
              {owner.rating} · Member since {owner.memberSince}
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex justify-between">
            <span>Response rate:</span>
            <span className="font-medium">{owner.responseRate}%</span>
          </div>
          <div className="flex justify-between">
            <span>Response time:</span>
            <span className="font-medium">{owner.responseTime}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Button className="w-full flex items-center justify-center gap-2" onClick={handleBookProperty}>
            Book Now
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
            onClick={handleContactOwner}
            disabled={isMessageSending}
          >
            <MessageSquare className="h-4 w-4" />
            {isMessageSending ? "Opening chat..." : "Contact Host"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
