"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Building, Home, Users, ShieldCheck, MessageSquare, DollarSign, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Same navigation items as in the sidebar
const navItems = [
  {
    name: "Dashboard",
    href: "/admin/dashboard",
    icon: Home,
  },
  {
    name: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    name: "Properties",
    href: "/admin/properties",
    icon: Building,
  },
  {
    name: "Verifications",
    href: "/admin/verifications",
    icon: ShieldCheck,
  },
  {
    name: "Payments",
    href: "/admin/payments",
    icon: DollarSign,
  },
  {
    name: "Messages",
    href: "/admin/messages",
    icon: MessageSquare,
  },
]

export function AdminMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-30 flex h-14 items-center border-b bg-background px-4 md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => setOpen(true)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex h-14 items-center border-b px-4">
            <Link href="/admin/dashboard" className="flex items-center" onClick={() => setOpen(false)}>
              <span className="text-lg font-bold">HoyFinder Admin</span>
            </Link>
          </div>
          <nav className="space-y-1 px-2 py-4">
            {navItems.map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>

      <div className="flex-1 flex justify-center">
        <span className="text-lg font-bold">HoyFinder Admin</span>
      </div>
    </div>
  )
}
