"use client"

import type { Control } from "react-hook-form"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"

// List of common property features
const propertyFeatures = [
  { id: "airConditioning", label: "Air Conditioning" },
  { id: "heating", label: "Heating" },
  { id: "wifi", label: "WiFi" },
  { id: "tv", label: "TV" },
  { id: "kitchen", label: "Kitchen" },
  { id: "washer", label: "Washer" },
  { id: "dryer", label: "Dryer" },
  { id: "parking", label: "Parking" },
  { id: "elevator", label: "Elevator" },
  { id: "pool", label: "Pool" },
  { id: "gym", label: "Gym" },
  { id: "balcony", label: "Balcony" },
  { id: "terrace", label: "Terrace" },
  { id: "garden", label: "Garden" },
  { id: "patio", label: "Patio" },
  { id: "bbq", label: "BBQ" },
  { id: "fireplace", label: "Fireplace" },
  { id: "securitySystem", label: "Security System" },
  { id: "doorman", label: "Doorman" },
  { id: "furnished", label: "Furnished" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "smokingAllowed", label: "Smoking Allowed" },
  { id: "wheelchairAccessible", label: "Wheelchair Accessible" },
  { id: "garage", label: "Garage" },
  { id: "laundry", label: "Laundry" },
  { id: "dishwasher", label: "Dishwasher" },
  { id: "beachfront", label: "Beachfront" },
  { id: "waterfront", label: "Waterfront" },
  { id: "skiInOut", label: "Ski-In/Ski-Out" },
  { id: "mountainView", label: "Mountain View" },
  { id: "oceanView", label: "Ocean View" },
  { id: "lakeView", label: "Lake View" },
]

interface PropertyFeaturesProps {
  control: Control<any>
  name: string
}

export function PropertyFeatures({ control, name }: PropertyFeaturesProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Features & Amenities</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Select all the features and amenities that apply to this property.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {propertyFeatures.map((feature) => (
          <FormField
            key={feature.id}
            control={control}
            name={name}
            render={({ field }) => {
              return (
                <FormItem
                  key={feature.id}
                  className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(feature.id)}
                      onCheckedChange={(checked) => {
                        const currentValue = field.value || []
                        return checked
                          ? field.onChange([...currentValue, feature.id])
                          : field.onChange(currentValue.filter((value: string) => value !== feature.id))
                      }}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">{feature.label}</FormLabel>
                </FormItem>
              )
            }}
          />
        ))}
      </div>
    </div>
  )
}
