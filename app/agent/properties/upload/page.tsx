"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { AgentDashboardHeader } from "@/components/agent/dashboard-header"
import { AgentNavigation } from "@/components/agent/navigation"
import { PropertyUploadForm } from "@/components/agent/property-upload-form"
import { useUser } from "@/lib/user-context"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { addProperty } from "@/app/api/property-service/route"
import { Property } from "@/lib/property-service"

export default function PropertyUploadPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not logged in or not an agent
  if (!isLoading && (!user || user.role !== "agent")) {
    router.push("/login")
    return null
  }

  const handleSubmit = async (formData: Property) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    await addProperty(formData)

    // In a real app, this would send data to the server
    console.log("Property data to submit:", formData)

    setIsSubmitting(false)

    // Show success message and redirect
    alert("Property listing created successfully!")
    router.push("/agent/properties")
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AgentDashboardHeader />

      <main className="container px-4 py-6">
        <div className="flex items-center mb-6">
          <Link href="/agent/properties" className="mr-4">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>

        <PropertyUploadForm user={user} onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </main>

      <AgentNavigation />
    </div>
  )
}
