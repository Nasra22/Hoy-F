import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Heart, MapPin, MessageSquare, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllProperties, type Property } from "@/lib/property-service"
import type { PropertyCategory } from "@/components/client/property-tabs"

interface PropertyListingsProps {
  properties?: Property[]
  category?: PropertyCategory
}

export async function PropertyListings({ properties, category = "all" }: PropertyListingsProps) {
  // If properties are not provided, fetch them
  let displayProperties = properties || (await getAllProperties())

  // Filter properties by category if not "all"
  if (category !== "all") {
    displayProperties = displayProperties.filter((property) => property.type.toLowerCase() === category)
  }

  if (displayProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No properties found</h3>
        <p className="text-muted-foreground">Try changing your filters or category</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayProperties.map((property) => (
        <div key={property.id} className="bg-card rounded-3xl overflow-hidden shadow">
          <Link href={`/property/${property.id}`} className="block relative h-48">
            <Image
              src={property.images[0].url || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
            />
            <div className="absolute top-3 right-3">
              <Badge className="bg-brand-yellow text-brand-dark font-medium rounded-full">{property.type}</Badge>
            </div>
            <div className="absolute bottom-3 right-3">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src={property.owner.avatar || "/placeholder.svg"} alt={property.owner.name} />
                <AvatarFallback>{property.owner.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </Link>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <Link href={`/property/${property.id}`} className="hover:text-brand-dark transition-colors">
                <h4 className="font-semibold text-lg">{property.title}</h4>
              </Link>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <Heart className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              {property.location}
            </div>

            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              {property.dateRange}
            </div>

            <div className="mt-3 font-bold text-lg">
              ${property.price}{" "}
              <span className="text-sm font-normal text-muted-foreground">/ {property.priceUnit}</span>
            </div>

            {property.swapLocations && (
              <div className="mt-3">
                <div className="text-sm font-medium mb-1">Swap for</div>
                <div className="flex flex-wrap gap-1">
                  {property.swapLocations.map((location, index) => (
                    <Badge key={index} variant="outline" className="text-xs rounded-full">
                      {location}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" className="flex items-center rounded-full">
                <MessageSquare className="h-3 w-3 mr-1" />
                Message
              </Button>
              <Button variant="outline" size="sm" className="flex items-center rounded-full">
                <Share2 className="h-3 w-3 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
