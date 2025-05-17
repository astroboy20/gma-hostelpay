"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock student data
const studentData = {
  name: "John Doe",
  firstName: "John",
  lastName: "Doe",
  matricNumber: "STU/2023/001234",
  email: "john.doe@example.com",
  phone: "+1234567890",
  faculty: "Engineering",
  department: "Computer Engineering",
  level: "300 Level",
  address: "123 Campus Road, University Area",
  emergencyContact: "Jane Doe",
  emergencyPhone: "+0987654321",
  relationship: "Parent",
};

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handlePersonalInfoSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccessMessage("Profile information updated successfully!");
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage("");

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSuccessMessage("Password updated successfully!");
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">
          View and update your personal information
        </p>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="personalInfoForm"
                onSubmit={handlePersonalInfoSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      defaultValue={studentData.firstName}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      defaultValue={studentData.lastName}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="matricNumber">Matriculation Number</Label>
                    <Input
                      id="matricNumber"
                      defaultValue={studentData.matricNumber}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={studentData.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue={studentData.phone} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="faculty">Faculty</Label>
                    <Input
                      id="faculty"
                      defaultValue={studentData.faculty}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      defaultValue={studentData.department}
                      disabled
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Input
                      id="level"
                      defaultValue={studentData.level}
                      disabled
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" defaultValue={studentData.address} />
                </div>

                <div className="pt-4 border-t">
                  <h3 className="text-lg font-medium mb-4">
                    Emergency Contact
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        defaultValue={studentData.emergencyContact}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        defaultValue={studentData.emergencyPhone}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="relationship">Relationship</Label>
                      <Select defaultValue={studentData.relationship}>
                        <SelectTrigger id="relationship">
                          <SelectValue placeholder="Select relationship" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Parent">Parent</SelectItem>
                          <SelectItem value="Sibling">Sibling</SelectItem>
                          <SelectItem value="Spouse">Spouse</SelectItem>
                          <SelectItem value="Guardian">Guardian</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="personalInfoForm"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                id="passwordForm"
                onSubmit={handlePasswordSubmit}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
              </form>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                form="passwordForm"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
