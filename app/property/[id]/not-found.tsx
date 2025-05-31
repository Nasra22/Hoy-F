import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

export default function PropertyNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
      <p className="text-muted-foreground mb-8 text-center max-w-md">
        The property you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/client/dashboard" className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          Back to Explore
        </Link>
      </Button>
    </div>
  )
}
