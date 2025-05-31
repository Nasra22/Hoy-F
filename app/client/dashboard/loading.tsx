import { Skeleton } from "@/components/ui/skeleton"
import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <ClientDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Client Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
          <div>
            <Skeleton className="h-[300px] w-full rounded-lg" />
          </div>
        </div>

        <div className="mb-8">
          <Skeleton className="h-[150px] w-full rounded-lg" />
        </div>

        <div className="space-y-6">
          <Skeleton className="h-10 w-full rounded-lg" />

          <h2 className="text-xl font-semibold">Featured Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
              ))}
          </div>
        </div>
      </main>

      <ClientNavigation />
    </div>
  )
}
