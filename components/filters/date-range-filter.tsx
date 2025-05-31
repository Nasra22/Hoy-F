"use client"

import { useState, useEffect } from "react"
import { useFilters } from "@/lib/filter-context"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"

export function DateRangeFilter() {
  const { filters, setFilters } = useFilters()
  const [date, setDate] = useState<DateRange | undefined>({
    from: filters.dateRange[0] || undefined,
    to: filters.dateRange[1] || undefined,
  })
  const [open, setOpen] = useState(false)

  // Update local state when filters change
  useEffect(() => {
    setDate({
      from: filters.dateRange[0] || undefined,
      to: filters.dateRange[1] || undefined,
    })
  }, [filters.dateRange])

  const handleSelect = (range: DateRange | undefined) => {
    setDate(range)
    if (range) {
      setFilters((prev) => ({
        ...prev,
        dateRange: [range.from || null, range.to || null],
      }))
    }
  }

  const clearDates = () => {
    setDate(undefined)
    setFilters((prev) => ({
      ...prev,
      dateRange: [null, null],
    }))
    setOpen(false)
  }

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Dates</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "Select dates"
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
          <div className="flex items-center justify-end gap-2 p-3 border-t">
            <Button variant="outline" size="sm" onClick={clearDates}>
              Clear
            </Button>
            <Button size="sm" onClick={() => setOpen(false)}>
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
