"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Building, Home, User, CreditCard, LogOut, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { Separator } from "@/components/ui/separator";
import { DashboardHeader } from "@/components/header/dashboard-header";
import { useUserDetailsQuery } from "@/providers/apis/auth-api";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store/store";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}

      <div className="flex flex-1">
        {/* Sidebar for mobile */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden transition-opacity duration-200 ${
            isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeSidebar}
        ></div>

        <aside
          className={`fixed top-0 left-0 z-50 h-screen w-70 bg-white border-r transform transition-transform duration-200 md:sticky md:translate-x-0 shadow-md ${
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
          <div className="p-4">
            <div className="flex items-center gap-3 mb-6 mt-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <div className="font-medium">John Doe</div>
                <div className="text-xs text-gray-500">STU/2023/001234</div>
              </div>
            </div>
            <Separator className="my-4" />
          </div>
          <nav className="p-4 space-y-1">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Home className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/dashboard/profile"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/profile")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <User className="h-5 w-5" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/dashboard/hostels"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/hostels")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Building className="h-5 w-5" />
              <span>Hostels</span>
            </Link>
            <Link
              href="/dashboard/payments"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/payments")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <CreditCard className="h-5 w-5" />
              <span>Payments</span>
            </Link>
            {/* <Link
              href="/dashboard/calendar"
              className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                isActive("/dashboard/calendar")
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={closeSidebar}
            >
              <Calendar className="h-5 w-5" />
              <span>Academic Calendar</span>
            </Link> */}
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
        <main className="w-full">
          <div className="sticky top-0 z-30">
            <DashboardHeader toggleSidebar={toggleSidebar} />
          </div>
          <div className="flex-1 p-4 md:p-6 overflow-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
