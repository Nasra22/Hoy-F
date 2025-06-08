import { getProperties } from "@/app/api/property-service/route"
import { User, UserRole } from "./user-context"

// Types for our property system
export interface PropertyImage {
  id: string
  url: string
  alt: string
}

export interface PropertyAmenity {
  name: string
  icon: string
}

export interface FilterOptions {
  location: string
  priceRange: {
    min: number
    max: number
  }
  bedrooms: number | "Any"
  bathrooms: number | "Any"
  propertyType: string
  amenities: PropertyAmenity[]
}

export interface PropertyMedia {
  type: string | "",
  url: string | ""
}


// Types for our agent system
export interface Property {
  id: string
  title: string
  price: string
  type: string
  bedrooms: string
  bathrooms: string
  size: number
  owner: User
  status: "active" | "pending" | "sold" | "rented"
  description: string
  // Additional fields for property editing
  address?: string
  city?: string
  state?: string
  amenities?: string[]
  isPublished?: boolean
  isVerified: string
  media?: PropertyMedia[]
  timestamp: string
}


export const defaultFilters = {
  location: "",
  priceRange: { min: 0, max: 10000 },
  bedrooms: "Any" as const,
  bathrooms: "Any" as const,
  propertyType: "Any",
  amenities: [],
}

// fetched data for development
export const fetchedProperties: Property[] = []

// Property service functions
export const propertyService = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database
    const snapshot = getProperties();
    (await snapshot).forEach((doc) => {
      const data = {
        ...doc.data(),
        id: doc.id,
      };
      console.log(data)
      fetchedProperties.push(data)
    })
    console.log(fetchedProperties)

    return fetchedProperties
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | undefined> => {
    // In a real app, this would fetch from an API or database
    return fetchedProperties.find((property) => property.id === id)
  },

  // Get similar properties
  getSimilarProperties: async (currentId: string, type: string, location: string): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database with more sophisticated filtering
    return fetchedProperties
      .filter((property) => property.id !== currentId && (property.type === type || property.address === location))
      .slice(0, 2) // Limit to 2 similar properties
  },

  // Update an existing property
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property | undefined> => {
    // In a real app, this would update data in an API or database
    const propertyIndex = fetchedProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return undefined
    }

    // Update the property
    fetchedProperties[propertyIndex] = {
      ...fetchedProperties[propertyIndex],
      ...propertyData,
    }

    return fetchedProperties[propertyIndex]
  },

  // Delete a property
  deleteProperty: async (id: string): Promise<boolean> => {
    // In a real app, this would delete data from an API or database
    const propertyIndex = fetchedProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return false
    }

    // Remove the property from the array
    fetchedProperties.splice(propertyIndex, 1)

    return true
  },
}

export const getPropertyById = propertyService.getPropertyById
export const getAllProperties = propertyService.getAllProperties
export const getSimilarProperties = propertyService.getSimilarProperties
export const createProperty = propertyService.createProperty
export const updateProperty = propertyService.updateProperty
export const deleteProperty = propertyService.deleteProperty
