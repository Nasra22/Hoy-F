import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { MapPin, BedDouble } from "lucide-react"
import { getSimilarProperties } from "@/lib/property-service"

interface SimilarPropertiesProps {
  currentPropertyId: string
  propertyType: string
  location: string
}

export async function SimilarProperties({ currentPropertyId, propertyType, location }: SimilarPropertiesProps) {
  const similarProperties = await getSimilarProperties(currentPropertyId, propertyType, location)

  if (similarProperties.length === 0) {
    return null
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-3">Similar Properties</h2>
        <div className="space-y-4">
          {similarProperties.map((property) => (
            <Link href={`/property/${property.id}`} key={property.id} className="block">
              <div className="flex gap-3 group">
                <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                  <Image
                    src={property.images[0].url || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span className="truncate">{property.location}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center text-xs">
                      <BedDouble className="h-3 w-3 mr-1" />
                      {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
                    </div>
                    <div className="text-sm font-medium">
                      ${property.price}
                      <span className="text-xs font-normal text-muted-foreground">/{property.priceUnit}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
