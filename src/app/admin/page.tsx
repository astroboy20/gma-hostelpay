"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, CreditCard, Users, TrendingUp, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { BarChart, LineChart } from "./components/charts"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation"

export default function AdminDashboard() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Overview of hostel occupancy, student registrations, and payment statistics
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/hostels/new">
              <Button className="bg-blue-600 hover:bg-blue-700">Add New Hostel</Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Stats Overview */}
      <StaggerContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StaggerItem>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,248</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-500 font-medium">+12%</span> from last semester
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Hostel Occupancy</CardTitle>
                <Building className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78%</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-500 font-medium">+5%</span> from last semester
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <CreditCard className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₦24.5M</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-500 font-medium">+18%</span> from last semester
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
          <StaggerItem>
            <Card className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
                <AlertCircle className="h-4 w-4 text-gray-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-red-500 font-medium">+8</span> since yesterday
                </p>
              </CardContent>
            </Card>
          </StaggerItem>
        </div>
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <FadeIn delay={0.1} className="lg:col-span-2">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Occupancy & Revenue Trends</CardTitle>
              <CardDescription>Monthly hostel occupancy and revenue data</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="occupancy">
                <TabsList className="mb-4">
                  <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
                  <TabsTrigger value="revenue">Revenue</TabsTrigger>
                </TabsList>
                <TabsContent value="occupancy" className="h-[300px]">
                  <LineChart />
                </TabsContent>
                <TabsContent value="revenue" className="h-[300px]">
                  <BarChart />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </FadeIn>

        {/* Recent Activities */}
        <FadeIn delay={0.2}>
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest system activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New student registered</p>
                    <p className="text-xs text-gray-500">Jane Smith (STU/2023/005678)</p>
                    <p className="text-xs text-gray-500">10 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CreditCard className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Payment received</p>
                    <p className="text-xs text-gray-500">₦75,000 - Block B Room 45</p>
                    <p className="text-xs text-gray-500">25 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-amber-100 p-2 rounded-full">
                    <Building className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Hostel allocation updated</p>
                    <p className="text-xs text-gray-500">Block C - 5 new rooms added</p>
                    <p className="text-xs text-gray-500">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <TrendingUp className="h-4 w-4 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">System update completed</p>
                    <p className="text-xs text-gray-500">Payment module updated to v2.3</p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>

      <Separator className="my-8" />

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Manage Students</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">View and manage student records and allocations</p>
              <Link href="/admin/students">
                <Button variant="outline" className="w-full">
                  View Students
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Building className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Manage Hostels</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Add, edit or remove hostel blocks and rooms</p>
              <Link href="/admin/hostels">
                <Button variant="outline" className="w-full">
                  View Hostels
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-4 w-4 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Payment Reports</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">Generate and download payment reports</p>
              <Link href="/admin/payments">
                <Button variant="outline" className="w-full">
                  View Payments
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Alerts */}
      <div>
        <h2 className="text-xl font-bold mb-4">System Alerts</h2>
        <div className="space-y-4">
          <Alert className="bg-amber-50 border-amber-200">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertTitle className="text-amber-600 font-medium">Hostel Block D at 90% Capacity</AlertTitle>
            <AlertDescription>
              Hostel Block D is almost at full capacity. Consider opening additional rooms or redirecting students to
              other blocks.
            </AlertDescription>
          </Alert>
          <Alert className="bg-blue-50 border-blue-200">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertTitle className="text-blue-600 font-medium">Payment Deadline Approaching</AlertTitle>
            <AlertDescription>
              The payment deadline for the current semester is in 7 days. 42 students have pending payments.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  )
}
