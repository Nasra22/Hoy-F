"use client"

import { useState } from "react"
import { useFilters } from "@/lib/filter-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookmarkPlus } from "lucide-react"

export function SaveFilterDialog() {
  const { activeFilterCount, saveCurrentFilters } = useFilters()
  const [open, setOpen] = useState(false)
  const [filterName, setFilterName] = useState("")
  const [error, setError] = useState("")

  const handleSave = () => {
    if (!filterName.trim()) {
      setError("Please enter a name for your filter")
      return
    }

    saveCurrentFilters(filterName.trim())
    setFilterName("")
    setError("")
    setOpen(false)
  }

  if (activeFilterCount === 0) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <BookmarkPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Save Filters</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save Filter Combination</DialogTitle>
          <DialogDescription>Save your current filter settings for quick access in the future.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="filter-name">Filter Name</Label>
            <Input
              id="filter-name"
              placeholder="e.g., Beach houses with pool"
              value={filterName}
              onChange={(e) => {
                setFilterName(e.target.value)
                setError("")
              }}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Filter</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
