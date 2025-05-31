"use client"

import { useEffect, useState } from "react"
import { type ChatRoom, type User, chatService } from "@/lib/chat-service"
import { ChatRoomList } from "./chat-room-list"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { Card } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSocket } from "./socket-provider"

interface MessagesViewProps {
  userRole?: "client" | "agent" | "landlord"
}

export function MessagesView({ userRole = "client" }: MessagesViewProps) {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const { isConnected } = useSocket()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const user = await chatService.getCurrentUser(userRole)
      setCurrentUser(user)

      const rooms = await chatService.getChatRooms(user.id, userRole)
      setChatRooms(rooms)
    }

    loadData()
  }, [userRole])

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room)
    // Mark messages as read when opening a chat
    if (currentUser) {
      chatService.markAsRead(room.id, currentUser.id)

      // Update unread count
      setChatRooms((prevRooms) => prevRooms.map((r) => (r.id === room.id ? { ...r, unreadCount: 0 } : r)))
    }
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
  }

  if (!isConnected) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="mb-2">Connecting to chat server...</p>
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
        </div>
      </div>
    )
  }

  // On mobile, show either the room list or the selected chat
  if (isMobile) {
    if (selectedRoom) {
      return (
        <Card className="h-[calc(100vh-12rem)]">
          <div className="flex items-center border-b p-3">
            <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="font-medium">
              {selectedRoom.participants.find((p) => p.id !== (currentUser?.id || ""))?.name}
            </h3>
          </div>
          <div className="flex flex-col h-[calc(100%-3.5rem)]">
            <ChatMessages roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
            <ChatInput roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
          </div>
        </Card>
      )
    }

    return (
      <Card className="h-[calc(100vh-12rem)]">
        <div className="p-3 border-b">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <ChatRoomList rooms={chatRooms} currentUserId={currentUser?.id || ""} onSelectRoom={handleRoomSelect} />
      </Card>
    )
  }

  // On desktop, show both the room list and selected chat
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[calc(100vh-12rem)]">
      <Card className="md:col-span-1 h-full">
        <div className="p-3 border-b">
          <h3 className="font-medium">Conversations</h3>
        </div>
        <ChatRoomList rooms={chatRooms} currentUserId={currentUser?.id || ""} onSelectRoom={handleRoomSelect} />
      </Card>

      <Card className="md:col-span-2 h-full">
        {selectedRoom ? (
          <div className="flex flex-col h-full">
            <div className="p-3 border-b">
              <h3 className="font-medium">
                {selectedRoom.participants.find((p) => p.id !== (currentUser?.id || ""))?.name}
              </h3>
            </div>
            <ChatMessages roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
            <ChatInput roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </Card>
    </div>
  )
}
