import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Luxury Villa with Pool",
    location: "Mexico City, CDMX, Mexico",
    dateRange: "Nov 25 - Dec 5",
    image: "/placeholder.svg?height=300&width=500",
    price: "$250/night",
    type: "Apartment",
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "Oaxaca, Costa Rica",
    dateRange: "Dec 10 - Dec 20",
    image: "/placeholder.svg?height=300&width=500",
    price: "$180/night",
    type: "Loft",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Paris, France",
    dateRange: "Jan 5 - Jan 15",
    image: "/placeholder.svg?height=300&width=500",
    price: "$300/night",
    type: "Condo",
  },
]

export function PropertyHighlights() {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="relative h-48">
            <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
            <Badge className="absolute top-2 right-2">{property.type}</Badge>
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg">{property.title}</h4>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {property.dateRange}
            </div>
            <div className="mt-2 font-medium">{property.price}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
