import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { SocketProvider } from "@/components/chat/socket-provider"
import { UserProvider } from "@/lib/user-context"
import firebaseApp from "../firebase.js"

const inter = Inter({ subsets: ["latin"] })
const app = firebaseApp

export const metadata: Metadata = {
  title: "HoyFinder - Find Your Perfect Space",
  description: "Discover apartments, real estate, land, and household services all in one place",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <UserProvider>
            {children}
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
