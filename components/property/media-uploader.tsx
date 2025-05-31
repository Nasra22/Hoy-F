"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { ImageIcon, Video, FileText, X, Upload, Plus } from "lucide-react"

interface MediaUploaderProps {
  uploadedMedia: string[]
  setUploadedMedia: (media: string[]) => void
}

export function MediaUploader({ uploadedMedia, setUploadedMedia }: MediaUploaderProps) {
  const [activeTab, setActiveTab] = useState("photos")
  const [isDragging, setIsDragging] = useState(false)

  // In a real app, this would upload files to a storage service
  const handleFileUpload = () => {
    // Simulate adding a new placeholder image
    const newMedia = [
      ...uploadedMedia,
      `/placeholder.svg?height=600&width=800&text=New+Image+${uploadedMedia.length + 1}`,
    ]
    setUploadedMedia(newMedia)
  }

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...uploadedMedia]
    newMedia.splice(index, 1)
    setUploadedMedia(newMedia)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    // In a real app, this would handle the dropped files
    // For now, just simulate adding a new image
    handleFileUpload()
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium mb-4">Property Media</h3>

      <Tabs defaultValue="photos" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="photos">
            <ImageIcon className="h-4 w-4 mr-2" />
            Photos
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Video className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos">
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? "border-primary bg-primary/5" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-10 w-10 mx-auto text-gray-400" />
            <p className="mt-4 text-sm text-muted-foreground">Drag and drop your photos here, or click to browse</p>
            <Button onClick={handleFileUpload} className="mt-4">
              Upload Photos
            </Button>
          </div>

          {uploadedMedia.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Uploaded Photos</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedMedia.map((media, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-md overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={media || "/placeholder.svg"}
                        alt={`Property photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveMedia(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                    {index === 0 && (
                      <span className="absolute bottom-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded">
                        Cover Photo
                      </span>
                    )}
                  </div>
                ))}
                <Button
                  variant="outline"
                  className="aspect-square flex flex-col items-center justify-center border-2 border-dashed"
                  onClick={handleFileUpload}
                >
                  <Plus className="h-8 w-8 mb-2" />
                  <span className="text-xs">Add Photo</span>
                </Button>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="videos">
          <Card>
            <CardContent className="pt-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-4 text-sm text-muted-foreground">Drag and drop your videos here, or click to browse</p>
                <Button onClick={() => {}} className="mt-4">
                  Upload Videos
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardContent className="pt-6">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 mx-auto text-gray-400" />
                <p className="mt-4 text-sm text-muted-foreground">
                  Drag and drop your documents here, or click to browse
                </p>
                <Button onClick={() => {}} className="mt-4">
                  Upload Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
