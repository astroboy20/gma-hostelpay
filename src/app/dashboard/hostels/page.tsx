"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Wifi, Users, ShowerHeadIcon as Shower, Coffee, CheckCircle2, Loader2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Pulse, FadeIn, StaggerContainer, StaggerItem } from "@/components/animation"

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
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Private Bathroom", "Common Room", "Study Area", "Cafeteria", "Air Conditioning"],
    description: "Exclusive deluxe accommodation with premium amenities and maximum privacy for students.",
  },
]

export default function HostelsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedHostel, setSelectedHostel] = useState<any>(null)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)

  const handleOpenDialog = (hostel: any) => {
    setSelectedHostel(hostel)
    setIsDialogOpen(true)
    setBookingSuccess(false)
    setSelectedRoom(null)
  }

  const handleBookHostel = async () => {
    if (!selectedRoom) return

    setIsBooking(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setBookingSuccess(true)
    setIsBooking(false)
  }

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />
      case "Shared Bathroom":
      case "Attached Bathroom":
      case "Private Bathroom":
        return <Shower className="h-4 w-4" />
      case "Common Room":
      case "Study Area":
        return <Users className="h-4 w-4" />
      case "Cafeteria":
        return <Coffee className="h-4 w-4" />
      default:
        return <CheckCircle2 className="h-4 w-4" />
    }
  }

  const renderHostelCard = (hostel: any) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48">
        <Image
          src={
            hostel.type === "Standard"
              ? "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              : hostel.type === "Premium"
                ? "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                : "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
          }
          alt={hostel.name}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-blue-600">{hostel.type}</Badge>
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{hostel.name}</CardTitle>
        <CardDescription>₦{hostel.price.toLocaleString()} per academic year</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 flex-grow">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Capacity:</span>
          <span>{hostel.capacity}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Available:</span>
          <span>
            {hostel.available} of {hostel.total} rooms
          </span>
        </div>
        <div className="pt-2">
          <h4 className="text-sm font-medium mb-2">Features:</h4>
          <div className="flex flex-wrap gap-2">
            {hostel.features.slice(0, 3).map((feature: string) => (
              <Badge key={feature} variant="outline" className="flex items-center gap-1">
                {getFeatureIcon(feature)}
                {feature}
              </Badge>
            ))}
            {hostel.features.length > 3 && <Badge variant="outline">+{hostel.features.length - 3} more</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Pulse>
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => handleOpenDialog(hostel)}>
            View Details
          </Button>
        </Pulse>
      </CardFooter>
    </Card>
  )

  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Available Hostels</h1>
          <p className="text-muted-foreground">Browse and select your preferred hostel accommodation</p>
        </div>
      </FadeIn>

      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Hostels</TabsTrigger>
          <TabsTrigger value="standard">Standard</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="deluxe">Deluxe</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels.map((hostel) => (
                <StaggerItem key={hostel.id}>{renderHostelCard(hostel)}</StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="standard" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels
                .filter((h) => h.type === "Standard")
                .map((hostel) => (
                  <StaggerItem key={hostel.id}>{renderHostelCard(hostel)}</StaggerItem>
                ))}
            </div>
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels
                .filter((h) => h.type === "Premium")
                .map((hostel) => (
                  <StaggerItem key={hostel.id}>{renderHostelCard(hostel)}</StaggerItem>
                ))}
            </div>
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="deluxe" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels
                .filter((h) => h.type === "Deluxe")
                .map((hostel) => (
                  <StaggerItem key={hostel.id}>{renderHostelCard(hostel)}</StaggerItem>
                ))}
            </div>
          </StaggerContainer>
        </TabsContent>
      </Tabs>

      {/* Separate Dialog component outside of the card rendering */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedHostel && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedHostel.name} - {selectedHostel.type}
                </DialogTitle>
                <DialogDescription>₦{selectedHostel.price.toLocaleString()} per academic year</DialogDescription>
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
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Capacity</h3>
                    <p className="mt-1">{selectedHostel.capacity}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Availability</h3>
                    <p className="mt-1">
                      {selectedHostel.available} of {selectedHostel.total} rooms available
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Features</h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedHostel.features.map((feature: string) => (
                        <Badge key={feature} variant="outline" className="flex items-center gap-1">
                          {getFeatureIcon(feature)}
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {!bookingSuccess ? (
                <>
                  <div className="border-t pt-4 mt-4">
                    <h3 className="font-medium mb-3">Select Room Type</h3>
                    <RadioGroup value={selectedRoom || ""} onValueChange={setSelectedRoom}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ground" id="ground" />
                        <Label htmlFor="ground">Ground Floor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="first" id="first" />
                        <Label htmlFor="first">First Floor</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="second" id="second" />
                        <Label htmlFor="second">Second Floor</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <Pulse>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={handleBookHostel}
                        disabled={isBooking || !selectedRoom}
                      >
                        {isBooking ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Book and Proceed to Payment"
                        )}
                      </Button>
                    </Pulse>
                  </DialogFooter>
                </>
              ) : (
                <div className="border-t pt-4 mt-4">
                  <FadeIn>
                    <div className="bg-green-50 text-green-700 p-4 rounded-md flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 mt-0.5" />
                      <div>
                        <h3 className="font-medium">Booking Successful!</h3>
                        <p className="mt-1">Your hostel booking has been confirmed. Please proceed to make payment.</p>
                        <div className="mt-4">
                          <Link href="/dashboard/payments">
                            <Pulse>
                              <Button className="bg-blue-600 hover:bg-blue-700">Proceed to Payment</Button>
                            </Pulse>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </FadeIn>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
