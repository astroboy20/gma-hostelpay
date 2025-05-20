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
import { saveRefreshToken } from "@/lib/token";
import { useLoginMutation } from "@/providers/apis/auth-api";
import { setAccessToken } from "@/providers/store/auth-slice";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

const Login = () => {
  const searchParams = useSearchParams();
  const redirectURL = searchParams?.get("returnURL");
  const dispatch = useDispatch();
  const [loginData, setLoginData] = useState({
    matricNumber: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    matricNumber: "",
    password: "",
    form: "",
  });
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      matricNumber: "",
      password: "",
      form: "",
    };

    if (!loginData.matricNumber.trim()) {
      newErrors.matricNumber = "Matriculation number is required";
    }
    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return !newErrors.matricNumber && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAccessToken(null);
    if (!validateForm()) return;

    setErrors((prev) => ({ ...prev, form: "" }));

    try {
      const request = await login(loginData).unwrap();
      toast.success(request?.message);
      if (request?.accessToken) {
        dispatch(setAccessToken(request?.accessToken));
        await saveRefreshToken(request?.refreshToken);
      }

      router.replace(redirectURL ? redirectURL : "/dashboard");
    } catch (err: any) {
      const errorMessage =
        err?.data?.error || "Login failed. Please try again.";
      toast.error(errorMessage);
      setErrors((prev) => ({
        ...prev,
        form: errorMessage,
      }));
    }
  };

  // Clear form error when user starts typing
  useEffect(() => {
    if (errors.form && (loginData.matricNumber || loginData.password)) {
      setErrors((prev) => ({ ...prev, form: "" }));
    }
  }, [loginData.matricNumber, loginData.password, errors.form]);

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
              {errors.form && (
                <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                  {errors.form}jfjfj
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="matricNumber">Matriculation Number</Label>
                <Input
                  id="matricNumber"
                  name="matricNumber"
                  placeholder="Enter your matriculation number"
                  value={loginData.matricNumber}
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
                  value={loginData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
