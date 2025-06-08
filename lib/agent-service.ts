import { getProperties } from "@/app/api/property-service/route"
import { Property } from "./property-service"

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  avatar?: string
  preferences: {
    propertyType: string[]
    budget: [number, number]
    location: string[]
    bedrooms: number
    bathrooms: number
  }
  status: "active" | "inactive"
}

// Mock data for development
const mockProperties: Property[] = []

// Agent service functions
export const agentService = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database
    const snapshot = getProperties();
    (await snapshot).forEach((doc) => {
      mockProperties.push(doc.data())
    })
    console.log(mockProperties)
    return mockProperties
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | undefined> => {
    // In a real app, this would fetch from an API or database
    return mockProperties.find((property) => property.id === id)
  },

  // Create a new property
  createProperty: async (propertyData: Omit<Property, "id">): Promise<Property> => {
    // In a real app, this would send data to an API or database
    const newProperty: Property = {
      id: `prop${mockProperties.length + 1}`,
      ...propertyData,
    }

    mockProperties.push(newProperty)
    return newProperty
  },

  // Update an existing property
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property | undefined> => {
    // In a real app, this would update the database
    const propertyIndex = mockProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return undefined
    }

    mockProperties[propertyIndex] = {
      ...mockProperties[propertyIndex],
      ...propertyData,
    }

    return mockProperties[propertyIndex]
  },

  // Delete a property
  deleteProperty: async (id: string): Promise<boolean> => {
    // In a real app, this would delete from the database
    const propertyIndex = mockProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return false
    }

    mockProperties.splice(propertyIndex, 1)
    return true
  },

  // Get all clients
  getAllClients: async (): Promise<Client[]> => {
    // In a real app, this would fetch from an API or database
    return mockClients
  },

  // Get client by ID
  getClientById: async (id: string): Promise<Client | undefined> => {
    // In a real app, this would fetch from an API or database
    return mockClients.find((client) => client.id === id)
  },
}

export const getAllProperties = agentService.getAllProperties
export const getPropertyById = agentService.getPropertyById
export const createProperty = agentService.createProperty
export const updateProperty = agentService.updateProperty
export const deleteProperty = agentService.deleteProperty
export const getAllClients = agentService.getAllClients
export const getClientById = agentService.getClientById
