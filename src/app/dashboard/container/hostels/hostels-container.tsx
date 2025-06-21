"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  Users,
  ShowerHeadIcon as Shower,
  Coffee,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Pulse,
  FadeIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/animation";
import { useGetHostelsQuery } from "@/providers/apis/hostel-api";
import { useSelector } from "react-redux";
import { RootState } from "@/providers/store/store";
import { HostelsSkeleton } from "../../components/hostel-loading";
import { Premium } from "./hostel-premium";
import { HostelType } from "../../../../../typings";
import { RenderHostelCard } from "../../components/render-hostels-card";
import { Standard } from "./hostel-standard";

const Hostels = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { data: hostels, isLoading } = useGetHostelsQuery(
    {
      token: accessToken,
    },
    { skip: !accessToken }
  );

  const handleOpenDialog = (hostel: any) => {
    setSelectedHostel(hostel);
    setIsDialogOpen(true);
    setBookingSuccess(false);
    setSelectedRoom(null);
  };

  const handleBookHostel = async () => {
    if (!selectedRoom) return;

    setIsBooking(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setBookingSuccess(true);
    setIsBooking(false);
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case "Wi-Fi":
        return <Wifi className="h-4 w-4" />;
      case "Shared Bathroom":
      case "Attached Bathroom":
      case "Private Bathroom":
        return <Shower className="h-4 w-4" />;
      case "Common Room":
      case "Study Area":
        return <Users className="h-4 w-4" />;
      case "Cafeteria":
        return <Coffee className="h-4 w-4" />;
      default:
        return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return <HostelsSkeleton />;
  }
  return (
    <div className="space-y-6">
      <FadeIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Available Hostels
          </h1>
          <p className="text-muted-foreground">
            Browse and select your preferred hostel accommodation
          </p>
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
              {hostels?.map((hostel: HostelType) => (
                <StaggerItem key={hostel?._id}>
                  {RenderHostelCard({ hostel })}
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="standard" className="space-y-6">
          <StaggerContainer>
            <Standard hostels={hostels} />
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="premium" className="space-y-6">
          <StaggerContainer>
            <Premium hostels={hostels} />
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="deluxe" className="space-y-6">
          <StaggerContainer>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hostels
                ?.filter((h: HostelType) => h?.type === "Deluxe")
                ?.map((hostel: HostelType) => (
                  <StaggerItem key={hostel?._id}>
                    {RenderHostelCard({ hostel })}
                  </StaggerItem>
                ))}
            </div>
          </StaggerContainer>
        </TabsContent>
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedHostel && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedHostel.name} - {selectedHostel.type}
                </DialogTitle>
                <DialogDescription>
                  ₦{selectedHostel.price.toLocaleString()} per academic year
                </DialogDescription>
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
                    <h3 className="text-sm font-medium text-gray-500">
                      Description
                    </h3>
                    <p className="mt-1">{selectedHostel.description}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Capacity
                    </h3>
                    <p className="mt-1">{selectedHostel.capacity}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Availability
                    </h3>
                    <p className="mt-1">
                      {selectedHostel.available} of {selectedHostel.total} rooms
                      available
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Features
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {selectedHostel.features.map((feature: string) => (
                        <Badge
                          key={feature}
                          variant="outline"
                          className="flex items-center gap-1"
                        >
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
                    <RadioGroup
                      value={selectedRoom || ""}
                      onValueChange={setSelectedRoom}
                    >
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
                        <p className="mt-1">
                          Your hostel booking has been confirmed. Please proceed
                          to make payment.
                        </p>
                        <div className="mt-4">
                          <Link href="/dashboard/payments">
                            <Pulse>
                              <Button className="bg-blue-600 hover:bg-blue-700">
                                Proceed to Payment
                              </Button>
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
  );
};

export { Hostels };
