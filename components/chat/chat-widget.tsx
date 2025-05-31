"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageSquare, X, ChevronLeft } from "lucide-react"
import { ChatMessages } from "./chat-messages"
import { ChatInput } from "./chat-input"
import { ChatRoomList } from "./chat-room-list"
import { chatService, type ChatRoom, type User } from "@/lib/chat-service"
import { Badge } from "@/components/ui/badge"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [totalUnread, setTotalUnread] = useState(0)

  useEffect(() => {
    const loadData = async () => {
      const user = await chatService.getCurrentUser()
      setCurrentUser(user)

      const rooms = await chatService.getChatRooms(user.id)
      setChatRooms(rooms)

      const unreadCount = rooms.reduce((total, room) => total + room.unreadCount, 0)
      setTotalUnread(unreadCount)
    }

    loadData()
  }, [])

  const handleRoomSelect = (room: ChatRoom) => {
    setSelectedRoom(room)
    // Mark messages as read when opening a chat
    if (currentUser) {
      chatService.markAsRead(room.id, currentUser.id)

      // Update unread count
      setChatRooms((prevRooms) => prevRooms.map((r) => (r.id === room.id ? { ...r, unreadCount: 0 } : r)))

      // Update total unread count
      setTotalUnread((prev) => prev - room.unreadCount)
    }
  }

  const handleBackToList = () => {
    setSelectedRoom(null)
  }

  return (
    <>
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="fixed bottom-20 right-4 rounded-full h-12 w-12 shadow-lg">
          <MessageSquare className="h-5 w-5" />
          {totalUnread > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {totalUnread}
            </Badge>
          )}
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 h-96 bg-background border rounded-md shadow-lg flex flex-col z-50">
          <div className="flex items-center justify-between border-b p-3">
            {selectedRoom ? (
              <>
                <Button variant="ghost" size="icon" onClick={handleBackToList} className="mr-2">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="font-medium flex-1">
                  {selectedRoom.participants.find((p) => p.id !== (currentUser?.id || ""))?.name}
                </h3>
              </>
            ) : (
              <h3 className="font-medium">Messages</h3>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {selectedRoom ? (
            <>
              <ChatMessages roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
              <ChatInput roomId={selectedRoom.id} currentUserId={currentUser?.id || ""} />
            </>
          ) : (
            <ChatRoomList rooms={chatRooms} currentUserId={currentUser?.id || ""} onSelectRoom={handleRoomSelect} />
          )}
        </div>
      )}
    </>
  )
}
