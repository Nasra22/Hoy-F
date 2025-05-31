"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { LandlordDashboardHeader } from "@/components/landlord/dashboard-header"
import { LandlordNavigation } from "@/components/landlord/navigation"
import { PropertyUploadForm } from "@/components/property/property-upload-form"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPropertyById, updateProperty } from "@/lib/property-service"
import type { Property } from "@/lib/property-service"

export default function PropertyEditPage() {
  const { user, isLoading: userLoading } = useUser()
  const router = useRouter()
  const params = useParams()
  const propertyId = params?.id as string

  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      if (!propertyId) return

      try {
        setIsLoading(true)
        const data = await getPropertyById(propertyId)

        if (!data) {
          setError("Property not found")
          return
        }

        setProperty(data)
      } catch (err) {
        setError("Failed to load property")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [propertyId])

  // Redirect if not logged in or not a landlord
  if (!userLoading && (!user || user.role !== "landlord")) {
    router.push("/login")
    return null
  }

  const handleSubmit = async (formData: any) => {
    if (!propertyId) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, this would update the property in the database
      await updateProperty(propertyId, formData)

      // Show success message and redirect
      alert("Property updated successfully!")
      router.push("/landlord/properties")
    } catch (err) {
      console.error(err)
      alert("Failed to update property")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (userLoading || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <LandlordDashboardHeader />
        <main className="container px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="mb-2">Loading property data...</p>
              <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            </div>
          </div>
        </main>
        <LandlordNavigation />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <LandlordDashboardHeader />
        <main className="container px-4 py-6">
          <div className="flex items-center mb-6">
            <Link href="/landlord/properties" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Edit Property</h1>
          </div>
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}.{" "}
            <Link href="/landlord/properties" className="underline">
              Return to properties
            </Link>
          </div>
        </main>
        <LandlordNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <LandlordDashboardHeader />

      <main className="container px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/landlord/properties" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Property</h1>
        </div>

        {property && (
          <PropertyUploadForm
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isEditing={true}
            propertyData={property}
            userRole="landlord"
          />
        )}
      </main>

      <LandlordNavigation />
    </div>
  )
}
