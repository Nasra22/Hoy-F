"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Building, Calendar, MessageSquare, Settings } from "lucide-react"

export function AgentNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      label: "Dashboard",
      href: "/agent/dashboard",
      icon: Home,
    },
    {
      label: "Clients",
      href: "/agent/clients",
      icon: Users,
    },
    {
      label: "Properties",
      href: "/agent/properties",
      icon: Building,
    },
    {
      label: "Messages",
      href: "/agent/messages",
      icon: MessageSquare,
    },
    {
      label: "Settings",
      href: "/agent/settings",
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
