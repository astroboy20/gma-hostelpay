"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Building, Home, User, CreditCard, LogOut, Menu, X, Bell, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Logo } from "@/components/logo"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <Logo href="/" />
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
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="hidden sm:inline-block">John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/auth/login">Logout</Link>
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
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r transform transition-transform duration-200 md:relative md:translate-x-0 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 border-b flex items-center justify-between px-4 md:hidden">
            <Logo href="/" />
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close menu</span>
            </Button>
          </div>
          <nav className="p-4 space-y-2">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/profile") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/dashboard/hostels"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/hostels") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Building className="h-5 w-5" />
              <span>Hostels</span>
            </Link>
            <Link
              href="/dashboard/payments"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/payments") ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            <div className="pt-4 mt-4 border-t">
              <Link
                href="/auth/login"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50"
                onClick={closeSidebar}
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
