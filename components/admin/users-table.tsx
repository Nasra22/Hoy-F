"use client"

import { useState } from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for users
const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "client",
    status: "active",
    createdAt: "2023-01-15",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    role: "agent",
    status: "active",
    createdAt: "2023-02-20",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "landlord",
    status: "active",
    createdAt: "2023-03-10",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    role: "client",
    status: "suspended",
    createdAt: "2023-01-25",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "driver",
    status: "active",
    createdAt: "2023-04-05",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "6",
    name: "Sarah Brown",
    email: "sarah@example.com",
    role: "cleaner",
    status: "pending",
    createdAt: "2023-05-12",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "7",
    name: "David Miller",
    email: "david@example.com",
    role: "agent",
    status: "active",
    createdAt: "2023-02-28",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "8",
    name: "Lisa Taylor",
    email: "lisa@example.com",
    role: "landlord",
    status: "pending",
    createdAt: "2023-06-18",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "9",
    name: "James Anderson",
    email: "james@example.com",
    role: "client",
    status: "active",
    createdAt: "2023-03-22",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "10",
    name: "Patricia Thomas",
    email: "patricia@example.com",
    role: "cleaner",
    status: "active",
    createdAt: "2023-04-30",
    avatarUrl: "/placeholder.svg?height=40&width=40",
  },
]

type User = (typeof users)[0]

export function UsersTable() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [roleFilter, setRoleFilter] = useState<string>("all")

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={row.original.avatarUrl || "/placeholder.svg"} alt={row.original.name} />
            <AvatarFallback>{row.original.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="font-medium">{row.original.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Role
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const role = row.original.role
        return (
          <Badge variant="outline" className="capitalize">
            {role}
          </Badge>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status
        return (
          <Badge
            className={
              status === "active"
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : status === "suspended"
                  ? "bg-red-100 text-red-800 hover:bg-red-100"
                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Joined
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>View Details</DropdownMenuItem>
              <DropdownMenuItem>Edit User</DropdownMenuItem>
              {user.status === "active" ? (
                <DropdownMenuItem className="text-red-600">Suspend User</DropdownMenuItem>
              ) : user.status === "suspended" ? (
                <DropdownMenuItem className="text-green-600">Activate User</DropdownMenuItem>
              ) : null}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const filteredUsers = roleFilter === "all" ? users : users.filter((user) => user.role === roleFilter)

  const table = useReactTable({
    data: filteredUsers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
              className="w-[200px] pl-8 md:w-[300px]"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="client">Client</SelectItem>
              <SelectItem value="agent">Agent</SelectItem>
              <SelectItem value="landlord">Landlord</SelectItem>
              <SelectItem value="driver">Driver</SelectItem>
              <SelectItem value="cleaner">Cleaner</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button>Add User</Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2">
        <div className="text-sm text-muted-foreground">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}
