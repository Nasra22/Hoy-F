"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ChatRoom } from "@/lib/chat-service"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"

interface ChatRoomListProps {
  rooms: ChatRoom[]
  currentUserId: string
  onSelectRoom: (room: ChatRoom) => void
}

export function ChatRoomList({ rooms, currentUserId, onSelectRoom }: ChatRoomListProps) {
  return (
    <div className="flex-1 overflow-y-auto p-2">
      {rooms.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">No messages yet</div>
      ) : (
        <div className="space-y-2">
          {rooms.map((room) => {
            const otherParticipant = room.participants.find((p) => p.id !== currentUserId)

            return (
              <div
                key={room.id}
                className="flex items-center p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => onSelectRoom(room)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage
                    src={otherParticipant?.avatar || "/placeholder.svg"}
                    alt={otherParticipant?.name || "User"}
                  />
                  <AvatarFallback>{otherParticipant?.name.charAt(0) || "U"}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{otherParticipant?.name}</span>
                    {room.lastMessage && (
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(room.lastMessage.timestamp, { addSuffix: true })}
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {room.lastMessage && (
                      <p className="text-sm text-muted-foreground truncate">
                        {room.lastMessage.senderId === currentUserId ? "You: " : ""}
                        {room.lastMessage.text}
                      </p>
                    )}

                    {room.unreadCount > 0 && (
                      <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center">{room.unreadCount}</Badge>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
