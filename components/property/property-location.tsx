"use client"

import { MapPin } from "lucide-react"
import { useEffect, useRef } from "react"

interface PropertyLocationProps {
  location: string
  coordinates?: {
    lat: number
    lng: number
  }
}

export function PropertyLocation({ location, coordinates }: PropertyLocationProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // This is a placeholder for a real map implementation
    // In a real app, you would use Google Maps, Mapbox, or another mapping service
    if (mapRef.current) {
      const mapElement = mapRef.current

      // Set background color and add some text to simulate a map
      mapElement.style.backgroundColor = "#e5e7eb"

      if (coordinates) {
        mapElement.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;">
            <div style="font-size: 24px; margin-bottom: 8px;">📍</div>
            <div>Map showing ${location}</div>
            <div>Coordinates: ${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}</div>
          </div>
        `
      } else {
        mapElement.innerHTML = `
          <div style="display: flex; justify-content: center; align-items: center; height: 100%; flex-direction: column;">
            <div style="font-size: 24px; margin-bottom: 8px;">📍</div>
            <div>Map showing ${location}</div>
            <div>Coordinates not available</div>
          </div>
        `
      }
    }
  }, [location, coordinates])

  return (
    <div className="bg-card rounded-3xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">Location</h2>
      <div className="flex items-center text-muted-foreground mb-2">
        <MapPin className="h-4 w-4 mr-1" />
        {location}
      </div>
      <div
        ref={mapRef}
        className="h-64 w-full rounded-xl overflow-hidden"
        aria-label={`Map showing location at ${location}`}
      />
    </div>
  )
}
