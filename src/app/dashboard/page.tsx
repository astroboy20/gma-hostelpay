"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, CreditCard, AlertCircle, CheckCircle2, User, Calendar } from "lucide-react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation"

// Mock student data
const studentData = {
  name: "John Doe",
  matricNumber: "STU/2023/001234",
  faculty: "Engineering",
  department: "Computer Engineering",
  level: "300 Level",
  currentHostel: "Block A - Room 123",
  paymentStatus: "Paid",
  paymentDate: "15 Jan 2023",
  academicYear: "2023/2024",
}

export default function DashboardPage() {
  return (
    <div className="space-y-8 max-w-6xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome, {studentData.name}</h1>
            <p className="text-gray-500 mt-1">
              Here's an overview of your student information and accommodation status
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/dashboard/hostels">
              <Button className="bg-blue-600 hover:bg-blue-700">View Available Hostels</Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      {/* Student Information Card */}
      <FadeIn delay={0.1}>
        <Card className="overflow-hidden border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Student Information</CardTitle>
                <CardDescription>Your personal and academic details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                  <p className="text-base font-medium">{studentData.name}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Matriculation Number</h3>
                  <p className="text-base font-medium">{studentData.matricNumber}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Faculty</h3>
                  <p className="text-base font-medium">{studentData.faculty}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Department</h3>
                  <p className="text-base font-medium">{studentData.department}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Level</h3>
                  <p className="text-base font-medium">{studentData.level}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Academic Year</h3>
                  <p className="text-base font-medium">{studentData.academicYear}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      {/* Current Hostel */}
      <FadeIn delay={0.2}>
        <Card className="overflow-hidden border-blue-100 shadow-sm">
          <CardHeader className="bg-blue-50 pb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Building className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <CardTitle>Current Hostel</CardTitle>
                <CardDescription>Your current accommodation details</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-start gap-3">
                  <Building className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Hostel Assignment</h3>
                    <p className="text-base font-medium">{studentData.currentHostel}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Payment Status</h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        <CheckCircle2 className="mr-1 h-3 w-3" />
                        {studentData.paymentStatus}
                      </span>
                      <span className="text-sm text-gray-500">on {studentData.paymentDate}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link href="/dashboard/hostels">
                  <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    Change Hostel
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </FadeIn>

      <Separator className="my-8" />

      <div>
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Building className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">View Hostels</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Browse available hostels and their facilities</p>
                  <Link href="/dashboard/hostels">
                    <Button variant="outline" className="w-full">
                      View Hostels
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <CreditCard className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Payment History</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">View your past hostel payments</p>
                  <Link href="/dashboard/payments">
                    <Button variant="outline" className="w-full">
                      View Payments
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
            <StaggerItem>
              <Card className="hover:shadow-md transition-shadow h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <User className="h-4 w-4 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">Update Profile</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">Update your personal information</p>
                  <Link href="/dashboard/profile">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </StaggerItem>
          </div>
        </StaggerContainer>
      </div>

      <Separator className="my-8" />

      {/* Announcements */}
      <div>
        <h2 className="text-xl font-bold mb-4">Announcements</h2>
        <FadeIn delay={0.4}>
          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertTitle className="text-blue-600 font-medium">Hostel Registration Deadline</AlertTitle>
              <AlertDescription>
                The deadline for hostel registration for the 2023/2024 academic year is 30th June 2023.
              </AlertDescription>
            </Alert>
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600 font-medium">New Hostel Block Available</AlertTitle>
              <AlertDescription>
                A new hostel block (Block D) is now available for booking. Limited rooms available.
              </AlertDescription>
            </Alert>
          </div>
        </FadeIn>
      </div>

      {/* Academic Calendar */}
      <div>
        <h2 className="text-xl font-bold mb-4">Academic Calendar</h2>
        <FadeIn delay={0.5}>
          <Card className="overflow-hidden border-blue-100 shadow-sm">
            <CardHeader className="bg-blue-50 pb-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Calendar className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>Important dates for the academic year</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-md text-center min-w-[60px]">
                    <div className="text-xs text-blue-600 font-medium">JUN</div>
                    <div className="text-lg font-bold text-blue-700">15</div>
                  </div>
                  <div>
                    <h3 className="font-medium">First Semester Exams Begin</h3>
                    <p className="text-sm text-gray-500">Examination period starts for all faculties</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-md text-center min-w-[60px]">
                    <div className="text-xs text-blue-600 font-medium">JUL</div>
                    <div className="text-lg font-bold text-blue-700">10</div>
                  </div>
                  <div>
                    <h3 className="font-medium">Semester Break</h3>
                    <p className="text-sm text-gray-500">End of first semester and beginning of break period</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-md text-center min-w-[60px]">
                    <div className="text-xs text-blue-600 font-medium">SEP</div>
                    <div className="text-lg font-bold text-blue-700">05</div>
                  </div>
                  <div>
                    <h3 className="font-medium">Second Semester Begins</h3>
                    <p className="text-sm text-gray-500">Classes resume for the second semester</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  )
}
