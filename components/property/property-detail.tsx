import { Badge } from "@/components/ui/badge"
import { Calendar, Home, MapPin, Ruler, ShowerHeadIcon as Shower, BedDouble, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/lib/property-service"

interface PropertyDetailProps {
  property: Property
}

export function PropertyDetail({ property }: PropertyDetailProps) {
  return (
    <div className="bg-card rounded-3xl p-6 shadow space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{property.title}</h1>
          <div className="flex items-center text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <Heart className="h-4 w-4" />
            <span className="sr-only">Save property</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share property</span>
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 py-4">
        <Badge variant="secondary" className="flex items-center gap-1 rounded-full px-3 py-1">
          <Home className="h-3 w-3" />
          {property.type}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 rounded-full px-3 py-1">
          <BedDouble className="h-3 w-3" />
          {property.bedrooms} {property.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 rounded-full px-3 py-1">
          <Shower className="h-3 w-3" />
          {property.bathrooms} {property.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1 rounded-full px-3 py-1">
          <Ruler className="h-3 w-3" />
          {property.size} {property.sizeUnit}
        </Badge>
        {property.dateRange && (
          <Badge variant="secondary" className="flex items-center gap-1 rounded-full px-3 py-1">
            <Calendar className="h-3 w-3" />
            {property.dateRange}
          </Badge>
        )}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">About this property</h2>
        <p className="text-muted-foreground">{property.description}</p>
      </div>

      {property.swapLocations && property.swapLocations.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Swap Locations</h2>
          <div className="flex flex-wrap gap-2">
            {property.swapLocations.map((location, index) => (
              <Badge key={index} variant="outline" className="rounded-full">
                {location}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
