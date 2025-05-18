"use client";

import type React from "react";
import { FadeIn, Pulse } from "@/components/animation";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRegisterMutation } from "@/providers/apis/auth-api";
import { toast } from "sonner";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    matricNumber: "",
    email: "",
    department: "",
    level: "",
    password: "",
    confirmPassword: "",
    // currentHostel: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => {
      const newData = { ...prev, [name]: value };
      validateField(name, value, newData);
      return newData;
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setRegisterData((prev) => {
      const newData = { ...prev, [name]: value };
      validateField(name, value, newData);
      return newData;
    });
  };

  const validateField = (
    name: string,
    value: string,
    newData: typeof registerData
  ) => {
    const newErrors = { ...errors };

    switch (name) {
      case "firstName":
        if (!value.trim()) newErrors.firstName = "First name is required";
        else delete newErrors.firstName;
        break;
      case "lastName":
        if (!value.trim()) newErrors.lastName = "Last name is required";
        else delete newErrors.lastName;
        break;
      case "matricNumber":
        if (!value.trim()) newErrors.matricNumber = "Matric number is required";
        else delete newErrors.matricNumber;
        break;
      case "email":
        if (!value.trim()) {
          newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "department":
        if (!value) newErrors.department = "Department is required";
        else delete newErrors.department;
        break;
      case "level":
        if (!value) newErrors.level = "Level is required";
        else delete newErrors.level;
        break;
      case "password":
        if (!value) {
          newErrors.password = "Password is required";
        } else if (value.length < 8) {
          newErrors.password = "Minimum 8 characters required";
        } else {
          delete newErrors.password;
          if (newData.confirmPassword && newData.confirmPassword !== value) {
            newErrors.confirmPassword = "Passwords do not match";
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;
      case "confirmPassword":
        if (!value) {
          newErrors.confirmPassword = "Confirm password is required";
        } else if (value !== newData.password) {
          newErrors.confirmPassword = "Passwords do not match";
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const requiredFields = [
      "firstName",
      "lastName",
      "matricNumber",
      "email",
      "department",
      "level",
      "password",
      "confirmPassword",
    ];

    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      const value = registerData[field as keyof typeof registerData];
      if (!value || (typeof value === "string" && !value.trim())) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      }
    });

    if (
      registerData.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    if (registerData.password && registerData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (
      registerData.confirmPassword &&
      registerData.password !== registerData.confirmPassword
    ) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const request = await register(registerData).unwrap();
      toast(request?.message);
      router.push("/auth/login");
    } catch (err: any) {
    //   toast(err?.data?.error);
      setErrors((prev) => ({
        ...prev,
        form: err?.data?.error,
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4 py-10">
      <FadeIn fullWidth className="flex justify-center items-center">
        <Card className="w-full max-w-md max-h-[90dvh] lg:max-h-[600px] overflow-y-auto">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <Logo href="/" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Create an account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your details to register for hostel accommodation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {errors.form && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {errors.form}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={registerData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={registerData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="matricNumber">Matriculation Number</Label>
                <Input
                  id="matricNumber"
                  name="matricNumber"
                  placeholder="Enter your matriculation number"
                  value={registerData.matricNumber}
                  onChange={handleChange}
                  className={errors.matricNumber ? "border-red-500" : ""}
                />
                {errors.matricNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.matricNumber}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={registerData.email}
                  onChange={handleChange}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  name="department"
                  value={registerData.department}
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                >
                  <SelectTrigger
                    className={`w-full ${
                      errors.department ? "border-red-500" : ""
                    }`}
                  >
                    <SelectValue placeholder="Select your department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="accounting">Accounting</SelectItem>
                    <SelectItem value="computer-science">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="marine-engineering">
                      Marine Engineering
                    </SelectItem>
                    <SelectItem value="mtbs">
                      Maritime Transport and Business Studies
                    </SelectItem>
                    <SelectItem value="shipping">
                      Shipping Management & Technology
                    </SelectItem>
                    <SelectItem value="security">
                      Security Management & Technology
                    </SelectItem>
                    <SelectItem value="welding">
                      Welding & Fabrication
                    </SelectItem>
                  </SelectContent>
                </Select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Select
                  name="level"
                  value={registerData.level}
                  onValueChange={(value) => handleSelectChange("level", value)}
                >
                  <SelectTrigger
                    className={`w-full ${errors.level ? "border-red-500" : ""}`}
                  >
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ND1">ND 1</SelectItem>
                    <SelectItem value="ND2">ND 2</SelectItem>
                  </SelectContent>
                </Select>
                {errors.level && (
                  <p className="text-red-500 text-xs mt-1">{errors.level}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={registerData.password}
                    onChange={handleChange}
                    className={
                      errors.password ? "border-red-500 pr-10" : "pr-10"
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={registerData.confirmPassword}
                    onChange={handleChange}
                    className={`pr-10 ${
                      errors.confirmPassword ? "border-red-500" : ""
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <Pulse>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Pulse>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export { Register };
