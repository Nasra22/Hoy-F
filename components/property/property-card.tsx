"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Bed, Bath, Square, MapPin, MoreVertical } from "lucide-react"
import type { Property } from "@/lib/property-service"

interface PropertyCardAction {
  label: string
  href?: string
  onClick?: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

interface PropertyCardProps {
  property: Property
  actions?: PropertyCardAction[]
  showViewButton?: boolean
}

export function PropertyCard({ property, actions, showViewButton = true }: PropertyCardProps) {
  // Format price based on whether it's for sale or rent
  const formatPrice = () => {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    })

    if (property.priceUnit === "month") {
      return `${formatter.format(property.price)}/month`
    }

    return formatter.format(property.price)
  }

  // Get status badge color
  const getStatusColor = () => {
    switch (property.status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "sold":
        return "bg-red-100 text-red-800"
      case "rented":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Get status label
  const getStatusLabel = () => {
    switch (property.status) {
      case "active":
        return property.priceUnit === "month" ? "For Rent" : "For Sale"
      case "pending":
        return "Pending"
      case "sold":
        return "Sold"
      case "rented":
        return "Rented"
      default:
        return property.status
    }
  }

  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <Link href={`/property/${property.id}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={property.imageUrl || "/placeholder.svg"}
            alt={property.title}
            className="w-full h-48 object-cover"
          />
        </Link>

        <Badge className={`absolute top-2 right-2 ${getStatusColor()}`}>{getStatusLabel()}</Badge>

        {actions && actions.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute top-2 left-2 bg-white/80 hover:bg-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {actions.map((action, index) =>
                action.href ? (
                  <Link href={action.href} key={index}>
                    <DropdownMenuItem className="cursor-pointer">{action.label}</DropdownMenuItem>
                  </Link>
                ) : (
                  <DropdownMenuItem
                    key={index}
                    onClick={action.onClick}
                    className={`cursor-pointer ${action.variant === "destructive" ? "text-red-600" : ""}`}
                  >
                    {action.label}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="font-semibold text-lg truncate">{property.title}</h3>
          <p className="text-muted-foreground text-sm flex items-center mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {property.location}
          </p>
        </div>

        <div className="text-xl font-bold mb-4">{formatPrice()}</div>

        <div className="flex justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>
              {property.size} {property.sizeUnit}
            </span>
          </div>
        </div>
      </CardContent>

      {showViewButton && (
        <CardFooter className="p-4 pt-0">
          <Link href={`/property/${property.id}`} className="w-full">
            <Button variant="outline" className="w-full">
              View Property
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
