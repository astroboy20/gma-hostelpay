"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { FadeIn } from "@/components/animation"

// Mock hostel data
const hostels = [
  {
    id: "1",
    name: "Block A",
    type: "Standard",
    price: 50000,
    capacity: 4,
    totalRooms: 100,
    image:
      "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Shared Bathroom", "Common Room", "Study Area"],
    description:
      "Standard accommodation with basic amenities for students. Comfortable living space with shared facilities.",
  },
  {
    id: "2",
    name: "Block B",
    type: "Premium",
    price: 75000,
    capacity: 2,
    totalRooms: 50,
    image:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    features: ["Wi-Fi", "Attached Bathroom", "Common Room", "Study Area", "Cafeteria"],
    description: "Premium accommodation with enhanced amenities for students who prefer more comfort and privacy.",
  },
]

const availableFeatures = [
  "Wi-Fi",
  "Shared Bathroom",
  "Attached Bathroom",
  "Private Bathroom",
  "Common Room",
  "Study Area",
  "Cafeteria",
  "Air Conditioning",
  "Laundry Room",
  "TV Room",
  "Gym",
]

export default function EditHostel() {
  const params = useParams()
  const router = useRouter()
  const isNew = params.id === "new"
  const id = params.id as string

  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "Standard",
    price: "",
    capacity: "",
    totalRooms: "",
    image: "",
    features: [] as string[],
    description: "",
  })

  useEffect(() => {
    if (!isNew) {
      setIsLoading(true)
      // In a real app, you would fetch the hostel data from an API
      const hostel = hostels.find((h) => h.id === id)
      if (hostel) {
        setFormData({
          name: hostel.name,
          type: hostel.type,
          price: hostel.price.toString(),
          capacity: hostel.capacity.toString(),
          totalRooms: hostel.totalRooms.toString(),
          image: hostel.image,
          features: hostel.features,
          description: hostel.description,
        })
      }
      setIsLoading(false)
    }
  }, [id, isNew])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => {
      const features = prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature]
      return { ...prev, features }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // In a real app, you would call an API to save the hostel data
      console.log("Saving hostel data:", formData)
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admin/hostels")
    } catch (error) {
      console.error("Error saving hostel:", error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <FadeIn>
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/hostels">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {isNew ? "Add New Hostel" : `Edit ${formData.name}`}
            </h1>
            <p className="text-gray-500 mt-1">
              {isNew ? "Create a new hostel block" : "Update hostel information and features"}
            </p>
          </div>
        </div>
      </FadeIn>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Hostel Information</CardTitle>
            <CardDescription>Basic details about the hostel block</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Hostel Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="e.g. Block A"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Hostel Type</Label>
                <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard">Standard</SelectItem>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="Deluxe">Deluxe</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price (₦)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 50000"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity (students per room)</Label>
                <Input
                  id="capacity"
                  name="capacity"
                  type="number"
                  placeholder="e.g. 4"
                  value={formData.capacity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="totalRooms">Total Rooms</Label>
                <Input
                  id="totalRooms"
                  name="totalRooms"
                  type="number"
                  placeholder="e.g. 100"
                  value={formData.totalRooms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the hostel and its amenities..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableFeatures.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={`feature-${feature}`}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <label
                      htmlFor={`feature-${feature}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" asChild>
              <Link href="/admin/hostels">Cancel</Link>
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isNew ? "Creating..." : "Updating..."}
                </>
              ) : isNew ? (
                "Create Hostel"
              ) : (
                "Update Hostel"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
