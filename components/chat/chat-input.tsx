"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { chatService } from "@/lib/chat-service"
import { useSocket } from "./socket-provider"

interface ChatInputProps {
  roomId: string
  currentUserId: string
}

export function ChatInput({ roomId, currentUserId }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const { sendMessage, setTyping } = useSocket()

  // Handle typing indicator
  useEffect(() => {
    if (message && !isTyping) {
      setIsTyping(true)
      setTyping(roomId, currentUserId, true)
    }

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      if (isTyping) {
        setIsTyping(false)
        setTyping(roomId, currentUserId, false)
      }
    }, 2000) // Stop typing indicator after 2 seconds of inactivity

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [message, isTyping, roomId, currentUserId, setTyping])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      try {
        // Create message in our local service
        const newMessage = await chatService.createMessage(roomId, currentUserId, message.trim())

        // Send message through socket
        sendMessage(roomId, newMessage)

        // Clear input and typing state
        setMessage("")
        setIsTyping(false)
        setTyping(roomId, currentUserId, false)
      } catch (error) {
        console.error("Error sending message:", error)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border-t p-3 flex items-center">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
      />
      <Button type="submit" size="icon" className="ml-2">
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
