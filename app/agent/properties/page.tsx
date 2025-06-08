"use client"

import { useState, useEffect } from "react"
import { AgentDashboardHeader } from "@/components/agent/dashboard-header"
import { AgentNavigation } from "@/components/agent/navigation"
import { PropertyCard } from "@/components/agent/property-card"
import { getAllProperties, deleteProperty } from "@/lib/agent-service"
import { useUser } from "@/lib/user-context"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getProperties } from "@/app/api/property-service/route"
import { Property } from "@/lib/property-service"

export default function AgentPropertiesPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Redirect if not logged in or not an agent
    if (!isLoading && (!user || user.role !== "agent")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true)
      try {
        const propertiesData = await getAllProperties()
        setProperties(propertiesData)
      } catch (error) {
        console.error("Error loading properties:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    loadData()
  }, [])

  console.log(user)

  // Filter properties based on search query and status
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.city.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = !statusFilter || property.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const handleEditProperty = (id: string) => {
    router.push(`/agent/properties/edit/${id}`)
  }

  const handleDeleteProperty = async (id: string) => {
    try {
      await deleteProperty(id)
      // Update the local state to remove the deleted property
      setProperties(properties.filter((property) => property.id !== id))
    } catch (error) {
      console.error("Error deleting property:", error)
      alert("Failed to delete property")
    } finally {
      setPropertyToDelete(null)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "agent") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AgentDashboardHeader />

      <main className="container px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Properties</h1>
          <Link href="/agent/properties/upload">
            <Button className="mt-4 md:mt-0 rounded-full">
              <Plus className="h-4 w-4 mr-2" /> Add New Property
            </Button>
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === null ? "default" : "outline"}
              onClick={() => setStatusFilter(null)}
              className="rounded-full"
            >
              All
            </Button>
            <Button
              variant={statusFilter === "active" ? "default" : "outline"}
              onClick={() => setStatusFilter("active")}
              className="rounded-full"
            >
              For Sale
            </Button>
            <Button
              variant={statusFilter === "rent" ? "default" : "outline"}
              onClick={() => setStatusFilter("rent")}
              className="rounded-full"
            >
              For Rent
            </Button>
            <Button
              variant={statusFilter === "sold" ? "default" : "outline"}
              onClick={() => setStatusFilter("sold")}
              className="rounded-full"
            >
              Sold
            </Button>
          </div>
        </div>

        {isDataLoading ? (
          <div className="text-center py-12">Loading properties...</div>
        ) : filteredProperties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500 mb-4">No properties found</p>
            <Link href="/agent/properties/upload">
              <Button>Add Your First Property</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onEdit={handleEditProperty}
                onDelete={() => setPropertyToDelete(property.id)}
              />
            ))}
          </div>
        )}
      </main>

      <AgentNavigation />

      <AlertDialog open={!!propertyToDelete} onOpenChange={() => setPropertyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property listing and remove it from our
              servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => propertyToDelete && handleDeleteProperty(propertyToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
