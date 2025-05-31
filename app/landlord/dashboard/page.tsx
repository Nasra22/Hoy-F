import { LandlordDashboardHeader } from "@/components/landlord/dashboard-header"
import { LandlordNavigation } from "@/components/landlord/navigation"
import { PropertyStats } from "@/components/landlord/property-stats"
import { PropertyManagement } from "@/components/landlord/property-management"
import { RecentRequests } from "@/components/landlord/recent-requests"

export default function LandlordDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <LandlordDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Landlord Dashboard</h1>

        <PropertyStats />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Your Properties</h2>
            <PropertyManagement />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Requests</h2>
            <RecentRequests />
          </section>
        </div>
      </main>

      <LandlordNavigation />
    </div>
  )
}
