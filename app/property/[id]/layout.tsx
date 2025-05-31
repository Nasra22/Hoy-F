import type React from "react"
import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"
import { ChatWidget } from "@/components/chat/chat-widget"

export default function PropertyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ClientDashboardHeader />
      {children}
      <ClientNavigation />
      <ChatWidget />
    </>
  )
}
