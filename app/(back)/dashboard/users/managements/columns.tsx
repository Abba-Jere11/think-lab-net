"use client"
import { Mail, Phone, User } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import DateColumn from "@/components/DataTableColumns/DateColumn"
import SortableColumn from "@/components/DataTableColumns/SortableColumn"
import type { ColumnDef } from "@tanstack/react-table"
import ActionColumn from "@/components/DataTableColumns/ActionColumn"
import type { Contact } from "@/types/types"

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
    case "low":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

const getLevelColor = (level: string) => {
  switch (level.toLowerCase()) {
    case "management":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
    case "staff":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    case "corper":
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
    case "intern":
      return "bg-brown-100 text-brown-800 dark:bg-brown-900 dark:text-brown-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

export const columns: ColumnDef<Contact>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <SortableColumn column={column} title="Contact Info" />,
    cell: ({ row }) => {
      const contact = row.original
      return (
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{contact.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate flex items-center">
              <Mail className="h-3 w-3 mr-1" />
              {contact.email}
            </p>
          </div>
        </div>
      )
    },
  },
  // {
  //   accessorKey: "employeeId",
  //   header: ({ column }) => <SortableColumn column={column} title="Employee ID" />,
  //   cell: ({ row }) => (
  //     <div className="text-sm font-mono text-gray-900 dark:text-gray-100">{row.getValue("employeeId")}</div>
  //   ),
  // },
  {
    accessorKey: "subject",
    header: ({ column }) => <SortableColumn column={column} title="Subject" />,
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 dark:text-gray-100 max-w-[200px] truncate">{row.getValue("subject")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => <SortableColumn column={column} title="Department" />,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-xs">
        {row.getValue("department")}
      </Badge>
    ),
  },
  {
    accessorKey: "level",
    header: ({ column }) => <SortableColumn column={column} title="Level" />,
    cell: ({ row }) => {
      const level = row.getValue("level") as string
      return <Badge className={`text-xs ${getLevelColor(level)}`}>{level}</Badge>
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortableColumn column={column} title="Priority" />,
    cell: ({ row }) => {
      const priority = row.getValue("priority") as string
      return <Badge className={`text-xs ${getPriorityColor(priority)}`}>{priority}</Badge>
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="text-sm text-gray-900 dark:text-gray-100 flex items-center">
        <Phone className="h-3 w-3 mr-1 text-gray-400" />
        {row.getValue("phone")}
      </div>
    ),
  },
  // {
  //   accessorKey: "desc",
  //   header: "desc",
  //   cell: ({ row }) => (
  //     <div className="text-sm text-gray-900 dark:text-gray-100 max-w-[150px] truncate">{row.getValue("request")}</div>
  //   ),
  // },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <SortableColumn column={column} title="Date Created" />,
    cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const contact = row.original
      return <ActionColumn row={row} model="contact" editEndpoint={`/contacts/${contact.id}/edit`} id={contact.id} />
    },
  },
]
