"use client"

import { useState } from "react"
import { useFilters, type SavedFilter } from "@/lib/filter-context"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Bookmark, ChevronDown, ChevronUp, MoreHorizontal, Trash } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function SavedFilters() {
  const { savedFilters, applySavedFilter, deleteSavedFilter } = useFilters()
  const [open, setOpen] = useState(true)

  if (savedFilters.length === 0) {
    return null
  }

  const countActiveFilters = (filter: SavedFilter) => {
    let count = 0
    const { filters } = filter

    // Price range filter is active if it's not the default range
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000) {
      count++
    }

    // Count other active filters
    if (filters.bedrooms !== null) count++
    if (filters.bathrooms !== null) count++
    if (filters.propertyTypes.length > 0) count++
    if (filters.amenities.length > 0) count++
    if (filters.location !== null) count++
    if (filters.dateRange[0] !== null || filters.dateRange[1] !== null) count++
    if (filters.size !== null) count++

    return count
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="mb-6">
      <div className="flex items-center justify-between">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 p-0">
            <Bookmark className="h-4 w-4" />
            <span className="font-medium">Saved Filters</span>
            {open ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </CollapsibleTrigger>
        <Badge variant="outline">{savedFilters.length}</Badge>
      </div>

      <CollapsibleContent className="mt-2 space-y-2">
        {savedFilters.map((filter) => (
          <div key={filter.id} className="flex items-center justify-between rounded-md border p-2 hover:bg-muted/50">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-medium truncate">{filter.name}</h4>
                <Badge variant="secondary" className="h-5 px-1.5">
                  {countActiveFilters(filter)}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Saved {formatDistanceToNow(filter.createdAt, { addSuffix: true })}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => applySavedFilter(filter.id)} className="h-8">
                Apply
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => deleteSavedFilter(filter.id)}
                  >
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
