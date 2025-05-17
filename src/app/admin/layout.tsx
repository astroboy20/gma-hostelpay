"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Building,
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronDown,
  Search,
  Shield,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Suspense } from "react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // This is a simple client-side authentication check
  // In a real app, you would use a more robust server-side authentication check
  useEffect(() => {
    // Check if the user is authenticated as an admin
    // This is just a placeholder - in a real app, you would check a token or session
    const isAdmin = localStorage.getItem("isAdmin") === "true"

    if (!isAdmin && pathname !== "/admin/login") {
      // Redirect to admin login if not authenticated
      router.push("/admin/login")
    }
  }, [pathname, router])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + "/")
  }

  const handleLogout = () => {
    localStorage.removeItem("isAdmin")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <div className="flex items-center gap-2">
              <Logo href="/admin" />
              <div className="hidden md:flex h-6 items-center">
                <Separator orientation="vertical" className="mx-2" />
                <span className="text-sm font-medium">Admin Panel</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center max-w-sm w-full mx-4">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="hidden sm:inline-block">Admin User</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/">Exit Admin Panel</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button onClick={handleLogout} className="w-full text-left">
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        ></div>

        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r transform transition-transform duration-200 md:relative md:translate-x-0 shadow-md ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 border-b flex items-center justify-between px-4 md:hidden">
            <div className="flex items-center gap-2">
              <Logo href="/admin" />
              <span className="text-sm font-medium">Admin</span>
            </div>
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-gray-500">System Administrator</div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
          <nav className="p-4 space-y-1">
            <Link
              href="/admin"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/admin") &&
                !isActive("/admin/hostels") &&
                !isActive("/admin/students") &&
                !isActive("/admin/payments") &&
                !isActive("/admin/settings")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/admin/hostels"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/admin/hostels") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Building className="h-5 w-5" />
              <span>Hostels</span>
            </Link>
            <Link
              href="/admin/students"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/admin/students") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Users className="h-5 w-5" />
              <span>Students</span>
            </Link>
            <Link
              href="/admin/payments"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/admin/payments") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <Link
              href="/admin/settings"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/admin/settings") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <div className="pt-4 mt-4 border-t">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </div>
    </div>
  )
}
