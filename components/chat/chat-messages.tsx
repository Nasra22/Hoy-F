"use client"

import { useEffect, useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { chatService, type Message, type User } from "@/lib/chat-service"
import { formatDistanceToNow } from "date-fns"
import { useSocket } from "./socket-provider"

interface ChatMessagesProps {
  roomId: string
  currentUserId: string
}

export function ChatMessages({ roomId, currentUserId }: ChatMessagesProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [users, setUsers] = useState<Record<string, User>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { socket, joinRoom, leaveRoom } = useSocket()

  // Load messages and users
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Get messages for this room
        const fetchedMessages = await chatService.getMessages(roomId)
        setMessages(fetchedMessages)

        // Get user details for all message senders
        const userIds = Array.from(new Set(fetchedMessages.map((msg) => msg.senderId)))
        const userMap: Record<string, User> = {}

        for (const userId of userIds) {
          const user = await chatService.getUser(userId)
          if (user) {
            userMap[userId] = user
          }
        }

        setUsers(userMap)
      } catch (error) {
        console.error("Error loading chat data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [roomId])

  // Join the room when component mounts
  useEffect(() => {
    joinRoom(roomId)

    return () => {
      leaveRoom(roomId)
    }
  }, [roomId, joinRoom, leaveRoom])

  // Listen for new messages
  useEffect(() => {
    if (!socket) return

    const handleNewMessage = async (message: Message) => {
      setMessages((prev) => [...prev, message])

      // If we don't have the sender's info, fetch it
      if (!users[message.senderId]) {
        const user = await chatService.getUser(message.senderId)
        if (user) {
          setUsers((prev) => ({ ...prev, [message.senderId]: user }))
        }
      }

      // Mark as read if it's not from the current user
      if (message.senderId !== currentUserId) {
        chatService.markAsRead(roomId, currentUserId)
      }
    }

    socket.on("new-message", handleNewMessage)

    return () => {
      socket.off("new-message", handleNewMessage)
    }
  }, [socket, roomId, currentUserId, users])

  // Listen for typing indicators
  useEffect(() => {
    if (!socket) return

    const handleUserTyping = (data: { user: string; isTyping: boolean }) => {
      if (data.isTyping) {
        setTypingUsers((prev) => [...prev.filter((id) => id !== data.user), data.user])
      } else {
        setTypingUsers((prev) => prev.filter((id) => id !== data.user))
      }
    }

    socket.on("user-typing", handleUserTyping)

    return () => {
      socket.off("user-typing", handleUserTyping)
    }
  }, [socket])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typingUsers])

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-3 flex items-center justify-center">
        <div className="animate-pulse">Loading messages...</div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-y-auto p-3 space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          No messages yet. Start the conversation!
        </div>
      ) : (
        <>
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId
            const user = users[message.senderId]

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                {!isCurrentUser && user && (
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}

                <div className="max-w-[80%]">
                  {!isCurrentUser && (
                    <div className="flex items-center mb-1">
                      <span className="text-xs font-medium">{user?.name || "Unknown"}</span>
                      <span className="text-xs text-muted-foreground ml-2">
                        {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-3 py-2 text-sm ${
                      isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            )
          })}

          {typingUsers.length > 0 && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg px-3 py-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">
                    {typingUsers.map((id) => users[id]?.name || "Someone").join(", ")} is typing
                  </span>
                  <span className="flex">
                    <span className="animate-bounce mx-0.5">.</span>
                    <span className="animate-bounce animation-delay-200 mx-0.5">.</span>
                    <span className="animate-bounce animation-delay-400 mx-0.5">.</span>
                  </span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  )
}
