"use client"

import { useFilters } from "@/lib/filter-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const amenities = [
  { id: "wifi", label: "Wi-Fi" },
  { id: "pool", label: "Swimming Pool" },
  { id: "air-conditioning", label: "Air Conditioning" },
  { id: "kitchen", label: "Kitchen" },
  { id: "parking", label: "Free Parking" },
  { id: "washing-machine", label: "Washing Machine" },
  { id: "tv", label: "TV" },
  { id: "workspace", label: "Workspace" },
  { id: "beach", label: "Beach Access" },
  { id: "gym", label: "Gym" },
  { id: "elevator", label: "Elevator" },
  { id: "pet-friendly", label: "Pet Friendly" },
]

export function AmenitiesFilter() {
  const { filters, setFilters } = useFilters()

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters((prev) => {
      if (checked) {
        return {
          ...prev,
          amenities: [...prev.amenities, amenity],
        }
      } else {
        return {
          ...prev,
          amenities: prev.amenities.filter((a) => a !== amenity),
        }
      }
    })
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Amenities</h3>
      <div className="grid grid-cols-2 gap-2">
        {amenities.map((amenity) => (
          <div key={amenity.id} className="flex items-center space-x-2">
            <Checkbox
              id={`amenity-${amenity.id}`}
              checked={filters.amenities.includes(amenity.id)}
              onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
            />
            <Label htmlFor={`amenity-${amenity.id}`} className="text-sm cursor-pointer">
              {amenity.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
