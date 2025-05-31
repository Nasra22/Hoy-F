"use client"

import { useState } from "react"
import { Search, MapPin, Calendar } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { PropertyTabs, type PropertyCategory } from "./property-tabs"

export function PropertySearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState<PropertyCategory>("all")
  const [searchQuery, setSearchQuery] = useState("")

  const handleTabChange = (value: PropertyCategory) => {
    setActiveTab(value)
    // Update URL
    const url = new URL(window.location.href)
    url.searchParams.set("category", value)
    window.history.pushState({}, "", url)
  }

  return (
    <div className="space-y-4 my-2">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for properties..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-full border-gray-200"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Tabs defaultValue={activeTab} value={activeTab}>
        <PropertyTabs onTabChange={handleTabChange} defaultValue={activeTab} />

        <TabsContent value="apartment" className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </Button>
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              Dates
            </Button>
            <Button variant="outline" size="sm">
              Price
            </Button>
            <Button variant="outline" size="sm">
              Bedrooms
            </Button>
            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="house" className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </Button>
            <Button variant="outline" size="sm">
              Price
            </Button>
            <Button variant="outline" size="sm">
              Bedrooms
            </Button>
            <Button variant="outline" size="sm">
              Property Type
            </Button>
            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="land" className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </Button>
            <Button variant="outline" size="sm">
              Price
            </Button>
            <Button variant="outline" size="sm">
              Size
            </Button>
            <Button variant="outline" size="sm">
              Land Type
            </Button>
            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </Button>
            <Button variant="outline" size="sm">
              Service Type
            </Button>
            <Button variant="outline" size="sm">
              Price Range
            </Button>
            <Button variant="outline" size="sm">
              Availability
            </Button>
            <Button variant="outline" size="sm">
              Rating
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="all" className="mt-4">
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              Location
            </Button>
            <Button variant="outline" size="sm">
              Price
            </Button>
            <Button variant="outline" size="sm">
              Property Type
            </Button>
            <Button variant="outline" size="sm">
              More Filters
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
