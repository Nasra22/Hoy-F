"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { LandlordDashboardHeader } from "@/components/landlord/dashboard-header"
import { LandlordNavigation } from "@/components/landlord/navigation"
import { PropertyUploadForm } from "@/components/property/property-upload-form"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function PropertyUploadPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in or not a landlord
  if (!isLoading && (!user || user.role !== "landlord")) {
    router.push("/login")
    return null
  }

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real app, this would send data to the server
    console.log("Property data to submit:", formData)

    setIsSubmitting(false)

    // Show success message and redirect
    alert("Property listing created successfully!")
    router.push("/landlord/properties")
  }

  if (isLoading) {
    return <div>Loading...</div>
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
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>

        <PropertyUploadForm onSubmit={handleSubmit} isSubmitting={isSubmitting} userRole="landlord" />
      </main>

      <LandlordNavigation />
    </div>
  )
}
