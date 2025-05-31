import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const notifications = [
  {
    id: 1,
    user: {
      name: "Elke",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has Requested a Swap",
    time: "4 hrs ago",
  },
  {
    id: 2,
    user: {
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "have Matching",
    time: "8 hrs ago",
  },
  {
    id: 3,
    user: {
      name: "Isabella",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "sent Message",
    time: "1 day ago",
  },
  {
    id: 4,
    user: {
      name: "Michael",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    action: "has Requested a Swap",
    time: "2 days ago",
  },
]

export function NotificationFeed() {
  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <Card key={notification.id} className="bg-muted/50">
          <CardContent className="p-3 flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={notification.avatar || "/placeholder.svg"} alt={notification.user.name} />
              <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="font-medium">{notification.user.name}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="text-sm">{notification.action}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
