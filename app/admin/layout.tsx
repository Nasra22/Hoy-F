import type React from "react"
import { AdminSidebar } from "@/components/admin/sidebar"
import { AdminMobileNav } from "@/components/admin/mobile-nav"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Navigation - Only visible on mobile */}
      <AdminMobileNav />

      <div className="flex h-[calc(100vh-3.5rem)] pt-14 md:pt-0">
        {/* Sidebar - Hidden on mobile, visible on desktop */}
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
