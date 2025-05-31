"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyCard } from "@/components/property/property-card"

// Mock data for approved properties
const approvedProperties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    description: "A beautiful modern apartment in the heart of downtown with amazing views.",
    price: 2500,
    location: "123 Main St, New York, NY",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "2",
      name: "Jane Smith",
      role: "agent",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "2",
    title: "Spacious Family Home",
    description: "Perfect family home with a large backyard and modern amenities.",
    price: 3800,
    location: "456 Oak Ave, Los Angeles, CA",
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    type: "house",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "3",
    title: "Luxury Condo with Ocean View",
    description: "Stunning luxury condo with panoramic ocean views and high-end finishes.",
    price: 5000,
    location: "789 Beach Blvd, Miami, FL",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    type: "condo",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "7",
      name: "David Miller",
      role: "agent",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "4",
    title: "Cozy Studio in Historic District",
    description: "Charming studio apartment in a historic building with character.",
    price: 1200,
    location: "101 Elm St, Boston, MA",
    bedrooms: 0,
    bathrooms: 1,
    area: 500,
    type: "studio",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "5",
    title: "Suburban Ranch House",
    description: "Spacious ranch house in a quiet suburban neighborhood with great schools.",
    price: 2800,
    location: "222 Maple Dr, Chicago, IL",
    bedrooms: 3,
    bathrooms: 2,
    area: 1600,
    type: "house",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "8",
      name: "Lisa Taylor",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
  {
    id: "6",
    title: "Downtown Loft",
    description: "Industrial-style loft with high ceilings and exposed brick walls.",
    price: 3200,
    location: "333 Pine St, San Francisco, CA",
    bedrooms: 1,
    bathrooms: 1.5,
    area: 1100,
    type: "loft",
    status: "approved",
    imageUrl: "/placeholder.svg?height=200&width=300",
    owner: {
      id: "2",
      name: "Jane Smith",
      role: "agent",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  },
]

export function PropertiesGrid() {
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyType, setPropertyType] = useState("all")

  const filteredProperties = approvedProperties
    .filter(
      (property) =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((property) => propertyType === "all" || property.type === propertyType)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search properties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-[300px] pl-8"
            />
          </div>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="loft">Loft</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Export List</Button>
      </div>

      {filteredProperties.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              actions={
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    View Details
                  </Button>
                  <Button size="sm" variant="destructive">
                    Unapprove
                  </Button>
                </div>
              }
              showOwner={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No properties found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
