"use client"

import { useState, useEffect } from "react"
import { AgentDashboardHeader } from "@/components/agent/dashboard-header"
import { AgentNavigation } from "@/components/agent/navigation"
import { PropertyCard } from "@/components/agent/property-card"
import { ClientCard } from "@/components/agent/client-card"
import { AppointmentCard } from "@/components/agent/appointment-card"
import {
  getAllProperties,
  getAllClients,
  type Client,
} from "@/lib/agent-service"
import { type Property } from "@/lib/property-service"
import { useUser } from "@/lib/user-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Calendar, DollarSign, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"


export default function AgentDashboard() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [properties, setProperties] = useState<Property[]>([])
  const [clients, setClients] = useState<Client[]>([])
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in or not an agent
    if (!isLoading && (!user || user.role !== "agent")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const loadData = async () => {
      setIsDataLoading(true)
      try {
        const [propertiesData, clientsData] = await Promise.all([
          getAllProperties(),
          getAllClients(),
        ])
        setProperties(propertiesData)
        setClients(clientsData)
      } catch (error) {
        console.error("Error loading data:", error)
      } finally {
        setIsDataLoading(false)
      }
    }

    loadData()
  }, [])

  const handleMessageClient = (clientId: string) => {
    // In a real app, this would open a chat with the client
    alert(`Opening chat with client ${clientId}`)
  }

  const handleScheduleAppointment = (clientId: string) => {
    // In a real app, this would navigate to an appointment scheduling page
    router.push(`/agent/appointments/schedule?clientId=${clientId}`)
  }

  const activeProperties = properties.filter((property) => property.status === "active").length
  const activeClients = clients.filter((client) => client.status === "active").length
  const totalSales = properties
    .filter((property) => property.status === "sold")
    .reduce((sum, property) => sum + property.price, 0)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "agent") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <AgentDashboardHeader />

      <main className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Agent Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Properties</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeProperties}</div>
              <p className="text-xs text-muted-foreground">Available for sale/rent</p>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeClients}</div>
              <p className="text-xs text-muted-foreground">Looking for properties</p>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalSales.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">From sold properties</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Properties</h2>
              <div className="flex gap-2">
                <Link href="/agent/properties/upload">
                  <Button size="sm" className="rounded-full">
                    <Plus className="h-4 w-4 mr-1" /> Add Property
                  </Button>
                </Link>
                <Link href="/agent/properties">
                  <Button variant="outline" size="sm" className="rounded-full">
                    View All
                  </Button>
                </Link>
              </div>
            </div>

            {isDataLoading ? (
              <div className="text-center py-12">Loading properties...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.slice(0, 3).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Active Clients</h2>
              <Link href="/agent/clients">
                <Button variant="outline" size="sm" className="rounded-full">
                  View All
                </Button>
              </Link>
            </div>

            {isDataLoading ? (
              <div className="text-center py-12">Loading clients...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients
                  .filter((client) => client.status === "active")
                  .slice(0, 3)
                  .map((client) => (
                    <ClientCard
                      key={client.id}
                      client={client}
                      onMessage={handleMessageClient}
                      onSchedule={handleScheduleAppointment}
                    />
                  ))}
              </div>
            )}
          </section>

          <section>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
              <Link href="/agent/appointments">
                <Button variant="outline" size="sm" className="rounded-full">
                  View All
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <AgentNavigation />
    </div>
  )
}
