import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

const verifications = [
  {
    id: 1,
    user: {
      name: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Landlord",
    },
    documentType: "ID Verification",
    submittedAt: "2 hours ago",
  },
  {
    id: 2,
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Agent",
    },
    documentType: "Business License",
    submittedAt: "5 hours ago",
  },
  {
    id: 3,
    user: {
      name: "Miguel Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Truck Driver",
    },
    documentType: "Driver's License",
    submittedAt: "1 day ago",
  },
]

export function PendingVerifications() {
  return (
    <div className="space-y-4">
      {verifications.map((verification) => (
        <Card key={verification.id}>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={verification.user.avatar || "/placeholder.svg"} alt={verification.user.name} />
                <AvatarFallback>{verification.user.name.charAt(0)}</AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex justify-between">
                  <span className="font-medium">{verification.user.name}</span>
                  <Badge variant="outline">{verification.user.role}</Badge>
                </div>
                <div className="flex justify-between mt-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-3 w-3 mr-1" />
                    {verification.documentType}
                  </div>
                  <span className="text-xs text-muted-foreground">{verification.submittedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-4 justify-end">
              <Button variant="outline" size="sm">
                Reject
              </Button>
              <Button size="sm">Approve</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
