"use client"

import { act, useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"
import { getAllProperties, Property } from "@/lib/property-service"
import { propertyVerification, resetVerification } from "@/app/api/admin-service/route"

// Mock data for user verifications
const userVerifications = [
  {
    id: "1",
    userId: "2",
    userName: "Jane Smith",
    userEmail: "jane@example.com",
    userRole: "agent",
    documentType: "ID Card",
    documentUrl: "/placeholder.svg?height=200&width=300",
    submittedAt: "2023-06-15",
    status: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    userId: "3",
    userName: "Robert Johnson",
    userEmail: "robert@example.com",
    userRole: "landlord",
    documentType: "Business License",
    documentUrl: "/placeholder.svg?height=200&width=300",
    submittedAt: "2023-06-18",
    status: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    userId: "7",
    userName: "David Miller",
    userEmail: "david@example.com",
    userRole: "agent",
    documentType: "Real Estate License",
    documentUrl: "/placeholder.svg?height=200&width=300",
    submittedAt: "2023-06-20",
    status: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    userId: "8",
    userName: "Lisa Taylor",
    userEmail: "lisa@example.com",
    userRole: "landlord",
    documentType: "Proof of Ownership",
    documentUrl: "/placeholder.svg?height=200&width=300",
    submittedAt: "2023-06-22",
    status: "pending",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

export function VerificationsView({property}: Property[]) {
  const [activeTab, setActiveTab] = useState("users")
  const [userVerificationsList, setUserVerificationsList] = useState(userVerifications)
  const [propertyVerificationsList, setPropertyVerificationsList] = useState(property)

  useEffect(() => {
    setPropertyVerificationsList(property)
  })

  const handleUserVerification = (id: string, action: "approve" | "reject" | "request-info") => {
    setUserVerificationsList(
      userVerificationsList.map((verification) =>
        verification.id === id
          ? {
              ...verification,
              status: action === "approve" ? "approved" : action === "reject" ? "rejected" : "info-requested",
            }
          : verification,
      ),
    )
  }

  const handlePropertyVerification = (id: string, action: "approve" | "reject" | "request-info") => {
    console.log(id)
    console.log(action === "approve" ? "approved" : action === "reject" ? "rejected" : "info-requested")
    propertyVerification(id, action === "approve" ? "approved" : action === "reject" ? "rejected" : "info-requested")
  }

  const handleResetVerification = (Id: string) => {
    resetVerification(Id)
  }

  return (
    <Tabs defaultValue="users" value={activeTab} onValueChange={setActiveTab}>
      <div className="flex justify-between items-center mb-6">
        <TabsList>
          <TabsTrigger value="users" className="relative">
            User Verifications
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {userVerificationsList.filter((v) => v.status === "pending").length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="properties" className="relative">
            Property Verifications
            <Badge className="ml-2 bg-primary text-primary-foreground">
              {propertyVerificationsList.filter((v) => v.isVerified === "pending").length}
            </Badge>
          </TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="users" className="space-y-6">
        {userVerificationsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userVerificationsList.map((verification) => (
              <Card
                key={verification.id}
                className={
                  verification.status === "approved"
                    ? "border-green-500"
                    : verification.status === "rejected"
                      ? "border-red-500"
                      : verification.status === "info-requested"
                        ? "border-yellow-500"
                        : ""
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={verification.avatarUrl || "/placeholder.svg"} alt={verification.userName} />
                        <AvatarFallback>{verification.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base">{verification.userName}</CardTitle>
                        <CardDescription className="text-xs">{verification.userEmail}</CardDescription>
                      </div>
                    </div>
                    <Badge className="capitalize">{verification.userRole}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Document Type:</span>
                      <span className="font-medium">{verification.documentType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium">{verification.submittedAt}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium flex items-center">
                        {verification.status === "pending" && (
                          <>
                            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                            Pending
                          </>
                        )}
                        {verification.status === "approved" && (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Approved
                          </>
                        )}
                        {verification.status === "rejected" && (
                          <>
                            <XCircle className="h-4 w-4 mr-1 text-red-500" />
                            Rejected
                          </>
                        )}
                        {verification.status === "info-requested" && (
                          <>
                            <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                            Info Requested
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <img
                      src={verification.documentUrl || "/placeholder.svg"}
                      alt="Verification Document"
                      className="w-full h-32 object-cover rounded-md"
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-3">
                  {verification.status === "pending" && (
                    <div className="flex gap-2 w-full">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handleUserVerification(verification.id, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleUserVerification(verification.id, "request-info")}
                      >
                        Request Info
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handleUserVerification(verification.id, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {verification.status !== "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() =>
                        setUserVerificationsList(
                          userVerificationsList.map((v) =>
                            v.id === verification.id ? { ...v, status: "pending" } : v,
                          ),
                        )
                      }
                    >
                      Reset Status
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No pending user verifications.</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="properties" className="space-y-6">
        {propertyVerificationsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyVerificationsList.map((verification) => (
              <Card
                key={verification.id}
                className={
                  verification.isVerified === "approved"
                    ? "border-green-500"
                    : verification.isVerified === "rejected"
                      ? "border-red-500"
                      : verification.isVerified === "info-requested"
                        ? "border-yellow-500"
                        : ""
                }
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{verification.title}</CardTitle>
                      <CardDescription className="text-xs">{verification.address}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="font-medium">
                        {verification.owner.name}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Document Type:</span>
                      <span className="font-medium">{verification.documents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium">{ new Date(verification.timeStamp.seconds * 1000).toLocaleString() }</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Status:</span>
                      <span className="font-medium flex items-center">
                        {verification.isVerified === "pending" && (
                          <>
                            <Clock className="h-4 w-4 mr-1 text-yellow-500" />
                            Pending
                          </>
                        )}
                        {verification.isVerified === "approved" && (
                          <>
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Approved
                          </>
                        )}
                        {verification.isVerified === "rejected" && (
                          <>
                            <XCircle className="h-4 w-4 mr-1 text-red-500" />
                            Rejected
                          </>
                        )}
                        {verification.isVerified === "request-info" && (
                          <>
                            <AlertCircle className="h-4 w-4 mr-1 text-yellow-500" />
                            Info Requested
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                  {verification.media.map((media) => (
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt="Property"
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <img
                        src={media.url || "/placeholder.svg"}
                        alt="Verification Document"
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-3">
                  {verification.isVerified === "pending" && (
                    <div className="flex gap-2 w-full">
                      <Button
                        size="sm"
                        className="flex-1"
                        onClick={() => handlePropertyVerification(verification.id, "approve")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => handlePropertyVerification(verification.id, "request-info")}
                      >
                        Request Info
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="flex-1"
                        onClick={() => handlePropertyVerification(verification.id, "reject")}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {verification.isVerified !== "pending" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full"
                      onClick={() => handleResetVerification(verification.id)}
                    >
                      Reset Status
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-muted-foreground">No pending property verifications.</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}
