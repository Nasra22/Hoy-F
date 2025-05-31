"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Calendar, Clock, DollarSign, Home, Ruler } from "lucide-react"
import type { CleaningJob } from "@/lib/cleaner-service"

interface CleaningJobCardProps {
  job: CleaningJob
  onAccept?: (id: string) => void
  onDecline?: (id: string) => void
}

export function CleaningJobCard({ job, onAccept, onDecline }: CleaningJobCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "apartment":
        return <Home className="h-4 w-4 mr-2 text-muted-foreground" />
      case "house":
        return <Home className="h-4 w-4 mr-2 text-muted-foreground" />
      case "office":
        return <Ruler className="h-4 w-4 mr-2 text-muted-foreground" />
      default:
        return <Home className="h-4 w-4 mr-2 text-muted-foreground" />
    }
  }

  return (
    <Card className="overflow-hidden rounded-3xl">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-lg">{job.title}</h3>
          <Badge className={`${getStatusColor(job.status)} rounded-full`}>
            {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{job.date}</span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{job.time}</span>
          </div>
          <div className="flex items-center text-sm">
            {getPropertyTypeIcon(job.propertyType)}
            <span>
              {job.propertyType.charAt(0).toUpperCase() + job.propertyType.slice(1)} - {job.size}
            </span>
          </div>
          <div className="flex items-center text-sm font-semibold">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>${job.price.toFixed(2)}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>

        {job.status === "pending" && (
          <div className="flex gap-3">
            <Button onClick={() => onAccept?.(job.id)} className="flex-1 bg-brand-dark text-white rounded-full">
              Accept
            </Button>
            <Button onClick={() => onDecline?.(job.id)} variant="outline" className="flex-1 rounded-full">
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
