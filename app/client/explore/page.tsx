import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"
import { PropertySearch } from "@/components/client/property-search"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { ActiveFilters } from "@/components/filters/active-filters"
import { FilterProvider } from "@/lib/filter-context"
import { ChatWidget } from "@/components/chat/chat-widget"
import { FilteredPropertyListings } from "@/components/client/filtered-property-listings"

export default function ExplorePage() {
  return (
    <div className="min-h-screen bg-background">
      <ClientDashboardHeader />

      <main className="container px-4 py-6 pb-20">
        <h1 className="text-2xl font-bold mb-6">Explore Properties</h1>

        <PropertySearch />

        <FilterProvider>
          <div className="flex flex-col md:flex-row gap-6 mt-8">
            <FilterSidebar />

            <div className="flex-1">
              <ActiveFilters />
              <FilteredPropertyListings />
            </div>
          </div>
        </FilterProvider>
      </main>

      <ClientNavigation />
      <ChatWidget />
    </div>
  )
}
