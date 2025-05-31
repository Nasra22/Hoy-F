"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, BedDouble, Bath, Ruler, Edit, Eye, Trash } from "lucide-react"
import Link from "next/link"
import type { Property } from "@/lib/agent-service"

interface PropertyCardProps {
  property: Property
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function PropertyCard({ property, onEdit, onDelete }: PropertyCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-blue-100 text-blue-800"
      case "rented":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatPrice = (price: number, unit: string) => {
    if (unit === "month") {
      return `$${price}/month`
    } else {
      return `$${price.toLocaleString()}`
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(property.id)
    }
  }

  return (
    <Card className="overflow-hidden rounded-3xl">
      <div className="relative h-48">
        <Image src={property.imageUrl || "/placeholder.svg"} alt={property.title} fill className="object-cover" />
        <Badge className={`absolute top-2 right-2 ${getStatusColor(property.status)} rounded-full`}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{property.title}</h3>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location}
        </div>

        <div className="flex justify-between mb-3">
          <div className="flex items-center text-sm">
            <BedDouble className="h-4 w-4 mr-1" />
            <span className="mr-2">{property.bedrooms}</span>
            <Bath className="h-4 w-4 mr-1" />
            <span className="mr-2">{property.bathrooms}</span>
            <Ruler className="h-4 w-4 mr-1" />
            <span>
              {property.size} {property.sizeUnit}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="font-bold text-lg">{formatPrice(property.price, property.priceUnit)}</div>
          <Badge variant="outline" className="rounded-full">
            {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Link href={`/agent/properties/${property.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center rounded-full">
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </Link>
          <Link href={`/agent/properties/edit/${property.id}`} className="flex-1">
            <Button
              variant="outline"
              size="sm"
              className="w-full flex items-center justify-center rounded-full"
              onClick={handleEdit}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
          </Link>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center justify-center text-destructive rounded-full"
            onClick={() => onDelete?.(property.id)}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
