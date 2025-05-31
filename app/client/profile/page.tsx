"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  Bell,
  ChevronRight,
  Globe,
  Home,
  LogOut,
  Moon,
  Phone,
  Search,
  Shield,
  Smartphone,
  Sun,
  Trash2,
  Upload,
  User,
  Mail,
  UserCircle,
  Facebook,
  Instagram,
  Twitter,
  Camera,
  CheckCircle2,
  XCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"
import ClientDashboard from "../dashboard/page"
import { ClientNavigation } from "@/components/client/navigation"

export default function ProfilePage() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [language, setLanguage] = useState("English")
  const [verificationFiles, setVerificationFiles] = useState<string[]>([])
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false)

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  })
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: true,
    push: true,
    marketing: false,
  })
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public",
    showEmail: false,
    showPhone: false,
  })
  const [connectedAccounts, setConnectedAccounts] = useState({
    facebook: false,
    instagram: true,
    twitter: false,
  })

  // Ensure theme toggle only renders client-side to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string)
        }
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // In a real app, you would upload the file to a server
      // For this demo, we'll just add the file name to our list
      setVerificationFiles([...verificationFiles, e.target.files[0].name])
    }
  }

  const handleDeleteAccount = () => {
    // In a real app, you would call an API to delete the account
    setDeleteDialogOpen(false)
    // Redirect to login page or show confirmation
  }

  const handleLogout = () => {
    // In a real app, you would call an API to log out
    setLogoutDialogOpen(false)
    // Redirect to login page
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang)
  }

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({
      ...personalInfo,
      [e.target.name]: e.target.value,
    })
  }

  const handleNotificationToggle = (key: string) => {
    setNotificationPreferences({
      ...notificationPreferences,
      [key]: !notificationPreferences[key as keyof typeof notificationPreferences],
    })
  }

  const handlePrivacyToggle = (key: string) => {
    setPrivacySettings({
      ...privacySettings,
      [key]: !privacySettings[key as keyof typeof notificationPreferences],
    })
  }

  const handleConnectAccount = (platform: string) => {
    // In a real app, you would initiate OAuth flow here
    setConnectedAccounts({
      ...connectedAccounts,
      [platform]: !connectedAccounts[platform as keyof typeof connectedAccounts],
    })
  }

  const calculateProfileCompletion = () => {
    let completedItems = 0
    const totalItems = 8 // Total number of profile items we're tracking

    // Check personal info
    if (personalInfo.name && personalInfo.name !== "John Doe") completedItems++
    if (personalInfo.email && personalInfo.email !== "john.doe@example.com") completedItems++
    if (personalInfo.phone && personalInfo.phone !== "+1 (555) 123-4567") completedItems++

    // Check profile image
    if (profileImage && !profileImage.includes("placeholder")) completedItems++

    // Check verification
    if (verificationFiles.length > 0) completedItems++

    // Check connected accounts
    if (Object.values(connectedAccounts).some((value) => value === true)) completedItems++

    // Check notification preferences (if they've been customized)
    if (!notificationPreferences.email || !notificationPreferences.push || notificationPreferences.marketing)
      completedItems++

    // Check privacy settings (if they've been customized)
    if (privacySettings.profileVisibility !== "public" || privacySettings.showEmail || privacySettings.showPhone)
      completedItems++

    return {
      percentage: Math.round((completedItems / totalItems) * 100),
      completedItems,
      totalItems,
      incompleteItems: [
        { name: "Profile Picture", completed: profileImage && !profileImage.includes("placeholder") },
        {
          name: "Personal Information",
          completed:
            personalInfo.name !== "John Doe" &&
            personalInfo.email !== "john.doe@example.com" &&
            personalInfo.phone !== "+1 (555) 123-4567",
        },
        { name: "Verification Documents", completed: verificationFiles.length > 0 },
        { name: "Connected Accounts", completed: Object.values(connectedAccounts).some((value) => value === true) },
        {
          name: "Notification Preferences",
          completed:
            !notificationPreferences.email || !notificationPreferences.push || notificationPreferences.marketing,
        },
        {
          name: "Privacy Settings",
          completed:
            privacySettings.profileVisibility !== "public" || privacySettings.showEmail || privacySettings.showPhone,
        },
      ],
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card p-4 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Profile</h1>
          {mounted && <ThemeToggle />}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-3">
                <div className="h-24 w-24 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={profileImage || "/placeholder.svg"}
                    alt="Profile"
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                </div>
                <label
                  htmlFor="profile-upload"
                  className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2 cursor-pointer shadow-md"
                >
                  <Camera className="h-4 w-4 text-gray-800" />
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileImageChange}
                  />
                </label>
              </div>
              <h2 className="text-xl font-semibold">{personalInfo.name}</h2>
              <p className="text-muted-foreground">{personalInfo.email}</p>
            </div>

            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Profile Completion</h3>
              </div>
              <div className="p-4">
                {(() => {
                  const completion = calculateProfileCompletion()
                  return (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{completion.percentage}% Complete</span>
                        <span className="text-sm text-muted-foreground">
                          {completion.completedItems}/{completion.totalItems} items
                        </span>
                      </div>
                      <Progress value={completion.percentage} className="h-2" />

                      <div className="mt-4 space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">Complete these items:</h4>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {completion.incompleteItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              {item.completed ? (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              ) : (
                                <XCircle className="h-4 w-4 text-muted-foreground" />
                              )}
                              <span className={item.completed ? "text-muted-foreground line-through" : ""}>
                                {item.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {completion.percentage < 100 && (
                        <div className="mt-2 text-sm text-muted-foreground">
                          Complete your profile to improve your experience and unlock all features.
                        </div>
                      )}

                      {completion.percentage === 100 && (
                        <div className="mt-2 text-sm text-green-600 flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          Your profile is complete!
                        </div>
                      )}
                    </div>
                  )
                })()}
              </div>
            </div>

            {/* Personal Information */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Personal Information</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="flex items-center">
                    <UserCircle className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      id="name"
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={handlePersonalInfoChange}
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-muted-foreground mr-2" />
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={handlePersonalInfoChange}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Verification Files */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Verification</h3>
              </div>
              <div className="border-b">
                <button
                  className="w-full flex items-center justify-between p-4 hover:bg-muted"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <div className="flex items-center">
                    <Upload className="h-5 w-5 text-muted-foreground mr-3" />
                    <span>Verification Documents</span>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <input id="file-upload" type="file" className="hidden" onChange={handleFileUpload} />
                </button>
              </div>

              {/* Verification Files List */}
              {verificationFiles.length > 0 && (
                <div className="p-4 border-b bg-muted">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Uploaded Documents</h4>
                  <ul className="space-y-2">
                    {verificationFiles.map((file, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span className="text-sm">{file}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setVerificationFiles(verificationFiles.filter((_, i) => i !== index))}
                        >
                          <Trash2 className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Connected Accounts */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Connected Accounts</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Facebook className="h-5 w-5 text-blue-600 mr-3" />
                    <span>Facebook</span>
                  </div>
                  <Button
                    variant={connectedAccounts.facebook ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleConnectAccount("facebook")}
                  >
                    {connectedAccounts.facebook ? "Disconnect" : "Connect"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Instagram className="h-5 w-5 text-pink-500 mr-3" />
                    <span>Instagram</span>
                  </div>
                  <Button
                    variant={connectedAccounts.instagram ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleConnectAccount("instagram")}
                  >
                    {connectedAccounts.instagram ? "Disconnect" : "Connect"}
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Twitter className="h-5 w-5 text-blue-400 mr-3" />
                    <span>Twitter</span>
                  </div>
                  <Button
                    variant={connectedAccounts.twitter ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => handleConnectAccount("twitter")}
                  >
                    {connectedAccounts.twitter ? "Disconnect" : "Connect"}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            {/* Appearance */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Appearance</h3>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {theme === "light" ? (
                      <Sun className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Moon className="h-5 w-5 text-muted-foreground" />
                    )}
                    <span>Theme</span>
                  </div>
                  {mounted && <ThemeToggle />}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Choose between light and dark mode for your profile. Your preference will be saved for future
                  sessions.
                </p>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Notification Preferences</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-muted-foreground mr-3" />
                    <span>Email Notifications</span>
                  </div>
                  <Switch
                    checked={notificationPreferences.email}
                    onCheckedChange={() => handleNotificationToggle("email")}
                  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Smartphone className="h-5 w-5 text-muted-foreground mr-3" />
                    <span>Push Notifications</span>
                  </div>
                  <Switch
                    checked={notificationPreferences.push}
                    onCheckedChange={() => handleNotificationToggle("push")}
                  />
                </div>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <Bell className="h-5 w-5 text-muted-foreground mr-3" />
                    <span>Marketing Notifications</span>
                  </div>
                  <Switch
                    checked={notificationPreferences.marketing}
                    onCheckedChange={() => handleNotificationToggle("marketing")}
                  />
                </div>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Privacy Settings</h3>
              </div>
              <div className="divide-y divide-border">
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <Shield className="h-5 w-5 text-muted-foreground mr-3" />
                    <span>Profile Visibility</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className={`px-3 py-1 rounded-md ${
                        privacySettings.profileVisibility === "public"
                          ? "bg-yellow-400 text-gray-800"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                      onClick={() => setPrivacySettings({ ...privacySettings, profileVisibility: "public" })}
                    >
                      Public
                    </button>
                    <button
                      className={`px-3 py-1 rounded-md ${
                        privacySettings.profileVisibility === "private"
                          ? "bg-yellow-400 text-gray-800"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                      onClick={() => setPrivacySettings({ ...privacySettings, profileVisibility: "private" })}
                    >
                      Private
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium">Language</h3>
              </div>
              <div className="border-b">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="w-full flex items-center justify-between p-4 hover:bg-muted">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-muted-foreground mr-3" />
                        <span>Language</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground mr-2">{language}</span>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => handleLanguageChange("English")}>English</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("Spanish")}>Spanish</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("French")}>French</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("German")}>German</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleLanguageChange("Chinese")}>Chinese</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-card rounded-xl shadow-sm overflow-hidden mb-6 border">
              <div className="p-4 border-b">
                <h3 className="font-medium text-red-500">Danger Zone</h3>
              </div>

              {/* Logout */}
              <button
                className="w-full flex items-center p-4 hover:bg-muted border-b"
                onClick={() => setLogoutDialogOpen(true)}
              >
                <LogOut className="h-5 w-5 text-muted-foreground mr-3" />
                <span>Logout</span>
              </button>

              {/* Delete Account */}
              <button
                className="w-full flex items-center p-4 hover:bg-muted text-red-500"
                onClick={() => setDeleteDialogOpen(true)}
              >
                <Trash2 className="h-5 w-5 mr-3" />
                <span>Delete Account</span>
              </button>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <ClientNavigation />

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Logout Dialog */}
      <Dialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Logout</DialogTitle>
            <DialogDescription>Are you sure you want to logout from your account?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
