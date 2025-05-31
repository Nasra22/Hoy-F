"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { FilterOptions } from "@/lib/property-service"

interface FilterOverlayProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
  initialFilters: FilterOptions
}

export default function FilterOverlay({ isOpen, onClose, onApplyFilters, initialFilters }: FilterOverlayProps) {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters)
  const [expanded, setExpanded] = useState(false)

  // Reset filters to initial state when the component mounts or initialFilters change
  useEffect(() => {
    setFilters(initialFilters)
  }, [initialFilters])

  const handlePriceChange = (value: number[]) => {
    setFilters({
      ...filters,
      priceRange: {
        min: value[0],
        max: value[1],
      },
    })
  }

  const handleBedroomsChange = (value: string) => {
    setFilters({
      ...filters,
      bedrooms: value === "Any" ? "Any" : Number.parseInt(value),
    })
  }

  const handleBathroomsChange = (value: string) => {
    setFilters({
      ...filters,
      bathrooms: value === "Any" ? "Any" : Number.parseInt(value),
    })
  }

  const handlePropertyTypeChange = (type: string) => {
    setFilters({
      ...filters,
      propertyType: type,
    })
  }

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFilters({
      ...filters,
      amenities: checked ? [...filters.amenities, amenity] : filters.amenities.filter((a) => a !== amenity),
    })
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      location: e.target.value,
    })
  }

  const handleReset = () => {
    setFilters({
      location: "",
      priceRange: { min: 0, max: 10000 },
      bedrooms: "Any",
      bathrooms: "Any",
      propertyType: "Any",
      amenities: [],
    })
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-background rounded-t-xl shadow-lg z-20 transition-transform duration-300 ease-in-out",
        expanded ? "h-[80vh]" : "h-auto max-h-[50vh]",
      )}
    >
      {/* Handle and header */}
      <div className="sticky top-0 bg-background rounded-t-xl border-b">
        <div
          className="w-12 h-1 bg-card rounded-full mx-auto my-2 cursor-pointer"
          onClick={() => setExpanded(!expanded)}
        />
        <div className="flex items-center justify-between px-4 py-2">
          <h2 className="text-lg font-semibold">Filters</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <button
          className="flex items-center justify-center w-full py-1 text-sm text-gray-500"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>
              <span>Show less</span>
              <ChevronDown className="h-4 w-4 ml-1" />
            </>
          ) : (
            <>
              <span>Show more</span>
              <ChevronUp className="h-4 w-4 ml-1" />
            </>
          )}
        </button>
      </div>

      {/* Filter content */}
      <div
        className="overflow-y-auto p-4 pb-20 space-y-6 flex-1"
        style={{ maxHeight: "calc(100% - 120px)", height: expanded ? "calc(80vh - 120px)" : "calc(50vh - 120px)" }}
      >
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="City, neighborhood, or address"
            value={filters.location}
            onChange={handleLocationChange}
          />
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Price Range</Label>
            <div className="text-sm">
              ${filters.priceRange.min.toLocaleString()} - $
              {filters.priceRange.max === 10000 ? "10,000+" : filters.priceRange.max.toLocaleString()}
            </div>
          </div>
          <Slider
            defaultValue={[filters.priceRange.min, filters.priceRange.max]}
            max={10000}
            step={100}
            onValueChange={handlePriceChange}
            className="my-6"
          />
          <div className="flex items-center justify-between gap-4">
            <div className="w-1/2">
              <Label htmlFor="min-price" className="text-xs">
                Min Price
              </Label>
              <Input
                id="min-price"
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange([Number.parseInt(e.target.value), filters.priceRange.max])}
                className="mt-1"
              />
            </div>
            <div className="w-1/2">
              <Label htmlFor="max-price" className="text-xs">
                Max Price
              </Label>
              <Input
                id="max-price"
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange([filters.priceRange.min, Number.parseInt(e.target.value)])}
                className="mt-1"
              />
            </div>
          </div>
        </div>

        {/* Bedrooms & Bathrooms */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms">Bedrooms</Label>
            <Select value={filters.bedrooms.toString()} onValueChange={handleBedroomsChange}>
              <SelectTrigger id="bedrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="0">Studio</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select value={filters.bathrooms.toString()} onValueChange={handleBathroomsChange}>
              <SelectTrigger id="bathrooms">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any">Any</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="1.5">1.5</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="2.5">2.5</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {["Any", "Apartment", "House", "Condo", "Townhouse"].map((type) => (
              <Button
                key={type}
                variant={filters.propertyType === type ? "default" : "outline"}
                size="sm"
                onClick={() => handlePropertyTypeChange(type)}
                className={filters.propertyType === type ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500" : ""}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-2">
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            {[
              "Pet Friendly",
              "Parking",
              "Gym",
              "Pool",
              "Washer/Dryer",
              "Dishwasher",
              "Air Conditioning",
              "Balcony",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox
                  id={`amenity-${amenity}`}
                  checked={filters.amenities.includes(amenity)}
                  onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
                />
                <label
                  htmlFor={`amenity-${amenity}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {amenity}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Apply button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
        <Button onClick={handleApply} className="w-full bg-yellow-400 text-gray-800 hover:bg-yellow-500">
          Apply Filters
        </Button>
      </div>
    </div>
  )
}
