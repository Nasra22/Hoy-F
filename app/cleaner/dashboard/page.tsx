"use client"

import { useState, useEffect } from "react"
import { CleanerDashboardHeader } from "@/components/cleaner/dashboard-header"
import { CleanerNavigation } from "@/components/cleaner/navigation"
import { CleaningJobCard } from "@/components/cleaner/cleaning-job-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllCleaningJobs, acceptCleaningJob, declineCleaningJob, type CleaningJob } from "@/lib/cleaner-service"
import { useUser } from "@/lib/user-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brush, DollarSign, Clock, CheckCircle } from "lucide-react"

export default function CleanerDashboard() {
  const { user, isLoading } = useUser()
  const router = useRouter()
  const [jobs, setJobs] = useState<CleaningJob[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [isJobsLoading, setIsJobsLoading] = useState(true)

  useEffect(() => {
    // Redirect if not logged in or not a cleaner
    if (!isLoading && (!user || user.role !== "cleaner")) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  useEffect(() => {
    const loadJobs = async () => {
      setIsJobsLoading(true)
      try {
        const data = await getAllCleaningJobs()
        setJobs(data)
      } catch (error) {
        console.error("Error loading cleaning jobs:", error)
      } finally {
        setIsJobsLoading(false)
      }
    }

    loadJobs()
  }, [])

  const handleAcceptJob = async (jobId: string) => {
    try {
      await acceptCleaningJob(jobId)
      // Update local state
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "accepted" } : job)))
    } catch (error) {
      console.error("Error accepting cleaning job:", error)
    }
  }

  const handleDeclineJob = async (jobId: string) => {
    try {
      await declineCleaningJob(jobId)
      // Update local state
      setJobs(jobs.map((job) => (job.id === jobId ? { ...job, status: "cancelled" } : job)))
    } catch (error) {
      console.error("Error declining cleaning job:", error)
    }
  }

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === "all") return true
    return job.status === activeTab
  })

  const pendingJobs = jobs.filter((job) => job.status === "pending").length
  const acceptedJobs = jobs.filter((job) => job.status === "accepted").length
  const completedJobs = jobs.filter((job) => job.status === "completed").length
  const totalEarnings = jobs.filter((job) => job.status === "completed").reduce((sum, job) => sum + job.price, 0)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!user || user.role !== "cleaner") {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <CleanerDashboardHeader />

      <main className="container px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Cleaner Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Jobs</CardTitle>
              <Brush className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingJobs}</div>
              <p className="text-xs text-muted-foreground">Waiting for your response</p>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{acceptedJobs}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Jobs</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedJobs}</div>
              <p className="text-xs text-muted-foreground">Successfully completed</p>
            </CardContent>
          </Card>

          <Card className="bg-card rounded-3xl shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalEarnings.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">From completed jobs</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 rounded-full bg-card p-1">
              <TabsTrigger
                value="all"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
              >
                All Jobs
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="accepted"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
              >
                Completed
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              {isJobsLoading ? (
                <div className="text-center py-12">Loading jobs...</div>
              ) : filteredJobs.length === 0 ? (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No jobs found</h3>
                  <p className="text-muted-foreground">No jobs match the selected filter</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredJobs.map((job) => (
                    <CleaningJobCard key={job.id} job={job} onAccept={handleAcceptJob} onDecline={handleDeclineJob} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <CleanerNavigation />
    </div>
  )
}
