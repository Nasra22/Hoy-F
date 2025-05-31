"use client"

import { useEffect, useState } from "react"
import { useFilters } from "@/lib/filter-context"
import { PropertyListings } from "./property-listings"
import { getAllProperties, type Property } from "@/lib/property-service"

export function FilteredPropertyListings() {
  const { filters } = useFilters()
  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch all properties
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true)
      try {
        const data = await getAllProperties()
        setProperties(data)
        setFilteredProperties(data)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Apply filters when they change
  useEffect(() => {
    if (properties.length === 0) return

    const filtered = properties.filter((property) => {
      // Category filter
      if (filters.category !== "all" && property.type.toLowerCase() !== filters.category) {
        return false
      }

      // Price range filter
      const price = Number.parseFloat(property.price)
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
        return false
      }

      // Bedrooms filter
      if (filters.bedrooms !== null) {
        if (filters.bedrooms > 5) {
          // "5+" means 5 or more
          if (property.bedrooms < 5) return false
        } else if (property.bedrooms !== filters.bedrooms) {
          return false
        }
      }

      // Bathrooms filter
      if (filters.bathrooms !== null) {
        if (filters.bathrooms > 4) {
          // "4+" means 4 or more
          if (property.bathrooms < 4) return false
        } else if (property.bathrooms !== filters.bathrooms) {
          return false
        }
      }

      // Property type filter
      if (filters.propertyTypes.length > 0 && !filters.propertyTypes.includes(property.type.toLowerCase())) {
        return false
      }

      // Amenities filter
      if (filters.amenities.length > 0) {
        const propertyAmenityIds = property.amenities.map((a) => a.id)
        if (!filters.amenities.every((amenity) => propertyAmenityIds.includes(amenity))) {
          return false
        }
      }

      // Location filter
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Date range filter - this would need more sophisticated logic in a real app
      // For now, we'll just check if the property has a dateRange property
      if (filters.dateRange[0] || filters.dateRange[1]) {
        if (!property.dateRange) return false
      }

      return true
    })

    setFilteredProperties(filtered)
  }, [filters, properties])

  // Update the filter context when the URL category changes
  useEffect(() => {
    const handleUrlChange = () => {
      const url = new URL(window.location.href)
      const category = url.searchParams.get("category")
      if (category && ["all", "apartment", "house", "land", "services"].includes(category)) {
        // This will be handled by the parent component
      }
    }

    window.addEventListener("popstate", handleUrlChange)
    return () => window.removeEventListener("popstate", handleUrlChange)
  }, [])

  if (isLoading) {
    return <div className="text-center py-8">Loading properties...</div>
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium mb-2">No properties match your filters</h3>
        <p className="text-muted-foreground">Try adjusting your filters to see more results</p>
      </div>
    )
  }

  return <PropertyListings properties={filteredProperties} />
}
