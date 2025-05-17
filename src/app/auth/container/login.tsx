"use client";
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
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const matricNumber = formData.get("matricNumber") as string;
    const password = formData.get("password") as string;

    // Simulate login - in a real app, you would call your authentication API
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, we'll just redirect to the dashboard
      // In a real app, you would validate credentials and set authentication state
      router.push("/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
      <FadeIn fullWidth className="flex justify-center items-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <Logo href="/" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Login to your account
            </CardTitle>
            <CardDescription className="text-center">
              Enter your matriculation number and password to access your
              dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {error}
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="matricNumber">Matriculation Number</Label>
                <Input
                  id="matricNumber"
                  name="matricNumber"
                  placeholder="Enter your matriculation number"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
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
                      Logging in...
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </Pulse>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="text-blue-600 hover:underline"
              >
                Register here
              </Link>
            </div>
          </CardFooter>
        </Card>
      </FadeIn>
    </div>
  );
};

export { Login };
