"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { PropertyCategory } from "@/components/client/property-tabs"

export interface FilterState {
  priceRange: [number, number]
  bedrooms: number | null
  bathrooms: number | null
  propertyTypes: string[]
  amenities: string[]
  location: string | null
  dateRange: [Date | null, Date | null]
  size: [number, number] | null
  category: PropertyCategory
}

export interface SavedFilter {
  id: string
  name: string
  filters: FilterState
  createdAt: number
}

interface FilterContextType {
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  resetFilters: () => void
  activeFilterCount: number
  savedFilters: SavedFilter[]
  saveCurrentFilters: (name: string) => void
  deleteSavedFilter: (id: string) => void
  applySavedFilter: (id: string) => void
  setCategory: (category: PropertyCategory) => void
}

const defaultFilters: FilterState = {
  priceRange: [0, 100000],
  bedrooms: null,
  bathrooms: null,
  propertyTypes: [],
  amenities: [],
  location: null,
  dateRange: [null, null],
  size: null,
  category: "all",
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

interface FilterProviderProps {
  children: React.ReactNode
  initialCategory?: PropertyCategory
}

export function FilterProvider({ children, initialCategory = "all" }: FilterProviderProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...defaultFilters,
    category: initialCategory,
  })
  const [activeFilterCount, setActiveFilterCount] = useState(0)
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([])

  // Load saved filters from localStorage on initial render
  useEffect(() => {
    const storedFilters = localStorage.getItem("hoyfinder-saved-filters")
    if (storedFilters) {
      try {
        const parsedFilters = JSON.parse(storedFilters)

        // Convert date strings back to Date objects
        const processedFilters = parsedFilters.map((filter: SavedFilter) => ({
          ...filter,
          filters: {
            ...filter.filters,
            dateRange: [
              filter.filters.dateRange[0] ? new Date(filter.filters.dateRange[0]) : null,
              filter.filters.dateRange[1] ? new Date(filter.filters.dateRange[1]) : null,
            ],
          },
        }))

        setSavedFilters(processedFilters)
      } catch (error) {
        console.error("Error parsing saved filters:", error)
      }
    }
  }, [])

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("hoyfinder-saved-filters", JSON.stringify(savedFilters))
  }, [savedFilters])

  // Calculate the number of active filters
  useEffect(() => {
    let count = 0

    // Price range filter is active if it's not the default range
    if (filters.priceRange[0] > defaultFilters.priceRange[0] || filters.priceRange[1] < defaultFilters.priceRange[1]) {
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
    if (filters.category !== "all") count++

    setActiveFilterCount(count)
  }, [filters])

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  const saveCurrentFilters = (name: string) => {
    if (activeFilterCount === 0) return // Don't save if no filters are active

    const newSavedFilter: SavedFilter = {
      id: crypto.randomUUID(),
      name,
      filters: { ...filters },
      createdAt: Date.now(),
    }

    setSavedFilters((prev) => [...prev, newSavedFilter])
  }

  const deleteSavedFilter = (id: string) => {
    setSavedFilters((prev) => prev.filter((filter) => filter.id !== id))
  }

  const applySavedFilter = (id: string) => {
    const savedFilter = savedFilters.find((filter) => filter.id === id)
    if (savedFilter) {
      setFilters(savedFilter.filters)
    }
  }

  const setCategory = (category: PropertyCategory) => {
    setFilters((prev) => ({ ...prev, category }))
  }

  return (
    <FilterContext.Provider
      value={{
        filters,
        setFilters,
        resetFilters,
        activeFilterCount,
        savedFilters,
        saveCurrentFilters,
        deleteSavedFilter,
        applySavedFilter,
        setCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
