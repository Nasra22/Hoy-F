import { AgentDashboardHeader } from "@/components/agent/dashboard-header"
import { AgentNavigation } from "@/components/agent/navigation"
import { MessagesView } from "@/components/chat/messages-view"

export default function AgentMessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <AgentDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <MessagesView userRole="agent" />
      </main>

      <AgentNavigation />
    </div>
  )
}
