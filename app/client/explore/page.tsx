"use client"

import { ClientDashboardHeader } from "@/components/client/dashboard-header"
import { ClientNavigation } from "@/components/client/navigation"
import { PropertySearch } from "@/components/client/property-search"
import { FilterSidebar } from "@/components/filters/filter-sidebar"
import { ActiveFilters } from "@/components/filters/active-filters"
import { SavedFilters } from "@/components/filters/saved-filters"
import { FilterProvider } from "@/lib/filter-context"
import { ChatWidget } from "@/components/chat/chat-widget"
import { FilteredPropertyListings } from "@/components/client/filtered-property-listings"
import { PropertyTabs, type PropertyCategory } from "@/components/client/property-tabs"
import { Suspense, useState } from "react"

export default async function ExplorePage({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  const [activeTab, setActiveTab] = useState<PropertyCategory>("all")
  const category = (await searchParams.category as PropertyCategory) || "all"

  const handleTabChange = (value: PropertyCategory) => {
    setActiveTab(value)
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("category", value)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="min-h-screen bg-card pb-20">
      <ClientDashboardHeader />

      <main className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Explore Properties</h1>

        <PropertySearch />

        <FilterProvider initialCategory={category}>
          <div className="flex flex-col md:flex-row gap-6">
            <FilterSidebar />

            <div className="flex-1">
              <SavedFilters />
              <ActiveFilters />
              <Suspense fallback={<p>Loading...</p>}>
              </Suspense>
            </div>
          </div>
        </FilterProvider>
      </main>

      <ClientNavigation />
      <ChatWidget />
    </div>
  )
}

