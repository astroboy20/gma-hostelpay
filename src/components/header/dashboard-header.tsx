import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Menu, Bell, User, ChevronDown } from 'lucide-react'
import React from 'react'
import { Logo } from '../logo'
import { Button } from '../ui/button'
import Link from 'next/link'

const DashboardHeader = ({toggleSidebar}:{toggleSidebar:()=>void}) => {
  return (
    <header className="bg-white border-b sticky top-0 z-30 shadow-sm">
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
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <span className="hidden sm:inline-block">John Doe</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenu.Trigger>
            <DropdownMenu.Content
            align="end"
            className="min-w-[180px] rounded-md bg-white shadow-lg border p-1"
            >
            <DropdownMenu.Item asChild>
              <Link
              href="/dashboard/profile"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
              >
              My Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item asChild>
              <Link
              href="/auth/login"
              className="flex items-center px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer text-sm"
              >
              Logout
              </Link>
            </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
    </div>
  </header>
  )
}

export  {DashboardHeader}
