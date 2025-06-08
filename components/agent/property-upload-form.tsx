"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MediaUploader } from "@/components/agent/media-uploader"
import { PropertyFeatures } from "@/components/agent/property-features"
import { PropertyLocation } from "@/components/agent/property-location-input"
import type { Property, PropertyMedia } from "@/lib/property-service"
import { User } from "@/lib/user-context"

// Form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.string().min(1, "Price is required"),
  type: z.string().min(1, "Property type is required"),
  status: z.string().min(1, "Status is required"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  size: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  isPublished: z.boolean().default(false),
})

type PropertyUploadFormProps = {
  onSubmit: (data: z.infer<typeof formSchema> & { media: string[]; user: User }) => void
  user: User
  isSubmitting: boolean
  isEditing?: boolean
  propertyData?: Property & {
    amenities?: string[]
    address?: string
    city?: string
    state?: string
    isPublished?: boolean
    media?: PropertyMedia[]
  }
}

export function PropertyUploadForm({
  user,
  onSubmit,
  isSubmitting,
  isEditing = false,
  propertyData,
}: PropertyUploadFormProps) {
  const [uploadedMedia, setUploadedMedia] = useState<PropertyMedia[]>(propertyData?.media || [])

  // Set default values based on whether we're editing or creating
  const defaultValues =
    isEditing && propertyData
      ? {
          title: propertyData.title || "",
          description: propertyData.description || "",
          price: propertyData.price?.toString() || "",
          type: propertyData.type || "",
          status: propertyData.status || "active",
          bedrooms: propertyData.bedrooms?.toString() || "",
          bathrooms: propertyData.bathrooms?.toString() || "",
          size: propertyData.size?.toString() || "",
          amenities: propertyData.amenities || [],
          address: propertyData.address || "",
          city: propertyData.city || "",
          state: propertyData.state || "",
          isPublished: propertyData.isPublished !== undefined ? propertyData.isPublished : true,
        }
      : {
          title: "",
          description: "",
          price: "",
          type: "",
          status: "active",
          bedrooms: "",
          bathrooms: "",
          owner: user,
          size: "",
          amenities: [],
          address: "",
          city: "",
          state: "",
          isPublished: false,
        }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Update form when propertyData changes (for editing)
  useEffect(() => {
    if (isEditing && propertyData) {
      form.reset({
        title: propertyData.title || "",
        description: propertyData.description || "",
        price: propertyData.price?.toString() || "",
        type: propertyData.type || "",
        status: propertyData.status || "active",
        bedrooms: propertyData.bedrooms?.toString() || "",
        bathrooms: propertyData.bathrooms?.toString() || "",
        size: propertyData.size?.toString() || "",
        amenities: propertyData.amenities || [],
        address: propertyData.address || "",
        city: propertyData.city || "",
        state: propertyData.state || "",
        isPublished: propertyData.isPublished !== undefined ? propertyData.isPublished : true,
      })

      setUploadedMedia(propertyData.media || [])
    }
  }, [isEditing, propertyData, form])

  const handleFormSubmit = (values: z.infer<typeof formSchema>) => {
    // Combine form data with uploaded media and property ID if editing
    const formData = {
      ...values,
      owner: user,
      media: uploadedMedia,
      ...(isEditing && propertyData ? { id: propertyData.id } : {}),
    }
    onSubmit(formData)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-8">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="details">Property Details</TabsTrigger>
            <TabsTrigger value="amenities">Features & Amenities</TabsTrigger>
            <TabsTrigger value="location">Location</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Luxury Apartment in Downtown" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="250000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="townhouse">Townhouse</SelectItem>
                            <SelectItem value="land">Land</SelectItem>
                            <SelectItem value="commercial">Commercial</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="active">For Sale</SelectItem>
                            <SelectItem value="rent">For Rent</SelectItem>
                            <SelectItem value="sold">Sold</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Publish immediately</FormLabel>
                          <FormDescription>If unchecked, this will be saved as a draft.</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="3" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="size"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Area (sq ft)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="1500" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-6">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the property in detail..."
                            className="min-h-[200px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="amenities">
            <Card>
              <CardContent className="pt-6">
                <PropertyFeatures control={form.control} name="amenities" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="location">
            <Card>
              <CardContent className="pt-6">
                <PropertyLocation control={form.control} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="media">
            <Card>
              <CardContent className="pt-6">
                <MediaUploader uploadedMedia={uploadedMedia} setUploadedMedia={setUploadedMedia} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" type="button">
            Save as Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : isEditing ? "Update Property" : "Publish Property"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
