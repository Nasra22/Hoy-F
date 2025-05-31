"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api"
import { Loader2, Info, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import PropertyCard from "@/components/client/property-card"
import FilterOverlay from "@/components/client/filter-overlay"
import { mockProperties, defaultFilters } from "@/lib/property-service"
import type { Property, FilterOptions } from "@/lib/property-service"
import { useIsMobile } from "@/hooks/use-mobile"
import { ClientNavigation } from "./navigation"
import { ClientDashboardHeader } from "./dashboard-header"

declare global {
  interface Window {
    google: typeof google
  }
}

const mapContainerStyle = {
  width: "100%",
  height: "100%",
}

const defaultCenter = {
  lat: 38.9072,
  lng: -77.0369, // Washington DC as default
}

export default function PropertyMap() {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null)
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [allProperties, setAllProperties] = useState<Property[]>(mockProperties)
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(mockProperties)
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(defaultFilters)
  const [filterCount, setFilterCount] = useState(0)
  const isMobile = useIsMobile()

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  })

  const onMapLoad = useCallback((map: google.maps.Map) => {
    setMapRef(map)
  }, [])

  const onMapUnmount = useCallback(() => {
    setMapRef(null)
  }, [])

  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ lat: latitude, lng: longitude })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setLocationError("Unable to get your location. Using default location instead.")
          setIsLoading(false)
        },
      )
    } else {
      setLocationError("Geolocation is not supported by your browser. Using default location instead.")
      setIsLoading(false)
    }
  }, [])

  // Filter properties based on user location (simulate nearby properties)
  useEffect(() => {
    if (userLocation) {
      // In a real app, you would fetch properties near the user's location from an API
      // For this demo, we'll just use our mock data and pretend they're nearby
      setAllProperties(mockProperties)
      applyFilters(activeFilters)
    }
  }, [userLocation])

  // Count active filters
  useEffect(() => {
    let count = 0
    if (activeFilters.location) count++
    if (activeFilters.priceRange.min > 0) count++
    if (activeFilters.priceRange.max < 10000) count++
    if (activeFilters.bedrooms !== "Any") count++
    if (activeFilters.bathrooms !== "Any") count++
    if (activeFilters.propertyType !== "Any") count++
    count += activeFilters.amenities.length
    setFilterCount(count)
  }, [activeFilters])

  const handleMarkerClick = (property: Property) => {
    setSelectedProperty(property)
    if (mapRef) {
      mapRef.panTo({ lat: property.coordinates.lat, lng: property.coordinates.lng })
    }
  }

  const handleInfoWindowClose = () => {
    setSelectedProperty(null)
  }

  const toggleFilterOverlay = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  const applyFilters = (filters: FilterOptions) => {
    setActiveFilters(filters)

    const filtered = allProperties.filter((property) => {
      // Filter by location (simple text match for demo)
      if (filters.location && !property.address.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }

      // Filter by price
      if (parseInt(property.price) < filters.priceRange.min || parseInt(property.price) > filters.priceRange.max) {
        return false
      }

      // Filter by bedrooms
      if (filters.bedrooms !== "Any" && property.bedrooms !== filters.bedrooms) {
        // Special case for studios (0 bedrooms)
        if (!(filters.bedrooms === 0 && property.bedrooms === 0)) {
          return false
        }
      }

      // Filter by bathrooms
      if (filters.bathrooms !== "Any" && property.bathrooms !== filters.bathrooms) {
        return false
      }

      // Filter by property type
      if (filters.propertyType !== "Any" && property.type !== filters.propertyType) {
        return false
      }

      // Filter by amenities
      if (filters.amenities.length > 0) {
        for (const amenity of filters.amenities) {
          if (!property.amenities.includes(amenity)) {
            return false
          }
        }
      }

      return true
    })

    setFilteredProperties(filtered)

    // If we have filtered properties and a map reference, fit bounds to show all properties
    if (filtered.length > 0 && mapRef) {
      const bounds = new window.google.maps.LatLngBounds()
      filtered.forEach((property) => {
        bounds.extend(new window.google.maps.LatLng(property.coordinates.lat, property.coordinates.lng))
      })
      mapRef.fitBounds(bounds)
    }
  }

  const resetFilters = () => {
    setActiveFilters(defaultFilters)
    setFilteredProperties(allProperties)
  }

  // Create a memoized array of active filter badges
  const filterBadges = useMemo(() => {
    const badges = []

    if (activeFilters.location) {
      badges.push({
        id: "location",
        label: activeFilters.location,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            location: "",
          })
        },
      })
    }

    if (activeFilters.priceRange.min > 0 || activeFilters.priceRange.max < 10000) {
      badges.push({
        id: "price",
        label: `$${activeFilters.priceRange.min.toLocaleString()} - $${
          activeFilters.priceRange.max === 10000 ? "10,000+" : activeFilters.priceRange.max.toLocaleString()
        }`,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            priceRange: { min: 0, max: 10000 },
          })
        },
      })
    }

    if (activeFilters.bedrooms !== "Any") {
      badges.push({
        id: "bedrooms",
        label: `${activeFilters.bedrooms === 0 ? "Studio" : activeFilters.bedrooms} Bed${
          activeFilters.bedrooms !== 1 && activeFilters.bedrooms !== 0 ? "s" : ""
        }`,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            bedrooms: "Any",
          })
        },
      })
    }

    if (activeFilters.bathrooms !== "Any") {
      badges.push({
        id: "bathrooms",
        label: `${activeFilters.bathrooms} Bath${activeFilters.bathrooms !== 1 ? "s" : ""}`,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            bathrooms: "Any",
          })
        },
      })
    }

    if (activeFilters.propertyType !== "Any") {
      badges.push({
        id: "propertyType",
        label: activeFilters.propertyType,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            propertyType: "Any",
          })
        },
      })
    }

    activeFilters.amenities.forEach((amenity) => {
      badges.push({
        id: `amenity-${amenity.id}`,
        label: amenity.name,
        onRemove: () => {
          setActiveFilters({
            ...activeFilters,
            amenities: activeFilters.amenities.filter((a) => a !== amenity),
          })
        },
      })
    })

    return badges
  }, [activeFilters])

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
        <span className="ml-2">Loading Google Maps...</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen">
      <ClientDashboardHeader />

      {/* Active filters display */}
      {filterBadges.length > 0 && (
        <div className="bg-background border-b px-4 py-2 overflow-x-auto whitespace-nowrap">
          <div className="flex items-center gap-2">
            {filterBadges.map((badge) => (
              <Badge
                key={badge.id}
                variant="secondary"
                className="flex items-center gap-1 py-1 px-2 bg-yellow-50 text-gray-800 border border-yellow-200"
              >
                {badge.label}
                <button
                  onClick={badge.onRemove}
                  className="ml-1 rounded-full hover:bg-yellow-200 w-4 h-4 inline-flex items-center justify-center"
                >
                  <span className="sr-only">Remove</span>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {filterBadges.length > 0 && (
              <button onClick={resetFilters} className="text-sm text-gray-500 hover:text-gray-700">
                Clear all
              </button>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-1 relative">
        {/* Map Container */}
        <div className="w-full h-full relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-card">
              <Loader2 className="h-8 w-8 animate-spin text-yellow-400" />
              <span className="ml-2">Getting your location...</span>
            </div>
          ) : (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={userLocation || defaultCenter}
              zoom={14}
              onLoad={onMapLoad}
              onUnmount={onMapUnmount}
              options={{
                fullscreenControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoomControl: !isMobile,
              }}
            >
              {/* User location marker */}
              {userLocation && (
                <MarkerF
                  position={userLocation}
                  icon={{
                    path: window.google.maps.SymbolPath.CIRCLE,
                    scale: 7,
                    fillColor: "#4285F4",
                    fillOpacity: 1,
                    strokeColor: "white",
                    strokeWeight: 2,
                  }}
                />
              )}

              {/* Property markers */}
              {filteredProperties.map((property) => (
                <MarkerF
                  key={property.id}
                  position={{ lat: property.coordinates.lat, lng: property.coordinates.lng }}
                  onClick={() => handleMarkerClick(property)}
                  icon={{
                    url: "/marker.png",
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                >
                  {selectedProperty?.id === property.id && (
                    <InfoWindowF onCloseClick={handleInfoWindowClose} position={property.location}>
                      <div className="max-w-xs">
                        <PropertyCard property={property} isCompact={true} />
                      </div>
                    </InfoWindowF>
                  )}
                </MarkerF>
              ))}
            </GoogleMap>
          )}

          {locationError && (
            <div className="absolute top-4 left-0 right-0 mx-auto w-max bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-2 rounded-md shadow-md">
              <p className="flex items-center text-sm">
                <Info className="h-4 w-4 mr-2" />
                {locationError}
              </p>
            </div>
          )}

          {/* Results count */}
          <div className="absolute bottom-24 left-4 bg-background rounded-full px-3 py-1 shadow-md border text-sm">
            <span className="font-medium">{filteredProperties.length}</span> properties found
          </div>
        </div>

        {/* Property details sidebar (only visible on desktop when a property is selected) */}
        {!isMobile && selectedProperty && (
          <div className="w-1/3 h-full overflow-y-auto border-l bg-background shadow-lg animate-in slide-in-from-right">
            <PropertyCard property={selectedProperty} isCompact={false} />
          </div>
        )}

        {/* Mobile bottom sheet for property details */}
        {isMobile && selectedProperty && (
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-xl shadow-lg max-h-[60vh] overflow-y-auto animate-in slide-in-from-bottom">
            <div className="w-12 h-1 bg-card rounded-full mx-auto my-2" />
            <PropertyCard property={selectedProperty} isCompact={false} />
          </div>
        )}

        {/* Filter overlay */}
        <FilterOverlay
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onApplyFilters={applyFilters}
          initialFilters={activeFilters}
        />
      </div>

      {/* Bottom filter button (mobile only) */}
      <div className="sticky bottom-16 left-0 right-0 p-4 bg-background border-t md:hidden">
        <Button onClick={toggleFilterOverlay} className="w-full bg-yellow-400 text-card hover:bg-yellow-500">
          <Filter className="h-4 w-4 mr-2" />
          Filter Properties
          {filterCount > 0 && (
            <span className="ml-2 bg-white text-gray-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {filterCount}
            </span>
          )}
        </Button>
      </div>
      <ClientNavigation />
    </div>
  )
}
