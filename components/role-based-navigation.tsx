"use client"

import { useUser } from "@/lib/user-context"
import { ClientNavigation } from "@/components/client/navigation"
import { LandlordNavigation } from "@/components/landlord/navigation"

export function RoleBasedNavigation() {
  const { user } = useUser()

  if (!user) return null

  switch (user.role) {
    case "client":
      return <ClientNavigation />
    case "landlord":
      return <LandlordNavigation />
    case "agent":
\
Let's update the login and signup pages to include role selection:
