"use client"

import { useFilters } from "@/lib/filter-context"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ActiveFilters() {
  const { filters, setFilters, resetFilters, activeFilterCount } = useFilters()

  if (activeFilterCount === 0) {
    return null
  }

  const removeFilter = (filterType: string, value?: string) => {
    switch (filterType) {
      case "priceRange":
        setFilters((prev) => ({ ...prev, priceRange: [0, 1000] }))
        break
      case "bedrooms":
        setFilters((prev) => ({ ...prev, bedrooms: null }))
        break
      case "bathrooms":
        setFilters((prev) => ({ ...prev, bathrooms: null }))
        break
      case "propertyTypes":
        if (value) {
          setFilters((prev) => ({
            ...prev,
            propertyTypes: prev.propertyTypes.filter((type) => type !== value),
          }))
        } else {
          setFilters((prev) => ({ ...prev, propertyTypes: [] }))
        }
        break
      case "amenities":
        if (value) {
          setFilters((prev) => ({
            ...prev,
            amenities: prev.amenities.filter((amenity) => amenity !== value),
          }))
        } else {
          setFilters((prev) => ({ ...prev, amenities: [] }))
        }
        break
      case "location":
        setFilters((prev) => ({ ...prev, location: null }))
        break
      case "dateRange":
        setFilters((prev) => ({ ...prev, dateRange: [null, null] }))
        break
      case "category":
        setFilters((prev) => ({ ...prev, category: "all" }))
        // Update URL
        const url = new URL(window.location.href)
        url.searchParams.set("category", "all")
        window.history.pushState({}, "", url)
        break
      default:
        break
    }
  }

  const formatDateRange = () => {
    const [start, end] = filters.dateRange
    if (start && end) {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`
    } else if (start) {
      return `From ${start.toLocaleDateString()}`
    } else if (end) {
      return `Until ${end.toLocaleDateString()}`
    }
    return ""
  }

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">Active Filters</h3>
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear All
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Category filter */}
        {filters.category !== "all" && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Category: {filters.category.charAt(0).toUpperCase() + filters.category.slice(1)}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("category")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove category filter</span>
            </Button>
          </Badge>
        )}

        {/* Price range filter */}
        {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Price: ${filters.priceRange[0]} - ${filters.priceRange[1]}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("priceRange")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove price filter</span>
            </Button>
          </Badge>
        )}

        {/* Bedrooms filter */}
        {filters.bedrooms !== null && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Bedrooms: {filters.bedrooms > 5 ? "5+" : filters.bedrooms}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("bedrooms")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove bedrooms filter</span>
            </Button>
          </Badge>
        )}

        {/* Bathrooms filter */}
        {filters.bathrooms !== null && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Bathrooms: {filters.bathrooms > 4 ? "4+" : filters.bathrooms}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("bathrooms")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove bathrooms filter</span>
            </Button>
          </Badge>
        )}

        {/* Property types filter */}
        {filters.propertyTypes.length > 0 &&
          filters.propertyTypes.map((type) => (
            <Badge key={type} variant="secondary" className="flex items-center gap-1">
              Type: {type.charAt(0).toUpperCase() + type.slice(1)}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("propertyTypes", type)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove property type filter</span>
              </Button>
            </Badge>
          ))}

        {/* Amenities filter */}
        {filters.amenities.length > 0 &&
          filters.amenities.map((amenity) => (
            <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
              Amenity: {amenity}
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => removeFilter("amenities", amenity)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove amenity filter</span>
              </Button>
            </Badge>
          ))}

        {/* Location filter */}
        {filters.location && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Location: {filters.location}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("location")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove location filter</span>
            </Button>
          </Badge>
        )}

        {/* Date range filter */}
        {(filters.dateRange[0] || filters.dateRange[1]) && (
          <Badge variant="secondary" className="flex items-center gap-1">
            Dates: {formatDateRange()}
            <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => removeFilter("dateRange")}>
              <X className="h-3 w-3" />
              <span className="sr-only">Remove date filter</span>
            </Button>
          </Badge>
        )}
      </div>
    </div>
  )
}
