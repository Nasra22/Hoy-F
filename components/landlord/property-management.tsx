import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, Trash } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Luxury Villa with Pool",
    location: "Mexico City, CDMX, Mexico",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    type: "Apartment",
  },
  {
    id: 2,
    title: "Modern Downtown Loft",
    location: "Oaxaca, Costa Rica",
    image: "/placeholder.svg?height=300&width=500",
    status: "Pending Approval",
    type: "Loft",
  },
  {
    id: 3,
    title: "Beachfront Condo",
    location: "Paris, France",
    image: "/placeholder.svg?height=300&width=500",
    status: "Active",
    type: "Condo",
  },
]

export function PropertyManagement() {
  return (
    <div className="space-y-4">
      {properties.map((property) => (
        <Card key={property.id}>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 flex-shrink-0">
                <Image
                  src={property.image || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{property.title}</h4>
                  <Badge variant={property.status === "Active" ? "default" : "outline"}>{property.status}</Badge>
                </div>

                <p className="text-sm text-muted-foreground mt-1">{property.location}</p>
                <p className="text-sm mt-1">Type: {property.type}</p>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center text-destructive">
                    <Trash className="h-3 w-3 mr-1" />
                    Delete
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
