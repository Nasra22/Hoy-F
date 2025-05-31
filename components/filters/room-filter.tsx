"use client"

import { useFilters } from "@/lib/filter-context"
import { Button } from "@/components/ui/button"

interface RoomFilterProps {
  type: "bedrooms" | "bathrooms"
  maxCount: number
}

export function RoomFilter({ type, maxCount }: RoomFilterProps) {
  const { filters, setFilters } = useFilters()
  const currentValue = filters[type]

  const handleSelect = (value: number | null) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value === currentValue ? null : value,
    }))
  }

  const options = Array.from({ length: maxCount }, (_, i) => i + 1)

  return (
    <div className="space-y-3">
      <h3 className="font-medium capitalize">{type}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((count) => (
          <Button
            key={count}
            variant={currentValue === count ? "default" : "outline"}
            size="sm"
            onClick={() => handleSelect(count)}
            className="min-w-[40px]"
          >
            {count}
          </Button>
        ))}
        <Button
          variant={currentValue === maxCount + 1 ? "default" : "outline"}
          size="sm"
          onClick={() => handleSelect(maxCount + 1)}
        >
          {maxCount}+
        </Button>
        <Button variant="ghost" size="sm" onClick={() => handleSelect(null)} className="text-muted-foreground">
          Any
        </Button>
      </div>
    </div>
  )
}
