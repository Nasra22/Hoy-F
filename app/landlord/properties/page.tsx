"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandlordDashboardHeader } from "@/components/landlord/dashboard-header"
import { LandlordNavigation } from "@/components/landlord/navigation"
import { PropertyCard } from "@/components/property/property-card"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, Search } from "lucide-react"
import Link from "next/link"
import { getAllProperties, deleteProperty } from "@/lib/property-service"
import type { Property } from "@/lib/property-service"

export default function LandlordPropertiesPage() {
  const { user, isLoading: userLoading } = useUser()
  const router = useRouter()

  const [properties, setProperties] = useState<Property[]>([])
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)

  // Fetch properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true)
        const data = await getAllProperties()
        setProperties(data)
        setFilteredProperties(data)
      } catch (err) {
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  // Filter properties based on search and status
  useEffect(() => {
    let filtered = properties

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.location.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((property) => property.status === statusFilter)
    }

    setFilteredProperties(filtered)
  }, [searchQuery, statusFilter, properties])

  // Redirect if not logged in or not a landlord
  if (!userLoading && (!user || user.role !== "landlord")) {
    router.push("/login")
    return null
  }

  const handleDeleteClick = (propertyId: string) => {
    setPropertyToDelete(propertyId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (!propertyToDelete) return

    try {
      await deleteProperty(propertyToDelete)

      // Update the properties list
      setProperties(properties.filter((p) => p.id !== propertyToDelete))

      // Close the dialog
      setDeleteDialogOpen(false)
      setPropertyToDelete(null)
    } catch (err) {
      console.error(err)
      alert("Failed to delete property")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <LandlordDashboardHeader />

      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Your Properties</h1>

          <Link href="/landlord/properties/upload">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="active">For Sale</SelectItem>
              <SelectItem value="rent">For Rent</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="sold">Sold</SelectItem>
              <SelectItem value="rented">Rented</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="mb-2">Loading properties...</p>
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        ) : filteredProperties.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-500 mb-4">No properties found</p>
            <Link href="/landlord/properties/upload">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Property
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                actions={[
                  {
                    label: "Edit",
                    href: `/landlord/properties/edit/${property.id}`,
                  },
                  {
                    label: "Delete",
                    onClick: () => handleDeleteClick(property.id),
                    variant: "destructive",
                  },
                ]}
              />
            ))}
          </div>
        )}
      </main>

      <LandlordNavigation />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Property</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
