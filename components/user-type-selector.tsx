"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, User, UserCheck, Truck, Brush, ShieldCheck } from "lucide-react"
import Link from "next/link"

const userTypes = [
  {
    id: "client",
    name: "Client",
    icon: User,
    description: "Looking for properties or services",
    path: "/signup",
  },
  {
    id: "landlord",
    name: "Landlord",
    icon: Home,
    description: "List your properties for rent or sale",
    path: "/signup",
  },
  {
    id: "agent",
    name: "Agent",
    icon: UserCheck,
    description: "Help clients find their perfect property",
    path: "/signup",
  },
  {
    id: "truck-driver",
    name: "Truck Driver",
    icon: Truck,
    description: "Offer moving and transportation services",
    path: "/signup",
  },
  {
    id: "cleaner",
    name: "Cleaner",
    icon: Brush,
    description: "Provide cleaning services",
    path: "/signup",
  },
  {
    id: "admin",
    name: "Admin",
    icon: ShieldCheck,
    description: "Platform administration",
    path: "/signup",
  },
]

export function UserTypeSelector() {
  const [selectedType, setSelectedType] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {userTypes.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all ${selectedType === type.id ? "ring-2 ring-primary" : ""}`}
            onClick={() => setSelectedType(type.id)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <type.icon className="h-10 w-10 mb-2" />
              <h3 className="font-medium">{type.name}</h3>
              <p className="text-xs text-muted-foreground">{type.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <div className="flex justify-center">
          <Link href={userTypes.find((t) => t.id === selectedType)?.path || "#"}>
            <Button size="lg">Create account as {userTypes.find((t) => t.id === selectedType)?.name}</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
