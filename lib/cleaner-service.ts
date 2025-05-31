// Types for our cleaner system
export interface CleaningJob {
  id: string
  title: string
  location: string
  date: string
  time: string
  price: number
  status: "pending" | "accepted" | "completed" | "cancelled"
  description: string
  clientName: string
  clientAvatar?: string
  propertyType: "apartment" | "house" | "office" | "other"
  size: string
  duration: string
}

// Mock data for development
const mockCleaningJobs: CleaningJob[] = [
  {
    id: "clean1",
    title: "Deep Clean - 2 Bedroom Apartment",
    location: "123 Main St, Mexico City",
    date: "June 15, 2024",
    time: "10:00 AM - 2:00 PM",
    price: 120,
    status: "pending",
    description:
      "Need a thorough cleaning of a 2-bedroom apartment including kitchen, bathrooms, and living areas. Please bring your own cleaning supplies.",
    clientName: "Maria Rodriguez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyType: "apartment",
    size: "900 sq ft",
    duration: "4 hours",
  },
  {
    id: "clean2",
    title: "Office Cleaning",
    location: "456 Business Park, Oaxaca",
    date: "June 18, 2024",
    time: "6:00 PM - 9:00 PM",
    price: 150,
    status: "accepted",
    description:
      "Regular cleaning of a small office space. Tasks include vacuuming, dusting, and bathroom cleaning. Cleaning supplies provided.",
    clientName: "Tech Solutions Inc.",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyType: "office",
    size: "1200 sq ft",
    duration: "3 hours",
  },
  {
    id: "clean3",
    title: "Move-out Cleaning",
    location: "789 Oak Ave, Mexico City",
    date: "June 20, 2024",
    time: "9:00 AM - 5:00 PM",
    price: 280,
    status: "completed",
    description:
      "Thorough cleaning of a 3-bedroom house after move-out. Includes deep cleaning of kitchen appliances, bathrooms, and floors.",
    clientName: "Carlos Mendez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyType: "house",
    size: "1800 sq ft",
    duration: "8 hours",
  },
  {
    id: "clean4",
    title: "Weekly House Cleaning",
    location: "321 Pine St, San Miguel",
    date: "June 22, 2024",
    time: "1:00 PM - 4:00 PM",
    price: 90,
    status: "pending",
    description:
      "Regular weekly cleaning of a family home. Tasks include dusting, vacuuming, mopping, and bathroom cleaning.",
    clientName: "Elena Fuentes",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyType: "house",
    size: "1500 sq ft",
    duration: "3 hours",
  },
  {
    id: "clean5",
    title: "Post-Construction Cleaning",
    location: "567 New Development, Mexico City",
    date: "June 25, 2024",
    time: "8:00 AM - 6:00 PM",
    price: 350,
    status: "pending",
    description:
      "Cleaning of a newly renovated apartment. Includes removal of dust and debris, deep cleaning of all surfaces, and window cleaning.",
    clientName: "Construction Co.",
    clientAvatar: "/placeholder.svg?height=40&width=40",
    propertyType: "apartment",
    size: "1100 sq ft",
    duration: "10 hours",
  },
]

// Cleaner service functions
export const cleanerService = {
  // Get all cleaning jobs
  getAllCleaningJobs: async (): Promise<CleaningJob[]> => {
    // In a real app, this would fetch from an API or database
    return mockCleaningJobs
  },

  // Get cleaning jobs by status
  getCleaningJobsByStatus: async (status: CleaningJob["status"]): Promise<CleaningJob[]> => {
    // In a real app, this would fetch from an API or database
    return mockCleaningJobs.filter((job) => job.status === status)
  },

  // Accept a cleaning job
  acceptCleaningJob: async (jobId: string): Promise<CleaningJob> => {
    // In a real app, this would update the database
    const job = mockCleaningJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Cleaning job not found")
    }

    job.status = "accepted"
    return job
  },

  // Decline a cleaning job
  declineCleaningJob: async (jobId: string): Promise<CleaningJob> => {
    // In a real app, this would update the database
    const job = mockCleaningJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Cleaning job not found")
    }

    job.status = "cancelled"
    return job
  },

  // Complete a cleaning job
  completeCleaningJob: async (jobId: string): Promise<CleaningJob> => {
    // In a real app, this would update the database
    const job = mockCleaningJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Cleaning job not found")
    }

    job.status = "completed"
    return job
  },
}

export const getAllCleaningJobs = cleanerService.getAllCleaningJobs
export const getCleaningJobsByStatus = cleanerService.getCleaningJobsByStatus
export const acceptCleaningJob = cleanerService.acceptCleaningJob
export const declineCleaningJob = cleanerService.declineCleaningJob
export const completeCleaningJob = cleanerService.completeCleaningJob
