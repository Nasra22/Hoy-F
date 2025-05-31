import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const requests = [
  {
    id: 1,
    user: {
      name: "Elke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Luxury Villa with Pool",
    type: "Swap Request",
    time: "4 hrs ago",
  },
  {
    id: 2,
    user: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Beachfront Condo",
    type: "Booking Request",
    time: "2 days ago",
  },
  {
    id: 3,
    user: {
      name: "Isabella",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    property: "Modern Downtown Loft",
    type: "Message",
    time: "1 day ago",
  },
]

export function RecentRequests() {
  return (
    <div className="space-y-4">
      {requests.map((request) => (
        <Card key={request.id}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={request.user.avatar || "/placeholder.svg"} alt={request.user.name} />
                <AvatarFallback>{request.user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{request.user.name}</span>
                  <span className="text-xs text-muted-foreground">{request.time}</span>
                </div>
                <p className="text-sm">
                  {request.type} for {request.property}
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-4 justify-end">
              <Button variant="outline" size="sm">
                Decline
              </Button>
              <Button size="sm">Accept</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
