"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { login, type UserRole } from "../api/authentication/route"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<UserRole>("client")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handlePage = (role: string) => {
    // Redirect based on role
    switch (role) {
      case "client":
        router.push("/client/dashboard")
        break
      case "landlord":
        router.push("/landlord/dashboard")
        break
      case "agent":
        router.push("/agent/dashboard")
        break
      case "driver":
        router.push("/driver/dashboard")
        break
      case "cleaner":
        router.push("/cleaner/dashboard")
        break
      case "admin":
        router.push("/admin/dashboard")
        break
      default:
        router.push("/client/dashboard")
    }
  }

  function handleError(message: string) {
    setError(message)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      return
    }

    setIsLoading(true)
    try {
      await login(email, password, role, handlePage, handleError)
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen content-center bg-background relative curved-bottom">
      <div className="container max-w-md mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Hi there!</h1>
          <p className="text-muted-foreground">
            Your trusted and dependable partner in finding and renting the perfect apartment.
          </p>
        </div>

        {error && 
          <div className="p-2 my-4 text-center rounded-md bg-[#fff2f2]">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        }

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="rounded-xl bg-card py-6 px-4 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <Link href="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="rounded-xl bg-card py-6 px-4 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 bg-card top-1/2 -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="text-sm font-medium">
              Login as
            </label>
            <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
              <SelectTrigger className="rounded-xl py-6 px-4 w-full">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Client</SelectItem>
                <SelectItem value="landlord">Landlord</SelectItem>
                <SelectItem value="agent">Agent</SelectItem>
                <SelectItem value="driver">Driver</SelectItem>
                <SelectItem value="cleaner">Cleaner</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full bg-brand-yellow text-black rounded-xl py-6" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/signup" className="text-brand-yellow font-medium hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
