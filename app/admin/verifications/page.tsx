"use client"

import { VerificationsView } from "@/components/admin/verifications-view"
import { PageHeader } from "@/components/page-header"
import { getAllProperties, Property } from "@/lib/property-service"
import { useEffect, useState } from "react"

// Mock data for property verifications
const propertyVerifications: Property[] = [];

export default function VerificationsPage() {
  const [propertyVerificationsList, setPropertyVerificationsList] = useState(propertyVerifications)

  useEffect(() => {
    const loadData = async () =>{
      try {
        const propertiesData = await getAllProperties()
        setPropertyVerificationsList(propertiesData)
      } catch (error) {
        console.error("Error loading properties:", error)
      }
    }

    loadData()
  }, [])

  console.log(propertyVerificationsList)

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader heading="Verifications" text="Review and approve pending verification requests" />
      <div className="flex-1 p-4 md:p-6">
          <VerificationsView property={propertyVerificationsList} />
      </div>
    </div>
  )
}
