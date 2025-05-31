"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useFilters } from "@/lib/filter-context"

export function PriceRangeFilter() {
  const { filters, setFilters } = useFilters()
  const [localPriceRange, setLocalPriceRange] = useState(filters.priceRange)

  // Update local state when filters change
  useEffect(() => {
    setLocalPriceRange(filters.priceRange)
  }, [filters.priceRange])

  const handleSliderChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1]])
    setFilters((prev) => ({
      ...prev,
      priceRange: [value[0], value[1]],
    }))
  }

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    const newRange: [number, number] = [value, localPriceRange[1]]
    setLocalPriceRange(newRange)
  }

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value) || 0
    const newRange: [number, number] = [localPriceRange[0], value]
    setLocalPriceRange(newRange)
  }

  const handleInputBlur = () => {
    // Ensure min is not greater than max
    const validRange: [number, number] = [
      Math.min(localPriceRange[0], localPriceRange[1]),
      Math.max(localPriceRange[0], localPriceRange[1]),
    ]
    setLocalPriceRange(validRange)
    setFilters((prev) => ({
      ...prev,
      priceRange: validRange,
    }))
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Price Range</h3>

      <Slider
        defaultValue={[0, 1000]}
        min={0}
        max={1000}
        step={10}
        value={localPriceRange}
        onValueChange={handleSliderChange}
        className="my-6"
      />

      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            min={0}
            value={localPriceRange[0]}
            onChange={handleMinInputChange}
            onBlur={handleInputBlur}
            className="pl-7"
          />
        </div>
        <span className="text-muted-foreground">to</span>
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input
            type="number"
            min={0}
            value={localPriceRange[1]}
            onChange={handleMaxInputChange}
            onBlur={handleInputBlur}
            className="pl-7"
          />
        </div>
      </div>
    </div>
  )
}
