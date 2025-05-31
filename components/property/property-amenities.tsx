import type React from "react"
import {
  Wifi,
  Tv,
  Car,
  Snowflake,
  Utensils,
  Waves,
  Dumbbell,
  CableCarIcon as Elevator,
  Briefcase,
  Bath,
} from "lucide-react"
import type { PropertyAmenity } from "@/lib/property-service"

interface PropertyAmenitiesProps {
  amenities: PropertyAmenity[]
}

// Map of amenity icons
const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-5 w-5" />,
  tv: <Tv className="h-5 w-5" />,
  parking: <Car className="h-5 w-5" />,
  "air-conditioning": <Snowflake className="h-5 w-5" />,
  kitchen: <Utensils className="h-5 w-5" />,
  pool: <Bath className="h-5 w-5" />,
  beach: <Waves className="h-5 w-5" />,
  gym: <Dumbbell className="h-5 w-5" />,
  elevator: <Elevator className="h-5 w-5" />,
  workspace: <Briefcase className="h-5 w-5" />,
}

export function PropertyAmenities({ amenities }: PropertyAmenitiesProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center gap-2">
            {amenityIcons[amenity.icon] || <div className="h-5 w-5" />}
            <span>{amenity.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
