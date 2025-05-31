import Image from "next/image"
import { BedDouble, Bath, Ruler, DollarSign, Heart, Share2, MapPin, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Property } from "@/lib/property-service"

interface PropertyCardProps {
  property: Property
  isCompact: boolean
}

export default function PropertyCard({ property, isCompact }: PropertyCardProps) {
  if (isCompact) {
    return (
      <div className="w-full max-w-xs bg-white rounded-lg overflow-hidden">
        <div className="relative h-32 w-full">
          <Image src={property.imageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs font-medium">
            {property.type}
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate">{property.title}</h3>
          <p className="text-sm text-gray-500 truncate">{property.address}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="font-bold">${property.price.toLocaleString()}</p>
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <span className="flex items-center">
                <BedDouble className="h-3 w-3 mr-1" /> {property.bedrooms === 0 ? "Studio" : property.bedrooms}
              </span>
              <span className="flex items-center">
                <Bath className="h-3 w-3 mr-1" /> {property.bathrooms}
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="relative h-64 w-full">
        <Image src={property.imageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        <div className="absolute top-4 left-4 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs font-medium">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 flex space-x-2">
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-bold">{property.title}</h2>
        <p className="flex items-center text-gray-500 mt-1">
          <MapPin className="h-4 w-4 mr-1" /> {property.address}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center text-gray-700">
            <DollarSign className="h-5 w-5 text-yellow-500" />
            <span className="text-xl font-bold">${property.price.toLocaleString()}</span>
            {property.type === "Rent" && <span className="text-sm text-gray-500 ml-1">/month</span>}
          </div>
          <Badge variant="outline" className="bg-gray-100">
            {property.type}
          </Badge>
        </div>

        <div className="flex items-center justify-between mt-4 border-t border-b py-4">
          <div className="flex flex-col items-center">
            <BedDouble className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm font-medium">{property.bedrooms === 0 ? "Studio" : property.bedrooms}</span>
            <span className="text-xs text-gray-500">Beds</span>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm font-medium">{property.bathrooms}</span>
            <span className="text-xs text-gray-500">Baths</span>
          </div>
          <div className="flex flex-col items-center">
            <Ruler className="h-5 w-5 text-gray-500 mb-1" />
            <span className="text-sm font-medium">{property.sizeUnit}</span>
            <span className="text-xs text-gray-500">Sq Ft</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {property.amenities.map((amenity) => (
              <Badge key={amenity.id} variant="outline" className="flex items-center gap-1 bg-gray-50">
                <Check className="h-3 w-3 text-green-500" />
                {amenity.name}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600 text-sm">{property.description}</p>
        </div>

        <div className="mt-6 flex flex-col space-y-2">
          <Button className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500">Contact Agent</Button>
          <Button variant="outline" className="w-full">
            Schedule Tour
          </Button>
        </div>
      </div>
    </div>
  )
}
