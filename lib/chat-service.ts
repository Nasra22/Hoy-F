// Types for our chat system
export interface User {
  id: string
  name: string
  avatar?: string
  role?: "client" | "agent" | "landlord" | "admin"
}

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: number
  read: boolean
}

export interface ChatRoom {
  id: string
  participants: User[]
  lastMessage?: Message
  unreadCount: number
  propertyId?: string
  propertyTitle?: string
}

// Mock data for development
const mockUsers: User[] = [
  { id: "client1", name: "Current Client", avatar: "/placeholder.svg?height=40&width=40", role: "client" },
  { id: "agent1", name: "Maria (Agent)", avatar: "/placeholder.svg?height=40&width=40", role: "agent" },
  { id: "landlord1", name: "Carlos (Landlord)", avatar: "/placeholder.svg?height=40&width=40", role: "landlord" },
  { id: "client2", name: "Michael", avatar: "/placeholder.svg?height=40&width=40", role: "client" },
  { id: "client3", name: "Isabella", avatar: "/placeholder.svg?height=40&width=40", role: "client" },
  { id: "agent2", name: "Elena (Agent)", avatar: "/placeholder.svg?height=40&width=40", role: "agent" },
  { id: "landlord2", name: "Javier (Landlord)", avatar: "/placeholder.svg?height=40&width=40", role: "landlord" },
]

const mockChatRooms: ChatRoom[] = [
  // Client-Agent chats
  {
    id: "room1",
    participants: [mockUsers[0], mockUsers[1]],
    lastMessage: {
      id: "msg1",
      senderId: "agent1",
      text: "I can show you the apartment tomorrow at 3pm",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      read: true,
    },
    unreadCount: 0,
    propertyId: "prop1",
    propertyTitle: "Modern Apartment in City Center",
  },

  // Client-Landlord chats
  {
    id: "room2",
    participants: [mockUsers[0], mockUsers[2]],
    lastMessage: {
      id: "msg2",
      senderId: "landlord1",
      text: "Yes, utilities are included in the rent",
      timestamp: Date.now() - 10 * 60 * 60 * 1000, // 10 hours ago
      read: false,
    },
    unreadCount: 1,
    propertyId: "prop3",
    propertyTitle: "Cozy Studio for Rent",
  },

  // Client-Client chats (for demo purposes)
  {
    id: "room3",
    participants: [mockUsers[0], mockUsers[3]],
    lastMessage: {
      id: "msg3",
      senderId: "client2",
      text: "That sounds like a fantastic idea!",
      timestamp: Date.now() - 4 * 60 * 60 * 1000, // 4 hours ago
      read: false,
    },
    unreadCount: 2,
  },

  // Agent-Landlord chats
  {
    id: "room4",
    participants: [mockUsers[1], mockUsers[2]],
    lastMessage: {
      id: "msg4",
      senderId: "landlord1",
      text: "I've updated the property listing with new photos",
      timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 hours ago
      read: true,
    },
    unreadCount: 0,
    propertyId: "prop3",
    propertyTitle: "Cozy Studio for Rent",
  },

  // More Agent chats
  {
    id: "room5",
    participants: [mockUsers[1], mockUsers[4]],
    lastMessage: {
      id: "msg5",
      senderId: "client3",
      text: "What's the earliest move-in date?",
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      read: false,
    },
    unreadCount: 1,
    propertyId: "prop2",
    propertyTitle: "Luxury Villa with Pool",
  },

  // More Landlord chats
  {
    id: "room6",
    participants: [mockUsers[2], mockUsers[5]],
    lastMessage: {
      id: "msg6",
      senderId: "agent2",
      text: "I have a client interested in your property",
      timestamp: Date.now() - 1 * 60 * 60 * 1000, // 1 hour ago
      read: false,
    },
    unreadCount: 1,
    propertyId: "prop4",
    propertyTitle: "Family Home with Garden",
  },
]

const mockMessages: Record<string, Message[]> = {
  room1: [
    {
      id: "msg1-1",
      senderId: "client1",
      text: "Hi, I'm interested in the Modern Apartment in City Center.",
      timestamp: Date.now() - 5 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg1-2",
      senderId: "agent1",
      text: "Hello! Thanks for your interest. When would you like to view it?",
      timestamp: Date.now() - 4.5 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg1-3",
      senderId: "client1",
      text: "Is tomorrow afternoon possible?",
      timestamp: Date.now() - 4.2 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg1-4",
      senderId: "agent1",
      text: "I can show you the apartment tomorrow at 3pm",
      timestamp: Date.now() - 4 * 60 * 60 * 1000,
      read: true,
    },
  ],
  room2: [
    {
      id: "msg2-1",
      senderId: "client1",
      text: "Hi, I have a question about the Cozy Studio for Rent.",
      timestamp: Date.now() - 12 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg2-2",
      senderId: "landlord1",
      text: "Hello! What would you like to know?",
      timestamp: Date.now() - 11 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg2-3",
      senderId: "client1",
      text: "Are utilities included in the rent?",
      timestamp: Date.now() - 10.5 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg2-4",
      senderId: "landlord1",
      text: "Yes, utilities are included in the rent",
      timestamp: Date.now() - 10 * 60 * 60 * 1000,
      read: false,
    },
  ],
  room4: [
    {
      id: "msg4-1",
      senderId: "agent1",
      text: "Hi Carlos, I'm representing a client interested in your Cozy Studio.",
      timestamp: Date.now() - 10 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg4-2",
      senderId: "landlord1",
      text: "That's great news! What would they like to know?",
      timestamp: Date.now() - 9.5 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg4-3",
      senderId: "agent1",
      text: "They're asking about the property's amenities and if you have more photos.",
      timestamp: Date.now() - 9 * 60 * 60 * 1000,
      read: true,
    },
    {
      id: "msg4-4",
      senderId: "landlord1",
      text: "I've updated the property listing with new photos",
      timestamp: Date.now() - 8 * 60 * 60 * 1000,
      read: true,
    },
  ],
}

// Chat service functions
export const chatService = {
  // Get all chat rooms for a user
  getChatRooms: async (userId: string, userRole = "client"): Promise<ChatRoom[]> => {
    // In a real app, this would fetch from an API or database
    return mockChatRooms.filter((room) => room.participants.some((participant) => participant.id === userId))
  },

  // Get messages for a specific chat room
  getMessages: async (roomId: string): Promise<Message[]> => {
    // In a real app, this would fetch from an API or database
    return mockMessages[roomId] || []
  },

  // Get a specific user
  getUser: async (userId: string): Promise<User | undefined> => {
    // In a real app, this would fetch from an API or database
    return mockUsers.find((user) => user.id === userId)
  },

  // Get the current user (for demo purposes)
  getCurrentUser: async (role = "client"): Promise<User> => {
    // In a real app, this would get the authenticated user
    switch (role) {
      case "agent":
        return mockUsers.find((user) => user.id === "agent1") || mockUsers[1]
      case "landlord":
        return mockUsers.find((user) => user.id === "landlord1") || mockUsers[2]
      default:
        return mockUsers[0] // client
    }
  },

  // Mark messages as read
  markAsRead: async (roomId: string, userId: string): Promise<void> => {
    // In a real app, this would update the database
    if (mockMessages[roomId]) {
      mockMessages[roomId] = mockMessages[roomId].map((message) => ({
        ...message,
        read: true,
      }))
    }

    const room = mockChatRooms.find((room) => room.id === roomId)
    if (room) {
      room.unreadCount = 0
    }
  },

  // Create a new message
  createMessage: async (roomId: string, senderId: string, text: string): Promise<Message> => {
    // In a real app, this would save to the database
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId,
      text,
      timestamp: Date.now(),
      read: false,
    }

    if (!mockMessages[roomId]) {
      mockMessages[roomId] = []
    }

    mockMessages[roomId].push(newMessage)

    // Update the last message in the chat room
    const room = mockChatRooms.find((room) => room.id === roomId)
    if (room) {
      room.lastMessage = newMessage

      // If the message is from someone else, increment unread count
      if (senderId !== mockUsers[0].id) {
        room.unreadCount += 1
      }
    }

    return newMessage
  },

  // Create a new chat room
  createChatRoom: async (participants: User[], propertyId?: string, propertyTitle?: string): Promise<ChatRoom> => {
    // In a real app, this would save to the database
    const newRoom: ChatRoom = {
      id: `room-${Date.now()}`,
      participants,
      unreadCount: 0,
      propertyId,
      propertyTitle,
    }

    mockChatRooms.push(newRoom)
    return newRoom
  },
}
