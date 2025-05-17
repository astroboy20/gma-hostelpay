"use client";

import type React from "react";

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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, CreditCard, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock payment data
const pendingPayment = {
  id: "PAY-2023-001",
  hostel: "Block B - Room 45",
  amount: 75000,
  dueDate: "30 June 2023",
  status: "Pending",
};

const paymentHistory = [
  {
    id: "PAY-2022-123",
    hostel: "Block A - Room 78",
    amount: 50000,
    date: "15 June 2022",
    status: "Paid",
    receiptNo: "REC-2022-123",
  },
];

const Payments = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 3000));

    setPaymentSuccess(true);
    setIsProcessing(false);
  };
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">
          Manage your hostel accommodation payments
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending Payments</TabsTrigger>
          <TabsTrigger value="history">Payment History</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          {pendingPayment ? (
            <Card>
              <CardHeader>
                <CardTitle>Pending Payment</CardTitle>
                <CardDescription>
                  Your current hostel accommodation payment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Payment ID
                      </h3>
                      <p className="text-base font-medium">
                        {pendingPayment.id}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Hostel
                      </h3>
                      <p className="text-base font-medium">
                        {pendingPayment.hostel}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Amount
                      </h3>
                      <p className="text-base font-medium">
                        ₦{pendingPayment.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">
                        Due Date
                      </h3>
                      <p className="text-base font-medium">
                        {pendingPayment.dueDate}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Make Payment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Make Payment</DialogTitle>
                      <DialogDescription>
                        Complete your hostel accommodation payment
                      </DialogDescription>
                    </DialogHeader>

                    {!paymentSuccess ? (
                      <form onSubmit={handlePayment} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium">
                              Payment Details
                            </h3>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md">
                              <div className="flex justify-between">
                                <span className="text-gray-500">Hostel:</span>
                                <span>{pendingPayment.hostel}</span>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="text-gray-500">Amount:</span>
                                <span className="font-medium">
                                  ₦{pendingPayment.amount.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label>Payment Method</Label>
                            <RadioGroup
                              value={paymentMethod}
                              onValueChange={setPaymentMethod}
                              className="grid grid-cols-3 gap-4"
                            >
                              <div>
                                <RadioGroupItem
                                  value="card"
                                  id="card"
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor="card"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                                >
                                  <CreditCard className="h-5 w-5 mb-2" />
                                  Card
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="bank"
                                  id="bank"
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor="bank"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                                >
                                  <svg
                                    className="h-5 w-5 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M3 6l18 0M3 12h18M3 18h18"
                                    />
                                  </svg>
                                  Bank
                                </Label>
                              </div>
                              <div>
                                <RadioGroupItem
                                  value="ussd"
                                  id="ussd"
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor="ussd"
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-600 [&:has([data-state=checked])]:border-blue-600"
                                >
                                  <svg
                                    className="h-5 w-5 mb-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  USSD
                                </Label>
                              </div>
                            </RadioGroup>
                          </div>

                          {paymentMethod === "card" && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="cardName">Name on Card</Label>
                                <Input
                                  id="cardName"
                                  placeholder="John Doe"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="cardNumber">Card Number</Label>
                                <Input
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  required
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="expiryDate">
                                    Expiry Date
                                  </Label>
                                  <Input
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    required
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="cvv">CVV</Label>
                                  <Input id="cvv" placeholder="123" required />
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === "bank" && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="bank">Select Bank</Label>
                                <Select>
                                  <SelectTrigger id="bank">
                                    <SelectValue placeholder="Select bank" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="access">
                                      Access Bank
                                    </SelectItem>
                                    <SelectItem value="gtb">GTBank</SelectItem>
                                    <SelectItem value="zenith">
                                      Zenith Bank
                                    </SelectItem>
                                    <SelectItem value="first">
                                      First Bank
                                    </SelectItem>
                                    <SelectItem value="uba">UBA</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="accountNumber">
                                  Account Number
                                </Label>
                                <Input
                                  id="accountNumber"
                                  placeholder="0123456789"
                                  required
                                />
                              </div>
                            </div>
                          )}

                          {paymentMethod === "ussd" && (
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="ussdBank">Select Bank</Label>
                                <Select>
                                  <SelectTrigger id="ussdBank">
                                    <SelectValue placeholder="Select bank" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="access">
                                      Access Bank (*901#)
                                    </SelectItem>
                                    <SelectItem value="gtb">
                                      GTBank (*737#)
                                    </SelectItem>
                                    <SelectItem value="zenith">
                                      Zenith Bank (*966#)
                                    </SelectItem>
                                    <SelectItem value="first">
                                      First Bank (*894#)
                                    </SelectItem>
                                    <SelectItem value="uba">
                                      UBA (*919#)
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="phoneNumber">
                                  Phone Number
                                </Label>
                                <Input
                                  id="phoneNumber"
                                  placeholder="08012345678"
                                  required
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        <DialogFooter>
                          <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={isProcessing}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Processing Payment...
                              </>
                            ) : (
                              `Pay ₦${pendingPayment.amount.toLocaleString()}`
                            )}
                          </Button>
                        </DialogFooter>
                      </form>
                    ) : (
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center py-6">
                          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                          </div>
                          <h3 className="text-xl font-bold text-center">
                            Payment Successful!
                          </h3>
                          <p className="text-center text-gray-500 mt-2">
                            Your payment has been processed successfully.
                          </p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-md space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Payment ID:</span>
                            <span>{pendingPayment.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Hostel:</span>
                            <span>{pendingPayment.hostel}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Amount:</span>
                            <span>
                              ₦{pendingPayment.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Date:</span>
                            <span>{new Date().toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Status:</span>
                            <span className="text-green-600 font-medium">
                              Paid
                            </span>
                          </div>
                        </div>

                        <DialogFooter>
                          <Button
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.location.reload()}
                          >
                            View Receipt
                          </Button>
                        </DialogFooter>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Pending Payments</CardTitle>
                <CardDescription>
                  You don't have any pending hostel accommodation payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-gray-500">
                  All your payments are up to date.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>
                Your past hostel accommodation payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentHistory.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">
                          Payment ID
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Hostel
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Amount
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 font-medium">
                          Receipt
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {paymentHistory.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="py-3 px-4">{payment.id}</td>
                          <td className="py-3 px-4">{payment.hostel}</td>
                          <td className="py-3 px-4">
                            ₦{payment.amount.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">{payment.date}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              {payment.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <Button variant="outline" size="sm">
                              View Receipt
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center py-8 text-gray-500">
                  You don't have any payment history yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export { Payments };
