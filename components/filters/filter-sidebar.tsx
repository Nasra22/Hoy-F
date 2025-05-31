"use client"

import { useState } from "react"
import { useFilters } from "@/lib/filter-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"
import { PriceRangeFilter } from "./price-range-filter"
import { RoomFilter } from "./room-filter"
import { PropertyTypeFilter } from "./property-type-filter"
import { AmenitiesFilter } from "./amenities-filter"
import { LocationFilter } from "./location-filter"
import { DateRangeFilter } from "./date-range-filter"
import { SaveFilterDialog } from "./save-filter-dialog"
import { Badge } from "@/components/ui/badge"

export function FilterSidebar() {
  const { resetFilters, activeFilterCount } = useFilters()
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 rounded-full">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto rounded-r-3xl">
            <SheetHeader className="flex flex-row items-center justify-between">
              <SheetTitle>Filters</SheetTitle>
              <div className="flex items-center gap-2">
                <SaveFilterDialog />
                <Button variant="ghost" size="sm" onClick={resetFilters}>
                  Clear all
                </Button>
              </div>
            </SheetHeader>
            <div className="py-6 space-y-6">
              <PriceRangeFilter />
              <Separator />
              <RoomFilter type="bedrooms" maxCount={5} />
              <Separator />
              <RoomFilter type="bathrooms" maxCount={4} />
              <Separator />
              <PropertyTypeFilter />
              <Separator />
              <AmenitiesFilter />
              <Separator />
              <LocationFilter />
              <Separator />
              <DateRangeFilter />
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setOpen(false)} className="rounded-full">
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)} className="rounded-full bg-brand-dark">
                Apply Filters
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop filter sidebar */}
      <div className="hidden md:block w-64 flex-shrink-0">
        <div className="sticky top-20 overflow-y-auto max-h-[calc(100vh-5rem)] bg-white rounded-3xl p-6 shadow">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Filters</h2>
            <div className="flex items-center gap-2">
              <SaveFilterDialog />
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
                  Clear all
                </Button>
              )}
            </div>
          </div>
          <div className="space-y-6">
            <PriceRangeFilter />
            <Separator />
            <RoomFilter type="bedrooms" maxCount={5} />
            <Separator />
            <RoomFilter type="bathrooms" maxCount={4} />
            <Separator />
            <PropertyTypeFilter />
            <Separator />
            <AmenitiesFilter />
            <Separator />
            <LocationFilter />
            <Separator />
            <DateRangeFilter />
          </div>
        </div>
      </div>
    </>
  )
}
