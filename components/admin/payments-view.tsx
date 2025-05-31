"use client"

import { useState } from "react"
import {
  ArrowDownUp,
  ArrowUpRight,
  ArrowDownLeft,
  Calendar,
  DollarSign,
  CreditCard,
  Search,
  Download,
} from "lucide-react"
import { format } from "date-fns"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-range-picker"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for transactions
const transactions = [
  {
    id: "1",
    type: "payment",
    amount: 1500,
    fee: 45,
    status: "completed",
    date: "2023-06-01T10:30:00",
    fromUser: {
      id: "1",
      name: "John Doe",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Monthly rent payment",
    paymentMethod: "credit_card",
  },
  {
    id: "2",
    type: "payment",
    amount: 2000,
    fee: 60,
    status: "completed",
    date: "2023-06-02T14:15:00",
    fromUser: {
      id: "9",
      name: "James Anderson",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "8",
      name: "Lisa Taylor",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Monthly rent payment",
    paymentMethod: "bank_transfer",
  },
  {
    id: "3",
    type: "commission",
    amount: 300,
    fee: 0,
    status: "completed",
    date: "2023-06-03T09:45:00",
    fromUser: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "2",
      name: "Jane Smith",
      role: "agent",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Agent commission for property rental",
    paymentMethod: "system",
  },
  {
    id: "4",
    type: "refund",
    amount: 500,
    fee: -15,
    status: "completed",
    date: "2023-06-04T16:20:00",
    fromUser: {
      id: "8",
      name: "Lisa Taylor",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "9",
      name: "James Anderson",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Security deposit refund",
    paymentMethod: "system",
  },
  {
    id: "5",
    type: "payment",
    amount: 1800,
    fee: 54,
    status: "pending",
    date: "2023-06-05T11:10:00",
    fromUser: {
      id: "4",
      name: "Emily Davis",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Monthly rent payment",
    paymentMethod: "credit_card",
  },
  {
    id: "6",
    type: "service",
    amount: 150,
    fee: 4.5,
    status: "completed",
    date: "2023-06-06T13:25:00",
    fromUser: {
      id: "3",
      name: "Robert Johnson",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "10",
      name: "Patricia Thomas",
      role: "cleaner",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Cleaning service payment",
    paymentMethod: "wallet",
  },
  {
    id: "7",
    type: "service",
    amount: 200,
    fee: 6,
    status: "failed",
    date: "2023-06-07T15:40:00",
    fromUser: {
      id: "8",
      name: "Lisa Taylor",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "5",
      name: "Michael Wilson",
      role: "driver",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Moving service payment",
    paymentMethod: "credit_card",
  },
  {
    id: "8",
    type: "deposit",
    amount: 3000,
    fee: 0,
    status: "completed",
    date: "2023-06-08T10:05:00",
    fromUser: {
      id: "1",
      name: "John Doe",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "system",
      name: "HoyFinder",
      role: "system",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Security deposit for new rental",
    paymentMethod: "bank_transfer",
  },
  {
    id: "9",
    type: "withdrawal",
    amount: 2500,
    fee: 25,
    status: "completed",
    date: "2023-06-09T14:30:00",
    fromUser: {
      id: "system",
      name: "HoyFinder",
      role: "system",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "2",
      name: "Jane Smith",
      role: "agent",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Withdrawal to bank account",
    paymentMethod: "bank_transfer",
  },
  {
    id: "10",
    type: "payment",
    amount: 1200,
    fee: 36,
    status: "completed",
    date: "2023-06-10T09:15:00",
    fromUser: {
      id: "9",
      name: "James Anderson",
      role: "client",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    toUser: {
      id: "8",
      name: "Lisa Taylor",
      role: "landlord",
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    description: "Utility payment",
    paymentMethod: "wallet",
  },
]

export function PaymentsView() {
  const [searchQuery, setSearchQuery] = useState("")
  const [transactionType, setTransactionType] = useState("all")
  const [status, setStatus] = useState("all")
  const [dateRange, setDateRange] = useState({ from: undefined, to: undefined })

  // Calculate summary statistics
  const totalTransactions = transactions.length
  const totalVolume = transactions.reduce((sum, t) => sum + t.amount, 0)
  const totalFees = transactions.reduce((sum, t) => sum + t.fee, 0)
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length

  // Filter transactions based on search and filters
  const filteredTransactions = transactions
    .filter(
      (transaction) =>
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.fromUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.toUser.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .filter((transaction) => transactionType === "all" || transaction.type === transactionType)
    .filter((transaction) => status === "all" || transaction.status === status)
    .filter((transaction) => {
      if (!dateRange.from) return true
      const transactionDate = new Date(transaction.date)
      if (dateRange.to) {
        return transactionDate >= dateRange.from && transactionDate <= dateRange.to
      }
      return transactionDate >= dateRange.from
    })

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalVolume.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {totalTransactions} transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Platform Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalFees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((totalFees / totalVolume) * 100).toFixed(1)}% of total volume
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending Transactions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingTransactions}</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <ArrowDownUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(
                ((totalTransactions - transactions.filter((t) => t.status === "failed").length) / totalTransactions) *
                100
              ).toFixed(1)}
              %
            </div>
            <p className="text-xs text-muted-foreground">
              {transactions.filter((t) => t.status === "failed").length} failed transactions
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={transactionType} onValueChange={setTransactionType}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Transaction Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="refund">Refund</SelectItem>
            <SelectItem value="commission">Commission</SelectItem>
            <SelectItem value="service">Service</SelectItem>
            <SelectItem value="deposit">Deposit</SelectItem>
            <SelectItem value="withdrawal">Withdrawal</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange className="w-full md:w-auto" selected={dateRange} onSelect={setDateRange} />
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Export
        </Button>
      </div>

      {/* Transactions Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.id}</TableCell>
                  <TableCell>{format(new Date(transaction.date), "MMM d, yyyy")}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        transaction.type === "payment"
                          ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                          : transaction.type === "refund"
                            ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                            : transaction.type === "commission"
                              ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                              : transaction.type === "service"
                                ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                                : transaction.type === "deposit"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={transaction.fromUser.avatarUrl || "/placeholder.svg"}
                          alt={transaction.fromUser.name}
                        />
                        <AvatarFallback>{transaction.fromUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="whitespace-nowrap">{transaction.fromUser.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={transaction.toUser.avatarUrl || "/placeholder.svg"}
                          alt={transaction.toUser.name}
                        />
                        <AvatarFallback>{transaction.toUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="whitespace-nowrap">{transaction.toUser.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {transaction.type === "withdrawal" || transaction.type === "refund" ? (
                        <ArrowDownLeft className="mr-1 h-4 w-4 text-red-500" />
                      ) : (
                        <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                      )}
                      ${transaction.amount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        transaction.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No transactions found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
