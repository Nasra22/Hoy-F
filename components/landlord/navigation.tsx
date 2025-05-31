"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Building, FileText, MessageSquare, Settings } from "lucide-react"

export function LandlordNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Dashboard",
      href: "/landlord/dashboard",
      icon: Home,
    },
    {
      label: "Properties",
      href: "/landlord/properties",
      icon: Building,
    },
    {
      label: "Requests",
      href: "/landlord/requests",
      icon: FileText,
    },
    {
      label: "Messages",
      href: "/landlord/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      href: "/landlord/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t z-10 md:hidden">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center w-full h-full text-xs ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
