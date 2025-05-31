"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"

interface SocketContextType {
  socket: Socket | null
  isConnected: boolean
  joinRoom: (roomId: string) => void
  leaveRoom: (roomId: string) => void
  sendMessage: (roomId: string, message: any) => void
  setTyping: (roomId: string, user: string, isTyping: boolean) => void
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  joinRoom: () => {},
  leaveRoom: () => {},
  sendMessage: () => {},
  setTyping: () => {},
})

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // Initialize socket connection
    const initSocket = async () => {
      // Ensure the socket server is running
      await fetch("/api/socket")

      const socketInstance = io("", {
        path: "/api/socket",
        addTrailingSlash: false,
      })

      socketInstance.on("connect", () => {
        console.log("Socket connected")
        setIsConnected(true)
      })

      socketInstance.on("disconnect", () => {
        console.log("Socket disconnected")
        setIsConnected(false)
      })

      setSocket(socketInstance)

      return () => {
        socketInstance.disconnect()
      }
    }

    initSocket()

    return () => {
      if (socket) {
        socket.disconnect()
      }
    }
  }, [])

  const joinRoom = (roomId: string) => {
    if (socket) {
      socket.emit("join-room", roomId)
    }
  }

  const leaveRoom = (roomId: string) => {
    if (socket) {
      socket.emit("leave-room", roomId)
    }
  }

  const sendMessage = (roomId: string, message: any) => {
    if (socket) {
      socket.emit("send-message", { roomId, message })
    }
  }

  const setTyping = (roomId: string, user: string, isTyping: boolean) => {
    if (socket) {
      socket.emit("typing", { roomId, user, isTyping })
    }
  }

  return (
    <SocketContext.Provider value={{ socket, isConnected, joinRoom, leaveRoom, sendMessage, setTyping }}>
      {children}
    </SocketContext.Provider>
  )
}
