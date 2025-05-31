"use client"

import { Home, Search, Heart, MessageSquare, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  {
    name: "Home",
    href: "/client/dashboard",
    icon: Home,
  },
  {
    name: "Explore",
    href: "/client/explore",
    icon: Search,
  },
  {
    name: "Saved",
    href: "/client/saved",
    icon: Heart,
  },
  {
    name: "Messages",
    href: "/client/messages",
    icon: MessageSquare,
  },
  {
    name: "Profile",
    href: "/client/profile",
    icon: User,
  },
]

export function ClientNavigation() {
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
