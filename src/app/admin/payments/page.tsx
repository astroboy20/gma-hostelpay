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
import {
  MoreHorizontal,
  Search,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
} from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { FadeIn } from "@/components/animation"

// Mock payment data
const payments = [
  {
    id: "PAY-2023-001",
    studentName: "John Doe",
    matricNumber: "STU/2023/001234",
    hostel: "Block A - Room 123",
    amount: 50000,
    paymentDate: "2023-01-20",
    academicYear: "2023/2024",
    status: "Completed",
    paymentMethod: "Card",
    receiptNumber: "REC-2023-001",
    transactionId: "TXN-123456789",
  },
  {
    id: "PAY-2023-002",
    studentName: "Jane Smith",
    matricNumber: "STU/2023/005678",
    hostel: "Block B - Room 45",
    amount: 75000,
    paymentDate: "2023-01-22",
    academicYear: "2023/2024",
    status: "Completed",
    paymentMethod: "Bank Transfer",
    receiptNumber: "REC-2023-002",
    transactionId: "TXN-234567890",
  },
  {
    id: "PAY-2023-003",
    studentName: "Michael Johnson",
    matricNumber: "STU/2023/009012",
    hostel: "Block C - Room 78",
    amount: 100000,
    paymentDate: null,
    academicYear: "2023/2024",
    status: "Pending",
    paymentMethod: null,
    receiptNumber: null,
    transactionId: null,
  },
  {
    id: "PAY-2023-004",
    studentName: "Sarah Williams",
    matricNumber: "STU/2023/003456",
    hostel: "Block A - Room 45",
    amount: 50000,
    paymentDate: "2023-01-25",
    academicYear: "2023/2024",
    status: "Completed",
    paymentMethod: "USSD",
    receiptNumber: "REC-2023-004",
    transactionId: "TXN-345678901",
  },
  {
    id: "PAY-2023-005",
    studentName: "David Brown",
    matricNumber: "STU/2023/007890",
    hostel: "Block B - Room 12",
    amount: 75000,
    paymentDate: null,
    academicYear: "2023/2024",
    status: "Pending",
    paymentMethod: null,
    receiptNumber: null,
    transactionId: null,
  },
  {
    id: "PAY-2023-006",
    studentName: "Emily Davis",
    matricNumber: "STU/2023/002345",
    hostel: "Block D - Room 34",
    amount: 55000,
    paymentDate: "2023-01-28",
    academicYear: "2023/2024",
    status: "Completed",
    paymentMethod: "Card",
    receiptNumber: "REC-2023-006",
    transactionId: "TXN-456789012",
  },
  {
    id: "PAY-2023-007",
    studentName: "Robert Wilson",
    matricNumber: "STU/2023/006789",
    hostel: "Block E - Room 56",
    amount: 80000,
    paymentDate: "2023-01-30",
    academicYear: "2023/2024",
    status: "Failed",
    paymentMethod: "Card",
    receiptNumber: null,
    transactionId: "TXN-567890123",
  },
]

export default function PaymentsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("2023/2024")

  const filteredPayments = payments.filter(
    (payment) =>
      (payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedStatus === "all" || payment.status.toLowerCase() === selectedStatus.toLowerCase()) &&
      (selectedYear === "all" || payment.academicYear === selectedYear),
  )

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewDialogOpen(true)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        )
      case "Pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100" variant="outline">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case "Failed":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">
            <XCircle className="mr-1 h-3 w-3" />
            Failed
          </Badge>
        )
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">
            <AlertCircle className="mr-1 h-3 w-3" />
            Unknown
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <FadeIn>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Payments Management</h1>
            <p className="text-gray-500 mt-1">Track and manage hostel accommodation payments</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </FadeIn>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Payment Transactions</CardTitle>
              <CardDescription>View and manage all payment transactions</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search by name, matric number, or payment ID..."
                className="pl-9 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:w-40">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full sm:w-40">
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Academic Year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2023/2024">2023/2024</SelectItem>
                    <SelectItem value="2022/2023">2022/2023</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Hostel</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>
                          <div>
                            <div>{payment.studentName}</div>
                            <div className="text-xs text-gray-500">{payment.matricNumber}</div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{payment.hostel}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()}</TableCell>
                        <TableCell className="hidden md:table-cell">{payment.paymentDate || "—"}</TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              {payment.status === "Completed" && (
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Download Receipt
                                </DropdownMenuItem>
                              )}
                              {payment.status === "Pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Mark as Paid
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            <TabsContent value="completed">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Hostel</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments
                      .filter((payment) => payment.status === "Completed")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{payment.studentName}</div>
                              <div className="text-xs text-gray-500">{payment.matricNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{payment.hostel}</TableCell>
                          <TableCell>{payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="hidden md:table-cell">{payment.paymentDate}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="mr-2 h-4 w-4" />
                                  Download Receipt
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
            <TabsContent value="pending">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Hostel</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments
                      .filter((payment) => payment.status === "Pending")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{payment.studentName}</div>
                              <div className="text-xs text-gray-500">{payment.matricNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{payment.hostel}</TableCell>
                          <TableCell>{payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="hidden md:table-cell">—</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Mark as Paid
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
            <TabsContent value="failed">
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment ID</TableHead>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">Hostel</TableHead>
                      <TableHead>Amount (₦)</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayments
                      .filter((payment) => payment.status === "Failed")
                      .map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell className="font-medium">{payment.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{payment.studentName}</div>
                              <div className="text-xs text-gray-500">{payment.matricNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{payment.hostel}</TableCell>
                          <TableCell>{payment.amount.toLocaleString()}</TableCell>
                          <TableCell className="hidden md:table-cell">{payment.paymentDate}</TableCell>
                          <TableCell>{getStatusBadge(payment.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewPayment(payment)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Retry Payment
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
          </Tabs>
        </CardContent>
      </Card>

      {/* View Payment Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedPayment && (
            <>
              <DialogHeader>
                <DialogTitle>Payment Details</DialogTitle>
                <DialogDescription>Comprehensive information about the payment transaction</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">{selectedPayment.id}</h3>
                    <p className="text-gray-500">Transaction for {selectedPayment.academicYear} academic year</p>
                  </div>
                  <div>{getStatusBadge(selectedPayment.status)}</div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Student Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Name:</span>
                          <span className="text-sm font-medium">{selectedPayment.studentName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Matric Number:</span>
                          <span className="text-sm font-medium">{selectedPayment.matricNumber}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Accommodation Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Hostel:</span>
                          <span className="text-sm font-medium">{selectedPayment.hostel}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Academic Year:</span>
                          <span className="text-sm font-medium">{selectedPayment.academicYear}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Payment Information</h3>
                      <div className="mt-2 space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Amount:</span>
                          <span className="text-sm font-medium">₦{selectedPayment.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Payment Date:</span>
                          <span className="text-sm font-medium">{selectedPayment.paymentDate || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Payment Method:</span>
                          <span className="text-sm font-medium">{selectedPayment.paymentMethod || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Receipt Number:</span>
                          <span className="text-sm font-medium">{selectedPayment.receiptNumber || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Transaction ID:</span>
                          <span className="text-sm font-medium">{selectedPayment.transactionId || "—"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter className="flex gap-2 sm:justify-between">
                {selectedPayment.status === "Completed" && (
                  <Button variant="outline" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Receipt
                  </Button>
                )}
                {selectedPayment.status === "Pending" && (
                  <Button variant="outline" className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Mark as Paid
                  </Button>
                )}
                {selectedPayment.status === "Failed" && (
                  <Button variant="outline" className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Retry Payment
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
