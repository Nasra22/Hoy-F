"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AgentDashboardHeader } from "@/components/agent/dashboard-header"
import { AgentNavigation } from "@/components/agent/navigation"
import { PropertyUploadForm } from "@/components/agent/property-upload-form"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { getPropertyById } from "@/lib/agent-service"

export default function PropertyEditPage({ params }: { params: { id: string } }) {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [property, setProperty] = useState<any>(null)
  const [isLoadingProperty, setIsLoadingProperty] = useState(true)

  useEffect(() => {
    // Redirect if not logged in or not an agent
    if (!isLoading && (!user || user.role !== "agent")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const loadProperty = async () => {
      if (!params.id) return

      try {
        setIsLoadingProperty(true)
        const propertyData = await getPropertyById(params.id)

        if (!propertyData) {
          // Property not found
          router.push("/agent/properties")
          return
        }

        setProperty(propertyData)
      } catch (error) {
        console.error("Error loading property:", error)
        alert("Failed to load property details")
      } finally {
        setIsLoadingProperty(false)
      }
    }

    loadProperty()
  }, [params.id, router])

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would update the property in the database
    console.log("Property data to update:", formData)

    setIsSubmitting(false)

    // Show success message and redirect
    alert("Property listing updated successfully!")
    router.push("/agent/properties")
  }

  if (isLoading || isLoadingProperty) {
    return (
      <div className="min-h-screen bg-background">
        <AgentDashboardHeader />
        <main className="container px-4 py-6">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-t-brand border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
              <p className="mt-4 text-lg">Loading property details...</p>
            </div>
          </div>
        </main>
        <AgentNavigation />
      </div>
    )
  }

  if (!user || user.role !== "agent") {
    return null // Will redirect in useEffect
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-background">
        <AgentDashboardHeader />
        <main className="container px-4 py-6">
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <p className="text-xl">Property not found</p>
              <Link href="/agent/properties" className="mt-4 inline-block">
                <Button>Back to Properties</Button>
              </Link>
            </div>
          </div>
        </main>
        <AgentNavigation />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-card pb-20">
      <AgentDashboardHeader />

      <main className="container px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/agent/properties" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Edit Property</h1>
        </div>

        <PropertyUploadForm
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          isEditing={true}
          propertyData={property}
        />
      </main>

      <AgentNavigation />
    </div>
  )
}
