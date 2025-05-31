import { Skeleton } from "@/components/ui/skeleton"
import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <ClientDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Explore Properties</h1>

        <Skeleton className="h-[100px] w-full rounded-lg mb-6" />

        <Skeleton className="h-10 w-full rounded-lg mb-6" />

        <div className="flex flex-col md:flex-row gap-6">
          <Skeleton className="h-[500px] w-full md:w-[250px] rounded-lg" />

          <div className="flex-1">
            <Skeleton className="h-10 w-full rounded-lg mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <Skeleton key={i} className="h-[350px] w-full rounded-lg" />
                ))}
            </div>
          </div>
        </div>
      </main>

      <ClientNavigation />
    </div>
  )
}
