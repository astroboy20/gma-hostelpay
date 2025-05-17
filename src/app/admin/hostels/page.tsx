"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Plus, Search, Trash, Edit, Eye, Download, FileText } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { exportToCSV, exportToExcel, prepareHostelDataForExport } from "../components/export-utils"
import { FadeIn } from "@/components/animation"

// Mock hostel data
const hostels = [
  {
    id: 1,
    name: "Block A",
    type: "Standard",
    price: 50000,
    capacity: "4 per room",
    available: 25,
    total: 100,
    occupancyRate: "75%",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Shared Bathroom", "Common Room", "Study Area"],
    description:
      "Standard accommodation with basic amenities for students. Comfortable living space with shared facilities.",
  },
  {
    id: 2,
    name: "Block B",
    type: "Premium",
    price: 75000,
    capacity: "2 per room",
    available: 15,
    total: 50,
    occupancyRate: "70%",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Attached Bathroom", "Common Room", "Study Area", "Cafeteria"],
    description: "Premium accommodation with enhanced amenities for students who prefer more comfort and privacy.",
  },
  {
    id: 3,
    name: "Block C",
    type: "Deluxe",
    price: 100000,
    capacity: "1 per room",
    available: 5,
    total: 30,
    occupancyRate: "83%",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Private Bathroom", "Common Room", "Study Area", "Cafeteria", "Air Conditioning"],
    description: "Deluxe single-occupancy rooms with premium amenities for students who value privacy and comfort.",
  },
  {
    id: 4,
    name: "Block D",
    type: "Standard",
    price: 55000,
    capacity: "4 per room",
    available: 20,
    total: 80,
    occupancyRate: "75%",
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Shared Bathroom", "Common Room", "Study Area"],
    description: "Newly constructed standard accommodation with modern facilities and comfortable living spaces.",
  },
  {
    id: 5,
    name: "Block E",
    type: "Premium",
    price: 80000,
    capacity: "2 per room",
    available: 10,
    total: 40,
    occupancyRate: "75%",
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Attached Bathroom", "Common Room", "Study Area", "Cafeteria"],
    description: "Modern premium accommodation with enhanced amenities and comfortable living environment.",
  },
  {
    id: 6,
    name: "Block F",
    type: "Deluxe",
    price: 110000,
    capacity: "1 per room",
    available: 3,
    total: 20,
    occupancyRate: "85%",
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Private Bathroom", "Common Room", "Study Area", "Cafeteria", "Air Conditioning"],
    description: "Exclusive deluxe accommodation with premium amenities and maximum privacy for students.",
  },
]

export default function HostelsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHostel, setSelectedHostel] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false)

  const filteredHostels = hostels.filter(
    (hostel) =>
      hostel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hostel.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewHostel = (hostel: any) => {
    setSelectedHostel(hostel)
    setIsViewDialogOpen(true)
  }

  const handleDeleteHostel = (hostel: any) => {
    setSelectedHostel(hostel)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, you would call an API to delete the hostel
    console.log(`Deleting hostel: ${selectedHostel?.name}`)
    setIsDeleteDialogOpen(false)
  }

  const handleExportCSV = () => {
    const data = prepareHostelDataForExport(filteredHostels)
    exportToCSV(data, "hostels-data")
    setIsExportDialogOpen(false)
  }

  const handleExportExcel = () => {
    const data = prepareHostelDataForExport(filteredHostels)
    exportToExcel(data, "hostels-data")
    setIsExportDialogOpen(false)
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hostels Management</h1>
            <p className="text-gray-500 mt-1">Manage hostel blocks, rooms, and allocations</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin/hostels/new/edit">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Add New Hostel
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>All Hostels</CardTitle>
              <CardDescription>Manage and monitor all hostel blocks</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search hostels..."
                  className="pl-9 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2" onClick={() => setIsExportDialogOpen(true)}>
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="table" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
            </TabsList>
            <TabsContent value="table">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead className="hidden md:table-cell">Price (₦)</TableHead>
                      <TableHead className="hidden md:table-cell">Capacity</TableHead>
                      <TableHead className="hidden md:table-cell">Availability</TableHead>
                      <TableHead className="hidden md:table-cell">Occupancy</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredHostels.map((hostel) => (
                      <TableRow key={hostel.id}>
                        <TableCell className="font-medium">{hostel.name}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              hostel.type === "Standard"
                                ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                : hostel.type === "Premium"
                                  ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                                  : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            }
                            variant="outline"
                          >
                            {hostel.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{hostel.price.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{hostel.capacity}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {hostel.available} / {hostel.total}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{hostel.occupancyRate}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewHostel(hostel)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem asChild>
                                <Link href={`/admin/hostels/${hostel.id}/edit`}>
                                  <Edit className="mr-2 h-4 w-4" />
                                  Edit
                                </Link>
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDeleteHostel(hostel)} className="text-red-600">
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="grid">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredHostels.map((hostel) => (
                  <Card key={hostel.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative h-48">
                      <Image src={hostel.image || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
                      <Badge
                        className={`absolute top-2 right-2 ${
                          hostel.type === "Standard"
                            ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                            : hostel.type === "Premium"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        }`}
                        variant="outline"
                      >
                        {hostel.type}
                      </Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle>{hostel.name}</CardTitle>
                      <CardDescription>₦{hostel.price.toLocaleString()} per academic year</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Capacity:</span>
                        <span>{hostel.capacity}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Availability:</span>
                        <span>
                          {hostel.available} of {hostel.total} rooms
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Occupancy:</span>
                        <span>{hostel.occupancyRate}</span>
                      </div>
                      <div className="pt-4 flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewHostel(hostel)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" asChild>
                          <Link href={`/admin/hostels/${hostel.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-red-600 hover:text-red-700"
                          onClick={() => handleDeleteHostel(hostel)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* View Hostel Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedHostel && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedHostel.name} - {selectedHostel.type}
                </DialogTitle>
                <DialogDescription>Hostel details and occupancy information</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 rounded-md overflow-hidden">
                  <Image
                    src={selectedHostel.image || "/placeholder.svg"}
                    alt={selectedHostel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Description</h3>
                    <p className="mt-1">{selectedHostel.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Price</h3>
                      <p className="mt-1">₦{selectedHostel.price.toLocaleString()}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                      <p className="mt-1">{selectedHostel.capacity}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                      <p className="mt-1">
                        {selectedHostel.available} of {selectedHostel.total} rooms
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Occupancy Rate</h3>
                      <p className="mt-1">{selectedHostel.occupancyRate}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Features</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedHostel.features.map((feature: string) => (
                        <Badge key={feature} variant="outline">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex gap-2 sm:justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/admin/hostels/${selectedHostel.id}/rooms`}>View Rooms</Link>
                </Button>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/hostels/${selectedHostel.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Hostel
                    </Link>
                  </Button>
                  <Button variant="destructive" onClick={() => handleDeleteHostel(selectedHostel)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Hostel
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedHostel?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Export Dialog */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Hostel Data</DialogTitle>
            <DialogDescription>Choose a format to export the hostel data</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="font-medium">CSV Format</h3>
                <p className="text-sm text-gray-500">Export data as a comma-separated values file</p>
              </div>
              <Button variant="outline" className="ml-auto" onClick={handleExportCSV}>
                Export CSV
              </Button>
            </div>
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <h3 className="font-medium">Excel Format</h3>
                <p className="text-sm text-gray-500">Export data as a Microsoft Excel file</p>
              </div>
              <Button variant="outline" className="ml-auto" onClick={handleExportExcel}>
                Export Excel
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
