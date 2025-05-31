"use client"

import { Building, Home, Map, Wrench } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export type PropertyCategory = "all" | "apartment" | "house" | "land" | "services"

interface PropertyTabsProps {
  defaultValue: PropertyCategory
  onTabChange: (value: PropertyCategory) => void
}

export function PropertyTabs({ defaultValue = "all", onTabChange}: PropertyTabsProps,) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="w-full"
      onValueChange={(value) => onTabChange(value as PropertyCategory) }
    >
      <TabsList className="grid w-full grid-cols-5 rounded-full bg-card p-1">
        <TabsTrigger
          value="all"
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="apartment"
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
        >
          <Building className="h-4 w-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Apartment</span>
        </TabsTrigger>
        <TabsTrigger
          value="house"
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
        >
          <Home className="h-4 w-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">House</span>
        </TabsTrigger>
        <TabsTrigger
          value="land"
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
        >
          <Map className="h-4 w-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Land</span>
        </TabsTrigger>
        <TabsTrigger
          value="services"
          className="rounded-full data-[state=active]:bg-white data-[state=active]:text-brand-dark data-[state=active]:shadow"
        >
          <Wrench className="h-4 w-4 mr-1 md:mr-2" />
          <span className="hidden md:inline">Services</span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
