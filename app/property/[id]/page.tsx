import { notFound } from "next/navigation"
import { getPropertyById } from "@/lib/property-service"
import { PropertyGallery } from "@/components/property/property-gallery"
import { PropertyDetail } from "@/components/property/property-detail"
import { PropertyAmenities } from "@/components/property/property-amenities"
import { PropertyLocation } from "@/components/property/property-location"
import { PropertyOwner } from "@/components/property/property-owner"
import { SimilarProperties } from "@/components/property/similar-properties"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function PropertyPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container px-4 py-6">
        <div className="mb-6">
          <Link href="/client/dashboard" className="inline-flex items-center text-brand-dark">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to listings
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <PropertyGallery images={property.images} />
            <PropertyDetail property={property} />
            <PropertyAmenities amenities={property.amenities} />
            <PropertyLocation location={property.location} coordinates={property.coordinates} />
          </div>

          <div className="space-y-8">
            <div className="bg-card rounded-3xl p-6 shadow">
              <div className="text-2xl font-bold mb-4">
                ${property.price}{" "}
                <span className="text-sm font-normal text-muted-foreground">/ {property.priceUnit}</span>
              </div>

              <Button className="w-full bg-brand-yellow text-black rounded-full py-6 mb-4">Book Now</Button>

              <Button variant="outline" className="w-full rounded-full py-6">
                Contact Owner
              </Button>
            </div>

            <PropertyOwner owner={property.owner} />
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <SimilarProperties currentPropertyId={property.id} />
        </div>
      </div>
    </div>
  )
}
