/*import type { Server as NetServer } from "http"
import type { NextRequest } from "next/server"
import { Server as SocketIOServer } from "socket.io"
import type { Server as HTTPServer } from "http"
import type { Socket as NetSocket } from "net"

interface SocketServer extends HTTPServer {
  io?: SocketIOServer | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends Response {
  socket: SocketWithIO
}

export async function GET(req: NextRequest, res: NextApiResponseWithSocket) {
  if ((res.socket.server as any).io) {
    console.log("Socket is already running")
  } else {
    console.log("Socket is initializing")
    const io = new SocketIOServer(res.socket.server as any as NetServer)
    ;(res.socket.server as any).io = io

    io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`)

      socket.on("join-room", (roomId: string) => {
        socket.join(roomId)
        console.log(`Socket ${socket.id} joined room ${roomId}`)
      })

      socket.on("leave-room", (roomId: string) => {
        socket.leave(roomId)
        console.log(`Socket ${socket.id} left room ${roomId}`)
      })

      socket.on("send-message", (data: { roomId: string; message: any }) => {
        io.to(data.roomId).emit("new-message", data.message)
      })

      socket.on("typing", (data: { roomId: string; user: string; isTyping: boolean }) => {
        socket.to(data.roomId).emit("user-typing", {
          user: data.user,
          isTyping: data.isTyping,
        })
      })

      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`)
      })
    })
  }

  return new Response("Socket.io server running", {
    status: 200,
  })
}*/
