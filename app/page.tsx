
import { Button } from "@/components/ui/button"
import { UserTypeSelector } from "@/components/user-type-selector"
import { PropertyHighlights } from "@/components/property-highlights"
import { NotificationFeed } from "@/components/notification-feed"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="container px-4 py-3">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">HoyFinder</h1>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </header>

        <div className="h-[80vh] content-center">
          <h2 className="text-3xl font-bold text-center mb-6">Find Your Perfect Space</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover apartments, real estate, land, and connect with service providers all in one platform.
          </p>
          <UserTypeSelector />
        </div>
      </div>
    </div>
  )
}

