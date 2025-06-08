"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import app from "./firebase-service"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

export type UserRole = "client" | "landlord" | "agent" | "driver" | "cleaner" | "admin"

export interface User {
  id: string
  name: string | ""
  email: string | ""
  role: UserRole
  avatar?: string | ""
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role: UserRole) => Promise<void>
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>
  logout: () => void
}

const auth = getAuth(app)
const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing user session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("hoyfinder-user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function - in a real app, this would call an API
  const login = async (email: string, password: string, role: UserRole) => {
    setIsLoading(true)
      // Simulate API call
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
              const user = userCredential.user;

              // Create mock user
              const newUser: User = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                role,
                avatar: user.photoURL,
              }

              console.log("Success")

              // Store user in local storage
              localStorage.setItem("hoyfinder-user", JSON.stringify(newUser))
              setUser(newUser)
              return true
          })
          .catch((error) => {
              const errorCode = error.code
              const errorMessage = error.message
              console.error("Login failed:", errorMessage)
              console.log("Failed")
              return false
          }).finally (() => {
              setIsLoading(false)
          })
  }

  // Mock signup function - in a real app, this would call an API
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    setIsLoading(true)
      // Simulate API call
      createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const user = userCredential.user

        // Create mock user
        const newUser: User = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          role,
          avatar: user.photoURL,
        }

        console.log("Finished")

        // Store user in local storage
        localStorage.setItem("hoyfinder-user", JSON.stringify(newUser))
        setUser(newUser)
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.error("Login failed:", error.message)
        throw new Error(errorMessage)
      }).finally (() => {
        setIsLoading(false)
    })
  }

  const logout = () => {
    localStorage.removeItem("hoyfinder-user")
    setUser(null)
  }

  return <UserContext.Provider value={{ user, isLoading, login, signup, logout }}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
