// Types for our driver system
export interface Job {
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
}

// Mock data for development
const mockJobs: Job[] = [
  {
    id: "job1",
    title: "Moving Furniture - 2 Bedroom Apartment",
    location: "123 Main St, Mexico City",
    date: "June 15, 2024",
    time: "10:00 AM - 2:00 PM",
    price: 120,
    status: "pending",
    description:
      "Need help moving furniture from a 2-bedroom apartment to a new location 5 miles away. Items include a sofa, bed, dining table, and several boxes.",
    clientName: "Maria Rodriguez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "job2",
    title: "Delivery of Building Materials",
    location: "456 Oak Ave, Oaxaca",
    date: "June 18, 2024",
    time: "9:00 AM - 11:00 AM",
    price: 85,
    status: "accepted",
    description:
      "Transport building materials from supplier to construction site. Materials include lumber, cement bags, and tiles.",
    clientName: "Carlos Mendez",
    clientAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "job3",
    title: "Office Relocation",
    location: "789 Business Park, Mexico City",
    date: "June 20, 2024",
    time: "8:00 AM - 5:00 PM",
    price: 350,
    status: "completed",
    description:
      "Help relocate a small office with desks, chairs, computers, and filing cabinets to a new location in the same building.",
    clientName: "Tech Solutions Inc.",
    clientAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "job4",
    title: "Furniture Delivery",
    location: "321 Pine St, San Miguel",
    date: "June 22, 2024",
    time: "1:00 PM - 3:00 PM",
    price: 90,
    status: "pending",
    description: "Deliver a new sofa and dining set from the furniture store to a residential address.",
    clientName: "Elena Fuentes",
    clientAvatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "job5",
    title: "Event Equipment Transport",
    location: "567 Event Center, Mexico City",
    date: "June 25, 2024",
    time: "7:00 AM - 10:00 AM",
    price: 150,
    status: "pending",
    description:
      "Transport sound equipment, tables, and chairs for a corporate event. Will need to help with loading and unloading.",
    clientName: "Event Planners Co.",
    clientAvatar: "/placeholder.svg?height=40&width=40",
  },
]

// Driver service functions
export const driverService = {
  // Get all jobs
  getAllJobs: async (): Promise<Job[]> => {
    // In a real app, this would fetch from an API or database
    return mockJobs
  },

  // Get jobs by status
  getJobsByStatus: async (status: Job["status"]): Promise<Job[]> => {
    // In a real app, this would fetch from an API or database
    return mockJobs.filter((job) => job.status === status)
  },

  // Accept a job
  acceptJob: async (jobId: string): Promise<Job> => {
    // In a real app, this would update the database
    const job = mockJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Job not found")
    }

    job.status = "accepted"
    return job
  },

  // Decline a job
  declineJob: async (jobId: string): Promise<Job> => {
    // In a real app, this would update the database
    const job = mockJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Job not found")
    }

    job.status = "cancelled"
    return job
  },

  // Complete a job
  completeJob: async (jobId: string): Promise<Job> => {
    // In a real app, this would update the database
    const job = mockJobs.find((job) => job.id === jobId)
    if (!job) {
      throw new Error("Job not found")
    }

    job.status = "completed"
    return job
  },
}

export const getAllJobs = driverService.getAllJobs
export const getJobsByStatus = driverService.getJobsByStatus
export const acceptJob = driverService.acceptJob
export const declineJob = driverService.declineJob
export const completeJob = driverService.completeJob
