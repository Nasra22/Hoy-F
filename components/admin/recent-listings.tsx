import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

const listings = [
  {
    id: 1,
    title: "Luxury Villa with Pool",
    location: "Mexico City, CDMX, Mexico",
    image: "/placeholder.svg?height=300&width=500",
    status: "Pending",
    type: "Apartment",
    owner: "John Smith",
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "Oaxaca, Costa Rica",
    image: "/placeholder.svg?height=300&width=500",
    status: "Pending",
    type: "Loft",
    owner: "Sarah Johnson",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Paris, France",
    image: "/placeholder.svg?height=300&width=500",
    status: "Pending",
    type: "Condo",
    owner: "Miguel Rodriguez",
  },
]

export function RecentListings() {
  return (
    <div className="space-y-4">
      {listings.map((listing) => (
        <Card key={listing.id}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0">
                <Image
                  src={listing.image || "/placeholder.svg"}
                  alt={listing.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{listing.title}</h4>
                  <Badge variant="outline">{listing.status}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-1">{listing.location}</p>
                <p className="text-sm mt-1">Type: {listing.type}</p>
                <p className="text-sm mt-1">Owner: {listing.owner}</p>

                <div className="flex gap-2 mt-4 justify-end">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <X className="h-3 w-3 mr-1" />
                    Reject
                  </Button>
                  <Button size="sm" className="flex items-center">
                    <Check className="h-3 w-3 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
