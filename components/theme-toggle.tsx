"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        className={`rounded-l-md rounded-r-none ${
          theme === "light" ? "bg-yellow-400 text-gray-800 border-yellow-400" : ""
        }`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Light mode</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className={`rounded-r-md rounded-l-none ${
          theme === "dark" ? "bg-yellow-400 text-gray-800 border-yellow-400" : ""
        }`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-[1.2rem] w-[1.2rem]" />
        <span className="sr-only">Dark mode</span>
      </Button>
    </div>
  )
}
