// Types for our property system
export interface PropertyImage {
  id: string
  url: string
  alt: string
}

export interface PropertyAmenity {
  id: string
  name: string
  icon: string
}

export interface PropertyOwner {
  id: string
  name: string
  avatar?: string
  rating: number
  responseRate: number
  responseTime: string
  memberSince: string
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


export interface Property {
  id: string
  title: string
  address: string
  description: string
  location: string
  price: string
  priceUnit: string
  type: string
  bedrooms: number
  bathrooms: number
  size: number
  sizeUnit: string
  images: PropertyImage[]
  amenities: PropertyAmenity[]
  coordinates: {
    lat: number
    lng: number
  }
  owner: PropertyOwner
  dateRange?: string
  status?: string
  media?: string[]
}


export const defaultFilters = {
  location: "",
  priceRange: { min: 0, max: 10000 },
  bedrooms: "Any" as const,
  bathrooms: "Any" as const,
  propertyType: "Any",
  amenities: [],
}

// Mock data for development
export const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Villa with Pool",
    address: "1234 Wisconsin Ave NW, Washington, DC",
    description:
      "Beautiful luxury villa with a private pool, perfect for families or groups. This stunning property features modern architecture, high-end finishes, and is located in a quiet, upscale neighborhood with easy access to local attractions, restaurants, and shopping centers. The spacious interior includes a gourmet kitchen, open-concept living areas, and multiple outdoor spaces for relaxation and entertainment.",
    location: "Mexico City, CDMX, Mexico",
    price: "250",
    priceUnit: "night",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    size: 2500,
    sizeUnit: "sq ft",
    images: [
      { id: "img1", url: "/placeholder.svg?height=600&width=800", alt: "Villa exterior" },
      { id: "img2", url: "/placeholder.svg?height=600&width=800", alt: "Living room" },
      { id: "img3", url: "/placeholder.svg?height=600&width=800", alt: "Kitchen" },
      { id: "img4", url: "/placeholder.svg?height=600&width=800", alt: "Master bedroom" },
      { id: "img5", url: "/placeholder.svg?height=600&width=800", alt: "Pool area" },
    ],
    amenities: [
      { id: "a1", name: "Swimming Pool", icon: "pool" },
      { id: "a2", name: "Wi-Fi", icon: "wifi" },
      { id: "a3", name: "Air Conditioning", icon: "air-conditioning" },
      { id: "a4", name: "Kitchen", icon: "kitchen" },
      { id: "a5", name: "Free Parking", icon: "parking" },
      { id: "a6", name: "Washing Machine", icon: "washing-machine" },
      { id: "a7", name: "TV", icon: "tv" },
      { id: "a8", name: "Workspace", icon: "workspace" },
    ],
    coordinates: {
      lat: 19.4326,
      lng: -99.1332,
    },
    owner: {
      id: "owner1",
      name: "John",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.8,
      responseRate: 98,
      responseTime: "within an hour",
      memberSince: "January 2020",
    },
    dateRange: "Nov 25 - Dec 5",
    status: "active",
    media: ["/placeholder.svg?height=600&width=800"],
  },
  {
    id: "2",
    title: "Modern Downtown Loft",
    address: "1800 P St NW, Washington, DC",
    description:
      "Stylish loft in the heart of downtown with stunning city views. This contemporary space features high ceilings, large windows, and an open floor plan that creates a bright and airy atmosphere. The fully equipped kitchen includes stainless steel appliances and a breakfast bar. Located within walking distance to popular restaurants, shops, and cultural attractions.",
    location: "Oaxaca, Costa Rica",
    price: "180",
    priceUnit: "night",
    type: "Loft",
    bedrooms: 2,
    bathrooms: 2,
    size: 1200,
    sizeUnit: "sq ft",
    images: [
      { id: "img1", url: "/placeholder.svg?height=600&width=800", alt: "Loft exterior" },
      { id: "img2", url: "/placeholder.svg?height=600&width=800", alt: "Living area" },
      { id: "img3", url: "/placeholder.svg?height=600&width=800", alt: "Kitchen" },
      { id: "img4", url: "/placeholder.svg?height=600&width=800", alt: "Bedroom" },
    ],
    amenities: [
      { id: "a1", name: "Wi-Fi", icon: "wifi" },
      { id: "a2", name: "Air Conditioning", icon: "air-conditioning" },
      { id: "a3", name: "Kitchen", icon: "kitchen" },
      { id: "a4", name: "Elevator", icon: "elevator" },
      { id: "a5", name: "TV", icon: "tv" },
      { id: "a6", name: "Workspace", icon: "workspace" },
    ],
    coordinates: {
      lat: 17.0732,
      lng: -96.7266,
    },
    owner: {
      id: "owner2",
      name: "Sarah",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.9,
      responseRate: 100,
      responseTime: "within a few hours",
      memberSince: "March 2019",
    },
    dateRange: "Dec 10 - Dec 20",
    status: "pending",
    media: ["/placeholder.svg?height=600&width=800"],
  },
  {
    id: "3",
    title: "Beachfront Condo",
    address: "2400 18th St NW, Washington, DC",
    description:
      "Beautiful condo with direct beach access and ocean views. Wake up to the sound of waves and enjoy breathtaking sunsets from your private balcony. This well-appointed condo features a modern kitchen, comfortable living space, and is just steps away from the beach. The complex offers amenities including a swimming pool, fitness center, and secure parking.",
    location: "Paris, France",
    price: "300",
    priceUnit: "night",
    type: "Condo",
    bedrooms: 3,
    bathrooms: 2,
    size: 1800,
    sizeUnit: "sq ft",
    images: [
      { id: "img1", url: "/placeholder.svg?height=600&width=800", alt: "Condo exterior" },
      { id: "img2", url: "/placeholder.svg?height=600&width=800", alt: "Living room" },
      { id: "img3", url: "/placeholder.svg?height=600&width=800", alt: "Kitchen" },
      { id: "img4", url: "/placeholder.svg?height=600&width=800", alt: "Master bedroom" },
      { id: "img5", url: "/placeholder.svg?height=600&width=800", alt: "Beach view" },
    ],
    amenities: [
      { id: "a1", name: "Beach Access", icon: "beach" },
      { id: "a2", name: "Swimming Pool", icon: "pool" },
      { id: "a3", name: "Wi-Fi", icon: "wifi" },
      { id: "a4", name: "Air Conditioning", icon: "air-conditioning" },
      { id: "a5", name: "Kitchen", icon: "kitchen" },
      { id: "a6", name: "Free Parking", icon: "parking" },
      { id: "a7", name: "Gym", icon: "gym" },
    ],
    coordinates: {
      lat: 48.8566,
      lng: 2.3522,
    },
    owner: {
      id: "owner3",
      name: "Miguel",
      avatar: "/placeholder.svg?height=100&width=100",
      rating: 4.7,
      responseRate: 95,
      responseTime: "within a day",
      memberSince: "June 2021",
    },
    dateRange: "Jan 5 - Jan 15",
    status: "sold",
    media: ["/placeholder.svg?height=600&width=800"],
  },
]

// Property service functions
export const propertyService = {
  // Get all properties
  getAllProperties: async (): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database
    return mockProperties
  },

  // Get property by ID
  getPropertyById: async (id: string): Promise<Property | undefined> => {
    // In a real app, this would fetch from an API or database
    return mockProperties.find((property) => property.id === id)
  },

  // Get similar properties
  getSimilarProperties: async (currentId: string, type: string, location: string): Promise<Property[]> => {
    // In a real app, this would fetch from an API or database with more sophisticated filtering
    return mockProperties
      .filter((property) => property.id !== currentId && (property.type === type || property.location === location))
      .slice(0, 2) // Limit to 2 similar properties
  },

  // Create a new property
  createProperty: async (propertyData: Omit<Property, "id">): Promise<Property> => {
    // In a real app, this would send data to an API or database
    const newProperty = {
      ...propertyData,
      id: `property-${Date.now()}`, // Generate a unique ID
    }

    // Add to mock data (in a real app, this would be saved to a database)
    mockProperties.push(newProperty)

    return newProperty
  },

  // Update an existing property
  updateProperty: async (id: string, propertyData: Partial<Property>): Promise<Property | undefined> => {
    // In a real app, this would update data in an API or database
    const propertyIndex = mockProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return undefined
    }

    // Update the property
    mockProperties[propertyIndex] = {
      ...mockProperties[propertyIndex],
      ...propertyData,
    }

    return mockProperties[propertyIndex]
  },

  // Delete a property
  deleteProperty: async (id: string): Promise<boolean> => {
    // In a real app, this would delete data from an API or database
    const propertyIndex = mockProperties.findIndex((property) => property.id === id)

    if (propertyIndex === -1) {
      return false
    }

    // Remove the property from the array
    mockProperties.splice(propertyIndex, 1)

    return true
  },
}

export const getPropertyById = propertyService.getPropertyById
export const getAllProperties = propertyService.getAllProperties
export const getSimilarProperties = propertyService.getSimilarProperties
export const createProperty = propertyService.createProperty
export const updateProperty = propertyService.updateProperty
export const deleteProperty = propertyService.deleteProperty
