"use client"

import { Home, Calendar, Truck, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    name: "Dashboard",
    href: "/driver/dashboard",
    icon: Home,
  },
  {
    name: "Jobs",
    href: "/driver/jobs",
    icon: Truck,
  },
  {
    name: "Schedule",
    href: "/driver/schedule",
    icon: Calendar,
  },
  {
    name: "Messages",
    href: "/driver/messages",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    href: "/driver/profile",
    icon: User,
  },
]

export function DriverNavigation() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background shadow-lg z-10">
      <nav className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-1 flex-col items-center py-3 ${isActive ? "text-brand-dark" : "text-brand-muted"}`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
