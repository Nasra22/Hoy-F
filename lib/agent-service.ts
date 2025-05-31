import { getProperty } from "@/app/api/property-service/route"

// Types for our agent system
export interface Property {
  id: string
  title: string
  price: number
  type: string
  bedrooms: number
  bathrooms: number
  size: number
  status: "active" | "pending" | "sold" | "rented"
  description: string
  // Additional fields for property editing
  address?: string
  city?: string
  state?: string
  amenities?: string[]
  isPublished?: boolean
  media?: string[]
}

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

export interface Appointment {
  id: string
  clientId: string
  clientName: string
  clientAvatar?: string
  propertyId: string
  propertyTitle: string
  date: string
  time: string
  status: "scheduled" | "completed" | "cancelled"
  notes?: string
}

// Mock data for development
const mockProperties: Property[] = [
  {
    id: "prop1",
    title: "Modern Apartment in City Center",
    price: 250000,
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    status: "active",
    description: "Beautiful modern apartment in the heart of the city with great views and amenities.",
    address: "123 Main Street",
    city: "Mexico City",
    state: "CDMX",
    amenities: ["balcony", "parking", "elevator", "security"],
    isPublished: true,
    media: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
  {
    id: "prop2",
    title: "Luxury Villa with Pool",
    price: 500000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 3,
    size: 3000,
    status: "active",
    description: "Stunning luxury villa with private pool, garden, and mountain views.",
    address: "45 Mountain View Road",
    city: "Oaxaca",
    state: "Oaxaca",
    amenities: ["pool", "garden", "terrace", "garage"],
    isPublished: true,
    media: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "prop3",
    title: "Cozy Studio for Rent",
    price: 800,
    type: "studio",
    bedrooms: 1,
    bathrooms: 1,
    size: 600,
    status: "active",
    description: "Cozy studio apartment perfect for students or young professionals.",
    address: "78 University Avenue",
    city: "Mexico City",
    state: "CDMX",
    amenities: ["furnished", "wifi", "laundry"],
    isPublished: true,
    media: ["/placeholder.svg?height=600&width=800"],
  },
  {
    id: "prop4",
    title: "Family Home with Garden",
    price: 350000,
    type: "house",
    bedrooms: 3,
    bathrooms: 2,
    size: 2200,
    status: "pending",
    description: "Spacious family home with a beautiful garden in a quiet neighborhood.",
    address: "15 Quiet Lane",
    city: "San Miguel",
    state: "Guanajuato",
    amenities: ["garden", "patio", "garage"],
    isPublished: true,
    media: ["/placeholder.svg?height=600&width=800", "/placeholder.svg?height=600&width=800"],
  },
  {
    id: "prop5",
    title: "Beachfront Condo",
    price: 450000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    size: 1500,
    status: "active",
    description: "Stunning beachfront condo with panoramic ocean views and resort amenities.",
    address: "1001 Beach Boulevard",
    city: "Cancun",
    state: "Quintana Roo",
    amenities: ["beachfront", "pool", "gym", "security"],
    isPublished: true,
    media: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
  },
]

const mockClients: Client[] = [
  {
    id: "client1",
    name: "Maria Rodriguez",
    email: "maria@example.com",
    phone: "+52 123 456 7890",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: ["apartment", "condo"],
      budget: [200000, 300000],
      location: ["Mexico City"],
      bedrooms: 2,
      bathrooms: 2,
    },
    status: "active",
  },
  {
    id: "client2",
    name: "Carlos Mendez",
    email: "carlos@example.com",
    phone: "+52 234 567 8901",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: ["house", "villa"],
      budget: [300000, 600000],
      location: ["Oaxaca", "San Miguel"],
      bedrooms: 3,
      bathrooms: 2,
    },
    status: "active",
  },
  {
    id: "client3",
    name: "Elena Fuentes",
    email: "elena@example.com",
    phone: "+52 345 678 9012",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: ["apartment", "studio"],
      budget: [0, 1000],
      location: ["Mexico City"],
      bedrooms: 1,
      bathrooms: 1,
    },
    status: "active",
  },
  {
    id: "client4",
    name: "Miguel Torres",
    email: "miguel@example.com",
    phone: "+52 456 789 0123",
    avatar: "/placeholder.svg?height=40&width=40",
    preferences: {
      propertyType: ["condo"],
      budget: [400000, 500000],
      location: ["Cancun"],
      bedrooms: 2,
      bathrooms: 2,
    },
    status: "inactive",
  },
]

const mockAppointments: Appointment[] = [
  {
    id: "appt1",
    clientId: "client1",
    clientName: "Maria Rodriguez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyId: "prop1",
    propertyTitle: "Modern Apartment in City Center",
    date: "June 15, 2024",
    time: "10:00 AM",
    status: "scheduled",
    notes: "Client is interested in the view and amenities.",
  },
  {
    id: "appt2",
    clientId: "client2",
    clientName: "Carlos Mendez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyId: "prop2",
    propertyTitle: "Luxury Villa with Pool",
    date: "June 18, 2024",
    time: "2:00 PM",
    status: "scheduled",
    notes: "Client wants to see the pool area and garden.",
  },
  {
    id: "appt3",
    clientId: "client3",
    clientName: "Elena Fuentes",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyId: "prop3",
    propertyTitle: "Cozy Studio for Rent",
    date: "June 20, 2024",
    time: "11:30 AM",
    status: "completed",
    notes: "Client liked the property but is considering other options.",
  },
  {
    id: "appt4",
    clientId: "client1",
    clientName: "Maria Rodriguez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyId: "prop5",
    propertyTitle: "Beachfront Condo",
    date: "June 25, 2024",
    time: "3:00 PM",
    status: "scheduled",
    notes: "Client is particularly interested in the ocean view.",
  },
]

// Agent service functions
export const agentService = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database
    const snapshot = getProperty();
    (await snapshot).forEach((doc) => {
      console.log(doc.data())
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

  // Get all appointments
  getAllAppointments: async (): Promise<Appointment[]> => {
    // In a real app, this would fetch from an API or database
    return mockAppointments
  },

  // Get appointments by status
  getAppointmentsByStatus: async (status: Appointment["status"]): Promise<Appointment[]> => {
    // In a real app, this would fetch from an API or database
    return mockAppointments.filter((appointment) => appointment.status === status)
  },

  // Complete an appointment
  completeAppointment: async (id: string): Promise<Appointment> => {
    // In a real app, this would update the database
    const appointment = mockAppointments.find((appointment) => appointment.id === id)
    if (!appointment) {
      throw new Error("Appointment not found")
    }

    appointment.status = "completed"
    return appointment
  },

  // Cancel an appointment
  cancelAppointment: async (id: string): Promise<Appointment> => {
    // In a real app, this would update the database
    const appointment = mockAppointments.find((appointment) => appointment.id === id)
    if (!appointment) {
      throw new Error("Appointment not found")
    }

    appointment.status = "cancelled"
    return appointment
  },
}

export const getAllProperties = agentService.getAllProperties
export const getPropertyById = agentService.getPropertyById
export const createProperty = agentService.createProperty
export const updateProperty = agentService.updateProperty
export const deleteProperty = agentService.deleteProperty
export const getAllClients = agentService.getAllClients
export const getClientById = agentService.getClientById
export const getAllAppointments = agentService.getAllAppointments
export const getAppointmentsByStatus = agentService.getAppointmentsByStatus
export const completeAppointment = agentService.completeAppointment
export const cancelAppointment = agentService.cancelAppointment
