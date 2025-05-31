"use client"

import { useState } from "react"
import { Search, Send, ChevronLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Mock data for conversations
const conversations = [
  {
    id: "1",
    name: "John Smith",
    role: "Landlord",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I need help with my property listing",
    time: "10:30 AM",
    unread: true,
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "Agent",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "When will my account be verified?",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "3",
    name: "Michael Brown",
    role: "Landlord",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    unread: false,
  },
  {
    id: "4",
    name: "Emily Davis",
    role: "Agent",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I have a question about the commission",
    time: "Monday",
    unread: false,
  },
  {
    id: "5",
    name: "David Wilson",
    role: "Landlord",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you help me with the payment system?",
    time: "Monday",
    unread: false,
  },
]

// Mock data for messages
const messages = [
  {
    id: "1",
    sender: "John Smith",
    content: "Hello, I need help with my property listing. It's not showing up in the search results.",
    time: "10:25 AM",
    isAdmin: false,
  },
  {
    id: "2",
    sender: "Admin",
    content: "Hi John, I'll look into that for you. Can you provide the property ID?",
    time: "10:27 AM",
    isAdmin: true,
  },
  {
    id: "3",
    sender: "John Smith",
    content: "Sure, it's PROP12345.",
    time: "10:28 AM",
    isAdmin: false,
  },
  {
    id: "4",
    sender: "Admin",
    content:
      "Thank you. I can see the property in our system. It looks like it's pending approval. I'll expedite the review process.",
    time: "10:30 AM",
    isAdmin: true,
  },
]

export function AdminMessagesView() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [showConversation, setShowConversation] = useState(false)

  return (
    <div className="flex h-full">
      {/* Conversation List - Hidden on mobile when a conversation is selected */}
      <div className={`${showConversation ? "hidden" : "flex"} md:flex w-full md:w-80 border-r h-full flex-col`}>
        <div className="p-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search conversations..." className="pl-8" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-start gap-3 p-3 cursor-pointer hover:bg-muted/50 ${
                selectedConversation?.id === conversation.id ? "bg-muted" : ""
              }`}
              onClick={() => {
                setSelectedConversation(conversation)
                setShowConversation(true)
              }}
            >
              <Avatar>
                <AvatarImage src={conversation.avatar || "/placeholder.svg"} alt={conversation.name} />
                <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium">{conversation.name}</div>
                  <div className="text-xs text-muted-foreground">{conversation.time}</div>
                </div>
                <div className="text-xs text-muted-foreground">{conversation.role}</div>
                <div className="text-sm truncate">{conversation.lastMessage}</div>
              </div>
              {conversation.unread && <div className="w-2 h-2 rounded-full bg-primary mt-2"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* Message Area - Shown on mobile only when a conversation is selected */}
      <div className={`${showConversation ? "flex" : "hidden"} md:flex flex-col flex-1 h-full`}>
        {/* Conversation Header */}
        <div className="flex items-center gap-3 p-3 border-b">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setShowConversation(false)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage src={selectedConversation?.avatar || "/placeholder.svg"} alt={selectedConversation?.name} />
            <AvatarFallback>{selectedConversation?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{selectedConversation?.name}</div>
            <div className="text-xs text-muted-foreground">{selectedConversation?.role}</div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex mb-4 ${message.isAdmin ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isAdmin ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="text-sm">{message.content}</div>
                <div className="text-xs mt-1 opacity-70">{message.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="border-t p-3">
          <div className="flex gap-2">
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
