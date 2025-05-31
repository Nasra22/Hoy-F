import { LandlordDashboardHeader } from "@/components/landlord/dashboard-header"
import { LandlordNavigation } from "@/components/landlord/navigation"
import { MessagesView } from "@/components/chat/messages-view"

export default function LandlordMessagesPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandlordDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <MessagesView userRole="landlord" />
      </main>

      <LandlordNavigation />
    </div>
  )
}
