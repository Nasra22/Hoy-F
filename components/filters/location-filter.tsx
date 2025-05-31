"use client"

import { useState, useEffect } from "react"
import { useFilters } from "@/lib/filter-context"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

// Sample locations - in a real app, these would come from an API
const locations = [
  { value: "mexico-city", label: "Mexico City, CDMX, Mexico" },
  { value: "oaxaca", label: "Oaxaca, Costa Rica" },
  { value: "paris", label: "Paris, France" },
  { value: "new-york", label: "New York, USA" },
  { value: "tokyo", label: "Tokyo, Japan" },
  { value: "barcelona", label: "Barcelona, Spain" },
  { value: "san-miguel", label: "San Miguel, Mexico" },
]

export function LocationFilter() {
  const { filters, setFilters } = useFilters()
  const [open, setOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)

  // Update local state when filters change
  useEffect(() => {
    setSelectedLocation(filters.location)
  }, [filters.location])

  const handleSelect = (value: string) => {
    const location = value === selectedLocation ? null : value
    setSelectedLocation(location)
    setFilters((prev) => ({
      ...prev,
      location,
    }))
    setOpen(false)
  }

  const selectedLocationLabel = locations.find((loc) => loc.value === selectedLocation)?.label || "Select location"

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Location</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedLocationLabel}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {locations.map((location) => (
                  <CommandItem key={location.value} value={location.value} onSelect={handleSelect}>
                    <Check
                      className={cn("mr-2 h-4 w-4", selectedLocation === location.value ? "opacity-100" : "opacity-0")}
                    />
                    {location.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
