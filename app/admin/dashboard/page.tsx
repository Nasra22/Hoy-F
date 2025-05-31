import { AdminStats } from "@/components/admin/stats"
import { PendingVerifications } from "@/components/admin/pending-verifications"
import { RecentListings } from "@/components/admin/recent-listings"
import { PageHeader } from "@/components/page-header"

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Admin Dashboard" text="Overview of platform activity and key metrics" />

      <div className="flex-1 p-4 md:p-6">
        <AdminStats />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Pending Verifications</h2>
            <PendingVerifications />
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Recent Listings</h2>
            <RecentListings />
          </section>
        </div>
      </div>
    </div>
  )
}
