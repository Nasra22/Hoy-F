import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"
import { MessagesView } from "@/components/chat/messages-view"

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-card">
      <ClientDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <MessagesView />
      </main>

      <ClientNavigation />
    </div>
  )
}
