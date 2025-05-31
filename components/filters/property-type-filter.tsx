"use client"

import { useFilters } from "@/lib/filter-context"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const propertyTypes = [
  { id: "apartment", label: "Apartment" },
  { id: "house", label: "House" },
  { id: "villa", label: "Villa" },
  { id: "condo", label: "Condo" },
  { id: "loft", label: "Loft" },
  { id: "studio", label: "Studio" },
  { id: "cabin", label: "Cabin" },
  { id: "farm", label: "Farm" },
]

export function PropertyTypeFilter() {
  const { filters, setFilters } = useFilters()

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters((prev) => {
      if (checked) {
        return {
          ...prev,
          propertyTypes: [...prev.propertyTypes, type],
        }
      } else {
        return {
          ...prev,
          propertyTypes: prev.propertyTypes.filter((t) => t !== type),
        }
      }
    })
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Property Type</h3>
      <div className="grid grid-cols-2 gap-2">
        {propertyTypes.map((type) => (
          <div key={type.id} className="flex items-center space-x-2">
            <Checkbox
              id={`type-${type.id}`}
              checked={filters.propertyTypes.includes(type.id)}
              onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
            />
            <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
              {type.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
